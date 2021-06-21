## Gitlab-CI

## 介绍	

Gitlab CI/CD 是一款用于持续集成（CI），持续交付（CD）的工具，相似的工具有Jenkins、Travis CI、GoCD等。

- CI即持续集成，Continuous Integration，目标：快速确保开发人员新提交的代码是好的，集成测试
- CD即持续交付，即Continuous Delivery，目标:  持续集成，持续测试（保证代码质量），持续部署（自动发布版本，供用户使用)。
- 从 GitLab 8.0 开始，GitLab CI 就已经集成在 GitLab 中，我们只要在项目中添加一个 .gitlab-ci.yml 文件，然后添加一个 Runner，即可进行持续集成。
- .gitlab-ci.yml文件使用yaml语法，[语法介绍请戳](http://www.ruanyifeng.com/blog/2016/07/yaml.html)

与jenkins对比

- gitlab-ci的优势在于比较配置和使用简单，能在gitlab上直接看到执行过程，不需要配webhook，集成在了gitlab上。
- jenkins的优势在于编译服务和代码仓库分离，而且编译配置文件不需要在工程中配置，并且jenkins依靠它丰富的插件，可以配置很多gitlab-ci不存在的功能，比如说看编译状况统计等

## gitlab-runner

- gitlab的自动化操作都是在runner机器中运行,我们需要注册runner
- runner分为shared runner和specified runner.

###  gitlab操作

gitlab上有关gitlab-ci的配置有两处

- 一处是CI/CD可以查看构建任务pipeline、job的执行情况
- 一处是setting里面对ci的设置

<img src="https://i.loli.net/2020/12/12/IVjWRdYUlOKbCsn.png" alt="image-20201212122028807"  />

一次提交触发一次CI&CD即执行一次脚本对应一个pipeline；一个pipeline对应stages下的所有job；一个stage对应一个job；

### Skip Pipeline

- commit message上加上[ci skip] 或者[skip ci]就可以跳过pipeline执行。
- 在一次 git push 调用中进行多次更改时，GitLab 最多创建四个分支和标签管道。此限制不影响任何更新的合并请求管道。所有更新的合并请求在使用管道处理合并请求时都会创建一个管道。

##  stages
- gitlab-ci的pipeline由一个个stage顺序执行，每个stage可以有多个job

- job是并行执行的
  所有build的jobs执行成功后，commit才会标记为success，所有的build的jobs执行成功，

- 任何一个前置的jobs失败了，commit会标记为failed并且下一个stages的jobs都不会执行。

- 默认定义为 build，test 和 deploy。

- 如果一个job没有指定stage，那么这个任务会分配到test stage。

  ```yml
  - stages:
    - build
    - release_deploy
    - dev-deploy
    - prod_deploy
  ```

### Jobs
- .gitlab-ci.yml允许指定无限量jobs。
- 每个jobs必须有一个唯一的名字，而且不能是上面提到的关键字。
- job由一列参数来定义jobs的行为。
- 所属同一个stage的job都是并行的

```
job_name:
```

### pages

一个特殊的job，用于上传静态内容到 GitLab，可用于服务于您的网站。需要满足以下条件

- 任何静态内容都必须放在`public/` directory. 目录
- `artifacts` ：path ：`public/` 目录必须有

下面的示例只是将所有文件从项目的根目录移动到 public/目录

```yml
pages:
  stage: deploy
  script:
    - mkdir .public
    - cp -r * .public
    - mv .public public
  artifacts: # 必须有
    paths:
      - public
  only:
    - master
```

### script

```
script:
	- echo "📦 开始打包"
	- ssh xxx@xxxxxx "
        rm -rf \`ls -d /xxx/www/* | grep -v -E '\.tar\.gz$'\` &&
        cd /xxx/www &&
        tar xvzf ${PKG_NAME} &&
        rm ${PKG_NAME}"
     # 长命令可以通过引号包裹，再用&&连接表示顺序执行命令
```



###  变量：variables

变量可以被重写，并且是按照下面的顺序进行执行：

- gitlab自带的变量- >   [点击链接查看全部变量](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) 
- 在setting→ci上设置的变量触发变量或预定的流水线变量。
  项目级别变量或受保护变量。

1. [Trigger variables](https://docs.gitlab.com/ce/ci/triggers/README.html#making-use-of-trigger-variables), [scheduled pipeline variables](https://docs.gitlab.com/ce/ci/pipelines/schedules.html#using-variables), and [manual pipeline run variables](https://docs.gitlab.com/ce/ci/variables/README.html#override-a-variable-by-manually-running-a-pipeline).
2. Project-level [variables](https://docs.gitlab.com/ce/ci/variables/README.html#custom-environment-variables) or [protected variables](https://docs.gitlab.com/ce/ci/variables/README.html#protect-a-custom-variable).
3. Group-level [variables](https://docs.gitlab.com/ce/ci/variables/README.html#group-level-environment-variables) or [protected variables](https://docs.gitlab.com/ce/ci/variables/README.html#protect-a-custom-variable).
4. Instance-level [variables](https://docs.gitlab.com/ce/ci/variables/README.html#instance-level-cicd-environment-variables) or [protected variables](https://docs.gitlab.com/ce/ci/variables/README.html#protect-a-custom-variable).
5. [Inherited environment variables](https://docs.gitlab.com/ce/ci/variables/README.html#inherit-environment-variables).
6. [YAML定义的job级别变量](https://docs.gitlab.com/ce/ci/yaml/README.html#job-variables)
7. [YAML定义的全局变量](https://docs.gitlab.com/ce/ci/yaml/README.html#variables)
8. [部署环境变量](https://docs.gitlab.com/ce/ci/variables/README.html#deployment-variables)
9. [预定义的环境变量](https://docs.gitlab.com/ce/ci/variables/README.html#predefined-variables-environment-variables) (优先级最低)


```javascript
variables:
  BUSINESS_LINE: ${BUSINESS_LINE}
  PRODUCT: ${PRODUCT}
  MICROAPP_NAME: ${CI_PROJECT_NAME}
  VERSION: ${CI_COMMIT_TAG}
  FILE_NAME: dist.tar.gz
```

job的执行条件：only/excepts、rules



only和except两个参数说明了job什么时候将会被创建:

1. only定义了job需要执行的所在分支或者标签
2. except定义了job不会执行的所在分支或者标签

- only如果没有指定，name默认是tags和branches
- only和except如果都存在在一个job声明中，则所需引用将会被only和except所定义的分支过滤.
- only和except允许使用正则
- only和except允许使用指定仓库地址，但是不forks仓库

```yml
only: #都是或者的关系
   - tags      # tag 分支 commit 之后触发
   - triggers  # API 触发
   - branches: # 当你的Git Refs对应的是一个分支时触发
   - tags      # 当你的Git Refs对应的是一个标签时触发
   - pushes    # 当你使用git push时触发
   - web       # 当你使用Web界面的Run Pipeline时触发
   - merge_requests #当你创建或者更新一个merge_requests时触发
   - schedules # 每日构建触发
   - /^issue-.*$/ # job将会只在issue-开头的refs下执行
   - branches@gitlab-org/gitlab-ce  #在父仓库gitlab-org/    gitlab-ce有提交时运行。
# 对分支的限制触发,只在分支是master和schedules的时候触发
    refs:
      - master
      - schedules
    kubernetes: active
# 变量条件触发，当RELEASE变量是staging或者STAGING存在时触发
    variables:
      - $RELEASE == "staging"
      - $STAGING
      - ($CI_COMMIT_BRANCH == "master" || $CI_COMMIT_BRANCH == "develop") && $MY_VARIABLE
# 文件变化才触发
    changes:
      - Dockerfile
      - docker/scripts/*
      - dockerfiles/**/*
      - more_scripts/*.{rb,py,sh}
rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: manual
      allow_failure: true
    - if: '$CI_PIPELINE_SOURCE == "schedule"'
    - if: ($CI_COMMIT_BRANCH == "master" || $CI_COMMIT_BRANCH == "develop") && $MY_VARIABLE
```

![image-20201213200855935](https://i.loli.net/2020/12/13/TKO5iznorx2Vv46.png)

### image/services

该关键字指定一个任务（job）所使用的docker镜像，例如`image: python:latest`使用Python的最新镜像。

镜像下载的策略：

- never： 当使用这个策略，会禁止Gitlab Runner从Docker hub或者其他地方下拉镜像，只能使用自己手动下拉的镜像
- if-not-present： 当使用这个策略，Runner会先检测本地是否有镜像，有的话使用该镜像，如果没有再去下拉。这个策略如果再配合定期删除镜像，就能达到比较好的效果。
- always： 这个是gitlab-ci默认使用的策略，即每一次都是重新下拉镜像，导致的结果就是比较耗时间

### artifacts

artifacts 被用于在 job 作业成功后将制定列表里的文件或文件夹附加到 job 上，传递给下一个 job ，如果要在两个 job 之间传递 artifacts，你必须设置dependencies,下面有几个例子

```yml
artifacts:
    name: "$CI_JOB_NAME" # artifacts压缩包重命名
    untracked: true  # 传递所有git没有追踪的文件
    when: on_failure  # 当job执行失败时，上传artifacts,还有on_success 这个值是默认的，当job成功时上传artifacts。always 不管失败与否，都上传
    artifacts: expire_in # 设置 artifacts 上传包的失效时间. 如果不设置，artifacts 的打包是永远存在于 gitlab上 的，'3 mins 4 sec','2 hrs 20 min','2h20min','6 mos 1 day','47 yrs 6 mos and 4d','3 weeks and 2 days'
    paths:
        - binaries/   #传递所有binaries和.config：
        - .config
```



## 参考

[Gitlab-CI使用教程](https://juejin.cn/post/6844904045581172744#heading-11)

[Gitlab-ci-官方文档](https://docs.gitlab.com/ee/ci/README.html)