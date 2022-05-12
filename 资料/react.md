- A B C D E F -> A C E B G
    将A B C D E F修改为A C E B G 的执行顺序

    lastPlacedIndex  = 0
    A在map里面存在，而且位置相同，复用节点更新属性
    C  对比 lastPlacedIndex < oldIndex，lastPlacedIndex = 2，位置不动，只更新属性
    E  对比 lastPlacedIndex < oldIndex，lastPlacedIndex = 4，位置不动，只更新属性
    B  对比 lastPlacedIndex > oldIndex，需要移动位置并更新属性
    G  在map里找不到，需要创建并插入
    将map中剩余的元素 D F标记为删除

- 修改dom的顺序: 先删除，然后更新与移动，最后做插入操
