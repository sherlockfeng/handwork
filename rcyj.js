// const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
// const util = require('util');
// const getPromise = util.promisify(request.get);
const request = require('request-promise');

const time = [
    '2021/02/09/202102',
    '2021/02/01/202101',
    '2020/12/25/202012',
    '2020/11/30/202011',
    '2020/10/30/202010',
    '2020/09/30/202009'
];
let currentTime = '';

const json = {
    '2021/02/09/202102': [],
    '2021/02/01/202101': [],
    '2020/12/25/202012': [],
    '2020/11/30/202011': [],
    '2020/10/30/202010': [],
    '2020/09/30/202009': []
};

const stdoutJson = () => {
    const str = JSON.stringify(json, null, 4);
    fs.writeFile('ret.json', str, 'utf8', err => {
        if (err) throw err;
        console.log('done', currentTime);
    });
};

const handleData = $ => {
    const t = {};
    $('.entry-content table tbody')
        .find('tr')
        .each((j, e) => {
            $(e)
                .find('td')
                .each((i, el) => {
                    const text = $(el).text();
                    if (i === 1 && text !== '单位名称') {
                        console.log(text);
                        if (!t[text]) {
                            t[text] = 0;
                        }
                        t[text]++;
                    }
                });
        });
    json[currentTime] = Object.keys(t)
        .map(key => ({
            company: key,
            number: t[key]
        }))
        .sort((a, b) => b.number - a.number);
};

const httpsHandler = body => {
    // if (err) {
    //     console.error('to err is human');
    //     process.exit(1);
    // }

    console.log('get response', currentTime);

    const $ = cheerio.load(body);

    console.log('start handle data', currentTime);

    handleData($);
};

//entry point

const hand = async time => {
    for (let t of time) {
        if (t === '2020/12/25/202012') {
            url = 'http://www.shchhukou.com/2020/12/25/202012cyshsjzzrysbbsczhkgsmd/';
        } else {
            url = `http://www.shchhukou.com/${t}shsyjrcsbbsczhkgsmd/`;
        }
        currentTime = t;
        console.log('start', currentTime);
        console.log('url', url);
        const result = await request(url);
        httpsHandler(result);
    }

    console.log('to json');

    stdoutJson();
};
hand(time);
