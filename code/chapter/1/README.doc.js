"use strict";
console.log("接口");
"\n# \u63A5\u53E3\n\n\u63A5\u53E3\u80FD\u8BA9\u4EE3\u7801\u66F4\u52A0\u7A33\u5B9A\uFF0C\u5728\u7F16\u8BD1\u671F\u68C0\u67E5\u4E00\u4E9B\u4F4E\u7EA7\u9519\u8BEF\n\n\u4F8B\u5982\u6211\u4EEC\u8981\u5B9E\u73B0\u4E00\u4E2A\u65F6\u95F4\u8F6C\u6362\u5B57\u7B26\u4E32\n";
function FormatTime(time) {
    switch (time.unit) {
        case "second":
            return time.value.toString() + "s";
            break;
        case "minute":
            return time.value.toString() + "m";
            break;
    }
}
var time = {
    value: 3,
    unit: "second",
};
console.log("-------------- i18nTime ----------");
var view = FormatTime(time);
console.log(view);
console.log(FormatTime({
    value: 6,
    unit: "minute",
}));
"\n\u5B9A\u4E49 Time \u63A5\u53E3\uFF0Ctime.unit \u5B9A\u4E49\u4E3A\u53EA\u53EF\u4EE5\u4E3A\u5B57\u7B26\u4E32  'second' \u548C 'minute'\u3002 \ntime.value \u5B9A\u4E49\u4E3A number \u7C7B\u578B\u3002\nTime\u4F5C\u4E3A formatTime \u7684\u51FD\u6570\u53C2\u6570\u3002\n\ninterface \u7EA6\u675F\u4E86\u53C2\u6570\u7684\u5C5E\u6027\u7C7B\u578B\uFF0C\u5982\u679C\u7C7B\u578B\u9519\u8BEF\uFF0C\u5728\u7F16\u8BD1\u5668\u5C31\u80FD\u53D1\u73B0\u9519\u8BEF\uFF0C\u5E76\u4E14\u5F00\u53D1\u4EBA\u5458\u901A\u8FC7\u67E5\u770B interface \u5373\u53EF\u77E5\u9053\u63A5\u53E3\u53C2\u6570\u7684\u8BE6\u7EC6\u60C5\u51B5\u3002\u4E0D\u9700\u8981\u7F16\u5199\u5570\u55E6\u7684 jsdoc\u3002\n  \n    function formatTime(time: Time) :string {\n\n\u4E2D :string \u8868\u793A\u51FD\u6570\u8FD4\u56DE\u503C\u662F\u5B57\u7B26\u4E32\n\n\n## \u4E00\u4E2A\u90FD\u4E0D\u80FD\u5C11\n\n\u4F8B\u5982\u63A5\u53E3\u5B9A\u4E49\u4E86 name \u548C age \u5C5E\u6027\n   \n";
;
"\n\u5982\u679C\u58F0\u660E\u53D8\u91CF\u65F6\u6CA1\u6709\u5E26\u4E0A age \u5219\u4F1A\u62A5\u9519 Property 'age' is missing in type '{ name: string; }' but required in type 'User'.\n\n    let user: User = {\n        name: \"nimo\"\n    }\n\n\u5982\u679C\u6682\u65F6 age \u6CA1\u6709\u660E\u786E\u7684\u503C\u53EF\u4EE5\u5B9A\u4E49\u4E3A 0\n";
var user = {
    name: "nimo",
    age: 0
};
console.log("-------------- 一个都不能少 ----------");
console.log(user);
"\n\u5728 typescript \u4E2D\u53EF\u4EE5\u9075\u5FAA\"\u5C5E\u6027\u96F6\u503C\" \u6765\u4F7F\u7528\u63A5\u53E3\uFF0C\u8FD9\u662F\u4E2A\u975E\u5E38\u68D2\u7684\u8BBE\u8BA1\uFF0C\u56E0\u4E3A\u7EDD\u5927\u90E8\u5206\u7684 js \u9519\u8BEF\u90FD\u662F\u56E0\u4E3A\u53D8\u91CF\u5C5E\u6027\u6CA1\u6709\u5B9A\u4E49\u5BFC\u81F4\u62A5\u9519\u3002\n\n\u53D8\u91CF\u5728\u5B9A\u4E49\u65F6\u6CA1\u6709\u660E\u786E\u7684\u521D\u59CB\u5316\u65F6\u53EF\u4EE5\u8D4B\u503C\u4E3A\u96F6\u503C\u3002\n\n\u96F6\u503C\u662F\uFF1A\n\nnumber\u7C7B\u578B\u4E3A 0\uFF0C\nboolean\u7C7B\u578B\u4E3A false\uFF0C\nstring\u4E3A \"\"\uFF08\u7A7A\u5B57\u7B26\u4E32\uFF09\u3002\n\n> golang zero values \u8BED\u8A00\u7279\u6027\n\n\u6211\u4EEC\u53EF\u4EE5\u501F\u9274 golang \u7684\u96F6\u503C\u8BBE\u8BA1\uFF0C\u653E\u5FC3\u5B89\u5168\u7684\u4F7F\u7528\u5BF9\u8C61\u3002\n\n\u4E0D\u8981\u5ACC\u9EBB\u70E6\uFF0C\u4E0D\u8981\u5E26\u5165\u4EE5\u524D\u7F16\u5199 js \u4EE3\u7801\u65F6\u653E\u98DE\u81EA\u6211\u5FEB\u731B\u7CD9\u7684\u601D\u60F3\u7F16\u5199 ts\u3002\u65F6\u95F4\u4F1A\u8BA9\u4F60\u660E\u767D\"\u5570\u55E6\"\u662F\u597D\u4E8B\n\n## \u8BE5\u5C11\u8FD8\u662F\u53EF\u4EE5\u5C11\u7684\n\n\u6709\u4E9B\u573A\u666F\u4E0B\u6211\u4EEC\u4E0D\u9700\u8981\u67D0\u4E9B\u5C5E\u6027\uFF0C\u4F8B\u5982\u6839\u636E user \u8FD4\u56DE\u4E00\u4E2A\u6B22\u8FCE\u6D88\u606F\n\n";
function getWelcomeNewUserMessage(user) {
    var ageMessage = user.age === undefined ? "" : user.age.toString();
    console.log("welcome " + user.name + ageMessage);
}
console.log("------------ 该少还是可以少的 --------------");
getWelcomeNewUserMessage({
    name: "nimo",
});
getWelcomeNewUserMessage({
    name: "nico",
    age: 18,
});
"\n \u4F7F\u7528 ? \u914D\u7F6E\u53EF\u9009\u5C5E\u6027\u65F6\u5207\u8BB0\u8981\u5224\u65AD\u5C5E\u6027\u662F\u5426\u662F undefined \uFF0C\u867D\u7136\u4E0D\u5224\u65AD\u7F16\u8BD1\u4E5F\u4E0D\u4F1A\u901A\u8FC7\n \n    function some(user: NewUser) :string {\n        return \"welcome \" + user.name + user.age.toString()\n        // \u7F16\u8BD1\u62A5\u9519 \uFF1AObject is possibly 'undefined'.\n        // return \"welcome \" + user.name + user.age.toString()\n        //                                ~~~~~~~~\n    }\n\n\u8BF7\u5C06\u53EF\u9009\u5C5E\u6027\u5F53\u505A\u836F\u54C1\u4F7F\u7528\uFF0C\u5728\u5FC5\u8981\u65F6\u624D\u4F7F\u7528\u53EF\u9009\u5C5E\u6027\uFF0C\u8FD9\u6837\u80FD\u63D0\u9AD8\u4EE3\u7801\u7A33\u5B9A\u6027\u3002\n\n## \u51FD\u6570\u63A5\u53E3\u8BBE\u8BA1\n\n> \u672C\u5C0F\u8282\u5305\u542B\u4F5C\u8005\u4E3B\u89C2\u8272\u5F69\n\n\u5B9E\u73B0\u4E00\u4E2A\u8FD4\u56DE\u5305\u542B\u9519\u8BEF\u6D88\u606F\u6216\u9519\u8BEF\u4EE3\u7801\u7ED3\u6784\u7684\u63A5\u53E3\n\n";
console.log('---------- 函数接口设计 ------------');
function interfaceDesign() {
    var titleAlreadyExists = {
        type: "fail",
        data: {},
        msg: "标题已存在",
        code: "",
    };
    console.log(titleAlreadyExists);
    var titleAlreadyExistsWithCode = {
        type: "fail",
        data: {},
        msg: "标题已存在",
        code: "titleAleardyExists",
    };
    console.log(titleAlreadyExistsWithCode);
}
interfaceDesign();
"\n\u6BCF\u6B21\u58F0\u660E\u7684 ResponseData \u4E2D\u7684 \n\n    type: \"fail\",\n    data:{},\n    \n\u90FD\u662F\u4E00\u6837\u7684\uFF0C\u90A3\u4E48\u53EF\u4EE5\u8FDB\u884C\u5C01\u88C5\u3002\u4E0B\u9762\u505A\u4E00\u4E2A\u4E0D\u597D\u7684\u7684\u5C01\u88C5\u6F14\u793A:\n";
console.log('======== fail ===========');
function fail(msg, code) {
    return {
        type: "fail",
        data: {},
        msg: msg,
        code: code === undefined ? "" : code,
    };
}
console.log(fail("标题已存在"));
console.log(fail("标题已存在", "titleAleardyExists"));
"\n\u51FD\u6570\u5E94\u8BE5\u51CF\u5C11\u53C2\u6570\u9ED8\u8BA4\u503C\u7684\u8BBE\u8BA1\uFF0C\u56E0\u4E3A\u4EE3\u7801\u5E94\u8BE5\u662F\u6CA1\u6709\u4EFB\u4F55\u9690\u55BB\u7684\u3002\u5E94\u8BE5\u5B9E\u73B0\u5982\u4E0B\u63A5\u53E3\n";
function failMsg(msg) {
    return {
        type: "fail",
        data: {},
        msg: msg,
        code: "",
    };
}
var Code = {
    titleAleardyExists: { code: "titleAleardyExists", msg: "标题已存在" },
};
function failCode(code) {
    return {
        type: "fail",
        data: {},
        msg: code.msg,
        code: code.code,
    };
}
console.log('=========== failMsg =========');
console.log(failMsg("标题已存在"));
console.log('=========== fail code =========');
console.log(failCode(Code.titleAleardyExists));
"\n\n\u5982\u679C\u53EA\u6709 msg \u6CA1\u6709 code\uFF0C\u5219\u4F7F\u7528 failMsg \u3002\u5982\u679C\u5B58\u5728code\uFF0C\u90A3\u4E48\u6BD4\u5982\u6709msg\uFF0C\u5219\u4F7F\u7528 failCode \u548C Code\uFF0C\u8FD9\u6837\u65E2\u4E0D\u4F1A\u5199\u9519 code \u548C msg \u4E5F\u53EF\u4EE5\u7EDF\u4E00\u7BA1\u7406\u9519\u8BEF\u4EE3\u7801\u3002\n \n> \u5229\u7528\u9759\u6001\u7C7B\u578B\u7684\u7279\u6027\u5C3D\u91CF\u8BA9\u4EE3\u7801\u5728\u7F16\u8BD1\u671F\u5C31\u68C0\u67E5\u51FA\u4E00\u4E9B\u4F4E\u7EA7\u9519\u8BEF\n\n## \u4EFB\u610F\u5C5E\u6027\n";
console.log('========= map =========');
var nameCount = {};
function check(name) {
    if (nameCount[name]) {
        nameCount[name]++;
    }
    else {
        nameCount[name] = 1;
    }
}
check("nimo");
check("nimo");
check("og");
console.log(nameCount);
"\n\u53EF\u4EE5\u7528\u4EFB\u610F\u5C5E\u6027\u5B9E\u73B0\u4E00\u4E2A\u59D3\u540D\u7684\u8BA1\u6570\u7ED3\u6784\u3002\n\n> \u4EFB\u610F\u5C5E\u6027\u5E94\u8BE5\u53EA\u5728\u5B8C\u5168\u4E0D\u53EF\u9884\u77E5key value \u7684\u60C5\u51B5\u4E0B\u4F7F\u7528\u3002\u5426\u5219\u5E94\u8BE5\u660E\u786E\u5B9A\u4E49key value \u7684\u540D\u79F0\u548C\u7C7B\u578B\n";
//# sourceMappingURL=README.js.map