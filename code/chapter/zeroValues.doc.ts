;`
# 利用空值设计让 typescript 更稳定和易于维护

## 初始化缺省数据

举一个场景的例子, 前端ajax接收后端响应数据: 
`

interface iUser {
    name:string
    age:number
}
test("响应数据", function () {
    let responseJSON :string = `{"name": "nimo"}`
    let res:iUser = JSON.parse(responseJSON)
    expect(res.name).toBe("nimo")
    expect(res.age).toBe(undefined);
    `iUser 中 age 不是 age?:number 但是结果值是 undefined`;
    `具体为什么会是 undefined,和为什么后端响应的数据没有 age 我们就不深入讨论了`;
    `但是这种情况会导致出现一些bug,比如:`;
    expect(res.age + 1).toBe(NaN);
    `明明使用了ts,结果居然将 number 加上 number 得到了 NaN`;
    `因为此时 res.age 是 undefined`;
})

;`

## 数据接口新增属性

接着来看对象数据的场景:

最初定义了一个数据结构,只有 url 属性
`;
interface iPost {
    url:string
}

test("然后有很多地方使用了 iData", function () {
    let a :iPost = {
        url: "https://github.com/nimoc/blog/issues/33"
    }
    console.log(a)
    let b :iPost = {
        url: "https://github.com/nimoc"
    }
    console.log(b)
})

;`
如果此时 iPost 新增了属性 title,则会导致 a b 声明时编译期报错

@@@ts
interface iPost {
    url:string
    title: string
}

test("然后有很多地方使用了 iData", function () {
    // TS2741: Property 'title' is missing in type '{ url: string; }' but required in type 'iPost'.
    let a :iPost = {
        url: "https://github.com/nimoc/blog/issues/33"
    }
    console.log(a)
    // TS2741: Property 'title' is missing in type '{ url: string; }' but required in type 'iPost'.
    let b :iPost = {
        url: "https://github.com/nimoc"
    }
    console.log(b)
})
@@@

想要解决这个问题就需要在 a b 两处声明的地方加上 title 属性,如果不只是 a b 两次,而是由几十处就会变得非常麻烦.

虽然你可以认为类型系统就应该这样严格,但是在这个场景下我更希望不需要改几十处代码

如果不想改几十处可能会导致我们写出不好的代码,例如修改 iPost 为

@@@ts
interface iPost {
    url:string
    title?: string
}
@@@

这种做法虽然不需要些几十处了,但是 [nimo](https://github.com/nimoc) 认为这种方式会引入不必要的 undefined .
导致明明用了类型系统,结果还要处理最繁琐的 undefined 问题.

## 空值设计 (zero values)

我们借鉴 [golang](http://golang.org/) 中zero values 的设计,来解决上述2个问题.

> 如果你学习 typescript 发现怎么用都不顺手,我建议先学习一门纯粹的静态类型语言.
> 因为 TypeScript 是 对 JavaScript进行 类型批注,而不是真正意义上的静态类型语言.  

请看代码:
`


interface iPerson {
    name:string
    age:number
}
interface iMakePersion {
    name?:string
    age?:number
}
