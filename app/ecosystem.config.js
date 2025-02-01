module.exports = {
  apps: [
    {
      name: 'Web Server:80',
      script: 'serve -s -l 80', 
      watch: '.',
    },
    {
  
      script: './service-worker/', // Ensure this is a valid script
      watch: ['./service-worker'],
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};