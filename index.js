var console = hexo.extend.console;

var backupOptions = {
  alias: 'b',
  options: [
   
  ]
};

console.register('backup', 'backup your website', backupOptions, require('./backup'));
