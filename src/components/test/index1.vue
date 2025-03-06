<script setup>
import MacDock from '@/components/MacDock.vue';
import NavHeader from '@/components/NavHeader.vue';
import { ref, onMounted } from 'vue'

const width = 1200
const height = 200
const baseFreq = ref(0)
const displaceScale = ref(0)
const letterSpacing = ref(-150) // 新增字母间距响应式变量

onMounted(() => {
    let start = null
    const duration = 1000

    const animate = (timestamp) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const ratio = Math.min(progress / duration, 1)

        // 使用缓入缓出函数
        const easeInOut = ratio < 0.5
            ? 2 * ratio * ratio
            : 1 - Math.pow(-2 * ratio + 2, 2) / 2

        // 调整动画方向：先增加扰动再减少
        baseFreq.value = 0.1 - easeInOut * 0.1
        displaceScale.value = 120 - easeInOut * 120

        // 字母间距从-50到10
        letterSpacing.value = -50 + easeInOut * 60

        if (progress < duration) {
            requestAnimationFrame(animate)
        } else {
            // 最终重置确保回到初始状态
            baseFreq.value = 0
            displaceScale.value = 0
            letterSpacing.value = 10 // 保持最终间距
        }
    }

    requestAnimationFrame(animate)
})
</script>

<template>
    <NavHeader />
    <MacDock />
    <div class="container">
        <div class="item">
            <div class="title-container">
                <svg :width="width" :height="height">
                    <filter id="disintegrate">
                        <feTurbulence id="turb" type="fractalNoise" :baseFrequency="baseFreq" numOctaves="3"
                            result="turbulence" />
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" :scale="displaceScale"
                            xChannelSelector="R" yChannelSelector="G" />
                    </filter>

                    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="160"
                        font-weight="100" :style="{ letterSpacing: `${letterSpacing}px` }" filter="url(#disintegrate)">
                        互联科技商城
                    </text>
                </svg>
            </div>
        </div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="footer">footer</div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'title-big';
    src: url(../assets/fonts/NT-title-big.ttf);
}

.title-container {
    position: relative;
}

text {
    fill: #2196f3;
    transition: all 0.3s;
    font-family: 'title-big';
    /* 确保字体已正确引入 */
}

svg {
    border: 1px solid #eee;
}


.container {
    font-size: 5em;
    scroll-snap-type: y proximity;
    overflow-y: scroll;
    height: 100vh;
}

.item {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    scroll-snap-align: start;
    /* 在滚动此元素的滚动容器的可见视口时，滚动容器可“越过”吸附位置。 */
    scroll-snap-stop: normal;
}

.footer {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    scroll-snap-align: start;
    /* 在滚动此元素的滚动容器的可见视口时，滚动容器可“越过”吸附位置。 */
    scroll-snap-stop: normal;
}


.item:nth-child(2) {
    background-color: rgb(59, 123, 59);
}

.item:nth-child(3) {
    background-color: rgb(90, 90, 167);
}
</style>