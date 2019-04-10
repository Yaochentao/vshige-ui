<template>
    <div class="tabs-con" ref="tabsCon">
        <div class="tab-name-con" v-if="this.tabsName.length > 0">
            <div @click="setIndex(index)" class="tab-name" :class="{'active': index == nowIndex}" v-for="(item,index) in this.tabsName" :key="index">{{item}}</div>
        </div>
        <div class="swipe-tab" ref="swipeTab" @touchstart.prevent="tabsTouchStart" @touchmove.prevent="tabsTouchMove"
            @touchend="tabsTouchEnd">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'swipeTab',
        model: {
            prop: '_nowIndex',
            event: 'indexChange'
        },
        props: {
            _nowIndex: {
                type: Number,
                default: 0 //目前的tab索引
            },
            speed: {
                type: Number,
                default: 300 //滑动动画的速度
            },
            xThreshold: {
                type: Number,
                default: 0.25 //滑动切换tab的阈值
            },
            tabsName: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                touch: {}, //touch对象，用来记录touch事件的一些值
                width: 0,
                height: 0,
                totalWidth: 0,
                tabs: [],
                left: 0,
                deltaX: 0,
                deltaY: 0,
                nowIndex: 0,
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let swipeTab = this.$refs.swipeTab;
                this.tabs = swipeTab.querySelectorAll('.tab-con');
                this.width = this.$refs.tabsCon.clientWidth;
                this.height = swipeTab.clientHeight;
                this.totalWidth = this.width * this.tabs.length;
                swipeTab.style.width = this.tabs.length * 100 + 'vw';

                [].forEach.call(this.tabs, (ele) => {
                    ele.style.display = 'inline-block'
                    ele.style.width = '100vw'
                    // ele.style.overflow = 'auto'
                    // ele.style.WebkitOverflowScrolling = 'touch'
                    ele.style.verticalAlign = 'top'
                })
            },
            tabsTouchStart(e) {
                this.touch.initiated = true; //设置表示touch开始的标志位initiated 判断是否是一次滑动
                this.touch.moved = false;
                const touch = e.touches[0];
                this.touch.startX = touch.pageX;
                this.touch.startY = touch.pageY;
            },
            tabsTouchMove(e) {
                if (!this.touch.initiated) {
                    return
                }
                const touch = e.touches[0];
                this.deltaX = touch.pageX - this.touch.startX;
                this.deltaY = touch.pageY - this.touch.startY;
                if (Math.abs(this.deltaY) > Math.abs(this.deltaX)) { //纵向滚动距离大于横向滚动距离时return
                    return
                }
                if (!this.touch.moved) {
                    this.touch.moved = true;
                }
                const offsetWidth = this.deltaX + this.left;
                let swipeTab = this.$refs.swipeTab;
                
                swipeTab.style.transition = 'all 0s';
                this.changeTransform(swipeTab, offsetWidth)


            },
            tabsTouchEnd(e) {
                if (!this.touch.moved) {
                    return
                }
                let swipeTab = this.$refs.swipeTab;
                swipeTab.style.transition = 'all ' + this.speed / 1000 + 's';
                
                console.log(Math.abs(this.deltaX))
                if (Math.abs(this.deltaX) < this.width * this.xThreshold) {
                    console.log('小于')
                    this.changeTransform(swipeTab, this.left)
                    this.deltaX = 0;

                } else {
                    this.left = this.left + this.deltaX / Math.abs(this.deltaX) * this.width //正加一个width负减一个width
                    if (this.left > 0) {
                        this.left = 0
                    }
                    if (this.left <= -this.totalWidth) {
                        this.left = -(this.totalWidth - this.width)
                    }
                    this.changeTransform(swipeTab, this.left)
                }
                this.nowIndex = Math.abs(this.left) / this.width 

            },
            changeTransform(ele, left) {
                ele.style.transform = `translate3d(${left}px,0,0)`;
                ele.style.webkitTransform = `translate3d(${left}px,0,0)`;
            },
            setIndex(index) {
                this.nowIndex = index;
            }
        },
        watch: {
            _nowIndex(index) {
                this.nowIndex = index;
                this.left = -index * this.width;
                let swipeTab = this.$refs.swipeTab;
                swipeTab.style.transition = 'all ' + this.speed / 1000 + 's';
                this.changeTransform(swipeTab,this.left)
            },
            nowIndex(index) {
                this.$emit('indexChange', index);   
                this.left = -index * this.width;
                let swipeTab = this.$refs.swipeTab;
                swipeTab.style.transition = 'all ' + this.speed / 1000 + 's';
                this.changeTransform(swipeTab,this.left)
            }
        }
    }
</script>

<style lang="less" scoped>
    .tabs-con {
        width: 100vw;
        overflow: hidden;
        .tab-name-con {
            height: 6vh;
            min-width: 100vw;
            display: flex;
            .tab-name {
                transition: font-size 0.3s ease;
                text-align: center;
                line-height: 6vh;
                font-size: 2vh;
                color: #9D9D9D;
                flex: 1;
            }
            .active {
                color: #000;
                font-size: 2.2vh;
            }
        }
        .swipe-tab {
            font-size: 0;
            height: 100%;
            overflow: hidden;
            position: relative;
        }
    }

    
</style>