module.exports = {
    apps : [{
      name: "na",
      script: 'server.js',
      instances: 0,
      exec_mode: "cluster",
      watch: '.'
    }],
    deploy : {
      production : {
        user : 'SSH_USERNAME',
        host : 'SSH_HOSTMACHINE',
        ref  : 'origin/master',
        repo : 'GIT_REPOSITORY',
        path : 'DESTINATION_PATH',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };
/*
  Scaling Node.js Applications With PM2 Clusters
  https://medium.com/geekculture/scaling-node-js-applicationswith-pm2-clusters-c216c4468d66
*/    