# [typescript](https://juejin.im/post/5d0259f2518825405d15ae62#heading-17)

## ts 使用

> npm install -g typescript
>
> tsc test.ts

对 .ts 文件进行编译，编译成功后可以看到在同级目录下生成了一个 test.js 文件。

### 基本类型

```js
let flag:boolean=true;
let num:number=123;
let str:string="哈哈";
let arr:number[]=[11,22];
let arr:Array<number,string>
//readonly vs const
//最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
let ro: ReadonlyArray<number> = a;

// 联合类型
var val:string|number
val = 12
console.log("数字为 "+ val)
val = "Runoob"
console.log("字符串为 " + val)
//元组tuple，数组的一种,数组中每一个值弄个类型
let arr:[number,string]=[123,'this']
let arr:any[]=[12,'sdf',null]
//枚举，用自然语言string来表示一个数值，且能够在指定了数值后往后递增
enum flag={
    success=1,
    error=2,
    emmm
}
let s:flag=flag.error//2
let s:flag=flag.emmm//3
//任意类型
let num:any={num:1}
//可以是number也可以是undefined
let num:number|undefined|null
function func():void{
    console.log("sdf")
}
// as断言
let strLength: number = (<string> someValue).length;
let strLength: number = (someValue as string).length;
//undefined或null
let a:never;
function getInfo(name:string,age:nnumber):string(
    return 'name'
)
//age参数可传可不传，可选参数必须放到最后面，默认参数同es6
var getInfo=function(nae:string,age?:number=30,...res:number[]) ):string{
    return 'asdf'
}
```

## 封装

数据只能通过公共方法访问，从而使私有字段及其实现对外部类隐藏

- public: 公有 在类里面，子类，类外面都可访问，默认属性
- protected: 保护类型，在类里面，子类可访问,外部不可
- private：私有，在类里面可以访问，子类，类外都不能访问

## 继承

Java 继承，一个类获取另一个类的属性（数据成员）和功能（方法）的过程称为继承。

- 派生类继承声明为 public 或 protected 的所有成员和方法。
- 私有成员只能在自己的类中访问。只能使用公共或受保护的超类获取器和设置器方法访问此类私有成员

## 多态

多态分为静态多态和动态多态

1. `静态多态`又称编译时多态，例如 Java 中的`方法重载` ，是指同一个方法名，不同参数，根据参数决定不同方法。
   - 参数列表中的参数数量不同
   - 参数的数据类型的差异
   - 参数的数据类型顺序
2. `动态多态`又称运行时多态，例如 Java 中的`方法覆盖`。声明子类中已经存在于父类中的方法称为方法覆盖

Java 实现多态有三个必要条件：继承、重写、向上转型。

- 继承：在多态中必须存在有继承关系的子类和父类。
- 重写：子类对父类中某些方法进行重新定义，在调用这些方法时就会调用子类的方法。
- 向上转型：在多态中需要将子类的引用赋给父类对象，只有这样该引用才能够具备技能调用父类的方法和子类的方法。

## 抽象类

- 使用 abstract 关键字声明的类称为抽象类。
- 它可以有抽象方法（没有主体的方法）以及具体方法（常规方法与主体）。普通类（非抽象类）不能有抽象方法。
- 抽象类不能实例化，不能创建它的对象
- 抽象类概述了方法，但未必实现所有方法
- 抽象类一次只能扩展一个类或一个抽象类
- 接口只能有抽象方法，它们不能有具体方法

## 接口-interface

- 类 implements 接口,接口 extends 另一个接口
- 所有接口方法默认为 abstract 和 public
- 接口中声明的变量默认为 public，static 和 final
- 接口变量必须在声明时初始化，否则编译器将抛出错误
- 类可以实现任何数量的接口
- 在 java 中，不允许多重继承 ，但是您可以使用接口来使用它，因为您可以实现多个接口。

## 基于类的继承和基于原型的继承的区别

