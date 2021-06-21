

## [package.json](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

## [npm restart](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

script 脚本传参 -- arguments

npm脚本

而`npm restart`是一个复合命令,实际上会执行三个脚本命令：`stop`、`restart`、`start`。具体的执行顺序如下。

```
prerestart
prestop
stop
poststop
restart
prestart
start
poststart
postrestart
```

## 变量

首先，通过`npm_package_`前缀，npm 脚本可以拿到`package.json`里面的字段。比如，下面是一个`package.json`。

```javascript
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

那么，变量`npm_package_name`返回`foo`，变量`npm_package_version`返回`1.2.5`。

```javascript
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量`process.env`对象，拿到`package.json`的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`npm_package_`前缀也支持嵌套的`package.json`字段。

```javascript
  "repository": {
    "type": "git",
    "url": "xxx"
  },
  scripts: {
    "view": "echo $npm_package_repository_type"
  }
```

上面代码中，`repository`字段的`type`属性，可以通过`npm_package_repository_type`取到。

下面是另外一个例子。

```javascript
"scripts": {
  "install": "foo.js"
}
```

上面代码中，`npm_package_scripts_install`变量的值等于`foo.js`。

然后，npm 脚本还可以通过`npm_config_`前缀，拿到 npm 的配置变量，即`npm config get xxx`命令返回的值。比如，当前模块的发行标签，可以通过`npm_config_tag`取到。

```javascript
"view": "echo $npm_config_tag",
```

注意，`package.json`里面的`config`对象，可以被环境变量覆盖。

```javascript
{ 
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```

上面代码中，`npm_package_config_port`变量返回的是`8080`。这个值可以用下面的方法覆盖。

```bash
$ npm config set foo:port 80
```

最后，`env`命令可以列出所有环境变量。

```javascript
"env": "env"
```

## npm 钩子命令

    - “preinstall”:"preinstall.js"
    - “uninstall”:"preinstall.js"
## [npm link](https://www.jianshu.com/p/aaa7db89a5b2) [详细](https://mobilesite.github.io/2017/03/12/npm-link-local-module/)

`npm link`实现引用本机中的模块

