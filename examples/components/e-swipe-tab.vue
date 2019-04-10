<template>
    <div class="e-container">
      <swipe-tab :tabsName= "tabsName" v-model = "index">
        <div class="tab-con" style="background: #2aa;height: 100px"></div>
        <div class="tab-con" style="background: #a2a;height: 200px"></div>
        <div class="tab-con" style="background: #aa2;height: 300px"></div>
      </swipe-tab>
      <button @click="test">父组件中随机修改当前Index</button>
    </div>
</template>
<script>
  import swipeTab from '../../packages/swipe-tab/src/swipe-tab'
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
    components: {
      swipeTab
    }
  }
</script>


<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .tab-con {
    display: inline-block;
    height: 100px;
  }
</style>