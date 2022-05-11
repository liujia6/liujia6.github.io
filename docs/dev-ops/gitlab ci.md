## Gitlab-CI

## 介绍

Gitlab CI/CD 是一款用于[持续集成（CI），持续交付（CD）](https://github.com/ascoders/weekly/blob/v2/101.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90%20vs%20%E6%8C%81%E7%BB%AD%E4%BA%A4%E4%BB%98%20vs%20%E6%8C%81%E7%BB%AD%E9%83%A8%E7%BD%B2%E3%80%8B.md)的工具，相似的工具有 Jenkins、Travis CI、GoCD 等。

- CI 即持续集成，Continuous Integration，目标：持续集成，持续测试（保证代码质量）
- CD 即持续交付，即 Continuous Delivery，目标:  持续部署（自动发布版本，供用户使用)。
- 从 GitLab 8.0 开始，GitLab CI 就已经集成在 GitLab 中，我们只要在项目中添加一个 .gitlab-ci.yml 文件，然后添加一个 Runner，即可进行持续集成。
- .gitlab-ci.yml 文件使用 yaml 语法，[语法介绍请戳](http://www.ruanyifeng.com/blog/2016/07/yaml.html)

与 jenkins 对比

- gitlab-ci 的优势在于比较配置和使用简单，能在 gitlab 上直接看到执行过程，不需要配 webhook，集成在了 gitlab 上。
- jenkins 的优势在于编译服务和代码仓库分离，而且编译配置文件不需要在工程中配置，并且 jenkins 依靠它丰富的插件，可以配置很多 gitlab-ci 不存在的功能，比如说看编译状况统计等

## gitlab-runner

- gitlab 的自动化操作都是在 runner 机器中运行,我们需要注册 runner
- runner 分为 shared runner 和 specified runner.

### gitlab 操作

gitlab 上有关 gitlab-ci 的配置有两处

- 一处是 CI/CD 可以查看构建任务 pipeline、job 的执行情况
- 一处是 setting 里面对 ci 的设置

<img src="https://i.loli.net/2020/12/12/IVjWRdYUlOKbCsn.png" alt="image-20201212122028807"  />

- 一次提交触发一次 CI&CD 即执行一次脚本对应一个 pipeline

- 一个 pipeline 对应 stages 下的所有 job

- 一个 stage 可以有多个 job；

### Skip Pipeline

- commit message 上加上[ci skip]  或者[skip ci]就可以跳过 pipeline 执行。
- 在一次 git push 调用中进行多次更改时，GitLab 最多创建四个分支和标签管道。此限制不影响任何更新的合并请求管道。所有更新的合并请求在使用管道处理合并请求时都会创建一个管道。

## stages

- gitlab-ci 的 pipeline 由一个个 stage 顺序执行，每个 stage 可以有多个 job

- job 是并行执行的
  所有 build 的 jobs 执行成功后，commit 才会标记为 success，所有的 build 的 jobs 执行成功，

- 任何一个前置的 jobs 失败了，commit 会标记为 failed 并且下一个 stages 的 jobs 都不会执行。

- 默认定义为 build，test 和 deploy。

- 如果一个 job 没有指定 stage，那么这个任务会分配到 test stage。

  ```yml
  - stages:
      - build
      - release_deploy
      - dev-deploy
      - prod_deploy
  ```

### Jobs

- .gitlab-ci.yml 允许指定无限量 jobs。
- 每个 jobs 必须有一个唯一的名字，而且不能是上面提到的关键字。
- job 由一列参数来定义 jobs 的行为。
- 所属同一个 stage 的 job 都是并行的

```
job_name:
```

### pages

一个特殊的 job，用于上传静态内容到 GitLab，可用于服务于您的网站。需要满足以下条件

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

### 变量：variables

变量可以被覆盖，并且是按照以下优先级依次降低

1. [Trigger variables](https://docs.gitlab.com/ce/ci/triggers/README.html#making-use-of-trigger-variables), [scheduled pipeline variables](https://docs.gitlab.com/ce/ci/pipelines/schedules.html#using-variables), and [manual pipeline run variables](https://docs.gitlab.com/ce/ci/variables/README.html#override-a-variable-by-manually-running-a-pipeline).
2. Project-level [variables](https://docs.gitlab.com/ce/ci/variables/README.html#custom-environment-variables) or [protected variables](https://docs.gitlab.com/ce/ci/variables/README.html#protect-a-custom-variable). 项目 CI 设置的变量
3. Group-level [variables](https://docs.gitlab.com/ce/ci/variables/README.html#group-level-environment-variables) or [protected variables](https://docs.gitlab.com/ce/ci/variables/README.html#protect-a-custom-variable). gitlab 分组下 CI 设置的变量
4. Instance-level [variables](https://docs.gitlab.com/ce/ci/variables/README.html#instance-level-cicd-environment-variables) or [protected variables](https://docs.gitlab.com/ce/ci/variables/README.html#protect-a-custom-variable).
5. [Inherited environment variables](https://docs.gitlab.com/ce/ci/variables/README.html#inherit-environment-variables).
6. [YAML 定义的 job 级别变量](https://docs.gitlab.com/ce/ci/yaml/README.html#job-variables)
7. [YAML 定义的全局变量](https://docs.gitlab.com/ce/ci/yaml/README.html#variables)
8. [部署环境变量](https://docs.gitlab.com/ce/ci/variables/README.html#deployment-variables)
9. [预定义的环境变量](https://docs.gitlab.com/ce/ci/variables/README.html#predefined-variables-environment-variables) (优先级最低)

```javascript
variables:
  BUSINESS_LINE: ${BUSINESS_LINE}
```

### job 的执行条件

only（定义 job 执行条件）和 except（定义了 job 不被执行的条件）两个参数定义了 job 被创建的条件:

- except 和 only 如果没有指定 name，默认是 tags 和 branches

- only 和 except 如果都存在在一个 job 声明中，则所需引用将会被 only 和 except 所定义的分支过滤.
- only 和 except 允许使用正则
- only 和 except 允许使用指定仓库地址，但是不 forks 仓库

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

该关键字指定一个任务（job）所使用的 docker 镜像，例如`image: python:latest`使用 Python 的最新镜像。

镜像下载的策略：

- never： 当使用这个策略，会禁止 Gitlab Runner 从 Docker hub 或者其他地方下拉镜像，只能使用自己手动下拉的镜像
- if-not-present： 当使用这个策略，Runner 会先检测本地是否有镜像，有的话使用该镜像，如果没有再去下拉。这个策略如果再配合定期删除镜像，就能达到比较好的效果。
- always： 这个是 gitlab-ci 默认使用的策略，即每一次都是重新下拉镜像，导致的结果就是比较耗时间

### artifacts

artifacts 被用于在 job 作业成功后将制定列表里的文件或文件夹附加到 job 上，传递给下一个 job ，如果要在两个 job 之间传递 artifacts，你必须设置 dependencies,下面有几个例子

```yml
artifacts:
  name: "$CI_JOB_NAME" # artifacts压缩包重命名
  untracked: true # 传递所有git没有追踪的文件
  when: on_failure # 当job执行失败时，上传artifacts,还有on_success 这个值是默认的，当job成功时上传artifacts。always 不管失败与否，都上传
  artifacts: expire_in # 设置 artifacts 上传包的失效时间. 如果不设置，artifacts 的打包是永远存在于 gitlab上 的，'3 mins 4 sec','2 hrs 20 min','2h20min','6 mos 1 day','47 yrs 6 mos and 4d','3 weeks and 2 days'
  paths:
    - binaries/ #传递所有binaries和.config：
    - .config
```

## 参考

[Gitlab-CI 使用教程](https://juejin.cn/post/6844904045581172744#heading-11)

[Gitlab-ci-官方文档](https://docs.gitlab.com/ee/ci/README.html)
