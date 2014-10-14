var util = require('util');
var run = require('execSync').run;
process.env.DEBUG = '';//"hexo-backup"
var log = require('debug')("hexo-backup");

var backupOptions = {
    alias: 'b', // hexo backup/b
    options: [{
        name: '-i,--init',
        desc: 'git init git remote branch'
    }]
}

// hexo is a global variable
hexo.extend.console.register("backup", "backup your hexo blog into github, your themes not included", backupOptions, backup);


/*
 * set remote name to backup
 * git checkout hexo branch #hexo branch, using defalut name origin now.
 * git push backup yourrepo.git
 */


function backup(args, cb) {
    if (!hexo.config.backup) {
        throw new Error("please add backup info into _config.yml, branch & repo ...");
    }

    log(hexo.base_dir)
    process.chdir(hexo.base_dir)

    var branch = hexo.config.backup.branch;
    var repository = hexo.config.backup.repository;
    if(!repository){
         var repository = hexo.config.backup.repo;
    }
    // init
    if (args.init || args.i) {
        log("git init");
        run("git init .")
        run(util.format("git checkout %s",branch));
        run(util.format("git remote add backup %s",repository));
        return;
    }

    // backup
    log("backup");
    run("git add --all")
    run(util.format('git commit -a -m "backup at %s"', getnow()))
    run(util.format("git push backup %s",branch))
    cb();
}

function getnow() {
    var ret = "%s-%s-%s %s:%s:%s"
    var d = new Date()

    var year = pad(d.getFullYear(), 4),
        mon = pad(d.getMonth() + 1, 2),
        day = pad(d.getDate(), 2),

        hour = pad(d.getHours(), 2),
        min = pad(d.getMinutes(), 2),
        sec = pad(d.getSeconds(), 2);

    return util.format(ret, year, mon, day, hour, min, sec);
}

function pad(original, len, char) {
    if (arguments.length < 2)
        throw new Error("must specify original_string & expect_length")

    char = char || '0';

    var ret = original.toString()
    while (ret.length < len) {
        ret = char + ret
    }

    return ret;
}
