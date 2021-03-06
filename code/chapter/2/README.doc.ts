console.log("类型")
;`
在[上一节](../1/README.ts)中已经使用过一些基础类型

官方教程用 padleft 举例说明联合类型
`
console.log('-------------- padLeft ----------')
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log('-',padLeft("Hello world", 4),'-')
// -     Hello world -
console.log('-',padLeft("Hello world", "nimo"),'-')
// - nimoHello world -

;`
笔者认为这里不应该用联合类型，因为分别事先2个函数
`

console.log('========= padleftSpace ========== ')
function padLeftSpace(value: string, spaceCount: number) {
    return Array(spaceCount + 1).join(" ") + value;
}
console.log('-',padLeftSpace("Hello world", 4),'-')

console.log('========= padleftString ========== ')
function padLeftString(value: string, padding: string) {
    return padding + value;
}
console.log('-',padLeftString("Hello world", "nimo"),'-')


;`
函数对外的接口越简单越明确越好
`

// interface Query {
//     name: string
//     age: number
// }
// function ctrl(query: Query) {
//     // let author: Author = {
//     //     name: query.name,
//     //     age: query.age,
//     //     active: true,
//     // }
//     // createAuthor(author)
//     let author = query as Author
//     author.active = true
//     createAuthor(author)
// }
//
// // 不要使用接口继承，因为这个业务逻辑中 user 不能依赖 query ，query是随时会变化的
// interface Author {
//     name: string
//     age: number
//     active: boolean
// }
// function createAuthor(author: Author) {
//     console.log(author.name, author.age, author.active)
// }
// ctrl({name:"nimo",age:19})


interface iRes {
    color: string
    size: number
}

test("response", function () {
    let res :iRes = JSON.parse(`{"colr":"red"}`)
    console.log(res)
})