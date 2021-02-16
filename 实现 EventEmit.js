class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(name, cb, type = 'normal') {
        this.events[name] = this.events[name] || [];
        this.events[name].push({
            type,
            cb
        });
    }

    once(name, cb) {
        this.on(name, cb, 'once');
    }

    emit(name, ...args) {
        const events = this.events[name] || [];
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            event.cb(...args);

            if (event.type === 'once') {
                events.splice(i, 1);
                i--;
            }
        }
    }

    listeners(name) {
        if (!name) {
            return [];
        }
        return this.events[name] || [];
    }

    get es() {
        return Object.keys(this.events);
    }
}

const e = new EventEmitter();
e.on('hi', (...val) => {
    console.log(...val);
});

e.emit('hi', 1, 2, 3);
