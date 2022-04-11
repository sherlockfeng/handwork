1. webpack 对文件系统进行 watch 打包到内存中
2. devServer 通知浏览器端文件发生改变（webpack-dev-server server端）
    - 调用webpack api监听comile done事件
    - sockjs websocket通知
    - 文件hash发送至浏览器
3. webpack-dev-server client端接受websocket信息
    - type 为ok 刷新页面
    - type 为hash emit webpackHotUpdate事件
4. 监听webpackHotUpdate消息，调用webpack/lib/HotModuleReplacement.runtime
    - 请求是否有更新的文件
    - jsonp请求文件
5. HotModuleReplacement.runtime 对模块进行热更新
    - 删除过期依赖和模块
    - 更新依赖