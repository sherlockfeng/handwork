const fNew = (fuc, ...args) => {
    if (typeof fuc !== 'function') {
        return;
    }
    fNew.target = fuc;
    const o = Object.create(fuc.prototype);
    console.log(o);
    const result = fuc.apply(o, args);
    if ((typeof result === 'object' && result !== null) || typeof result === 'function') {
        return result;
    }
    return o;
};

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.f = () => console.log(this.make);
}

var car1 = fNew(Car, 'Eagle', 'Talon TSi', 1993);
console.log('car1: ', car1);
car1.f();

const fCall = (fuc, obj, ...args) => {
    obj = obj ? Object(obj) : window;
    obj.f = fuc;
    obj.f(...args);
};
function fuc(a, b, c) {
    console.log(a + b + c, this.name);
}
fCall(fuc, {name: 'name'}, 1, 2, 3);

const fApply = (fuc, obj, args) => {
    obj = obj ? Object(obj) : window;
    obj.f = fuc;
    obj.f(...args);
};

function fuc(a, b, c) {
    console.log(a + b + c, this.name);
}
fApply(fuc, {name: 'name'}, [1, 2, 3]);

const fBind = (fuc, obj, ...args) => {
    obj.f = fuc;
    return (...a) => {
        obj.f(...args, ...a);
    };
};

const d = fBind(fuc, {name: 123}, 1);
d(2, 3);
