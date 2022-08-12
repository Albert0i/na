module.exports = {
    apps : [{
      name: "na",
      script: 'server.js',
      instances: 4,
      exec_mode: "cluster",
      watch: '.'
    }],
    deploy : {
      production : {
        key: "../ssh-key-2022-05-09(2).pem",
        user : 'ubuntu',
        host : '140.238.40.147',
        ssh_options: "StrictHostKeyChecking=no",
        ref  : 'main',
        repo : 'https://github.com/Albert0i/na.git',
        path : '/home/ubuntu/na',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };
/*
  pm2 deploy production setup

  pm2 deploy production

  pm2 deploy production --force

  Scaling Node.js Applications With PM2 Clusters
  https://medium.com/geekculture/scaling-node-js-applicationswith-pm2-clusters-c216c4468d66

  LOAD-BALANCING | GUIDE | PM2 DOCUMENTATION
  https://pm2.io/docs/runtime/guide/load-balancing/

  EASY DEPLOY WITH SSH
  https://pm2.io/docs/runtime/guide/easy-deploy-with-ssh/
*/    