<template>
    <div class="menu" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter"
        ref="dock">
        <div v-for="(icon, index) in icons" :key="index" @click="handleItemClick(index)">
            <div class="menu-item" :style="{
                backgroundColor: getItemColor(index),
                filter: hoverIndex === index ? `drop-shadow(0 0 20px ${getItemColor(index)})` : 'none'
            }" @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = null">
                <img :src="icon" type="image/svg+xml" class="icon"></img>
            </div>
            <div class="gap" v-if="index !== icons.length - 1"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


const props = defineProps({
    icons: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['item-click'])

// 颜色生成逻辑（示例：HSL渐变色）
const getItemColor = (index) => {
    const hue = (index * 360) / props.icons.length
    return `hsl(${hue}deg, 70%, 60%)`
}

// 点击处理
const handleItemClick = (index) => {
    emit('item-click', index)
}

// const initSVG = (e) => {
//     const svgDoc = e.target.contentDocument;
//     const svg = svgDoc.documentElement
//     svg.querySelectorAll('path').forEach(path => {
//         const length = path.getTotalLength();
//         path.style.stroke = '#fff';
//         path.style.strokeWidth = '20px';
//         path.style.strokeLinecap = 'round';
//         path.style.strokeLinejoin = 'round';
//         path.style.fill = 'none';
//         path.style.strokeDasharray = length;
//         path.style.strokeDashoffset = length; // 修复：初始设置为长度
//     });
// }

const dock = ref(null)
const items = ref([])
const gaps = ref([])
const range = 600
const maxScale = 1.3
const baseHeight = ref(0)
const baseGapHeight = 20 // 基础间隙高度
const hoverIndex = ref(null)

onMounted(() => {
    items.value = [...dock.value.querySelectorAll('.menu-item')]
    gaps.value = [...dock.value.querySelectorAll('.gap')]
    baseHeight.value = dock.value.getBoundingClientRect().height
})

const handleMouseMove = (e) => {
    const rect = dock.value.getBoundingClientRect()
    const mouseY = e.clientY
    const curve = createCurve(range, mouseY, 1, maxScale)
    layout(curve, rect)
}

const layout = (curve, dockRect) => {
    // 先处理所有图块缩放
    const scales = items.value.map(item => {
        const rect = item.getBoundingClientRect()
        const itemCenterY = rect.top + rect.height / 2
        const scale = curve(itemCenterY)
        item.style.transform = `scale(${scale}) translateX(${(scale - 1) * -20}px)`
        return scale
    })

    // 基于相邻图块缩放处理间隙
    gaps.value.forEach((gap, index) => {
        const prevScale = scales[index]
        const nextScale = scales[index + 1]
        const maxScale = Math.max(prevScale, nextScale)
        const height = baseGapHeight + Math.pow(maxScale - 1, 2) * 80
        gap.style.height = `${height}px`
    })
}

const handleMouseLeave = () => {
    items.value.forEach(item => item.style.transform = 'scale(1)')
    gaps.value.forEach(gap => gap.style.height = `${baseGapHeight}px`)
    dock.value.style.height = `${baseHeight.value}px`
}

const handleMouseEnter = () => {
    const rect = dock.value.getBoundingClientRect()
    const height = rect.bottom - rect.top + 5 * props.icons.length
    dock.value.style.height = `${height}px`
}

const createCurve = (totalDis, centerY, minScale, maxScale) => {
    return (y) => {
        const effectRange = totalDis * 1.2
        const beginY = centerY - effectRange / 2
        const endY = centerY + effectRange / 2
        if (y < beginY || y > endY) return minScale

        const t = (y - beginY) / effectRange
        const progress = Math.sin(t * Math.PI) // 保持正弦曲线
        return minScale + (maxScale - minScale) * progress
    }
}
</script>

<style scoped>
.menu {
    z-index: 10;
    position: fixed;
    right: 20px;
    top: 50%;
    padding: 12px 0px;
    border-radius: 12px;
    gap: 0;
    max-height: 80vh;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: height 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}

.menu-item {
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
    margin: 0 10px 0 10px;
    border-radius: 12px;
    background-color: rgb(34, 199, 158);
    transform-origin: right center;
    transition: transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    overflow: visible;
}

.gap {
    height: 20px;
    width: 60px;
    transition: height 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}


.menu-item {
    transition:
        transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28),
        background-color 0.3s !important;
}

.icon {
    width: 80%;
    height: 80%;
    color: #fff;
    pointer-events: none;
    /* 防止遮挡父级点击事件 */
    /* filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2)); */
}

/* 优化动画触发逻辑 */
.menu-item:hover .icon path {
    animation:
        dock-draw 1.5s ease-out forwards,
        pulse 2s ease-in-out infinite;
}

/* 添加初始加载动画 */
.menu-item .icon path {
    animation: dock-draw 1.5s ease-out forwards;
    animation-play-state: paused;
}

.menu-item:hover .icon path {
    animation-play-state: running;
}


@keyframes dock-draw {
    to {
        stroke-dashoffset: 0;
        /* 修正为0 */
        stroke-width: 25px;
    }
}

/* 复用NavHeader的pulse动画 */
@keyframes pulse {
    50% {
        filter:
            drop-shadow(0 0 5px currentColor) brightness(1.2);
    }
}

/* 优化现有样式 */
.menu-item {
    transition:
        transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28),
        /* background-color 0.3s ease !important, */
        filter 0.3s ease !important;
}

/* 添加点击动画 */
.menu-item:active {
    transform: scale(0.95) !important;
    transition: transform 0.1s;
}

@media (max-width: 768px) {

    /* 移动端适配 */
    .menu {
        right: 2vw;
        padding: 1vh 0;
        border-radius: 8px;
    }

    .menu-item {
        width: 8vw;
        height: 8vw;
        margin: 0 5px;
    }

    .gap {
        height: 10px;
    }
}
</style>