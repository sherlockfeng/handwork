Object.create()创建的对象的原型指向传入的对象。跟字面量和new关键字创建有区别。
Object.create(proto，[propertiesObject])
第一个入参是proto

```javascript
Object.prototype.myCreate = function(proto, properties) {
    const fn = function() {};
    fn.prototype = proto;

    if (properties) {
        Object.defineProperties(fn.prototype, properties);
    }
    return new fn();
}
```