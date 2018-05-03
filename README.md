# git-backup

git-backup.

## Install
if your hexo version is 2.x.x, you should install as follow:

``` bash
$ npm install hexo-git-backup@0.0.91 --save
```

if version is 3.x.x, you should install as follow:

``` bash
$ npm install hexo-git-backup --save
```

## Update

if you install with --save, you must remove firstly when you update it.

``` bash
$ npm remove hexo-git-backup
$ npm install hexo-git-backup --save
```

## Configure

You should configure this plugin in `_config.yml`.

``` yaml
backup:
    type: git
    repository:
       github: git@github.com:xxx/xxx.git,branchName
       gitcafe: git@github.com:xxx/xxx.git,branchName
```

## Using
```
hexo backup 
```
or
```
hexo b
```
## Options

if you want to back up with your theme,just add `theme: your theme name,your theme name` in `_config.yml`.

``` yaml
backup:
    type: git
    theme: coney,landscape,xxx
    repository:
       github: git@github.com:xxx/xxx.git,branchName
       gitcafe: git@github.com:xxx/xxx.git,branchName
```
**Attention: if you do as above, the dir `themes/coney/.git`will be removed**

if you want DIY commit message, just add 'message: update xxx'.
``` yaml
backup:
    type: git
    message: update xxx
    repository:
       github: git@github.com:xxx/xxx.git,branchName
       gitcafe: git@github.com:xxx/xxx.git,branchName
```


Now you can backup all the blog!
## Problems

You may get some troubles by your computer' permission。

### Error: EISDIR, open
it is caused by permission.
just do 'sudo hexo b' 
```
sudo hexo b
```
