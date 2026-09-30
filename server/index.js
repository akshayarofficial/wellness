const express = require('express');
const cors = require('cors');
const config = require('./config');
const { adminCount, purgeExpiredSessions } = require('./lib/auth');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

const app = express();

// Requests arrive via the Next.js rewrite on the same machine; trust its
// X-Forwarded-For so req.ip is the real client (used for login throttling).
app.set('trust proxy', 'loopback');
app.disable('x-powered-by');

app.use(cors({
  origin: config.CORS_ORIGINS,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Referrer-Policy', 'same-origin');
  next();
});

app.use(express.json({ limit: '20kb' }));

app.use((req, res, next) => {
  console.log(`[EXPRESS ${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: 'Not found.' });
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'Malformed JSON body.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, error: 'Request body too large.' });
  }
  console.error('[EXPRESS] Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'An internal server error occurred. Please try again.',
  });
});

purgeExpiredSessions();
setInterval(purgeExpiredSessions, 60 * 60 * 1000).unref();

const server = app.listen(config.PORT, config.HOST, () => {
  console.log('=================================================');
  console.log(' Everyday Mental Wellness Express API running');
  console.log(` URL:      http://${config.HOST}:${config.PORT}`);
  console.log(` Database: ${config.DB_FILE}`);
  console.log('=================================================');
  if (adminCount() === 0) {
    console.warn(' No admin account exists yet. Create one with:');
    console.warn('   npm run admin:create -- <username>');
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close();
});

module.exports = app;
