<template>
    <div class="e-container">
        <touch-flipbook>
            <div class="page p0">
                <div class="front">0正</div>
                <div class="back">0反</div>
            </div>
            <!-- /* page2为翻页之后显示的*/  -->
            <div class="page p1">
                <div class="front">1正</div>
                <div class="back">1反</div>
            </div>
            <div class="page p2">
                <div class="front">2正</div>
                <div class="back">2反</div>
            </div>
            <!-- <div class="page p3">
                <div class="front">3正</div>
                <div class="back">3反</div>
            </div> -->
        </touch-flipbook>
    </div>
</template>
<script>
    import touchFlipbook from '../../packages/touch-flipbook/src/touch-flipbook'
    export default {
        components: {
            touchFlipbook
        }
    }
</script>

<style lang="less" scoped>
            .p0 {
                .front {
                    background: yellow;
                    // 保证翻转前正面z-index大于反面 翻转后两者值互换
                }

                .back {
                    background: red;
                }
            }

            .p1 {
                .front {
                    background: green;
                    // 保证翻转前正面z-index大于反面 翻转后两者值互换
                }

                .back {
                    background: blueviolet;
                }
            }

            .p2 {
                .front {
                    background: #213123;
                    // 保证翻转前正面z-index大于反面 翻转后两者值互换
                }

                .back {
                    background: #766577;
                }
            }
            .p3 {
                .front {
                    background: #213aa3;
                    // 保证翻转前正面z-index大于反面 翻转后两者值互换
                }

                .back {
                    background: #7b6577;
                }
            }
</style>
