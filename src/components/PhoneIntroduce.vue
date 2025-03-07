<template>
    <div class="container-wrapper">
        <img src="../assets/phone.png" style="position: absolute; height: 70vh;" alt="">
        <!-- 左侧滚动选择器 -->
        <div class="carousel-container">
            <div class="scroller" :style="scrollerStyle" @wheel="handleWheel">
                <div v-for="(item, index) in manufacturers" :key="index" class="item" :style="getItemStyle(index)"
                    @click="handleClick(index)">
                    {{ item.name }}
                </div>
            </div>

            <div class="toptitleup" style="transform: scale(0.5);">
                <div class="mouse"></div>
            </div>
            <p class="mousep">鼠标滚动</p>
        </div>

        <!-- 右侧详细信息 -->
        <div class="right-panel">
            <transition name="flip" mode="out-in">
                <div :key="selectedManufacturer.name" class="content-wrapper">
                    <div class="name">{{ selectedManufacturer.name }}</div>
                    <div class="details">
                        <div class="advantages">
                            <h3>优点</h3>
                            <ul>
                                <li v-for="(item, index) in selectedManufacturer.advantages" :key="index">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                        <div class="disadvantages">
                            <h3>缺点</h3>
                            <ul>
                                <li v-for="(item, index) in selectedManufacturer.disadvantages" :key="index">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

// 手机厂商数据
const manufacturers = [
    {
        name: '苹果',
        advantages: ['系统流畅', '生态完善', '保值率高'],
        disadvantages: ['价格昂贵', '充电速度慢', '维修成本高']
    },
    {
        name: '华为',
        advantages: ['信号出色', '拍照强大', '自主芯片'],
        disadvantages: ['5G受限', '价格偏高', '生态较封闭']
    },
    {
        name: '小米',
        advantages: ['性价比高', '生态丰富', '更新频繁'],
        disadvantages: ['发热明显', '广告较多', '质感一般']
    },
    {
        name: '三星',
        advantages: ['屏幕顶级', '工艺精湛', '全球市场大'],
        disadvantages: ['系统本地化差', '电池续航一般', '价格跳水快']
    },
    {
        name: 'OPPO',
        advantages: ['充电速度快', '拍照算法好', '外观时尚'],
        disadvantages: ['性能调度保守', '系统更新慢', '中低端性价比一般']
    },
]
// 动态计算参数
const itemCount = computed(() => manufacturers.length)
const itemAngle = computed(() => 360 / itemCount.value) // 每个项目的旋转角度
const radius = 100 // 3D旋转半径

const activeRotateY = ref(0)

// 当前选中的厂商
const selectedManufacturer = computed(() =>
    manufacturers[activeIndex.value]
)
// 激活索引计算
const activeIndex = computed(() => {
    const angle = -activeRotateY.value; // 使用反向角度计算
    const normalized = (angle % 360 + 360) % 360;
    return Math.round(normalized / itemAngle.value) % itemCount.value;
})

// 修改后的点击处理
const handleClick = (index) => {
    const targetAngle = -index * itemAngle.value // 使用负角度旋转
    activeRotateY.value = targetAngle
}

// 修改后的3D滚动样式
const scrollerStyle = computed(() => ({
    transform: `rotateY(${activeRotateY.value}deg)`, // 改为Y轴旋转
    transformStyle: 'preserve-3d'
}))

// 修改后的项目样式生成
const getItemStyle = (index) => {
    const rotateY = index * itemAngle.value
    return {
        transform: `
            rotateY(${rotateY}deg) 
            translateZ(${radius}px)
        `,
    }
}

// 修改后的滚轮处理
const handleWheel = (e) => {
    e.preventDefault()
    const delta = Math.sign(e.deltaY)  // 获取滚动方向
    // 每次滚动旋转一个项目的角度（带方向）
    activeRotateY.value += delta * itemAngle.value * -1 // 乘以-1修正旋转方向
}

// 初始化位置
onMounted(() => {
    activeRotateY.value = 0
})
</script>

<style scoped>
.container-wrapper {
    /* z-index: -1; */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.carousel-container {
    width: 45%;
    display: flex;
    perspective: 1500px;
    position: relative;
    flex-direction: column;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
    position: relative;
}

.scroller {
    width: 8vw;
    /* 与item宽度一致 */
    height: 60px;
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
    background: #f8f8f8;
}

.left-panel {
    width: 55%;
    background-color: #f8f8f8;
    height: 70vh;
    /* 控制可视区域高度 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* 内容垂直居中 */
}

.right-panel {
    width: 45%;
    background-color: #f8f8f8;
    height: 70vh;
    /* 控制可视区域高度 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* 内容垂直居中 */
}

/* .scroller {
    height: 20vh;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
} */

.scroll-wrapper {
    overscroll-behavior: contain;
    height: 300px;
    perspective: 800px;
    /* 3D透视 */
    overflow: visible;
    /* 允许3D溢出 */
}

/* .item {
    height: 60px;
    position: absolute;
    width: 100%;
    transform-origin: 50% 50%;
    transition:
        transform 0.6s,
        opacity 0.6s,
        filter 0.6s;
} */

/* 3D布局 */
/* .item:nth-child(n) {
    transform:
        rotateX(calc(var(--i) * 10deg)) translateZ(100px);
} */


/* 优化右侧面板样式 */
.right-panel {
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* 保持原有过渡效果 */
.flip-enter-active,
.flip-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    transform-style: preserve-3d;
}



.name {
    font-size: 26px;
}


.details {
    font-size: 22px;
    margin-top: 30px;
}


h3 {
    color: #666;
    margin: 20px 0;
}

ul {
    list-style: none;
    padding-left: 20px;
}

li {
    margin: 10px 0;
    padding: 8px 12px;
    background: #f8f8f8;
    border-radius: 4px;
}

.advantages li {
    font-size: 10px;
    border-left: 3px solid #4CAF50;
}

.disadvantages li {
    font-size: 10px;
    border-left: 3px solid #F44336;
}

/* 翻转过渡效果 */
/* .flip-enter-active,
.flip-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    transform-style: preserve-3d;
} */

.flip-enter-from {
    transform: rotateX(90deg);
    opacity: 0;
}

.flip-leave-to {
    transform: rotateX(-90deg);
    opacity: 0;
}

/* 调整右侧面板定位 */
.right-panel {
    position: relative;
    overflow: hidden;
}

/* .flip-enter-active,
.flip-leave-active {
    position: absolute;
    width: 100%;
} */
/* 鼠标动画 */
.toptitleup {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 96.97%;
    color: #fff;
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
    color: #fff;
    font-weight: 400;
    text-align: center;
    box-sizing: border-box;
    padding: 0;
    margin: 0 auto;
    background: #4e5559 linear-gradient(transparent, transparent 50%, #fff 0, #fff);
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
        background-color: #fff;
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
        background-color: #fff;
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
        background-color: #fff;
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
    background-color: #fff;
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

    color: #fff;
    animation: colorText 5s ease-out infinite, nudgeText 5s ease-out infinite;
}

@keyframes colorText {
    21% {
        color: hsla(0, 0%, 100%, 0);
    }

    30% {
        color: #fff;
    }

    51% {
        color: hsla(0, 0%, 100%, 0);
    }

    60% {
        color: #fff;
    }

    81% {
        color: hsla(0, 0%, 100%, 0);
    }

    90% {
        color: #fff;
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