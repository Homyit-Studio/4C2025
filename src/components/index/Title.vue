<script setup>
import { ref, onMounted } from 'vue'

const stdDeviation = ref(15)
const titleFilter = ref('url(#disintegrate)')

const animateStdDeviation = () => {
    const duration = 3000
    const startValue = stdDeviation.value
    const startTime = Date.now()

    const update = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        stdDeviation.value = startValue * (1 - progress)

        if (progress < 1) {
            requestAnimationFrame(update)
        } else {
            // 添加渐变效果
            const shadowDuration = 1500 // 1.5秒
            const shadowStartTime = Date.now()

            const updateShadow = () => {
                const shadowElapsed = Date.now() - shadowStartTime
                const shadowProgress = Math.min(shadowElapsed / shadowDuration, 1)

                // 使用 cubic-bezier 缓动函数
                const easeProgress = cubicBezier(0.4, 0, 0.2, 1)(shadowProgress)

                const shadowIntensity = 20 * easeProgress
                titleFilter.value = `url(#disintegrate) drop-shadow(0 0 ${shadowIntensity}px #409EFF)`

                if (shadowProgress < 1) {
                    requestAnimationFrame(updateShadow)
                }
            }

            requestAnimationFrame(updateShadow)
        }
    }

    requestAnimationFrame(update)
}

// 添加 cubic-bezier 辅助函数
function cubicBezier(x1, y1, x2, y2) {
    return t => {
        const cx = 3 * x1
        const bx = 3 * (x2 - x1) - cx
        const ax = 1 - cx - bx

        const cy = 3 * y1
        const by = 3 * (y2 - y1) - cy
        const ay = 1 - cy - by

        const sampleCurveX = t => ((ax * t + bx) * t + cx) * t
        const sampleCurveY = t => ((ay * t + by) * t + cy) * t

        return sampleCurveY(t)
    }
}

onMounted(() => {
    animateStdDeviation()
})
</script>

<template>
    <div>
        <div class="title-container" :style="{ filter: titleFilter }">
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
/* #svg_6,
#svg_7 {
    animation: rotate 4s linear infinite;
    transform-origin: center;
    transform-box: fill-box;
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
} */
</style>