function rgb2hex(sRGB) {
    const reg = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
    const match = sRGB.match(reg);

    if (!match) {
        return sRGB;
    }

    let str = '#';
    for (let i = 1; i <= 3; i++) {
        let m = parseInt(match[i]);
        if (m <= 255 && m >= 0) {
            str += m < 16 ? '0' + m.toString(16) : m.toString(16);
        } else {
            return sRGB;
        }
    }

    return str;
}

rgb2hex('rgb(255, 255, 255)');
