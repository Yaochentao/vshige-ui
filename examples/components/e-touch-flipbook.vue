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
                <div class="front">1正</div>
                <div class="back">1反</div>
            </div>
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