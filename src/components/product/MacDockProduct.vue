<template>
    <div class="left-panel">
        <div class="carousel-container" @mouseover="isHover = true" @mouseout="isHover = false" @click="resetAutoPlay">
            <div class="scroller" :style="scrollerStyle" @wheel="handleWheel">
                <div v-for="(item, index) in manufacturers" :key="index" class="item" :style="getItemStyle(index)"
                    @click="handleClickItem(index)">
                    {{ item.name }}
                </div>
            </div>
            <div style="margin-top: 40px; text-align:center;">
                <div class="toptitleup" style="transform: scale(0.5);">
                    <div class="mouse"></div>
                </div>
                <p class="mousep">同上下滚动</p>
            </div>
        </div>
    </div>

    <div class="menu" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter"
        ref="dock">
        <div v-for="(icon, index) in icons" :key="index" @click="handleItemClick(index)">
            <div class="menu-item" :style="{ backgroundColor: getItemColor(index) }">
                <img :src="icon" type="image/svg+xml" class="icon"></img>
            </div>
            <div class="gap" v-if="index !== icons.length - 1"></div>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    manufacturers: {
        type: Array,
        required: true
    },
    icons: {
        type: Array,
        required: true
    }
});
console.log(props.manufacturers)

const emit = defineEmits(['brand-change', 'item-click'])

// 动态计算参数 - 使用 props.manufacturers
const itemCount = computed(() => props.manufacturers.length)
const itemAngle = computed(() => 360 / itemCount.value)
const radius = computed(() => 10 * props.manufacturers.length)

const activeRotateY = ref(0)

// 激活索引计算
const activeIndex = computed(() => {
    const angle = -activeRotateY.value;
    const normalized = (angle % 360 + 360) % 360;
    return Math.round(normalized / itemAngle.value) % itemCount.value;
})

// 修改后的点击处理
const handleClickItem = (index) => {
    const targetAngle = -index * itemAngle.value
    activeRotateY.value = targetAngle
    emit('brand-change', props.manufacturers[index].id)
}

// 修改滚轮处理
const handleWheel = (e) => {
    e.preventDefault()
    const delta = Math.sign(e.deltaY)
    activeRotateY.value += delta * itemAngle.value * -1

    const currentIndex = activeIndex.value
    emit('brand-change', props.manufacturers[currentIndex].id)
}

// 修改后的3D滚动样式
const scrollerStyle = computed(() => ({
    transform: `rotateX(${activeRotateY.value}deg)`, // 改为Y轴旋转
    transformStyle: 'preserve-3d'
}))

// 修改后的项目样式生成
const getItemStyle = (index) => {
    const rotateY = index * itemAngle.value
    return {
        transform: `
            rotateX(${rotateY}deg) 
            translateZ(${radius.value}px)
        `,
        opacity: activeIndex.value === index ? 1 : 0.6
        // opacity: 1 - Math.abs(index - activeIndex.value) * 0.3,
        // filter: `brightness(${1 - Math.abs(index - activeIndex.value) * 0.3})`
    }
}

// 初始化位置
onMounted(() => {
    activeRotateY.value = 0
})

// 原有逻辑

// 颜色生成逻辑（示例：HSL渐变色）
const getItemColor = (index) => {
    const hue = (index * 360) / props.icons.length
    return `hsl(${hue}deg, 70%, 60%)`
}

// 点击处理
const handleItemClick = (index) => {
    console.log('点击了', index)
    // 触发页面切换事件
    emit('item-click', index)
}

const handleClick = (index) => {
    emit('item-click', index)
}

const dock = ref(null)
const items = ref([])
const gaps = ref([])
const range = 500
const maxScale = 1.4
const baseHeight = ref(0)
const baseGapHeight = 20 // 基础间隙高度

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
.left-panel {
    z-index: 10;
    left: 10px;
    top: 30%;
    position: fixed;
    /* 控制可视区域高度 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* height: 1000px; */
    /* 内容垂直居中 */
}

.carousel-container {
    width: 100%;
    /* display: flex; */
    perspective: 1500px;
    height: 100%;
    border-radius: 10px;
    /* margin-left: 1vw; */
    /* background-color: #d96b6b; */
    position: relative;
    /* flex-direction: column; */
    /* align-items: center; */
    /* 垂直居中 */
    /* justify-content: center; */
    /* 水平居中 */
    /* position: relative; */
}

