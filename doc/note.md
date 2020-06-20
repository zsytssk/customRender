-   连接 socket

-   @ques react-dev-tool customise render..

    -   @inlet/react-pixi
    -   https://github.com/facebook/react/blob/30b47103d4354d9187dc0f1fb804855a5208ca9f/packages/react-dom/src/client/ReactDOMHostConfig.js
    -   react-dom
    -   能不能搜索。。。

-   @ques dev Tool 找到节点的原因是什么

    -   如何高亮 component
        -   **REACT_DEVTOOLS_GLOBAL_HOOK**.reactDevtoolsAgent.rendererInterfaces['1'].findNativeNodesForFiberID(13)
        -   `__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent._bridge.addListener('highlightNativeElement', (...args) => {console.log(args)})`

-   正式的 dom 有什么属性 我外面的节点没有？

## 2020-06-19 20:47:32

-   是不是

-   @ques 怎么将 自定义组件 也在其中显示

-   @todo eslint ts

-   @ques modelState 怎么样

*   我需要一个脚本 将捕鱼正式 转成 这边可以用的
    -   gameConfig 挂宅。。

-   @ques 这一大堆的错误 我要怎么处理。。。， 没办法。。。

## 2020-06-17 09:19:09

-   @todo 只是示例项目 将常用的功能组件话。。。

    -   stateManager PopManager SceneManager...

-   @ques 能不能将 ui 中的 class 做成 jsx

-   @todo tsx 项目。。。

## 2020-06-05 09:34:19

-   @todo 添加用户·

### 2020-02-04 13:40:14

-   @ques 如何将鱼销毁

### save

-   @opt 其实 react 只要能知道 我 addFish 中只处理添加那一个 ... 性能问题就几乎不存在

    -   怎么才能做到这一步... 修改 react 的源码 添加这种 api?
    -   这好像和 react 的 api 相互冲突...

-   @opt 在添加鱼的那一瞬间很卡

-   @todo model + connect

-   @todo addFish + addPlayer...

-   @todo 先全部使用 jsx, 然后再对性能进行优化...
    -   将高性能的地方独立处理
    -   一旦都创建好了 就不会太卡·

### finish

-   @todo 为什么后面一条鱼 会把前面的鱼冲掉

## 2020-02-02 11:11:29

·

-   @ques@opt customise render 怎么先创建父亲 再创建子

-   @ques 怎么让 loading 延后

-   @ques getChildHostContext | prepareUpdate 也许有什么作用

-   @ques hostConfig 中函数分别在什么时候调用

    -   函数的周期链子

-   @ques prepareUpdate 在什么时候执行 ..

-   @ques appendInitialChild 在什么时候执行
-   @ques isPrimaryRenderer

## 2020-01-30 15:44:40

-   @ques No default value
    -   会不会是 cocos 的 %s 导致的
    -   在线上看看 这可能在什么地方出现

## 2020-01-29 17:08:18

-   @todo 其实根本就不需要 context...

## 2020-01-29 16:21:57

-   @ques 每次打开的弹出层 没有重新的 render

    -   字体显示不清楚

-   @ques 自己写一个弹出层管理器..

-   @ques 怎么将这 showPop 变成全局的

-   @ques react useHook 在其他地方使用...

-   @ques Sprite graphics 属性如何设置

-   @ques 打开弹出层导致屏幕抖动

-   @opt[性能] @ques showPop 好像会频繁的创建 + 销毁 对象 这怎么处理
    -   如何防止频繁的创建销毁对象, 包括他的子集
    -   react HostConfig 有没有吧提供 api 去做这些事情
    -   在创建对象的地方打断点
    -   ***
    -   好像和 Context 有关
    -   @ques zhengming

## 2020-01-29 12:11:38

-   @ques 怎么打开弹出层

    -   @todo 感觉这不太好处理啊
    -   弹出层没有剧中... 没有背景... 无法关闭
    -   ***
    -   reUse
    -   能不能模拟原生的逻辑

-   @ques ref 在 hook 中怎么用

*   @ques useState 能不能不在函数中执行 ...
    -   我就可以将 PopContext 所有方法放在一个地方
*   @ques getPublicInstance

### save

-   @todo 显示隐藏的动画效果 怎么处理

-   @todo 事件交互

*   @todo 如何解决性能问题

-   @ques react useEffect 第二个参数是干什么的

-   @ques 一些特殊的组件 会不会有问题

    -   renderType render list>scrollBar

-   @ques 如何和 ui 编辑器合作

### finish

-   @todo react 是先渲染子然后才是父亲 和 laya 不一样

    -   所以 laya 中子类依赖父类的样式 就会有问题

-   @ques type `JSX.Element`
-   @ques 如何加载场景的资源资源

    -   loading 的样式
    -   loading 中执行多次 怎么处理
    -   将资源提取出来

*   @ques resolve './header'

## 2020-01-28 11:12:05

-   有没有现成的 customRender

-   还有什么需要我做的

-   @ques 能不能直接引用 laya 的类

    -   不用自己再倒一遍

-   @ques text 怎么处理

-   完善类型 react 的类型

-   @ques 能不能支持 context api

*   mobx
