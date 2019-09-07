;`
# 接口

接口能让代码更加稳定，在编译期检查一些低级错误

例如我们要实现一个多语言时间转换字符串
`

enum Unit {Second, Minute}
interface Time {
    value: number
    unit: Unit
}
// i18n 是 internationalization 国际化的缩写
function i18nTime(time: Time) :string {
    switch (time.unit) {
        case Unit.Second:
            return time.value.toString() + "s"
            break
        case Unit.Minute:
            return time.value.toString() + "m"
            break
    }
}

// 定义变量
let time :Time = {
    value: 3,
    unit: Unit.Second,
}
console.log("-------------- i18nTime ----------")
let view = i18nTime(time)
console.log(view)
// 3s

// 直接传入符合 Time 类型的 object
console.log(i18nTime({
    value: 6,
    unit: Unit.Minute,
}))
// 6m


;`
定义 Time 接口，time.unit 定义为枚举类型 Unit 。 
time.value 定义为 number 类型。
Time作为 i18nTime 的函数参数。

interface 约束了参数的属性类型，如果类型错误，在编译器就能发现错误，并且开发人员通过查看 interface 即可知道接口参数的详细情况。不需要编写啰嗦的 jsdoc。
  
    function i18nTime(time: Time) :string {

中 :string 表示函数返回值是字符串


## 一个都不能少

例如接口定义了 name 和 age 属性
   
`


interface User {
    name: string
    age: number
}

;`
如果声明变量时没有带上 age 则会报错 Property 'age' is missing in type '{ name: string; }' but required in type 'User'.

    let user: User = {
        name: "nimo"
    }

如果暂时 age 没有明确的值可以定义为 0
`

let user: User = {
    name: "nimo",
    age: 0
}
console.log("-------------- user ----------")
console.log(user)

;`
在 typescript 中可以遵循"属性零值" 来使用接口，这是个非常棒的设计，因为绝大部分的 js 错误都是因为变量属性没有定义导致报错。

变量在定义时没有明确的初始化时可以赋值为零值。

零值是：

number类型为 0，
boolean类型为 false，
string为 ""（空字符串）。

> golang zero values 语言特性

我们可以借鉴 golang 的零值设计，放心安全的使用对象。

不要嫌麻烦，不要带入以前编写 js 代码时放飞自我快猛糙的思想编写 ts。时间会让你明白"啰嗦"是好事

## 该少还是可以少的

有些场景下我们不需要某些属性，例如根据 user 返回一个欢迎消息

`

interface NewUser {
    name: string
    age?: number
}


function getWecomeNewUserMessage(user: NewUser) {
    let ageMessage = user.age === undefined? "": user.age.toString()
    console.log("wecome " + user.name + ageMessage)
}
console.log("------------ wecome new user --------------")
getWecomeNewUserMessage({
    name: "nimo",
})
// wecome nimo

getWecomeNewUserMessage({
    name: "nico",
    age: 18,
})
// wecome nico(18)

;`
 使用 ? 配置可选属性时切记要判断属性是否是 undefined ，虽然不判断编译也不会通过
 
    function some(user: NewUser) :string {
        return "wecome " + user.name + user.age.toString()
        // 编译报错 ：Object is possibly 'undefined'.
        // return "wecome " + user.name + user.age.toString()
        //                                ~~~~~~~~
    }

请将可选属性当做药品使用，在必要时才使用可选属性，这样能提高代码稳定性。

`

// @todo 增加一个不应该用可选属性的示例  Fail FailCode FailMsg