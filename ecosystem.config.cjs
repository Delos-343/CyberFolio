require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'cyberfolio',
      script: '.next/standalone/server.js',
      cwd: 'C:/Users/moham/Downloads/Cyberfolio_',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',

        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        GITHUB_ID: process.env.GITHUB_ID,
        GITHUB_SECRET: process.env.GITHUB_SECRET,
      },
    },
  ],
};