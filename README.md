# git-backup

git-backup.

## Install

``` bash
$ npm install hexo-git-backup --save
```

## Update

if you install with --save, you must remove firstly when you update it.
``` bash
$ npm remove hexo-git-backup
$ npm install hexo-git-backup --save
```

## Options

You can configure this plugin in `_config.yml`.

``` yaml
backup:
    type: git
    repository:
       github: git@github.com:xxx/xxx.git,branchName
       gitcafe: git@github.com:xxx/xxx.git,branchName
```

## Problems

You may get some troubles by your computer' permission。

###Error: EISDIR, open
just do 'hexo d' before you 'hexo b' 
```
hexo d  
hexo b
```
###Could not read from remote repository.
```
git remote add github git@github.com:xxx/xxx.git

```
