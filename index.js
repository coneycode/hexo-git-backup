var console = hexo.extend.console;

var backupOptions = {
  alias: 'b',
  options: [
    {name: '--i', desc: 'Setup without deployment'},
    {name: '-g, --generate', desc: 'Generate before deployment'}
  ]
};

console.register('backup', 'backup your website', backupOptions, require('./backup'));