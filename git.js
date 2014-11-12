var async = require('async'),
  fs = require('fs'),
  path = require('path'),
  spawn = require('child_process').spawn,
  file = require('./file'),
  commitMessage = require('./util').commitMessage;

module.exports = function(args, callback){
  var baseDir = args.deploy_dir || hexo.base_dir,
    //deployDir = path.join(baseDir, '.deploy'),
    deployDir = baseDir,
    gitDir = path.join(baseDir, '.git'),
    themesDir = path.join(baseDir, 'themes'),
    publicDir = hexo.public_dir;

  if (!args.repo && !args.repository){
    var help = '';

    help += 'You should configure deployment settings in _config.yml first!\n\n';
    help += 'Example:\n';
    help += '  deploy:\n';
    help += '    type: git\n';
    help += '    message: [message]\n';
    help += '    repo:\n';
    help += '      github: <repository url>,<branch>\n';
    help += '      gitcafe: <repository url>,<branch>\n\n';
    help += 'For more help, you can check the docs: ' + 'http://hexo.io/docs/deployment.html'.underline;

    console.log(help);
    return callback();
  }

  var repo = args.repo || args.repository;
  for (var t in repo){
    var s = repo[t].split(',');
    repo[t] = {};
    repo[t].url = s[0];
    repo[t].branch = s.length > 1 ? s[1] : 'master';
  }

  var run = function(command, args, callback){
    var cp = spawn(command, args, {cwd: deployDir});

    cp.stdout.on('data', function(data){
      process.stdout.write(data);
    });

    cp.stderr.on('data', function(data){
      process.stderr.write(data);
    });

    cp.on('close', callback);
  };

  async.series([
    // Set up
    function(next){
      fs.exists(gitDir, function(exist){
        if (exist && !args.setup) return next();
        hexo.log.i('Setting up Git-Backup deployment...');

        var commands = [['init']];
        if(args.theme){
             var themeGitDir = path.join(baseDir,'themes/' + args.theme + '/.git');
             var themeDir = path.join(baseDir,'themes/' + args.theme);
             fs.exists(themeGitDir,function(exist){
                 if(exist){
                        var child = spawn('rm', ['-rf', '.git'],{cwd: themeDir});
                        hexo.log.i(themeGitDir);
                        child.stdout.setEncoding('utf8');
                        child.stdout.on('data', function(data) {
                                hexo.log.i(data);
                            });
                        child.stderr.on('data', function (data) {
                              hexo.log.i('stderr: ' + data);
                        });

                        child.on('close', function (code) {
                              hexo.log.i('child process exited with code ' + code);
                        });
                        }
                })
            }
        if (args.master && repo[args.master]){
          var master = repo[args.master];
          hexo.log.i('fetch from ['+ args.master.green + ']:', master.url.cyan);
          commands.push(['remote', 'add', 'origin', '-t', master.branch, master.url]);
          commands.push(['pull']);
        } else {
          commands.push(['add', '-A', '.']);
          commands.push(['commit', '-m', 'First commit']);
          hexo.log.i('First');
        }

        for (var t in repo){
          commands.push(['remote', 'add', t, '-t', repo[t].branch, repo[t].url]);
        }
        //file.writeFile(deployDir, 'placeHolder', function(err){
         // if (err) callback(err);
          async.eachSeries(commands, function(item, next){
            run('git', item, function(code){
              if (code === 0) next();
            });
          }, function(){
            if (!args.setup) next();
          });
       // });
      });
    },

    function(next){
      //file.emptyDir(deployDir, next);
      next();
    },
    function(next){
      var commands = [
        ['add', '-A'],
        ['commit', '-m', commitMessage(args)],
      ];

      for (var t in repo){
        commands.push(['push', '-u', t, 'master:' + repo[t].branch, '--force']);
      }

      async.eachSeries(commands, function(item, next){
        run('git', item, function(){
          next();
        });
      }, next);
    }
  ], callback);
};
