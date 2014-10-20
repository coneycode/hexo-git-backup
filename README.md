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
