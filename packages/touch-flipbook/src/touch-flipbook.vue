<template>
    <div class="touch-flipbook" ref="touchCon" @touchstart.prevent="TouchStart" @touchmove.prevent="TouchMove"
            @touchend="TouchEnd">
        <!-- /* page有前后两面 */ -->
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'touchFlipbook',
        data() {
            return {
                touch: {}, //touch对象，用来记录touch事件的一些值
                nowIndex: 0,
                nowPage: {},
                nextPage: {},
                deltaX: 0,
                deltaY: 0,
                touchCon: {},
                pages: [],
                deltaDeg: 0,   //角度变化值
                deg: 0,     //当前角度值
                offstDeg: 0   //角度需要设置的值
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.touchCon = this.$refs.touchCon;
                // console.log(this.touchCon);
                this.pages = this.touchCon.querySelectorAll('.page');
                // console.log(this.pages[0]);
                this.pages[0].childNodes[1].style.transform = 'scaleY(1)';
                this.pages[0].childNodes[1].style.webkitTransform = 'scaleY(1)';
                this.nextPage = this.pages[1];
                this.nextPage.style.zIndex = '2';
                this.nextPage.childNodes[0].style.zIndex = '3';
                this.nextPage.childNodes[1].style.zIndex = '2';

            },
            TouchStart(e) {
                this.touch.initiated = true; //设置表示touch开始的标志位initiated 判断是否是一次滑动
                this.touch.moved = false;
                const touch = e.touches[0];
                this.touch.startX = touch.pageX;
                this.touch.startY = touch.pageY;
            },
            TouchMove(e) {
                if (!this.touch.initiated) {
                    return
                }
                const touch = e.touches[0];
                this.deltaX = touch.pageX - this.touch.startX;
                this.deltaY = touch.pageY - this.touch.startY;
                if (Math.abs(this.deltaY) < Math.abs(this.deltaX)) { //纵向滚动距离小于横向滚动距离时return
                    return
                }
                if (!this.touch.moved) {
                    this.touch.moved = true;
                }
                // console.log(-this.deltaY)   //-deltaY为正值是上翻  
                
                this.deltaDeg = -this.deltaY/300*180;
                // console.log(deg);
                this.offstDeg = this.deg + this.deltaDeg;
                // console.log(this.offstDeg)
                if(this.offstDeg < 0) {
                    this.deg = 0;
                    return;
                }else if(this.offstDeg > 180) {
                    this.deg = 180;
                    return;
                }else {
                    if(this.offstDeg > 90) {
                        this.nextPage.childNodes[0].style.zIndex = this.nowIndex + 2;
                        this.nextPage.childNodes[1].style.zIndex = this.nowIndex + 3;
                    } else {
                        this.nextPage.childNodes[0].style.zIndex = this.nowIndex + 3;
                        this.nextPage.childNodes[1].style.zIndex = this.nowIndex + 2;
                    }
                    
                }
                this.nextPage.style.transition = 'all 0s';
                this.changeTransform(this.nextPage,this.offstDeg);
                // console.log(this.offstDeg)
                

            },
            TouchEnd () {
                if(this.offstDeg < 90) {
                    console.log(this.nowIndex)
                    this.offstDeg = 0;
                    this.deg = 0;
                    if(this.nowIndex >= 1) {
                        this.nowIndex = this.nowIndex -1;
                    }
                    
                } else if(this.offstDeg > 90) {
                    console.log(this.nowIndex)
                    this.offstDeg = 180;
                    this.deg = 180;
                    if(this.nowIndex < this.pages.length - 1 ) {
                        this.nowIndex = this.nowIndex +1;
                    }
                    
                }
                this.changeTransform(this.nextPage,this.offstDeg);
            },
            changeTransform(ele, deg) {
                ele.style.transform = `perspective(800px) rotateX(${deg}deg)`;
                ele.style.webkitTransform = `perspective(800px) rotateX(${deg}deg)`;
            },

        },
        watch: {
            nowIndex(newIndex) {
                if(newIndex < this.pages.length - 1) {
                    this.nowPage = this.pages[newIndex];
                    this.nextPage = this.pages[newIndex+1]
                    console.log(this.nowIndex)
                    console.log(this.nowPage)
                    console.log(this.nextPage)
                }
            }
        },
        computed: {
            nextIndex() {
                return this.nowIndex + 1;
            },
        }
    }
</script>

<style lang="less" scoped>
    .touch-flipbook {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        .page {
            width: 100%;
            height: 50%;
            position: absolute;
            top: 50%;
            left: 0;
            /* 将开启3d空间，方便翻页后front和back的3d变换 */
            transform-style: preserve-3d;
            /* 奇点设为左边 */
            transform-origin: center top;
            /* 设置翻书（旋转）的运动时间，运动形式 */
            transition: 1s all ease;
            /* 提升层级否则会被盖住 */
            z-index: 1;
            /* 设置景深来更好的展示3D效果，并给旋转角度一个初始值，防止抖动发生 */
            transform: perspective(800px) rotateY(0deg);
            .front {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                // transition-property: none;
                /* 这里设置将back进行竖直方向上的镜像变化，因为当page旋转180°后， back显示的效果不对*/
                transform: scaleY(-1);
        }
        &:first-child {
            top: 0;
        }
        &.p0 {
            .front {
                background: yellow; 
                // 保证翻转前正面z-index大于反面 翻转后两者值互换
            }
            .back {
                background: red;
            }
            }
        &.p1 {
            .front {
                background: green; 
                // 保证翻转前正面z-index大于反面 翻转后两者值互换
            }
            .back {
                background: blueviolet;
            }
            }
        &.p2 {
            .front {
                background: #213123; 
                // 保证翻转前正面z-index大于反面 翻转后两者值互换
            }
            .back {
                background: #766577;
            }
        }   
        }
        
    }
</style>