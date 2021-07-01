# Bash入门

## shellScript

login shell

- 通过完整登录流程是运行的shell
  - 读取etc/profile文件
  - 读取etc/profile.d/.sh脚本（PATH/USER/HOSTNAME/HISTSIZE等）
  - 读取/etc/profile.d/*.sh(颜色、语言、指令别名)
  - ~/.bash_profile（用户个性化配置，常用软件的path）、~/bash_login、~/.profile【只依次读取其中一个】
  - ~/.bash_rc、/etc/bashrc
  - 使用source指令重新加载

non-login shell

- 不需要登录即可运行的shell，如su，和原bash下的新bash动作
  - ~/.bash_rc、/etc/bashrc
  - 读取/etc/profile.d/*.sh(颜色、语言、指令别名)
  - ~/.bash_logout （退出登录时运行、执行备份、缓存、临时文件清理的任务）

### Shebang

- 脚本的第一行通常是指定解释器，即这个脚本必须通过什么解释器执行。这一行以#!字符开头，这个字符称为 Shebang，所以这一行就叫做 Shebang 行。

- `#!`后面就是脚本解释器的位置，Bash 脚本的解释器一般是/bin/sh或/bin/bash。

```sh
#!/bin/sh
# 或者
#!/bin/bash 
```

有 Shebang 行的时候，可以直接调用执行。
`./script.sh`
如果没有 Shebang 行，就只能手动将脚本传给解释器来执行
`bash ./script.sh` 或者`/bin/sh ./script.sh`



### source命令

1. 执行一个脚本，通常用于重新加载一个配置文件.source .bashrc 
2. 在脚本内部加载外部库。`source ./lib.sh`

### 权限

chmod

- 脚本需要有执行权限才能执行

- 访问权限分为文件和目录

- 文件或目录的访问权限分为只读（r），可写（w）和可执行（x）三种：以文件为例，文件被创建时，文件所有者自动拥有对该文件的读、写和可执行权限

- 有三种不同类型的用户可对文件或目录进行访问：文件所有者，同一用户组用户和其他用户。所有者一般是文件的创建者。

- 权限参数 mode 主要针对 Linux 和 Unix 操作系统，Window 的权限默认是可读、可写、不可执行，所以权限位数字表示为 0o666，转换十进制表示为 438。

![搜狗截图20151223035154.png](https://fishc.com.cn/forum.php?mod=image&aid=41231&size=400x300&key=51bb87ad6e2579a8&type=1)![img](https://user-gold-cdn.xitu.io/2019/7/29/16c3e70d6486d6fd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


```sh
# 给所有用户执行权限
$ chmod +x script.sh

# 给所有用户读权限和执行权限
$ chmod +rx script.sh
# 或者
$ chmod 755 script.sh # 常用755权限

# 只给脚本拥有者读权限和执行权限
$ chmod u+rx script.sh
```



sh执行脚本命令没有权限也能正常执行

- sh+脚本名称，可以不必事先设定shell的执行权限。因为这个是将test.sh作为参数传给sh(bash)命令来执行的。这时不是test.sh自己来执行，而是被人家调用执行，所以不要执行权限。
- 如果直接运行./test.sh，就会报权限问题

### echo输出

- echo -n 取消行尾的换行
- echo -e 解释特殊字符

```sh
# 加上斜杠/会将下一行跟当前行放在一起解释。
echo foo \
bar 
# 等同于 echo foo bar
```

## 变量

Bash 没有数据类型的概念，所有的变量值都是字符串

| 命令                                   | 解释                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| variable=value                         | 变量声明                                                     |
| ${!string*}或${!string@}               | 返回所有匹配给定字符串string的变量名。                       |
| a=z                                    | 变量 a 赋值为字符串 z                                        |
| c="a string and $b"                    | 引用其他变量的值                                             |
| e=$(ls -l foo.txt) 或者`ls -l foo.txt` | 是命令的执行结果，$(...)可以嵌套，比如$(ls $(pwd))。         |
|                                        | 反斜杠可以出书                                               |
| f=$((5 * 7))                           | 是数学运算的结果                                             |
| $foo                                   | 读取变量foo                                                  |
| ${foo}                                 | 也表示变量，可以用于变量名与其他字符连用的情况               |
| unset foo或foo=''或foo=                | 删除一个变量                                                 |
| export                                 | 列出环境变量                                                 |
| $?                                     | 上一个命令的退出码，用来判断上一个命令是否执行成功。返回值是0，表示上一个命令执行成功；如果是非零，上一个命令执行失败 |
| $$                                     | 当前 Shell 的进程 ID，可以用来命名临时文件                   |
| $_                                     | 上一个命令的最后一个参数                                     |
| $!                                     | 最近一个后台执行的异步命令的进程 ID                          |
| $0                                     | 当前 Shell 的名称（在命令行直接执行时）或者脚本名（在脚本中执行时） |
| $-                                     | 当前 Shell 的启动参数。                                      |
| $@和$#                                 | 脚本的参数数量                                               |
| ${varname:-word}                       | 如果变量varname存在且不为空，则返回它的值，否则返回word      |
| ${varname:=word}                       | 如果变量varname存在且不为空，则返回它的值，否则将它设为word，并且返回word |
| ${varname:+word}                       | 如果变量名存在且不为空，则返回word，否则返回空值.测试变量是否存在 |
| ${varname:?message}                    | 如果变量varname存在且不为空，则返回它的值，否则打印出varname: message，并中断脚本的执行。如果省略了message，则输出默认的信息“parameter null or not set.”。它的目的是防止变量未定义 |

## 环境变量

### export/set/env/declare 的区别

- env：显示当前**用户**的**环境变量**/usr/bin/env，但不会显示其**自定义变量**。
- export：功能同 env 一样，也是显示当前用户的环境变量，只不过该命令的输出是按**变量名进行排序**的。
- declare：显示当前 Shell 中定义的所有变量，包括用户的**环境变量和自定义变量**，该命令的输出按变量名进行排序。
- set：功能同 declare 一样，显示当前 Shell 中定义的所有变量，包括用户的环境变量和自定义变量。

