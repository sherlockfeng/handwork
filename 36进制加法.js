const add = (s1, s2) => {
    let i = s1.length - 1;
    let j = s2.length - 1;
    let carry = 0;
    let result = '';
    const map = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ];
    const getNum = s => {
        if ('0' <= s && s <= '9') {
            return +s;
        }
        return s.charCodeAt() - 'a'.charCodeAt() + 10;
    };

    while (i >= 0 || j >= 0 || carry) {
        const a = i >= 0 ? +getNum(s1[i]) : 0;
        const b = j >= 0 ? +getNum(s2[j]) : 0;
        const sum = a + b + carry;
        if (sum > 35) {
            carry = 1;
        } else {
            carry = 0;
        }
        result = map[sum % 36] + result;
        i--;
        j--;
    }
    return result;
};

add('1z', '22');
