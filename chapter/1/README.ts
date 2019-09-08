console.log("接口")
;`
# 接口

接口能让代码更加稳定，在编译期检查一些低级错误

例如我们要实现一个时间转换字符串
`
type Unit = 'second' | 'minute'
interface Time {
    value: number
    unit: Unit
}
function FormatTime(time: Time) :string {
    switch (time.unit) {
        case "second":
            return time.value.toString() + "s"
            break
        case "minute":
            return time.value.toString() + "m"
            break
    }
}

// 定义变量
let time :Time = {
    value: 3,
    unit: "second",
}
console.log("-------------- i18nTime ----------")
let view = FormatTime(time)
console.log(view)
// 3s

// 直接传入符合 Time 类型的 object
console.log(FormatTime({
    value: 6,
    unit: "minute",
}))
// 6m


;`
定义 Time 接口，time.unit 定义为只可以为字符串  'second' 和 'minute'。 
time.value 定义为 number 类型。
Time作为 formatTime 的函数参数。

interface 约束了参数的属性类型，如果类型错误，在编译器就能发现错误，并且开发人员通过查看 interface 即可知道接口参数的详细情况。不需要编写啰嗦的 jsdoc。
  
    function formatTime(time: Time) :string {

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
console.log("-------------- 一个都不能少 ----------")
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


function getWelcomeNewUserMessage(user: NewUser) {
    let ageMessage = user.age === undefined? "": user.age.toString()
    console.log("welcome " + user.name + ageMessage)
}
console.log("------------ 该少还是可以少的 --------------")
getWelcomeNewUserMessage({
    name: "nimo",
})
// welcome nimo

getWelcomeNewUserMessage({
    name: "nico",
    age: 18,
})
// welcome nico(18)

;`
 使用 ? 配置可选属性时切记要判断属性是否是 undefined ，虽然不判断编译也不会通过
 
    function some(user: NewUser) :string {
        return "welcome " + user.name + user.age.toString()
        // 编译报错 ：Object is possibly 'undefined'.
        // return "welcome " + user.name + user.age.toString()
        //                                ~~~~~~~~
    }

请将可选属性当做药品使用，在必要时才使用可选属性，这样能提高代码稳定性。

## 函数接口设计

> 本小节包含作者主观色彩

实现一个返回包含错误消息或错误代码结构的接口

`
console.log('---------- 函数接口设计 ------------')
interface ResponseData {
    type: string
    data: any
    msg: string
    code: string
}
function interfaceDesign () {
    let titleAlreadyExists: ResponseData = {
        type: "fail",
        data:{},
        msg: "标题已存在",
        code: "",
    }
    console.log(titleAlreadyExists)
    let titleAlreadyExistsWithCode: ResponseData = {
        type: "fail",
        data:{},
        msg: "标题已存在",
        code: "titleAleardyExists",
    }
    console.log(titleAlreadyExistsWithCode)
}
interfaceDesign()

;`
每次声明的 ResponseData 中的 

    type: "fail",
    data:{},
    
都是一样的，那么可以进行封装。下面做一个不好的的封装演示:
`
console.log('======== fail ===========')
function fail(msg: string, code?: string) :ResponseData {
    return {
        type: "fail",
        data:{},
        msg: msg,
        code: code===undefined?"":code,
    }
}

console.log(fail("标题已存在"))
console.log(fail("标题已存在", "titleAleardyExists"))


;`
函数应该减少参数默认值的设计，因为代码应该是没有任何隐喻的。应该实现如下接口
`

function failMsg(msg: string) :ResponseData {
    return {
        type: "fail",
        data:{},
        msg: msg,
        code: "",
    }
}
interface CodeItem {
    code: string
    msg: string
}
interface CodeDict {
    titleAleardyExists: CodeItem
}

const Code: CodeDict = {
    titleAleardyExists: {code:"titleAleardyExists", msg:"标题已存在"},
}

function failCode(code: CodeItem) :ResponseData {
    return {
        type: "fail",
        data:{},
        msg: code.msg,
        code: code.code,
    }
}
console.log('=========== failMsg =========')
console.log(failMsg("标题已存在"))
console.log('=========== fail code =========')
console.log(failCode(Code.titleAleardyExists))

;`

如果只有 msg 没有 code，则使用 failMsg 。如果存在code，那么比如有msg，则使用 failCode 和 Code，这样既不会写错 code 和 msg 也可以统一管理错误代码。
 
> 利用静态类型的特性尽量让代码在编译期就检查出一些低级错误

## 任意属性
`
console.log('========= map =========')
interface nameCountMap {
    [name: string]: number
}

var nameCount: nameCountMap = {}
function check(name: string) {
    if (nameCount[name]) {
        nameCount[name]++
    } else {
        nameCount[name] = 1
    }
}

check("nimo")
check("nimo")
check("og")
console.log(nameCount)
// { nimo: 2, og: 1 }


;`
可以用任意属性实现一个姓名的计数结构。

> 任意属性应该只在完全不可预知key value 的情况下使用。否则应该明确定义key value 的名称和类型
`