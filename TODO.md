1. preset 设置为 es2015 和 node5 的时候，对于 destructuring，前后两次的测试结果正好相反。查看了 testCase 细节，es2015 的时候，destructuring 的 case 是在中间运行的，node5 的时候是第一个运行的。这个问题没找到原因.
1. 添加 plugin 彼此间的约束关系
1. 组件的顺序要跟preset 和 plugins 定义的顺序保持一致
1. 添加 esExperimentailFeatures 对应的testCases