根据上面的说明，我们可以得出下面的结论：

- env 和 export 显示的是环境变量。
- set 和 declare 显示的是环境变量和自定义变量。

要查看全局变量，可以使用env或printenv命令

命令env、printenv和set之间的差异很细微。set命令会显示出全局变量、局部变量以 及用户定义变量。它还会按照字母顺序对结果进行排序。env和printenv命令同set命 令的区别在于前两个命令不会对变量排序，也不会输出局部变量和用户定义变量。在这 种情况下，env和printenv的输出是重复的。不过env命令有一个printenv没有的功能， 这使得它要更有用一些。 

局部环境变量用的是小写字母
系统环境变量都是大写字母。 

| header 1      | header 2               |
| ------------- | ---------------------- |
| printenv HOME | 显示个别环境变量的值， |
| echo $HOME    | 引用某个环境变量的     |




## declare

declare命令可以声明一些特殊类型的变量，为变量设置一些限制，比如声明只读类型的变量和整数类型的变量。

declare命令输出当前环境的所有变量，包括函数在内，等同于不带有任何参数的set命令

## [目录](https://wangdoc.com/bash/stack.html)

| 命令          | 解释                                                         |
| ------------- | ------------------------------------------------------------ |
| cd -          | 返回前一次的目录                                             |
| pushd dirname | 进入目录dirname，并将该目录放入堆栈                          |
| popd          | 会移除堆栈的顶部记录，并进入新的堆栈顶部目录                 |
| popd -n       | 仅删除堆栈顶部的记录，不改变目录，执行完成后还停留在当前目录 |
| pushd +3      | 从栈顶算起的3号目录（从0开始），移动到栈顶                   |
| dirs          | 显示目录堆栈的内容                                           |

## 扩展

| 命令   | 目录                                 |
| ------ | ------------------------------------ |
| \~     | /home/me，自动扩展成当前用户的主目录 |
| \~foo  | /home/foo                            |
| \~root | /root                                |

### 匹配

| 字符               | 匹配                                                         |
| ------------------ | ------------------------------------------------------------ |
| `\*`                 | 任意数量的任意字符,只匹配当前目录，不会匹配子目录。例如子目录有一个 a.txt用`\*/\*.txt`表示。 |
| ?                  | 任意单个字符。例如ls ??.txt表示匹配当前目录下的ab.txt        |
| globstar参数：`\*\*` | 零个或多个子目录,`\*\*/\*.txt`表示匹配当前和所有子目录下的txt文件 |


## 转义

Bash 只有一种数据类型，就是字符串。不管用户输入什么数据，Bash 都视为字符串。因此，字符串相关的引号和转义，对 Bash 来说就非常重要


- 单引号：
  - 用于保留字符的字面含义，各种特殊字符在单引号里面，都会变为普通字符，比如星号（*）、美元符号（$）、反斜杠（\）等。
