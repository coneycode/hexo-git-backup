var async = require('async'),
  fs = require('graceful-fs'),
  _ = require('lodash');
  git = require('./git');

module.exports = function(args, callback){
  var config = this.config.backup,
    log = this.log,
    backupers = this.extend.deployer.list(),
    self = this;

  if (!config){
    var help = '';

    help += 'You should configure backupment settings in _config.yml first!\n\n';
    help += 'Available Types:\n';
    help += '  ' + Object.keys(backupers).join(', ') + '\n\n';
    help += 'For more help, you can check the online docs: ' + 'http://hexo.io/'.underline;

    console.log(help);

    return callback();
  }

  if (!Array.isArray(config)) config = [config];

  var onBackupStarted = function() {
    /**
    * Fired before backupment.
    *
    * @event backupBefore
    * @for Hexo
    */
    self.emit('backupBefore');
  };

  var onBackupFinished = function(err) {
    /**
    * Fired after backupment.
    *
    * @event backupAfter
    * @param {Error} err
    * @for Hexo
    */
    self.emit('backupAfter', err);
    callback(err);
  };
    onBackupStarted();
    // console.log(item);
    // console.log(args);
    async.eachSeries(config, function(item, next){
      var type = item.type;

      if (type != "git"){
        log.e('backuper not found: ' + type);
        // return next();
      } else {
        log.i('Start backup: ' + type);
      }

      git(_.extend({}, item, args), self,function(err){
        if (err) return next(err);

        log.i('Backup done: ' + type);
        next();
      });
    }, onBackupFinished);
};