- npm link用来在本地项目和本地npm模块之间建立连接，可以在本地进行模块测试. 具体用法
```shell
# 先去到模块目录，把它 link 到全局
cd path/to/my-utils
npm link

# 再去项目目录通过包名来 link
cd path/to/my-project
npm link my-utils

cd path/to/egg-init
npm link
 # 此时全局的 egg-init 指令就已经指向你的本地开发目录了
egg-init # 即可
想去掉 link 也很简单：

npm unlink my-utils
```
[具体用法](https://www.cnblogs.com/mengff/p/11743145.html)

1. 项目和模块在同一个目录下，可以使用相对路径

npm link ../module

2. 项目和模块不在同一个目录下

cd到模块目录，npm link，进行全局link

cd到项目目录，npm link 模块名(package.json中的name)

3. 解除link

解除项目和模块link，项目目录下，npm unlink 模块名

解除模块全局link，模块目录下，npm unlink 模块名

## npx

它会自动查找当前依赖包中的二进制可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装，解决一次性命令的使用问题
- 用于临时使用npm模块，而不需要全局安装
- `npx --no-install http-server`
- `npx --ignore-existing create-react-app my-react-app`
- `npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32`    执行 Gist 代码
- 在以往中，我们在 node 项目中要执行一个脚本，需要将它在 scripts 中声明，用了 npx 以后呢，你不需要在 scripts 中声明了，就可以直接敲键盘了（npx 开头，然后接你要执行的内容）：

## npm version

命令|结果
--|--
npm version patch| v1.0.1 
npm version major|v1.1.0
npm version minor|v2.0.0

minor.major.patch

### [npm语义化](https://blog.xcatliu.com/2015/04/14/semantic_versioning_and_npm/)

npm 版本 a-b-c
- a是大版本，a不同可能会有兼容性问题
- b是feature
- c是fix

 MAJOR.MINOR.PATCH

![image](https://img-blog.csdnimg.cn/20190812142122685.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3ppc3R4eW0=,size_16,color_FFFFFF,t_70)

#### 升级版本号的规则主要有三个：

[https://www.jianshu.com/p/a7490344044f](语义化版本)
 主版本号：当你做了不兼容的 API 修改，为0时，处于开发阶段

- 次版本号：当你做了向下兼容的功能性新增，不一定向下兼容
- 修订号：当你做了向下兼容的问题修正
- 先行版本号 正式版本之前的版本，用于发布一个新的不兼容的主版本号、
- 版本编译信息 在先行版本号后加上“+”号的标识符，
- ^表示在同一个**主**版本号中，大于等于指定版本号，也即升级minor次版本号
- ~表示在同一**主次**版本号中，大于等于指定版本号，也即升级patch修订版本号

## npmrc

通过这个机制，我们可以方便地在工程跟目录创建一个 .npmrc 文件来共享需要在团队间共享的 npm 运行相关配置。比如如果我们在公司内网环境下需通过代理才可访问 registry.npmjs.org 源，或需访问内网的 registry, 就可以在工作项目下新增 .npmrc 文件并提交代码库。

```shell
proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/
```
## bin字段与script字段

#### 本地调试命令别名
```javascript
"bin" : {
    "myapp" : "node index" 
} 
```
以上配置后，可以在项目目录下运行myapp，相当于node index命令。相当于一个命令别名

#### 指定各个内部命令对应的可执行文件

bin项用来指定各个内部命令对应的可执行文件的位置。

```javascript
"bin": {
  "someTool": "./bin/someTool.js"
}
```

上面代码指定，someTool 命令对应的可执行文件为 bin 子目录下的 someTool.js。

在上面的例子中，someTool.js会建立符号链接node_modules/.bin/someTool。

由于node_modules/.bin/目录会在运行时加入系统的PATH变量，因此在运行npm时，就可以不带路径，直接通过命令来调用这些脚本。

因此，像下面这样的写法可以采用简写。


```javascript
scripts: {  
  start: './node_modules/bin/someTool.js build'
}

// 简写为

scripts: {  
  start: 'someTool build'
}
```

所有node_modules/.bin/目录下的命令，都可以用npm run [命令]的格式运行。在命令行下，键入npm run，然后按tab键，就会显示所有可以使用的命令。

#### [符号链接（软链接）](https://zhuanlan.zhihu.com/p/141512700)
符号链接是一种特殊的文件，包含指定文件的路径引用，类似于桌面的快捷打开方式。

在项目中局部安装jest包后，npm会在项目中的node_modules/.bin目录下创建一条符号链接，点击这个文件，就会链接到bin字段中定义的jest.js文件：

如果是全局安装呢？

npm会在环境变量路径/usr/local/bin目录下（MAC）创建一个symbolic，指向bin字段中声明的文件，这样在当前用户任意目录下，都可以使用bin属性中定义的命令了。

#### 安装带有bin字段的模块作用

在安装第三方带有bin字段的npm，那可执行文件会被链接到当前项目的./node_modules/.bin中，在本项目中，就可以很方便地利用npm执行脚本（package.json文件中scripts可以直接执行：'node node_modules/.bin/myapp'）；

1. 如果是全局安装，npm将会使用符号链接把这些文件链接到/usr/local/bin/，那么各个地方都可以使用指定命令了
2. 如果是本地安装，会链接到./node_modules/.bin/。

## [yarn](https://juejin.im/post/5da9c6b0e51d4524d67486e2#heading-4)

yarn.lock 中会准确的存储每个依赖的具体版本信息，以保证在不同机器安装可以得到相同的结果。


yarn.lock文件是在安装期间，由 Yarn 自动生成的，并且由yarn来管理，不应该手动去更改，更不应该删除yarn.lock文件，且要提交到版本控制系统中，以免因为不同机器安装的包版本不一致引发问题

yarn 会将安装过的包缓存下来，这样再次安装相同包的时候，就不需要再去下载，而是直接从缓存文件中直接copy进来。
可以通过命令 yarn cache dir 查看yarn的全局缓存目录。我的缓存目录在 /Library/Caches/Yarn/v1 下。

#### peerDependency

如果你开发的 loader 只是简单包装另外一个包，那么你应该在 package.json 中将这个包设为同伴依赖（peerDependency）

## 查看npm包版本

你可以执行 `npm view package version` 查看某个 `package` 的最新版本。

执行 `npm view conard versions` 查看某个 `package` 在npm服务器上所有发布过的版本。

执行 `npm ls` 可查看当前仓库依赖树上所有包的版本信息。

- npm dist-tag ls @atsfe/qp

```
hidden: 3.6.0-alpha.16.0
latest: 3.6.0-alpha.16
next: 4.0.0-alpha.1.2
```



参考

https://mp.weixin.qq.com/s/Qrzn3rLKfMI9V6diQ_7vBg