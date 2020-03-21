"use strict";
console.log("类型");
"\n\u5728[\u4E0A\u4E00\u8282](../1/README.ts)\u4E2D\u5DF2\u7ECF\u4F7F\u7528\u8FC7\u4E00\u4E9B\u57FA\u7840\u7C7B\u578B\n\n\u5B98\u65B9\u6559\u7A0B\u7528 padleft \u4E3E\u4F8B\u8BF4\u660E\u8054\u5408\u7C7B\u578B\n";
console.log('-------------- padLeft ----------');
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}
console.log('-', padLeft("Hello world", 4), '-');
console.log('-', padLeft("Hello world", "nimo"), '-');
"\n\u7B14\u8005\u8BA4\u4E3A\u8FD9\u91CC\u4E0D\u5E94\u8BE5\u7528\u8054\u5408\u7C7B\u578B\uFF0C\u56E0\u4E3A\u5206\u522B\u4E8B\u51482\u4E2A\u51FD\u6570\n";
console.log('========= padleftSpace ========== ');
function padLeftSpace(value, spaceCount) {
    return Array(spaceCount + 1).join(" ") + value;
}
console.log('-', padLeftSpace("Hello world", 4), '-');
console.log('========= padleftString ========== ');
function padLeftString(value, padding) {
    return padding + value;
}
console.log('-', padLeftString("Hello world", "nimo"), '-');
"\n\u51FD\u6570\u5BF9\u5916\u7684\u63A5\u53E3\u8D8A\u7B80\u5355\u8D8A\u660E\u786E\u8D8A\u597D\n";
//# sourceMappingURL=README.js.map