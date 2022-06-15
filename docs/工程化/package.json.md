# [package.json](http://javascript.ruanyifeng.com/nodejs/packagejson.html#toc6)

## [yarn](https://juejin.im/post/5da9c6b0e51d4524d67486e2#heading-4)

- yarn 会将安装过的包缓存下来，这样再次安装相同包的时候，就不需要再去下载，而是直接从缓存文件中直接 copy 进来。
  可以通过命令 yarn cache dir 查看 yarn 的全局缓存目录。我的缓存目录在 /Library/Caches/Yarn/v1 下。
- yarn.lock 中会准确的存储每个依赖的具体版本信息，以保证在不同机器安装可以得到相同的结果。
- yarn.lock 文件是在安装期间，由 Yarn 自动生成的，并且由 yarn 来管理，不应该手动去更改，更不应该删除 yarn.lock 文件，且要提交到版本控制系统中，以免因为不同机器安装的包版本不一致引发问题

## 依赖管理

- `peerDependency`： 从 npm 3.0 版开始，`peerDependencies`不再会默认安装了。一些常用的包会被添加在 b 包的 peerDependencies 里，比如 react、react-router 等，可以认为工作项目 a 中一定已经安装了这些指定版本的依赖，少数情况下才需要手动安装。

- `dependencies` ：是项目所依赖的包。

- `devDependencies` ：是开发阶段所需要的包

- `optionalDependencies`：如果有一些依赖包即使安装失败，项目仍然能够运行或者希望 npm 继续运行，就可以使用 optionalDependencies。另外 optionalDependencies 会覆盖 dependencies 中的同名依赖包，所以不要在两个地方都写。

### [安装包](https://docs.npmjs.com/cli/v7/commands/npm-install)

可以从各种路径安装一个包，见以下命令

```shell
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <alias>@npm:<name>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

aliases: npm i, npm add
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional|--save-peer] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]
```

### [锁定依赖版本](https://mp.weixin.qq.com/s/Qrzn3rLKfMI9V6diQ_7vBg)

#### lock 文件

实际开发中，经常会因为各种依赖不一致而产生奇怪的问题，或者在某些场景下，我们不希望依赖被更新，建议在开发中使用 `package-lock.json`。

锁定依赖版本意味着在我们不手动执行更新的情况下，每次安装依赖都会安装固定版本。保证整个团队使用版本号一致的依赖。

每次安装固定版本，无需计算依赖版本范围，大部分场景下能大大加速依赖安装时间。

> 使用 package-lock.json 要确保 npm 的版本在 5.6 以上，因为在 5.0 - 5.6 中间，对 package-lock.json 的处理逻辑进行过几次更新，5.6 版本后处理逻辑逐渐稳定。

关于 `package-lock.json` 详细的结构，我们会在后面的章节进行解析。

#### 定期更新依赖

我们的目的是保证团队中使用的依赖一致或者稳定，而不是永远不去更新这些依赖。实际开发场景下，我们虽然不需要每次都去安装新的版本，仍然需要定时去升级依赖版本，来让我们享受依赖包升级带来的问题修复、性能提升、新特性更新。

