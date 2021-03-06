## auto-tag

## 介绍

用于自动读取当前日期，来生成 tag 标签，同时推送到服务端，比如 v2018-11-26，如果重复会自动读取当前时间，生成 v2018-11-26_21-03

## 功能

1. 检测 git 版本，低于 2.20.0 则取消运行。
2. 判断当前目录是否是 git 仓库
3. 判断是否是刚初始化的 git 仓库，如果没有 commit，是没法打标签的
4. 判断是否是 master 分支，只能在 master 分支上打标签
5. 判断工作区是否干净
6. 新增 auto-tag -d 删除当前提交上的 tag，用于误提交的标签、
7. 新增 auto-tag -r 重命名当前项目对应的 Jenkins 名字
8. 新增 auto-tag -l 查看所有 Jenkins 的名字
9. 新增缓存当前项目对应的 Jenkins 名字，Jenkins 名字第一次输入

## 使用方法

1. 在项目根目录直接运行`auto-tag`即可