| 基于类的继承                                                | 原型继承                                                     |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| 类是不可变的。在运行时，你无法修改或者添加新的方法          | 原型是灵活的。它们可以是不可变的也可以是可变的               |
| 类可能会不支持多重继承                                      | 对象可以继承多个原型对象                                     |
| 基于类的继承比较复杂。你需要使用抽象类，接口和 final 类等等 | 原型继承比较简洁。你只有对象，你只需要对对象进行扩展就可以了 |

```js
// 方法重载
function filterPersons(
    persons: Person[],
    personType: "admin",
    criteria: Partial<Person>,
): Admin[]
function filterPersons(
    persons: Person[],
    personType: "user",
    criteria: Partial<Person>,
): User[]
function filterPersons(
    persons: Person[],
    personType: string,
    criteria: Partial<Person>,
){
    return persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
            return criteriaKeys.every((fieldName) => {
                return person[fieldName] === criteria[fieldName];
            });
        });
}

let usersOfAge23: User[] = filterPersons(persons, 'user', { age: 23 });
let adminsOfAge23: Admin[] = filterPersons(persons, 'admin', { age: 23 });

// 类型保护
function isAdmin(person: Person): person is Admin {
    return person.hasOwnProperty('role');
}

```

```js
class Web extends Persron{
    constructor(name:string){
        super(name)
    }
    run():string{
        return 'string'
    }
    public:公有  在类里面，子类，类外面都可访问，默认属性
    protected:保护类型，在类里面，子类可访问,外部不可
    private：私有，在类里面可以访问，子类，类外都不能访问
}
let a=new Web()
a.name//访问不到
```

```js
//继承了抽象类的class必须有这些抽象方法
abstract class Animal{
    abstract eat():any;//抽象方法和抽象类，抽象方法必须在抽象类里面，抽象类必须有抽象方法
}
class Cat extends animal{
    eat(){
    }
}

// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

```js
//interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说interface可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

type 可以声明基本类型别名，联合类型，元组等类型
//type extends type
type Name = {
  name: string;
}
type User = Name & { age: number  };

//type extends interface
interface Name {
  name: string;
}
type User = Name & {
  age: number;
}


//方法接口
interface ConfigFn{
    (value1:string,value2:string):string
}
var setData:Config=function(){

}
//泛型接口
interface configFn{
    <T>(value:T):T;
}
var getData:config=function<T>(value:T):T{
}

var myGetData:ConfigFn<string>=getdata；

getData<string>(value)
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);

interface SearchFunc {
  (source: string, subString: string): boolean;
}
//可索引接口：对数组，对象的约束
interface:UserArr{
    [index:number]:string
}
var arr:UserAr['111','12']
//类类型接口
interface:Animal{
    name:string;
    eat(str:string):void
}
// implements限制当前类的结构，Dog类必须满足animal接口,限制结构
class Dog implents Animal{
    name:string;
    constructor(){}
    eat(){}
}

//通过extends实现接口扩展，继承
interface Animal{
    eat():void;
}
interface Person extends Animal{
    work():void
}
class web implents Person{
    public name:string;
    constructor(name:string){}
}

//泛型
//any放弃了类型检查，我们要实现，传入什么返回什么，

function getData<T>(value:T):T{
    return value
}
getData<number>(123)
getData<string>('123')
class MinClass<T>{
    public list:T[]=[];
    public list:T[]=[];
    add(num:T):T{
        this.list.push(num)
    }
}
```

接口继承类

- 接口继承了一个类类型时，会继承类的成员但不包括其实现。 接口同样会继承到类的 private 和 protected 成员。
- 当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

继承类

- 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this 的属性之前，我们一定要调用 super()。 这个是 TypeScript 强制执行的一条重要规则。

## 声明文件

- 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件。例如 jquery 的声明文件
  > // src/jQuery.d.ts
  >
  > declare var jQuery: (selector: string) => any;
- 一般来说，ts 会解析项目中所有的 _.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 _.ts 文件就都可以获得 jQuery 的类型定义了。
- 我们可以直接下载下来使用，但是更推荐的是使用 @types 统一管理第三方库的声明文件。
- @types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：
  > npm install @types/jquery --save-dev

## 命名空间

```js
namespace Food {
    export type A = Window;
    export interface Fruits{
        taste: string;
        hardness: number;
    }