![图片](https://mmbiz.qpic.cn/mmbiz_png/aDoYvepE5x0MbmLUkEwkhrI7KF9cHZTf1VH7ad5bwuJia8YvCUzGqiago5Uoic0Oomia2gpqMjibHoy8qDkicFUg3vvg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

使用 `npm outdated` 可以帮助我们列出有哪些还没有升级到最新版本的依赖：

- 黄色表示不符合我们指定的语意化版本范围 - 不需要升级
- 红色表示符合指定的语意化版本范围 - 需要升级

执行 `npm update` 会升级所有的红色依赖。

## yarn add 远程 git 协议

```js
yarn add <git remote url> installs a package from a remote git repository.
yarn add <git remote url>#<branch/commit/tag> installs a package from a remote git repository at specific git branch, git commit or git tag.
yarn add https://my-project.org/package.tgz installs a package from a remote gzipped tarball.
```

Here are some examples:

```js
yarn add https://github.com/fancyapps/fancybox [remote url]
yarn add ssh://github.com/fancyapps/fancybox#3.0  [branch]
yarn add https://github.com/fancyapps/fancybox#5cda5b529ce3fb6c167a55d42ee5a316e921d95f [commit]
```

_(Note: Fancybox v2.6.1 isn't available in the Git version.)_

To support both npm and yarn, you can use the git+url syntax:

```sh
git+https://github.com/owner/package.git#commithashortagorbranch
git+ssh://github.com/owner/package.git#commithashortagorbranch
```

1. `yarn add package-name`
2. `yarn add file:/path/to/local/folder`
3. `yarn add file:/path/to/local/tarball.tgz` installs a package from a gzipped tarball which could be used to share a package before publishing it.
4. `yarn add link:/path/to/local/folder`
5. `yarn add <git remote url>` installs a package from a remote git repository.
6. `yarn add <git remote url>#<branch/commit/tag>` installs a package from a remote git repository at specific git branch, git commit or git tag.
7. `yarn add https://my-project.org/package.tgz` installs a package from a remote gzipped tarball.

## [npm restart](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

script 脚本传参 -- arguments

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

## [npm link](https://www.jianshu.com/p/aaa7db89a5b2) [详细](https://mobilesite.github.io/2017/03/12/npm-link-local-module/)

`npm link`实现引用本机中的模块

- npm link 用来在本地项目和本地 npm 模块之间建立连接，可以在本地进行模块测试. 具体用法

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

[使用](https://www.cnblogs.com/mengff/p/11743145.html)

1.  项目和模块在同一个目录下，可以使用相对路径 `npm link ../module`

2.  项目和模块不在同一个目录下

- cd 到模块目录，npm link，进行全局 link
- cd 到项目目录，npm link 模块名(package.json 中的 name)

3. 解除 link
   - 解除项目和模块 link，项目目录下，`npm unlink 模块名`
   - 解除模块全局 link，模块目录下，`npm unlink 模块名`

个人认为使用 npm link 比较麻烦，本地测试其实可以直接修改使用模块的引用路径为本地的绝对路径

## npx

它会自动查找当前依赖包中的二进制可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装，解决一次性命令的使用问题

- 用于临时使用 npm 模块，而不需要全局安装
- `npx --no-install http-server`
- `npx --ignore-existing create-react-app my-react-app`
- `npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32` 执行 Gist 代码
- 在以往中，我们在 node 项目中要执行一个脚本，需要将它在 scripts 中声明，用了 npx 以后呢，你不需要在 scripts 中声明了，就可以直接敲键盘了（npx 开头，然后接你要执行的内容）：

## [版本管理](https://mp.weixin.qq.com/s/Qrzn3rLKfMI9V6diQ_7vBg)

| 命令              | 结果   |
| ----------------- | ------ |
| npm version patch | v1.0.1 |
| npm version major | v1.1.0 |
| npm version minor | v2.0.0 |

minor.major.patch

### [npm 版本语义化](https://www.jianshu.com/p/a7490344044f)

npm 版本 a-b-c

- a 是大版本，a 不同可能会有兼容性问题
- b 是 feature
- c 是 fix

MAJOR.MINOR.PATCH

![image](https://img-blog.csdnimg.cn/20190812142122685.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3ppc3R4eW0=,size_16,color_FFFFFF,t_70)

#### 升级版本号的规则主要有三个

- 主版本号：当你做了不兼容的 API 修改，为 0 时，处于开发阶段

- 次版本号：当你做了向下兼容的功能性新增，不一定向下兼容
- 修订号：当你做了向下兼容的问题修正
- 先行版本号 ：正式版本之前的版本，用于发布一个新的不兼容的主版本号
- 版本编译信息 在先行版本号后加上“+”号的标识符，
- ^表示在同一个**主**版本号中，大于等于指定版本号，也即升级 minor 次版本号
- ~表示在同一**主次**版本号中，大于等于指定版本号，也即升级 patch 修订版本号

### 查看 npm 包版本信息

#### 原理

`npm update`命令怎么知道每个模块的最新版本呢？

- npm 模块仓库提供了一个查询服务，叫做 registry 。以 npmjs.org 为例，它的查询服务网址是 [`https://registry.npmjs.org/`](https://registry.npmjs.org/) ，这个网址后面跟上模块名，就会得到一个 JSON 对象，里面是该模块所有版本的信息。比如，访问 [`https://registry.npmjs.org/react`](https://registry.npmjs.org/react)，就会看到 react 模块所有版本的信息。

#### 命令操作

你可以执行 `npm view package version` 查看某个 `package` 的最新版本

```bash
npm view react

# npm view 的别名
npm info react
npm show react
npm v react

# 查看包的所有版本
npm view react versions

# 查看当前仓库依赖树上所有包的版本信息
npm ls
```

![npm更新模块命令_天马3798-CSDN博客_npm 更新模块](https://img-blog.csdnimg.cn/20190914141436350.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTExMjcwMTk=,size_16,color_FFFFFF,t_70)

#### [dist-tag](https://www.jianshu.com/p/91902bae5572)

- 标签可用于提供别名而不是版本号。

- 例如，一个项目可能会选择有发展的多个数据流，并使用不同的标签为每个数据流，如 stable，beta，dev，canary。

- 默认，npm 使用 latest 来标识软件包的当前版本，并且 `npm install <pkg>`（无任何 `@<version>`或 `@<tag>` 指定符）安装该 latest 标签。

- 一般项目仅将 latest 标记用于稳定的发行版本，而将其他标记用于不稳定的版本，例如预发行。

- next ：一些项目使用该标签来标识即将发布的版本。

```shell
# 使用
npm dist-tag ls [<pkg>]
npm dist-tag add <pkg>@<version> [<tag>]
npm dist-tag rm <pkg> <tag>
npm dist-tag ls [<pkg>]
# 安装依赖项时，可以指定首选的标记版本：
npm install --tag <tag>
```

```bash
# 发布一个带tag的版本，默认是latest,以下命令中tag是next
npm publish --tag next
# 可以通过以下命令安装所属next的最新版本
npm install my-package@next
# 修改tagName
npm dist-tag add my-package@version next
```

## npm 源

以下配置源的方法优先级从高到低

```shell
# 为单包指定特定源
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 项目中创建配置文件.npmrc
@scopename:registry=<registry url>

# 查看配置的源使用 npm config get registry <registry url>
npm config set registry <registry url>
```

### npmrc

通过项目中配置 npmrc，我们可以方便地在工程跟目录创建一个 .npmrc 文件来共享需要在团队间共享的 npm 运行相关配置。比如如果我们在公司内网环境下需通过代理才可访问 registry.npmjs.org 源，或需访问内网的 registry, 就可以在工作项目下新增 .npmrc 文件并提交代码库。

```shell
proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/
```

[nrm 切换源](https://segmentfault.com/a/1190000017419993)

## bin 字段与 script 字段

### 本地调试命令别名

```javascript
"bin" : {
    "myapp" : "node index"
}
```

以上配置后，可以在项目目录下运行 myapp，相当于 node index 命令。相当于一个命令别名

### 指定各个内部命令对应的可执行文件

bin 项用来指定各个内部命令对应的可执行文件的位置。

```javascript
"bin": {
  "someTool": "./bin/someTool.js"
}
```

上面代码指定，someTool 命令对应的可执行文件为 bin 子目录下的 someTool.js。

在上面的例子中，someTool.js 会建立符号链接 node_modules/.bin/someTool。

由于 node_modules/.bin/目录会在运行时加入系统的 PATH 变量，因此在运行 npm 时，就可以不带路径，直接通过命令来调用这些脚本。

因此，像下面这样的写法可以采用简写。

```javascript
scripts: {
  start: './node_modules/bin/someTool.js build';
}

// 简写为

scripts: {
  start: 'someTool build';
}
```

在安装第三方带有 bin 字段的 npm，那可执行文件会被链接到当前项目的./node_modules/.bin 中，在本项目中，就可以很方便地利用 npm 执行脚本（package.json 文件中 scripts 可以直接执行：'node node_modules/.bin/myapp'）；

1. 如果是全局安装，npm 将会使用符号链接把这些文件链接到/usr/local/bin/（MAC），那么各个地方都可以使用指定命令了
2. 如果是本地安装，会链接到./node_modules/.bin/。
   - 所有 node_modules/.bin/目录下的命令，都可以用 npm run [命令]的格式运行。在
   - 命令行下，键入 npm run，然后按 tab 键，就会显示所有可以使用的命令。

## [export 字段](https://www.baobangdong.cn/node.js-package.json-field-definitions/)

他最大的一个特性就是 **条件导出（Conditional Exports）**，当该 package 被导入时，能够判断被导入时的模块环境，从而执行不同的文件，简而言之就是，我们如果使用 `import` 命令，入口会加载 ECMAScript Modules 文件，如果使用 `require` 命令，入口则加载 CommonJS Modules 文件。

## [pkg 中 module 字段](https://zhuanlan.zhihu.com/p/34164963)

module 字段用来标注库中 esm 版本的入口，若库中包含此字段，则表示支持 treeShaking

## [unpkg 和 cdn.js](https://segmentfault.com/a/1190000040875211)

- [unpkg](https://developer.aliyun.com/article/592213) 是一个快速的全球内容分发网络，适用于 npm 上的所有内容。使用它可以使用以下 URL 快速轻松地从任何包加载任何文件：`unpkg.com/:package@:version/:file`
- cdnjs 提供了一个简单的 API，允许任何人快速查询 CDN 上的资源,`https://api.cdnjs.com/libraries?search=jquery`，返回一个[以 jquery 为搜索条件的包 cdn 列表](https://image-static.segmentfault.com/803/289/803289998-33093935360af500_fix732)，这是一个 get 请求，数组的第一项为名称/功能最相近的资源的最新 CDN 资源地址

## [package.json 非官方字段集合](https://segmentfault.com/a/1190000016365409)

## 其他

- [手把手教你使用 patch-package 给 npm 包打补丁](https://juejin.cn/post/6962554654643191815)
