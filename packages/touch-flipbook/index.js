// 导入组件，组件必须声明 name
import touchFlipbook from './src/touch-flipbook'

// 为组件提供 install 安装方法，供按需引入
touchFlipbook.install = function (Vue) {
  Vue.component(touchFlipbook.name, touchFlipbook)
}

// 默认导出组件
export default touchFlipbook