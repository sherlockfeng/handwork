class Scheduler {
    constructor(size = 2) {
        this.size = size;
        this.currentRunning = 0;
        this.waiting = [];
    }
    add(promiseCreator) {
        return new Promise((resolve, reject) => {
            this.waiting.push({
                job: promiseCreator,
                resolve,
                reject
            });
            if (this.currentRunning < this.size) {
                this.doJob();
            }
        });
    }

    doJob() {
        if (!this.waiting.length) {
            return;
        }
        this.currentRunning++;
        const {job, reject, resolve} = this.waiting.shift();

        Promise.resolve()
            .then(job)
            .then(
                value => {
                    resolve(value);
                },
                reason => {
                    reject(reason);
                }
            )
            .finally(() => {
                this.currentRunning--;
                this.doJob();
            });
    }
}
const timeout = time =>
    new Promise(resolve => {
        setTimeout(resolve, time);
    });

const scheduler = new Scheduler();
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(10000, '1');
addTask(5000, '2');
addTask(3000, '3');
addTask(4000, '4'); // output: 2 3 1 4// 一开始，1、2两个任务进入队列// 500ms时，2完成，输出2，任务3进队// 800ms时，3完成，输出3，任务4进队// 1000ms时，1完成，输出1// 1200ms时，4完成，输出4
