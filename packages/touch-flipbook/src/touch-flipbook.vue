<template>
    <div class="touch-flipbook">
        <!-- /* page有前后两面 */ -->
        <div :ref="'p'+pageIndex" class="page p0">
            <div class="front">0正</div>
            <div class="back">0反</div>
        </div>
        <!-- /* page2为翻页之后显示的*/  -->
        <div ref="p1" class="page p1" @click="changePage">
            <div class="front">1正</div>
            <div class="back">1反</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'touchFlipbook',
        data() {
            return {
                pageIndex: 4
            }
        },
        mounted() {
            console.log(this.$refs)
        },
        methods: {
            changePage() {
                console.log(this.$refs.p1)
                let page = this.$refs.p1;
                page.style.WebkitTransform = 'perspective(800px) rotateX(180deg)';
                page.childNodes[0].style.zIndex = '3';
                page.childNodes[1].style.zIndex = '4';
            }
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
            position: relative;
            /* 将开启3d空间，方便翻页后front和back的3d变换 */
            transform-style: preserve-3d;
            /* 奇点设为左边 */
            transform-origin: center top;
            /* 设置翻书（旋转）的运动时间，运动形式 */
            transition: 1s  ease;
            transition-property: transform;
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
        &.p0 {
            z-index: 2;
            .front {
                z-index: 2;  
                background: yellow; 
                // 保证翻转前正面z-index大于反面 翻转后两者值互换
            }
            .back {
                z-index: 1;
                background: red;
            }
            }
        &.p1 {
            z-index: 4;
            .front {
                z-index: 4;  
                background: green; 
                // 保证翻转前正面z-index大于反面 翻转后两者值互换
            }
            .back {
                z-index: 3;
                background: blueviolet;
            }
            }
        }
    }
</style>