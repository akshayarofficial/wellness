// Creates an admin account, or resets its password if the username exists.
//
//   npm run admin:create -- <username>          (prompts for the password)
//   ADMIN_PASSWORD=... npm run admin:create -- <username>   (non-interactive)

const readline = require('readline');
const { validateCredentialsInput, upsertAdmin } = require('../lib/auth');

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    // Suppress echo of typed characters
    rl._writeToOutput = (s) => {
      if (s.includes(question)) rl.output.write(s);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write('\n');
      resolve(answer);
    });
  });
}

async function main() {
  const username = (process.argv[2] || process.env.ADMIN_USERNAME || '').trim();
  if (!username) {
    console.error('Usage: npm run admin:create -- <username>');
    process.exit(1);
  }

  let password = process.env.ADMIN_PASSWORD;
  if (!password) {
    if (!process.stdin.isTTY) {
      console.error('No terminal available for the password prompt. Set ADMIN_PASSWORD instead.');
      process.exit(1);
    }
    password = await promptHidden('Password (min 10 chars): ');
    const confirm = await promptHidden('Confirm password: ');
    if (password !== confirm) {
      console.error('Passwords do not match.');
      process.exit(1);
    }
  }

  const error = validateCredentialsInput(username, password);
  if (error) {
    console.error(error);
    process.exit(1);
  }

  const { created } = upsertAdmin(username, password);
  console.log(created
    ? `Admin "${username}" created.`
    : `Password for admin "${username}" updated; existing sessions signed out.`);
}

main();