.scroller {
    /* width: vw; */
    /* 与item宽度一致 */
    height: 60px;
    margin-top: 70px;
    /* 与item高度一致 */
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.item {
    position: absolute;
    width: 100%;
    /* 继承scroller宽度 */
    height: 100%;
    /* 继承scroller高度 */
    background: white;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition:
        opacity 0.3s,
        transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.item:hover {
    background: #4a90e2;
    filter: drop-shadow(0 0 20px #4a90e2);
}



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
    color: #4a90e2;
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
        background-color 0.3s !important;
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









/* 鼠标动画 */
.toptitleup {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 96.97%;
    color: #4a90e2;
    font-weight: 400;
    text-align: center;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transform: scale(0.5);
}

.mouse {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 96.97%;
    color: #4a90e2;
    font-weight: 400;
    text-align: center;
    box-sizing: border-box;
    padding: 0;
    margin: 0 auto;
    background: #4e5559 linear-gradient(transparent, transparent 50%, #4a90e2 0, #4a90e2);
    position: relative;
    width: 52px;
    height: 88px;
    border-radius: 100px;
    background-size: 225%;
    animation: colorSlide 5s linear infinite, nudgeMouse 5s ease-out infinite;
}

@keyframes colorSlide {
    0% {
        background-position: 0 100%;
    }

    20% {
        background-position: 0 0;
    }

    21% {
        background-color: #4e5559;
    }

    29.99% {
        background-color: #4a90e2;
        background-position: 0 0;
    }

    30% {
        background-color: #4e5559;
        background-position: 0 100%;
    }

    50% {
        background-position: 0 0;
    }

    51% {
        background-color: #4e5559;
    }

    59.99% {
        background-color: #4a90e2;
        background-position: 0 0;
    }

    60% {
        background-color: #4e5559;
        background-position: 0 100%;
    }

    80% {
        background-position: 0 0;
    }

    81% {
        background-color: #4e5559;
    }

    89.99%,
    100% {
        background-color: #4a90e2;
    }
}

@keyframes nudgeMouse {
    0% {
        transform: translateY(0);
    }

    20% {
        transform: translateY(8px);
    }

    30% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(8px);
    }

    60% {
        transform: translateY(0);
    }

    80% {
        transform: translateY(8px);
    }

    90% {
        transform: translateY(0);
    }
}

.mouse:before {
    width: 46px;
    height: 82px;
    background-color: #222a30;
    border-radius: 100px;
}

.mouse:after {
    background-color: #4a90e2;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    animation: trackBallSlide 5s linear infinite;
}

@keyframes trackBallSlide {
    0% {
        opacity: 1;
        transform: scale(1) translateY(-20px);
    }

    6% {
        opacity: 1;
        transform: scale(.9) translateY(5px);
    }

    14% {
        opacity: 0;
        transform: scale(.4) translateY(40px);
    }

    15%,
    19% {
        opacity: 0;
        transform: scale(.4) translateY(-20px);
    }

    28%,
    29.99% {
        opacity: 1;
        transform: scale(1) translateY(-20px);
    }

    30% {
        opacity: 1;
        transform: scale(1) translateY(-20px);
    }

    36% {
        opacity: 1;
        transform: scale(.9) translateY(5px);
    }

    44% {
        opacity: 0;
        transform: scale(.4) translateY(40px);
    }

    45%,
    49% {
        opacity: 0;
        transform: scale(.4) translateY(-20px);
    }

    58%,
    59.99% {
        opacity: 1;
        transform: scale(1) translateY(-20px);
    }

    60% {
        opacity: 1;
        transform: scale(1) translateY(-20px);
    }

    66% {
        opacity: 1;
        transform: scale(.9) translateY(5px);
    }

    74% {
        opacity: 0;
        transform: scale(.4) translateY(40px);
    }

    75%,
    79% {
        opacity: 0;
        transform: scale(.4) translateY(-20px);
    }

    88%,
    100% {
        opacity: 1;
        transform: scale(1) translateY(-20px);
    }
}


.mouse:after,
.mouse:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}

p.mousep {
    font-weight: 300;
    font-size: 10px;
    letter-spacing: 12px;
    text-indent: 12px;

    color: #4a90e2;
    animation: colorText 5s ease-out infinite, nudgeText 5s ease-out infinite;
}

@keyframes colorText {
    21% {
        color: hsla(0, 0%, 100%, 0);
    }

    30% {
        color: #4a90e2;
    }

    51% {
        color: hsla(0, 0%, 100%, 0);
    }

    60% {
        color: #4a90e2;
    }

    81% {
        color: hsla(0, 0%, 100%, 0);
    }

    90% {
        color: #4a90e2;
    }

}

@keyframes nudgeText {
    0% {
        transform: translateY(0);
    }

    20% {
        transform: translateY(2px);
    }

    30% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(2px);
    }

    60% {
        transform: translateY(0);
    }

    80% {
        transform: translateY(2px);
    }

    90% {
        transform: translateY(0);
    }
}
</style>