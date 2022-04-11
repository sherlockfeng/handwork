1. 渲染watcher 初始化mounted时调用
2. 渲染中获取data的值，触发get，每个data对象有自己的dep: Dep Dep里subs存放了调用的watcher，通个Dep.target
3. data中的值改变，依次遍历subs里的watcher，调用watcher.run更新
4. user watch 只是watcher
5. computed会先初始化一个Watcher(lazy = true)，并在_computedWatchers上放入这个watch，在vue实例上添加key和对应的get和set（defineComputed），
6. 初试lazy为true，不调用watcher.get
7. 使用场景，如渲染watcher 要使用computed的值，先watcher.evaluate()获取值（同时将dirty设为false），并将自身放入依赖的data的dep.subs中
8. 然后调用watcher.depend，将当前渲染watcher放入这个computed值依赖的data的dep.subs中
9. 之后如果这个computed watcher没有update，则直接返回value，如果更新了，则设置dirty为true，下次获取值时会重新计算
10. 相当于渲染watcher依赖了这个computed依赖的data
11. vue会在触发watcher更新的时候先按照它们的id从小到大排序，由于计算属性的初始化时肯定排在渲染模板之前的，所以计算watcher必然排在渲染watcher之前被触发udpate，这个时候就会把dirty置为true，随后渲染watcher重新渲染模板去访问计算属性，正好dirty为true，重新求值。

- computed 参考 https://godlanbo.com/blogs/34

childOb 往数组上放deps用的 {a: [1,2,3]}因为a.push(2)之类的方法不会触发a的set，所以得从a.__ob__ 上那deps并触发watcher的update