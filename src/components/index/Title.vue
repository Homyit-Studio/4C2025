<script setup>

import { ref, onMounted } from 'vue'

const stdDeviation = ref(15)

const animateStdDeviation = () => {
    const duration = 3000 // 动画总时长 3 秒
    const startValue = stdDeviation.value
    const startTime = Date.now()

    const update = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1) // 限制进度不超过 1
        stdDeviation.value = startValue * (1 - progress) // 线性递减

        if (progress < 1) {
            requestAnimationFrame(update)
        } else {
            stdDeviation.value = 0
        }
    }

    requestAnimationFrame(update)
}

onMounted(() => {
    animateStdDeviation()
})
</script>

<template>
    <div>
        <div class="title-container">
            <text>互联科技商城</text>
        </div>

        <svg style="display: none;">
            <defs>
                <filter id="disintegrate">
                    <!-- 高斯模糊 -->
                    <feGaussianBlur in="SourceGraphic" :stdDeviation="stdDeviation" result="blur" />
                    <!-- 第二步：对比度增强 -->
                    <feColorMatrix values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 40 -30" in="blur" type="matrix" />
                </filter>
            </defs>
        </svg>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'title-big';
    src: url(../../assets/fonts/NT-title-big.ttf);
}

.title-container {
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    pointer-events: none;
    filter: url(#disintegrate);
}

text {
    color: #ffffff;
    font-size: 9vw;
    transition: all 0.3s;
    font-family: 'title-big';
    animation:
        showup 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes showup {
    from {
        letter-spacing: -10vw;
    }

    to {
        letter-spacing: 1.2vw;
    }
}


@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* 添加关键样式 */
path {
    stroke: currentColor;
    stroke-width: 4px;
    color: var(--path-color);
    fill: none !important;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 0 5px currentColor);
    animation: draw 3s ease-in-out forwards,
        pulse 3s ease-in-out infinite;
}

/* 优化动画效果 */
@keyframes draw {
    to {
        stroke-dashoffset: 0;
        stroke-width: 2.5px;
    }
}



/* 为指定路径应用动画 */
#svg_6,
#svg_7 {
    animation: rotate 4s linear infinite;
    transform-origin: center;
    /* 围绕自身中心旋转 */
    transform-box: fill-box;
    /* 确保旋转中心计算基于图形自身 */
}

#svg_1 {
    --path-color: #00ffff
}

#svg_2 {
    --path-color: #00ffff
}

#svg_3 {
    --path-color: #00ffff
}

#svg_4 {
    --path-color: #7f00ff
}

#svg_5 {
    --path-color: #7f00ff
}

#svg_6 {
    --path-color: #7f00ff
}

#svg_7 {
    --path-color: #7f00ff
}

#svg_8 {
    --path-color: #0000ff
}

#svg_9 {
    --path-color: #0000ff
}

#svg_10 {
    --path-color: #0000ff
}

#svg_11 {
    --path-color: #7f00ff
}

#svg_12 {
    --path-color: #0000ff
}

#svg_13 {
    --path-color: #00ffff
}

#svg_14 {
    --path-color: #00ffff
}

#svg_15 {
    --path-color: #00ffff
}

#svg_16 {
    --path-color: #00ffff
}
</style>