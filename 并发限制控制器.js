class Scheduler {
    constructor(max = 2) {
        this.max = max;
        this.jobs = [];
        this.curringRuning = 0;
    }

    put(job) {
        return new Promise((resolve, reject) => {
            this.jobs.push({job, resolve, reject});
            if (this.curringRuning < this.max) {
                this.doJob();
            }
        });
    }

    doJob() {
        if (!this.jobs.length || this.curringRuning >= this.max) {
            return;
        }
        const {job, resolve, reject} = this.jobs.splice(0, 1)[0];
        this.curringRuning++;
        job()
            .then(v => {
                this.curringRuning--;
                this.doJob();
                resolve(v);
            })
            .catch(e => {
                reject(e);
            });
    }
}

const timeout = (time, order) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order === '1') {
                reject('错误');
                return;
            }
            resolve(order);
        }, time);
    });
const scheduler = new Scheduler();
const addTask = (time, order) => {
    scheduler.put(() => timeout(time, order)).then(v => console.log(v));
};
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
