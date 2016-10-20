## Faster JS For Node

> A tool is used to optimize which babel plugins should be used to transform es6/7/next features according to the runtime node enviroment and the babel config.

node 有很多版本，4.0.0 以后的版本都开始支持 es2015 的 features。利用 babel 可以将我们的 esnext 代码做适当转换，让其可以运行在 node 上。node 6.5.0 已经支持了 99% 的 es2015 的 features。那么是不是这 99% 的 features 我们就可以不用经过转换直接跑在 node 上了呢？

答案是肯定的，但是我们忽略了一个问题，就是这些代码运行速度如何呢？是不是 esnext 在 node 上跑的速度就比 es5 快呢？目前来看，答案是否定的。这里参考了 alloyteam 的一篇名为 “nodejs support es6 features”（链接见文尾）的文章，其中性能一节就提到了这个问题。当时眼前一亮，感觉这是一个能做出点成果的方向，决定就这个问题做的更深入点。于是就有了这个项目，其目标就是针对不同版本的 node 环境，检测其支持的 esnext 的 features，同时测试这些 features 的运行速度，与 babel 转换的代码的运行速度对比，根据运行速度快慢的对比，给出推荐的 babel plugin 配置选项。


### 完成功能

1. 目前只支持 node 6.5 及以上版本


### 环境要求

babel: 6.x
node: >= 6.5.x

### 用法说明

```js
var fasterJS = require('faster-js-for-node');

var res = fasterJS({
  babelrc: false,
  presets: [
    'react',
    'es2015',
    'stage-0'
  ],
  plugins: [
    'transform-runtime',
    'transform-object-rest-spread',
    'transform-decorators-legacy'
  ]
});

res.then(ret => {
  console.log('recommendedPluginArr', ret.recommendedPluginArr);
  console.log('recommenedRemovePluginArr', ret.recommenedRemovePluginArr);
});
```


#### 参考资料：

1. [babel 开发必看](http://babeljs.io/docs/plugins/#modules)
1. [nodejs support es6 features](http://www.alloyteam.com/2016/07/nodejs-native-support-of-the-es6-features/?utm_source=tuicool&utm_medium=referral)
1. [babel 首页](http://babeljs.io/)
1. [babel try it out](http://babeljs.io/repl/)
1. [ES6 features](https://github.com/lukehoban/es6features)
1. [ES6-benchmark](https://github.com/DavidCai1993/ES6-benchmark)
1. [node green](http://node.green/)
1. [es5/6/7 compat-table](https://github.com/kangax/compat-table/)