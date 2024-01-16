require('dotenv').config({
  path: process.argv[2] === 'development' ? './.env.development' : './.env.production',
});

let environment = {MODE: process.env.TEST_MODE || process.argv[2]};
const {MODE} = environment;

if (!['development', 'production'].includes(MODE)) {
  console.error('You are not selecting a valid environment');
  process.exit();
}

const {PORT, API_URL, DB_CONN_STRING} = process.env;

environment = {
  PORT,
  API_URL,
  DB_CONN_STRING,
};

module.exports = {
  ...environment,
};
