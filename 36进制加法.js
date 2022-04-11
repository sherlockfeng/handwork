// const add = (s1, s2) => {
//     let i = s1.length - 1;
//     let j = s2.length - 1;
//     let carry = 0;
//     let result = '';
//     const map = [
//         '0',
//         '1',
//         '2',
//         '3',
//         '4',
//         '5',
//         '6',
//         '7',
//         '8',
//         '9',
//         'a',
//         'b',
//         'c',
//         'd',
//         'e',
//         'f',
//         'g',
//         'h',
//         'i',
//         'j',
//         'k',
//         'l',
//         'm',
//         'n',
//         'o',
//         'p',
//         'q',
//         'r',
//         's',
//         't',
//         'u',
//         'v',
//         'w',
//         'x',
//         'y',
//         'z'
//     ];
//     const getNum = s => {
//         if ('0' <= s && s <= '9') {
//             return +s;
//         }
//         return s.charCodeAt() - 'a'.charCodeAt() + 10;
//     };

//     while (i >= 0 || j >= 0 || carry) {
//         const a = i >= 0 ? +getNum(s1[i]) : 0;
//         const b = j >= 0 ? +getNum(s2[j]) : 0;
//         const sum = a + b + carry;
//         if (sum > 35) {
//             carry = 1;
//         } else {
//             carry = 0;
//         }
//         result = map[sum % 36] + result;
//         i--;
//         j--;
//     }
//     return result;
// };

// add('1z', '22');

const add = (s1, s2) => {
    let result = '';
    let len1 = s1.length - 1;
    let len2 = s2.length - 1;

    const getNum = str => {
        if ('0' <= str && str <= '9') {
            return str - '0';
        }
        return str.charCodeAt() - 'a'.charCodeAt() + 10;
    };

    const getStr = num => {
        if (num === 10) {
            return 'a';
        }
        if (num <= 9) {
            return num + '';
        }
        return num - 10 + 'a';
    };

    let carry = 0;
    while (len1 >= 0 || len2 >= 0 || carry) {
        const left = len1 >= 0 ? s1[len1] : '0';
        const right = len2 >= 0 ? s2[len2] : '0';

        const total = getNum(left) + getNum(right) + carry;
        result = getStr(total % 36) + result;
        carry = Math.floor(total / 36);
        len1--;
        len2--;
    }

    return result;
};

console.log(add('1z', '22'));
