export class Dep {
    static target;
    constructor() {
        this.subs = [];
    }

    depend() {
        Dep.target && this.subs.push(Dep.target);
        console.log(this.subs);
    }

    notify() {
        this.subs.forEach(w => {
            w.update();
        });
    }
}

const targetStack = [];

export const pushTarget = currentTarget => {
    if (Dep.target) {
        targetStack.push(currentTarget);
    }
    Dep.target = currentTarget;
};

export const popTarget = () => {
    Dep.target = targetStack.pop();
};
