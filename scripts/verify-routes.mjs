import http from 'http';

const routes = [
  '/',
  '/courses',
  '/tracks',
  '/how-it-works',
  '/comic-method',
  '/daily-checkin',
  '/safety',
  '/faq',
  '/progress',
  '/classroom',
  '/enroll',
  '/certificate',
  '/schedule',
  '/notifications',
  '/checkout',
  '/activate'
];

async function checkRoute(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const hasAT = /\bAT(0[1-9]|1[0-8])\b/.test(body);
        const hasTesterFixtures = /Tester Quick Fixtures/i.test(body);
        const hasExpectLocked = /Expect Locked/i.test(body);
        resolve({
          path,
          statusCode: res.statusCode,
          size: body.length,
          hasAT,
          hasTesterFixtures,
          hasExpectLocked
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('Verifying all routes on http://localhost:3000 ...\n');
  let allOk = true;

  for (const route of routes) {
    const result = await checkRoute(route);
    if (result.error) {
      console.log(`❌ ${route} - Error: ${result.error}`);
      allOk = false;
    } else if (result.statusCode !== 200) {
      console.log(`❌ ${route} - Status: ${result.statusCode}`);
      allOk = false;
    } else {
      const issues = [];
      if (result.hasAT) issues.push('Contains AT tag');
      if (result.hasTesterFixtures) issues.push('Contains Tester Quick Fixtures');
      if (result.hasExpectLocked) issues.push('Contains Expect Locked');

      if (issues.length > 0) {
        console.log(`⚠️ ${route} (200 OK, ${result.size} bytes) - Warning: ${issues.join(', ')}`);
        allOk = false;
      } else {
        console.log(`✅ ${route} (200 OK, ${result.size} bytes) - Clean learner UI`);
      }
    }
  }

  console.log(`\nOverall result: ${allOk ? 'ALL ROUTES CLEAN & OPERATIONAL' : 'SOME ISSUES DETECTED'}`);
}

run();