    export interface Meat{
        taste: string;
        heat: number;
    }
}
// 使用
let meat: Food.Meat;
let fruits: Food.Fruits;
```

### interface 和 type(类型别名)

interface 和 type 很像，很多场景，两者都能使用。但也有细微的差别：

- 类型：对象、函数两者都适用，但是 type 可以用于基础类型、联合类型、元祖。
- 同名合并：interface 支持，type 不支持。
- 计算属性：type 支持, interface 不支持。
  总的来说，公共的用 interface 实现，不能用 interface 实现的再用 type 实现。

### 映射

```js
/*
type计算属性，生成映射类型
type 能使用 in 关键字生成映射类型，但 interface 不行。

语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分：

类型变量 K，它会依次绑定到每个属性。
字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
属性的结果类型。
*/
type Keys = "firstname" | "surname"

type DudeType = {
  [key in Keys]: string
}

const test: DudeType = {
  firstname: "Pawel",
  surname: "Grzybek"
}

// 将传入的属性变为只读选项
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
// 将传入的属性变为可选项：keyof T 拿到 T 所有属性名, 然后 in 进行遍历, 将值赋给 P, 最后 T[P] 取得相应属性的值.
type Partial<T> = {
    [P in keyof T]?: T[P];
}
//TypeScript内置了Readonly和Partial，所以不需要手动声明实现。除此之外，还有其他常用的内置类型如：
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;

//Record
//将K中的所有属性的值转化为T类型：
// type Criteria = {
//     [K in keyof User]?: User[K]
// }
type Record<K extends keyof any, T> = { [P in K]: T };
//Pick
从 T 中取出 一系列 K 的属性
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
//Required
将传入的属性变为必选项
type Required<T> = { [P in keyof T]-?: T[P] };

```

### 练习

- 涉及泛型 as const

```js
interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
}

function logUser(user: User) {
    const pos = users.indexOf(user) + 1;
    console.log(` - #${pos} User: ${chalk.green(user.name)}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin) {
    const pos = admins.indexOf(admin) + 1;
    console.log(` - #${pos} Admin: ${chalk.green(admin.name)}, ${admin.age}, ${admin.role}`);
}

const admins: Admin[] = [
    {
        type: 'admin',
        name: 'Will Bruces',
        age: 30,
        role: 'Overseer'
    },
    {
        type: 'admin',
        name: 'Steve',
        age: 40,
        role: 'Steve'
    }
];

const users: User[] = [
    {
        type: 'user',
        name: 'Moses',
        age: 70,
        occupation: 'Desert guide'
    },
    {
        type: 'user',
        name: 'Superman',
        age: 28,
        occupation: 'Ordinary person'
    }
];

function swap<T,K>(v1:T, v2:K) {
    return [v2, v1] as const;
}

function test1() {
    console.log(chalk.yellow('test1:'));
    const [secondUser, firstAdmin] = swap(admins[0], users[1]);
    logUser(secondUser);
    logAdmin(firstAdmin);
}
```

## Null 和 Undefined

在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

```js
let u: undefined = undefined;
let n: null = null;
与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;
而 void 类型的变量不能赋值给 number 类型的变量：

let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```

```js
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
事实上，它等价于：

let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

- (初始化即赋值-> 根据初始化的值类型推论)
- (初始化无赋值-> 定义为 any 类型)

## 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

```js
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
上例中，length 不是 string 和 number 的共有属性，所以会报错。

访问 string 和 number 的共有属性是没问题的：

function getString(something: string | number): string {
    return something.toString();
}
联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
上例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。

而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。
```
