const urls = [
    'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png',
    'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png',
    'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png',
    'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png',
    'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png',
    'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png',
    'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png',
    'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png'
];
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            console.log('一张图片加载完成', url);
            resolve(img);
        };
        img.onerror = function () {
            reject(new Error('Could not load image at' + url));
        };
        img.src = url;
    });
}

// class Loader {
//     constructor(size = 3) {
//         this.promises = [];
//         this.waiting = [];
//         this.size = size;
//         this.id = 0;
//     }
//     add(url) {
//         console.log(this.promises.length);
//         if (this.promises.length < this.size) {
//             this.promises.push(this.doJob(url));
//         } else {
//             this.waiting.push(url);
//         }
//         console.log('promises', [...this.promises]);
//         console.log('waiting', [...this.waiting]);
//     }

//     doJob(url) {
//         const pId = ++this.id;
//         return {
//             job: Promise.resolve(loadImg(url))
//                 .then(() => {
//                     const find = this.promises.find(({id}) => {
//                         return id === pId;
//                     });
//                     console.log('find', find);
//                     this.promises = this.promises.filter(({id}) => id !== pId);
//                     if (this.waiting.length) {
//                         this.promises.push(this.doJob(this.waiting.shift()));
//                     }
//                 })
//                 .catch(e => {
//                     const find = this.promises.find(({id}) => {
//                         return id === pId;
//                     });
//                     console.log('find', find);
//                     this.promises = this.promises.filter(({id}) => id !== pId);
//                     if (this.waiting.length) {
//                         this.promises.push(this.doJob(this.waiting.shift()));
//                     }
//                 }),
//             id: pId
//         };
//     }
// }

// const loader = new Loader(3);

// urls.forEach(url => loader.add(url));

const loader = (urls, handler, limit) => {
    let promises = [];
    const waiting = [];
    let id = 0;

    const result = [];

    return new Promise(resolve => {
        const findAndReplace = pId => {
            promises = promises.filter(({id}) => id !== pId);
            if (!promises.length) {
                resolve(result);
            }
            if (waiting.length) {
                promises.push(doJob(waiting.shift()));
            }
        };
        const doJob = url => {
            const pId = id++;
            return {
                job: Promise.resolve(handler(url))
                    .then(value => {
                        result[pId] = value;
                    })
                    .catch(reason => {
                        result[pId] = reason;
                    })
                    .finally(() => {
                        findAndReplace(pId);
                    }),
                id: pId
            };
        };

        for (const url of urls) {
            if (promises.length < limit) {
                promises.push(doJob(url));
            } else {
                waiting.push(url);
            }
        }
    });
};

loader(urls, loadImg, 3).then(result => result.map(item => console.log(item.currentSrc)));
