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
                deltaDeg: 0, //角度变化值
                deg: [], //当前角度值
                offsetDeg: 0, //角度需要设置的值
                next: true, //判断上下翻的标志位
                pageZindex: [],
                lastZindex: 0,
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
                for (let i = 0; i <= this.pages.length - 1; i++) {
                    this.deg.push(0);
                    this.pageZindex.push(0);
                };
                // console.log(this.pages[0]);
                this.pages[0].childNodes[1].style.transform = 'scaleY(1)';
                this.pages[0].childNodes[1].style.webkitTransform = 'scaleY(1)'; //复原第一页

                this.nextPage = this.pages[1];
                this.nowPage = this.pages[0];

                this.nowPage.style.zIndex = '1';
                this.nextPage.style.zIndex = '2'; //初始化前两页z-index

                // this.nowPage.childNodes[0].style.zIndex = `${this.pageZindex[this.nowIndex] +3}`;
                // this.nowPage.childNodes[1].style.zIndex = `${this.pageZindex[this.nowIndex] +2}`;

                this.nowPage.childNodes[0].style.zIndex = '2';
                this.nowPage.childNodes[1].style.zIndex = '1';

                this.nextPage.childNodes[0].style.zIndex = '3';
                this.nextPage.childNodes[1].style.zIndex = '2';

            },
            TouchStart(e) {
                this.touch.initiated = true; //设置表示touch开始的标志位initiated 判断是否是一次滑动
                this.touch.moved = false;
                const touch = e.touches[0];
                this.touch.startX = touch.pageX;
                this.touch.startY = touch.pageY;
                if (this.nowIndex < this.pages.length - 2) { //在nextPage不是最后一页时，设置nextPage的下一页的z-index
                    this.pages[this.nextIndex + 1].childNodes[0].style.zIndex = this.pageZindex[this.nextIndex] + 3;
                    this.pages[this.nextIndex + 1].childNodes[1].style.zIndex = this.pageZindex[this.nextIndex] + 2;
                }
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

                this.deltaDeg = -this.deltaY / 300 * 180;
                // console.log(this.deltaDeg);
                // console.log(deg);
                if (this.deltaDeg > 0) {
                    this.next = true;
                    this.offsetDeg = this.deg[this.nextIndex] + this.deltaDeg;
                    // console.log(this.offsetDeg)
                    if (this.offsetDeg < 0) {
                        this.deg[this.nextIndex] = 0;
                        return;
                    } else if (this.offsetDeg > 180) {
                        this.deg[this.nextIndex] = 180;
                        return;
                    } else {
                        if (this.offsetDeg > 90) {
                            this.pageZindex[this.nextIndex] = this.pageZindex[this.nowIndex] + 3;
                            this.nextPage.childNodes[0].style.zIndex = this.pageZindex[this.nextIndex] + 1;
                            this.nextPage.childNodes[1].style.zIndex = this.pageZindex[this.nextIndex] + 2;
                        } else {
                            this.pageZindex[this.nextIndex] = this.pageZindex[this.nowIndex] + 2;
                            this.nextPage.childNodes[0].style.zIndex = this.pageZindex[this.nextIndex] + 2;
                            this.nextPage.childNodes[1].style.zIndex = this.pageZindex[this.nextIndex] + 1;
                        }
                        
                        // let max = this.findMax(this.pageZindex[this.nextIndex+1],this.pageZindex[this.nextIndex],this.pageZindex[this.nowIndex],this.pageZindex[this.nowIndex-1])
                        // console.log(this.pageZindex[this.nowIndex])
                        // console.log(this.pageZindex[this.nowIndex -1])
                        // console.log(max)
                        // this.pages[this.nextIndex].style.zIndex = max + 1;
                        this.pages[this.nextIndex].style.zIndex = this.pageZindex[this.nextIndex];

                    }
                    this.nextPage.style.transition = 'all 0s';
                    this.changeTransform(this.nextPage, this.offsetDeg);
                } else {
                    this.next = false;
                    this.offsetDeg = this.deg[this.nowIndex] + this.deltaDeg;
                    // console.log(this.offsetDeg)
                    if (this.offsetDeg < 0) {
                        this.deg[this.nowIndex] = 0;
                        return;
                    } else if (this.offsetDeg > 180) {
                        this.deg[this.nowIndex] = 180;
                        return;
                    } else {
                        if (this.nowIndex < this.pages.length - 1) {
                            console.log(this.pageZindex[this.nextIndex])
                            if (this.offsetDeg > 90) {
                                this.pageZindex[this.nowIndex] = this.pageZindex[this.nextIndex] + 3;
                                this.nowPage.childNodes[0].style.zIndex = this.pageZindex[this.nowIndex] + 1;
                                this.nowPage.childNodes[1].style.zIndex = this.pageZindex[this.nowIndex] + 2;
                            } else {
                                this.pageZindex[this.nowIndex] = this.pageZindex[this.nextIndex] + 2;
                                this.nowPage.childNodes[0].style.zIndex = this.pageZindex[this.nowIndex] + 2;
                                this.nowPage.childNodes[1].style.zIndex = this.pageZindex[this.nowIndex] + 1;
                            }
                        } else {

                            this.pageZindex[this.nowIndex] = this.lastZindex + 1;
                        }

                        console.log(this.pageZindex[this.nextIndex])
                        // console.log(this.pageZindex[this.nowIndex])

                        this.pages[this.nowIndex].style.zIndex = this.pageZindex[this.nowIndex];
                    }
                    this.nowPage.style.transition = 'all 0s';
                    // console.log(this.nowIndex)
                    // console.log(this.nowPage)
                    this.changeTransform(this.nowPage, this.offsetDeg);
                }
                // console.log(this.offsetDeg)


            },
            TouchEnd() {
                // console.log(this.pages)
                if (this.next === true) {
                    if (this.nowIndex < this.pages.length - 2) { //在nextPage不是最后一页时，设置nextPage的下一页的z-index
                        // console.log(1);
                        this.pages[this.nextIndex + 1].style.zIndex = this.pageZindex[this.nextIndex];
                    }

                    if (this.offsetDeg < 90) {
                        // console.log(this.nowIndex)
                        this.offsetDeg = 0;
                        this.deg[this.nextIndex] = 0;
                        // if (this.nowIndex >= 1) {
                        //     this.nowIndex = this.nowIndex - 1;
                        // }

                    } else if (this.offsetDeg > 90) {
                        // console.log(this.pages.length)
                        this.offsetDeg = 180;
                        this.deg[this.nextIndex] = 180;
                        this.nowIndex = this.nowIndex + 1;
                        // console.log(this.nowIndex)

                    }
                    this.changeTransform(this.nextPage, this.offsetDeg);
                } else {
                    // if (this.nowIndex > 0) { //在nextPage不是最后一页时，设置nextPage的下一页的z-index
                    //     console.log(1);
                    //     this.pages[this.nextIndex + 1].style.zIndex = this.pageZindex[this.nextIndex];
                    // }

                    if (this.offsetDeg < 90) {
                        console.log(this.nowIndex)
                        this.offsetDeg = 0;
                        this.deg[this.nowIndex] = 0;
                        if (this.nowIndex >= 1) {
                            this.nowIndex = this.nowIndex - 1;
                        }

                    } else if (this.offsetDeg > 90) {
                        console.log(this.pages.length)
                        this.offsetDeg = 180;
                        this.deg[this.nowIndex] = 180;
                        console.log(this.nowIndex)

                    }
                    this.changeTransform(this.nowPage, this.offsetDeg);
                }

            },
            changeTransform(ele, deg) {
                console.log(ele)
                ele.style.transform = `perspective(800px) rotateX(${deg}deg)`;
                ele.style.webkitTransform = `perspective(800px) rotateX(${deg}deg)`;
            },
            findMax() {
                let arr = [...arguments];
                console.log()
                for (let i = 0; i < arr.length; i++) {
                    if(arr[i] === undefined) {
                        arr[i] = 0;
                    }
                }
                arr.sort((a,b) => {
                    return b - a;
                })
                return arr[0];
            }

        },
        watch: {
            nowIndex(newIndex) {
                if (newIndex < this.pages.length) {
                    this.nowPage = this.pages[newIndex];
                    this.nextPage = this.pages[newIndex + 1]
                    // console.log(this.nowIndex)
                    // console.log(this.nowPage)
                    // console.log(this.nextPage)
                    
                    if (newIndex == this.pages.length - 1) {
                        console.log('last')
                        this.lastZindex = this.pageZindex[this.nowIndex];
                    }
                }
            }
        },
        computed: {
            nextIndex() {

                if (this.nowIndex < this.pages.length - 1) {
                    return this.nowIndex + 1;
                } else {
                    return this.nowIndex;
                }
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
        }

    }
</style>