- 双引号
  - 里面不会进行文件名扩展.三个特殊字符除外：美元符号（$）、反引号（`）和反斜杠（\）。这三个字符在双引号之中，依然有特殊含义，会被 Bash 自动扩展。换行符在双引号之中就失去了这种特殊作用，只用来换行，所以可以输入多行。echo命令会将换行符原样输出，显示的时候正常解释为换行。

## Here 字符串（Here string）

使用三个小于号（`<<<`）表示 Here 字符串。

`<<< string`
它的作用是将`string通过标准输入，传递给命令`。

有些命令直接接受给定的参数，与通过标准输入接受参数，结果是不一样的。所以才有了这个语法，使得将字符串通过标准输入传递给命令更方便，比如cat命令只接受标准输入传入的字符串。

```sh
$ cat <<< 'hi there'
# 等同于
$ echo 'hi there' | cat
```

### 环境变量

- set命令可以显示所有变量（包括环境变量和自定义变量），以及所有的 Bash 函数。
- env命令或printenv命令，可以显示所有环境变量。

```sh
$ printenv PATH
# 或者
$ echo $PATH
注意，printenv命令后面的变量名，不用加前缀$。
```

## 字符串操作

| 命令                                                         | 用法                        |
| ------------------------------------------------------------ | --------------------------- |
| 获取字符串长度                                               | ${#varname}                 |
| 脚本的参数个数                                               | $#                          |
| 字符串提取子串：返回变量$varname的子字符串，从位置offset开始（从0开始计算），长度为length | ${varname:offset:length}    |
| 如果 pattern 匹配变量 variable 的`开头`， 删除`最短`匹配（非贪婪匹配）的部分，返回剩余部分 | ${variable#pattern}         |
| 如果 pattern 匹配变量 variable 的开头，删除`最长`匹配（贪婪匹配）的部分，返回剩余部分 | ${variable##pattern}        |
| 将头部匹配的部分，替换成其他内容replace                      | ${variable/#pattern/string} |
| 如果 pattern 匹配变量 variable 的结尾,删除最短匹配（非贪婪匹配）的部分，返回剩余部分 | ${variable%pattern}         |
| 如果 pattern 匹配变量 variable 的结尾， 删除最长匹配（贪婪匹配）的部分，返回剩余部分 | ${variable%%pattern}        |
| 将尾部匹配的部分，替换成其他内容                             | ${variable/%pattern/string} |
| 如果 pattern 匹配变量 variable 的一部分，最长匹配（贪婪匹配）的那部分被 string 替换，但仅替换第一个匹配 | ${variable/pattern/string}  |
| 如果 pattern 匹配变量 variable 的一部分，最长匹配（贪婪匹配）的那部分被 string 替换，所有匹配都替换 | ${variable//pattern/string} |
| 变量转为大写                                                 | ${varname^^}                |
| 变量转为小写                                                 | ${varname,,}                |

记忆总结：

1. `\#` 是头部匹配
2. % 是尾部匹配
3. 单个%或#是非贪婪匹配，两个是贪婪匹配
4. 没有指定都是直接删除匹配部分


## 条件判断

```sh
if commands; then
commands
[elif commands; then
commands...]
[else
commands]
fi
```

### test命令

```sh
# 写法一
test expression

# 写法二，[]必须有空格
[ expression ]

# 写法三，[]必须有空格，还支持正则
[[ expression ]]
```

```sh
[ -a file ]：如果 file 存在，则为true。
[ -b file ]：如果 file 存在并且是一个块（设备）文件，则为true。
[ -c file ]：如果 file 存在并且是一个字符（设备）文件，则为true。
[ -d file ]：如果 file 存在并且是一个目录，则为true。
[ -e file ]：如果 file 存在，则为true。
[ -f file ]：如果 file 存在并且是一个普通文件，则为true。
[ -g file ]：如果 file 存在并且设置了组 ID，则为true。
[ -G file ]：如果 file 存在并且属于有效的组 ID，则为true。
[ -h file ]：如果 file 存在并且是符号链接，则为true。
[ -k file ]：如果 file 存在并且设置了它的“sticky bit”，则为true。
[ -L file ]：如果 file 存在并且是一个符号链接，则为true。
[ -N file ]：如果 file 存在并且自上次读取后已被修改，则为true。
[ -O file ]：如果 file 存在并且属于有效的用户 ID，则为true。
[ -p file ]：如果 file 存在并且是一个命名管道，则为true。
[ -r file ]：如果 file 存在并且可读（当前用户有可读权限），则为true。
[ -s file ]：如果 file 存在且其长度大于零，则为true。
[ -S file ]：如果 file 存在且是一个网络 socket，则为true。
```

### string

- [ string ]：如果string不为空（长度大于0），则判断为真。
- [ -n string ]：如果字符串string的长度大于零，则判断为真。
- [ -z string ]：如果字符串string的长度为零，则判断为真。
- [ string1 = string2 ]：如果string1和string2相同，则判断为真。
- [ string1 == string2 ] 等同于[ string1 = string2 ]。
- [ string1 != string2 ]：如果string1和string2不相同，则判断为真。
- [ string1 '>' string2 ]：如果按照字典顺序string1排列在string2之后，则判断为真。
- [ string1 '<' string2 ]：如果按照字典顺序string1排列在string2之前，则判断为真。

### number

