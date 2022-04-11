1. 组件初始化 mountComponent

    1. 创建 component 实例 createComponentInstance
    2. 初始化 初始化组件,建立 proxy setupComponent(instance)
    3. 建立一个渲染 effect，执行 effect setupRenderEffect

2. setupRenderEffect

    1. 创建一个渲染 effect，并把它赋值给组件实例的 update 方法，作为渲染更新视图用。 ② componentEffect 作为回调函数形式传递给 effect 作为第一个参数
    2. 把渲染 effect.run 赋值给 update 然后执行(会设置 currentEffect 为自身 effect)

3. 触发 get，将渲染 effect 放入 targetMap -> desMap 中，同时将该 dep 放入渲染 effect 的 deps 中

---

## set 触发 trigger

1. 首先从 targetMap 中，根据当前 proxy 找到与之对应的 depsMap。
2. 根据 key 找到 depsMap 中对应的 deps，然后通过 add 方法分离出对应的 effect 回调函数和 computed 回调函数。
3. 依次执行 computedRunners 和 effects 队列里面的回调函数，如果发现需要调度处理,放进 scheduler 事件调度
4. 值得注意的的是：此时的 effect 队列中有我们上述负责渲染的 renderEffect，还有通过 effectAPI 建立的 effect，以及通过 watch 形成的 effect。我们这里只考虑到渲染 effect。至于后面的情况会在接下来的文章中和大家一起分享。

--

## 总结

1. 初始化阶段： 初始化阶段通过组件初始化方法形成对应的 proxy 对象，然后形成一个负责渲染的 effect。
2. get 依赖收集阶段：通过解析 template，替换真实 data 属性，来触发 get,然后通过 stack 方法，通过 proxy 对象和 key 形成对应的 deps，将负责渲染的 effect 存入 deps。（这个过程还有其他的 effect，比如 watchEffect 存入 deps 中 ）。
3. set 派发更新阶段：当我们 this[key] = value 改变属性的时候，首先通过 trigger 方法，通过 proxy 对象和 key 找到对应的 deps，然后给 deps 分类分成 computedRunners 和 effect,然后依次执行，如果需要调度的，直接放入调度。
