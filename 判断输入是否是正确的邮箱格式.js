// 题目描述
// 判断输入是否是正确的邮箱格式
// 输入描述:
// 邮箱字符串
// 输出描述:
// true表示格式正确
function isAvailableEmail(sEmail) {
    const pattern = /^\w+(\.\w+)*@(\w)+\.com$/i;
    return pattern.test(sEmail);
}
isAvailableEmail('frontend@nowcoder.com');
