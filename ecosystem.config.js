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
        ref  : 'origin/main',
        repo : 'https://github.com/Albert0i/na.git',
        path : '/home/ubuntu/na',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };
/*  
  Scaling Node.js Applications With PM2 Clusters
  https://medium.com/geekculture/scaling-node-js-applicationswith-pm2-clusters-c216c4468d66

  LOAD-BALANCING | GUIDE | PM2 DOCUMENTATION
  https://pm2.io/docs/runtime/guide/load-balancing/

  EASY DEPLOY WITH SSH
  https://pm2.io/docs/runtime/guide/easy-deploy-with-ssh/

  Setup
    pm2 deploy production setup

  Deploy  
    pm2 deploy production
  
  Update 
    pm2 deploy production update 
    pm2 deploy production update --force

  list previous deploy commits
    pm2 deploy production list
  
  execute the given <cmd>  
    pm2 deploy production exec pm2 list

  Help
    pm2 deploy help
*/    