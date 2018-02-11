# lazy note

###### 2018.02.09

用于个人记录一些阅读笔记，心得，备忘。。。

## 项目结构

```txt
|____css                 项目样式
| |____reset.css           重置样式
| |____md.css              markdown文档样式
| |____style.css           页面基本样式
|____img                 项目图片
|____js                  js文件
| |____html.js             note页面逻辑
| |____note                写字板组件
| |____catalog             目录组件
| |____comm                公共组件、函数集
| | |____keyevent.js         页面键盘事件
| |____index.js            主页逻辑
| |____drag                拖动组件
| |____cmdbar              命令条组件
| |____drawboard           画板组件
|____dep                 依赖包
| |____highlight           代码高亮插件
| |____Parsedown.php       将markdown转换为html
| |____jquery.js
|____data                项目数据
| |____html                markdown转换后的html文件
| |____img                 笔记依赖的图片
| |____md                  源笔记文件,markdown格式
|____script              项目脚本
| |____build.sh            项目构建脚本
| |____config.ini          构建配置文件
| |____build_index.php     主页构建脚本
| |____md2html.php         markdown转html脚本
|____app                 App模块
|____Todo.md             项目待完成清单
|____README.md           项目简介
|____index.html          主页

```


## 工具

### 书签
快捷键: `Ctrl+C`

### 命令条
快键键: `Shift+:`

+ 临时笔记 `n`
+ 绘画板   `d`

## 笔记构建

1. 在`data/md`文件夹里创建markdown笔记
2. 运行构建脚本`./build.sh`

###### 2018.02.09