;`
# 接口

接口能让代码更加稳定，在编译期检查一些低级错误

例如我们要实现一个时间转换字符串
`

test("js 版实现", function () {
    /*
    * 根据时间和单位返回消息字符串
    * @parma {object} time
    * @parma {number} time.value - 时间数
    * @parma {string} time.unit - 单位 eg: "second" "minute"
    * */
    // @ts-ignore
    function formatTime (time) {
        let message = ""
        switch (time.unit) {
            case "second":
                message = time.value.toString() + "s"
                break
            case "minute":
                message = time.value.toString() + "m"
                break
            default:
                throw new Error(`formatTime(time :Time) time.unit is error , time: ${time.unit}`)
        }
        return message
    }
    let time = {
        value: 3,
        unit: "second",
    }
    expect(formatTime(time)).toBe("3s")
})

;`
如果你打算用 typescript,那就需要考虑如何让上面的js代码变得更易于维护.接下来我贴上动态语言可能出现的错误.
`

test("js 版实现-注释版", function () {
    /*
    * 根据时间和单位返回消息字符串
    * @parma {object} time
    * @parma {number} time.value - 时间数
    * @parma {string} time.unit - 单位 eg: "second" "minute"
    * */
    `[文档维护成本]`;
    `如果给 time 新增了字段必须更新上面注释中的文档.如果忘了就会导致函数调用方不知道新增了属性.`;
    `比如新增了 time.prefix 就需要在文档中增加 @{parma} {string} time.prefix - 前缀 eg: "Time: "`;

    `[调用方传参的不确定性]`;
    `调用方正常情况下是使用  formatTime({value: 3, unit: "second",})`;
    `如果调用方写错了一个单词 formatTime({vaule: 3, unit: "second",})`;
    `value 错写成了 vaule 会导致错误,而错误只在运行时才会出现`;
    // @ts-ignore
    function formatTime (time) {
        let message = "";
        `[选项字段过于松散]`;
        `time.unit 是选项,如果写错或遗漏 case 都会导致错误`;
        switch (time.unit) {
            case "second":
                message = time.value.toString() + "s"
                break
            case "minute":
                message = time.value.toString() + "m"
                break
            default:
                throw new Error(`formatTime(time :Time) time.unit is error , time: ${time.unit}`)
        }
        return message
    }
    let time = {
        value: 3,
        unit: "second",
    }
    expect(formatTime(time)).toBe("3s")
})

;`
通过 ts 能解决上述所说的问题.
`;
`解决[选项字段过于松散]-1`;
 `通过定义字典来避免调用函数时输错单词`
interface iTimeDict {
    unit : {
        second: string
        minute: string
    }
}
const timeDict :iTimeDict = {
    unit: {
        second: "second",
        minute: "minute",
    },
};
`解决[文档维护成本][调用方传参的不确定性]`;
    `定义接口要求参数有  value 数字 和 unit 字符串,调用方输错单词或者类型错误会在编译器报错`
interface iTime {
    value: number
    unit: string
};
`解决[选项字段过于松散]-2`;
    `通过自定义定义switch函数来确保 switch 每个情况都被处理,不会遗忘.`
interface iTimeSwitchUnitHandle {
    second ():void
    minute ():void
}
function timeSwitchUnit(v:iTime, handle: iTimeSwitchUnitHandle) {
 switch (v.unit) {
     case timeDict.unit.second:
         handle.second()
         break
     case timeDict.unit.minute:
         handle.minute()
         break
     default:
         throw new Error("TimeSwtichUnit(time :Time) time.unit is error , time: " + JSON.stringify(time))
 }

}
function formatTime(time: iTime)  /* message */ :string {
    let message :string = "";
    `解决[选项字段过于松散]-2`;
    timeSwitchUnit(time, {
        second(): void {
            message = time.value.toString() + "s"
        },
        minute(): void {
            message = time.value.toString() + "m"
        }
    })
    return message
}

// 定义变量
let time :iTime = {
    value: 3,
    unit: timeDict.unit.second, // 解决[选项字段过于松散]
}
test("formatTime", function () {
    let view = formatTime(time)
    expect(view).toBe("3s")
})
// 3s

test("直接传入符合 Time 类型的 object", function () {
    expect(formatTime({
        value: 6,
        unit: timeDict.unit.minute,
    })).toBe("6m")
})

;`
看起来ts版的代码多了很多,但请注意  formatTime() 函数的实现代码多了,但是调用 formatTime() 变得方便了,并且可维护性变得更好.

如果你写的代码是写完进行简单测试没问题那么直接用 js就可以.如果你写的代码是需要持续迭代维护或需求的复杂度高,你最好通过 ts 慢下来通过类型系统让代码更易于维护.
`

;`
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
test("一个都不能少", function () {
    expect(user).toStrictEqual({"age": 0, "name": "nimo"})
})

;`
## 该少还是可以少的

有些场景下我们不需要某些属性，例如根据 user 返回一个欢迎消息

`

interface NewUser {
    name: string
    age?: number
}


function getWelcomeNewUserMessage(user: NewUser) {
    let ageMessage = user.age === undefined? "": user.age.toString()
    return "welcome " + user.name + ageMessage
}
test("该少还是可以少的", function () {
    expect(getWelcomeNewUserMessage({
        name: "nimo",
    })).toBe("welcome nimo")
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
`

;`
## 零值

在 typescript 中可以遵循"属性零值" 来使用接口，这是个非常棒的设计，因为绝大部分的 js 错误都是因为变量属性没有定义导致报错。

变量在定义时没有明确的初始化时可以赋值为零值。

零值是：

number类型为 0，
boolean类型为 false，
string为 ""（空字符串）。

> golang zero values 语言特性

我们可以借鉴 golang 的零值设计，放心安全的使用对象。反正 ts 里面也必须手动赋值.

不要嫌麻烦，不要带入以前编写 js 代码时放飞自我快猛糙的思想编写 ts。时间会让你明白"啰嗦"是好事

基于零值设计可以形成规范,来自己实现零值,防止大量重复代码
`

interface iDataChildren {
    name: string
    age: number
}
interface iMakeDataChildren {
    name?: string
    age?: number
}
function makeDataChildren(v:iMakeDataChildren) :iDataChildren {
    return {
        name: v.name || "",
        age: v.age || 0,
    }
}
interface iDataLover {
    name :string
    age :number
}
interface iMakeDataLover {
    name? :string
    age? :number
}
function makeDataLover(v :iMakeDataLover) :iDataLover {
    return {
        name: v.name || "",
        age: v.age || 0,
    }
}
interface iData {
    name: string
    age: number
    happy: boolean
    lover: iDataLover
    children: iDataChildren[]
}
interface iMakeData {
    name?: string
    age?: number
    happy?: boolean
    children?: iDataChildren[]
}
function makeData(v :iMakeData) :iData {
    return {
        name: v.name || "",
        age: v.age || 0,
        happy: v.happy || false,
        lover: makeDataLover({
            name: "grifree",
        }),
        children: v.children || []
    }
}

test("makeData", function () {
    expect(makeData({
        name: "nimo",
        children: [
            makeDataChildren({
                age: 1,
            })
        ]
    })).toStrictEqual({
        name: "nimo",
        age: 0,
        happy: false,
        lover: {
            age: 0,
            name: "grifree"
        },
        children: [
            {
                age: 1,
                name: ""
            }
        ],
    })
})
;`
## 函数接口设计

> 本小节包含作者主观色彩

实现一个返回包含错误消息或错误代码结构的接口

`
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