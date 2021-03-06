# vshige-ui

## 安装
```
npm install vshige-ui
```

### 使用
```
 //main.js
 import vshigeUI from 'vshige-ui'
 Vue.use(vshigeUI)
```

### 在项目中使用
```
<template>
    <swipe-tab></swipe-tab>
</template>
```

### 滑动tab（swipe-tab）组件示例

```
<template>
  <div id="app">
    <div class="con">
      <swipe-tab :tabsName= "tabsName" v-model = "index">
        <div class="tab-con" style="background: #2aa;height: 100px"></div>
        <div class="tab-con" style="background: #a2a;height: 200px"></div>
        <div class="tab-con" style="background: #aa2;height: 300px"></div>
      </swipe-tab>
      <button @click="test">父组件中随机修改当前Index</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        index: 2,
        tabsName: ['name0','name1','name2']
      }
    },
    methods: {
      test() {
        let index = Math.floor(Math.random() * this.tabsName.length)
        this.index = index;
      }
    },
  }
</script>


<style>
  * {
    margin: 0;
    padding: 0;
  }
  .tab-con {
    display: inline-block;
    height: 100px;
  }
</style>
```

**props**

| 参数       | 说明                             | 默认值 |
| ---------- | -------------------------------- | ------ |
| value      | 当前tab的索引，可通过v-model绑定 |        |
| speed      | 滑动动画的速度（ms）             | 300    |
| xThreshold | 滑动切换tab的阈值(0~1)           | 0.25   |
| tabsName   | 顶部tab接收值为数组              |        |

