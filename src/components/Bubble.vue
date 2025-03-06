<template>
    <div class="footer">
        <div class="bubbles">
            <div v-for="(bubble, index) in bubbles" :key="index" class="bubble" :style="bubble.style"
                @animationend="removeBubble(index)"></div>
        </div>
    </div>
    <!-- 保持 SVG 滤镜 -->
    <svg style="display: none">
        <defs>
            <filter id="bubble">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 30 -10" in="blur" type="matrix" />
            </filter>
        </defs>
    </svg>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const bubbles = ref([])
let intervalId = null
const vw = ref(document.documentElement.clientWidth)

const createBubble = () => {
    const s = Math.random() * 100
    const x = Math.random() * (vw.value - s)
    const d = Math.random() * 2 + 5

    return {
        style: {
            '--x': `${x}px`,
            '--s': `${s}px`,
            '--d': `${d}s`
        }
    }
}

const removeBubble = (index) => {
    bubbles.value.splice(index, 1)
}

const handleResize = () => {
    vw.value = document.documentElement.clientWidth
}


onMounted(() => {
    // 初始创建
    bubbles.value = Array.from({ length: 10 }, createBubble)


    // 定时创建
    intervalId = setInterval(() => {
        if (bubbles.value.length < 40) { // 控制最大气泡数量
            bubbles.value.push(createBubble())
        }
    }, 500)

    // 响应式处理窗口尺寸变化
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    clearInterval(intervalId)
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.footer {
    width: 100%;
    z-index: -1;
    position: absolute;
    width: 100%;
    /* height: 200px; */
    bottom: 0;
    /* height: 200px; */
    /* position: relative; */
    /* background-color: rgb(158, 78, 78); */
}

.bubbles {
    z-index: 0;
    /* position: absolute; */
    width: 100%;
    height: 100px;
    border-radius: 50% 50% 0 0;
    filter: url(#bubble);
    background-color: #E05252;
}

.bubble {
    z-index: -1;
    position: absolute;
    border-radius: 50%;
    background-color: #E05252;
    width: var(--s);
    height: var(--s);
    left: var(--x);
    top: 100px;
    animation: bubbling var(--d) infinite forwards;
}

@keyframes bubbling {
    75% {
        transform: scale(1);
    }

    to {
        transform: scale(0);
        top: -500px;
        opacity: 0;
    }
}
</style>