- [ integer1 -eq integer2 ]：如果integer1等于integer2，则为true。
- [ integer1 -ne integer2 ]：如果integer1不等于integer2，则为true。
- [ integer1 -le integer2 ]：如果integer1小于或等于integer2，则为true。
- [ integer1 -lt integer2 ]：如果integer1小于integer2，则为true。
- [ integer1 -ge integer2 ]：如果integer1大于或等于integer2，则为true。
- [ integer1 -gt integer2 ]：如果integer1大于integer2，则为true。

### 正则判断

[[ string1 =~ regex ]]

### 逻辑判断

- AND运算：&&，或者 -a
- OR运算：||，或者-o
- NOT运算：!

### 算术判断

```sh
if ((3 > 2)); then
echo "true"
fi
```

## 循环

### while 循环

```
while condition; do
commands
done
```

### util循环

```
until condition; do
commands
done
```

### for...in 循环

```
for i in *.png; do
ls -l $i
done


for (( i=0; i<5; i=i+1 )); do
echo $i
done
```

## 函数


```sh
#创建函数

# 第一种
fn() {
# codes
}
# 第二种
function fn() {
# codes
}

# 函数调用
fn $1 $2
# 表示fn调用并传参$1和$2

# 使用函数输出
result='func1'或者result=$(func1)  
```

删除一个函数，可以使用unset命令。`unset -f functionName`

## 函数变量

| 变量         | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| $1~$9，${10} | 函数的第一个到第9个的参数。第10个参数                        |
| $0           | 函数所在的脚本名。                                           |
| $#           | 函数的参数总数。                                             |
| $@           | 函数的全部参数，参数之间使用空格分隔。                       |
| $*           | 函数的全部参数，参数之间使用变量$IFS值的第一个字符分隔，默认为空格，但是可以自定义。 |


local foo 说明是函数内的局部变量，否则是属于全局变量

## 数组

## 新建数组

```sh
ARRAY=(value1 value2 ... valueN)

# 等同于

ARRAY=(
value1
value2
value3
)


$ mp3s=( *.mp3 ) // 将当前目录的所有 MP3 文件，放进一个数组
```

### 数组操作

```sh
# 读取数组某个位置上元素，不指定默认输出第一个元素
${array[i]}
# 循环数组元素
for i in "${names[@]}"; do
echo $i
done
# 赋值数组
hobbies=( "${activities[@]}" )
# 获取数组的长度
${#array[*]}
${#array[@]}
# 提取数组成员
${array[@]:position:length}
# push成员
foo+=(d e f)
# 删除成员
unset foo[2]
```

## 重定向

[Linux Shell重定向（输入输出重定向）精讲](http://c.biancheng.net/view/942.html)

| 命令         | 示例                    | 解释                                                         |
| ------------ | ----------------------- | ------------------------------------------------------------ |
| echo > file  | echo 123 > a.txt        | 输出重定向到a.txt文件                                        |
| echo >> file | echo 123 >> a.txt       | 追加123到a.txt文件                                           |
| &>           | ./a.sh &> a.txt         | 正常重定向不会输出错误，错误会在控制台上出现，而`&>` 符号将所有的输出都会发送到同一个位置，包括错误输出 |
| dev/null     | ls -al > /dev/null      |                                                              |
| 2>           | ls -al badfile 2> test4 | 只重定向错误消息                                             |
| \|           | echo 'yes' \|           | 表示管道，上一条命令的输出，作为下一条命令参数，如 echo 'yes' |

## 后台作业

./a.sh & 加上一个&号即可让脚本在后台作业二控制台可以继续输入

## sed编辑器

| 命令                                            | 解释                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| echo "This is a test" \| sed 's/test/big test/' | s命令会用斜线间指定的第二个文本字符串来替换第 一个文本字符串模式。在本例中是big test替换了test |
| sed 's/dog/cat/' data1.txt                      | 将data1.txt文件中的dog变成cat                                |
| sed -e 's/brown/green/; s/dog/cat/' data1.txt   | ；分隔多个sed命令                                            |

```
s/pattern/replacement/flags 有4种可用的替换标记： 
数字，表明新文本将替换第几处模式匹配的地方；  
g，表明新文本将会替换所有匹配的文本；  
p，表明原先行的内容要打印出来； 
w file，将替换的结果写到文件中。
```

### grep

| 命令                         | 解释                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| grep linux ./ -rn            | 在当前文件夹下查找包含linux的行                              |
| grep match_pattern file_name | 在文件中搜索一个单词，命令会返回一个包含**“match_pattern”**的文本行： |
|                              |                                                              |

参考

- [快速入门大厂后端面试必备的 Shell 编程](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247484810&idx=1&sn=0b622ae617b863ef1cc3a32c17b8b755&chksm=cea24a41f9d5c357199073c1e4692b7da7dcbd1809cf634a6cfec8c64c12250efc5274992f06&token=1082669959&lang=zh_CN#rd)
