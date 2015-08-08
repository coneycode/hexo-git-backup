var console = hexo.extend.deployer;

var backupOptions = {
  alias: 'b',
  options: [
   
  ]
};

console.register('backup', require('./backup'));
