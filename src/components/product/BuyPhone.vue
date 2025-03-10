<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const brands = ['All', 'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Oppo'];
const products = ref([
    { id: 1, brand: 'Apple', name: 'iPhone 14', img: '/phone/iPhone16pro.png' },
    { id: 2, brand: 'Samsung', name: 'Galaxy S23', img: '/phone/Samsungs25ultra.png' },
    { id: 3, brand: 'Xiaomi', name: 'Mi 13', img: "/phone/xiaomi15ultra.png" },
    { id: 4, brand: 'Huawei', name: 'Mate 50', img: "/phone/huaweimate70rs.png" },
    { id: 5, brand: 'Oppo', name: 'Find X5', img: "/phone/OPPOFind5.png" },
    { id: 6, brand: 'Apple', name: 'iPhone 15', img: '/phone/iPhone16pro.png' },
    { id: 7, brand: 'Samsung', name: 'Galaxy S24', img: '/phone/Samsungs25ultra.png' },
    { id: 8, brand: 'Xiaomi', name: 'Mi 14', img: "/phone/xiaomi15ultra.png" },
    { id: 9, brand: 'Huawei', name: 'Mate 51', img: "/phone/huaweimate70rs.png" },
    { id: 10, brand: 'Oppo', name: 'Find X6', img: "/phone/OPPOFind5.png" },
    { id: 11, brand: 'Apple', name: 'iPhone 16', img: '/phone/iPhone16pro.png' },
    { id: 12, brand: 'Samsung', name: 'Galaxy S25', img: '/phone/Samsungs25ultra.png' },
    { id: 13, brand: 'Xiaomi', name: 'Mi 15', img: "/phone/xiaomi15ultra.png" },
    { id: 14, brand: 'Huawei', name: 'Mate 52', img: "/phone/huaweimate70rs.png" },
    { id: 15, brand: 'Oppo', name: 'Find X7', img: "/phone/OPPOFind5.png" },
    { id: 16, brand: 'Apple', name: 'iPhone 17', img: '/phone/iPhone16pro.png' },
    { id: 17, brand: 'Samsung', name: 'Galaxy S26', img: '/phone/Samsungs25ultra.png' },
    { id: 18, brand: 'Xiaomi', name: 'Mi 16', img: "/phone/xiaomi15ultra.png" },
    { id: 19, brand: 'Huawei', name: 'Mate 53', img: "/phone/huaweimate70rs.png" },
    { id: 20, brand: 'Oppo', name: 'Find X8', img: "/phone/OPPOFind5.png" },
    { id: 21, brand: 'Apple', name: 'iPhone 18', img: '/phone/iPhone16pro.png' },
    { id: 22, brand: 'Samsung', name: 'Galaxy S27', img: '/phone/Samsungs25ultra.png' },
    { id: 23, brand: 'Xiaomi', name: 'Mi 17', img: "/phone/xiaomi15ultra.png" },
]);


const selectedBrand = ref('All');
const divContainer = ref(null);
const imgWidth = 400;
const filteredProducts = ref([]);
let resizeObserver = null;

// 合并createImgs功能到布局逻辑中
function initLayout() {
    // 使用nextTick等待DOM更新
    nextTick(() => {
        const images = divContainer.value.querySelectorAll('img');
        let loadedCount = 0;

        images.forEach(img => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener('load', handleImageLoad);
            }
        });
    });
}

// 图片加载处理（带防抖）
const handleImageLoad = debounce(() => {
    setPosition();
}, 100);

function setPosition() {
    if (!divContainer.value) return;

    const containerWidth = divContainer.value.clientWidth;
    const { columns, space } = calculateLayout(containerWidth);
    const columnHeights = new Array(columns).fill(0);
    const cards = divContainer.value.querySelectorAll('.product-card');

    cards.forEach(card => {
        const minHeight = Math.min(...columnHeights);
        const columnIndex = columnHeights.indexOf(minHeight);

        card.style.transform = `translate(
      ${columnIndex * (imgWidth + space)}px,
      ${minHeight}px
    )`;

        columnHeights[columnIndex] += card.offsetHeight + space;
    });

    divContainer.value.style.height = Math.max(...columnHeights) + 'px';
}

function calculateLayout(containerWidth) {
    const columns = Math.max(Math.floor(containerWidth / (imgWidth + 20)), 1);
    const space = (containerWidth - columns * imgWidth) / (columns + 1);
    return { columns, space: Math.max(space, 10) };
}

// 响应式观察器初始化
function initResizeObserver() {
    resizeObserver = new ResizeObserver(debounce(() => {
        setPosition();
    }, 300));

    if (divContainer.value) {
        resizeObserver.observe(divContainer.value);
    }
}

// 品牌切换处理
watch(selectedBrand, () => {
    filteredProducts.value = selectedBrand.value === 'All'
        ? products.value
        : products.value.filter(p => p.brand === selectedBrand.value);

    nextTick(() => {
        initLayout();
        setPosition();
    });
});

onMounted(() => {
    initResizeObserver();
    filteredProducts.value = products.value;
    nextTick(initLayout);
});

onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
});

// 防抖函数
function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}
</script>

<template>
    <div class="container">
        <div class="brand-selector">
            <div v-for="brand in brands" :key="brand" class="brand-item" :class="{ active: selectedBrand === brand }"
                @click="selectedBrand = brand">
                {{ brand === 'All' ? '全部' : brand }}
            </div>
        </div>

        <div class="waterfall-container" ref="divContainer">
            <div class="waterfall-inner">
                <div v-for="product in filteredProducts" :key="product.id" class="product-card" :style="{
                    width: imgWidth + 'px',
                    transition: 'transform 0.3s ease-out'
                }">
                    <img :src="product.img" :alt="product.name" :style="{}" @load="handleImageLoad">
                    <div class="product-info">
                        <div class="product-name">{{ product.name }}</div>
                        <div class="product-price">
                            ￥{{ Math.floor(Math.random() * 1000) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* 新增容器内部包裹层 */
.waterfall-inner {
    direction: ltr;
    /* 恢复内容方向 */
    position: relative;
    min-height: 100%;
}

/* 自定义滚动条样式 */
.waterfall-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.waterfall-container::-webkit-scrollbar-track {
    background: rgba(74, 144, 226, 0.1);
    border-radius: 4px;
}

.waterfall-container::-webkit-scrollbar-thumb {
    background: #4a90e2;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.waterfall-container::-webkit-scrollbar-thumb:hover {
    background: #357abd;
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
}

.waterfall-container {
    direction: rtl;
    padding-right: 20px;
    flex: 1;
    position: relative;
    overflow-y: auto;
    margin: 20px;
    padding-left: 20px;
    width: 94%;
    background-color: #fff;
    transition: height 0.3s ease-out;
}

.product-card {
    position: absolute;
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px 12px 0 0;
}

.container {
    height: 95vh;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.brand-selector {
    padding: 10px;
    background: #fffffff9;
    display: flex;
    gap: 10px;
    overflow-x: auto;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.product-card {
    width: 200px;
    background: #fffffff9;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}


.product-image {
    width: calc(100% - 10px);
    margin: 5px;
    height: calc(100% - 40px);
    object-fit: cover;
}

.product-info {
    padding: 8px 12px;
    height: 40px;
    /* padding: 12px; */
    background: linear-gradient(to bottom, #fffffff9, #4a90e2);
    display: flex;
    align-items: center;
}

.product-image {
    flex: 1;
    min-height: 0;
    object-fit: cover;
    border-bottom: 1px solid #eee;
}

.product-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
}

.product-price {
    color: #e63946;
    font-size: 13px;
    font-weight: bold;
}

.brand-item {
    font-size: 16px;
    padding: 10px 20px;
    background: #dee2e6;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}

.brand-item.active {
    background: #4a90e2;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 自定义滚动条样式 */
.waterfall-scroller::-webkit-scrollbar {
    height: 6px;
    /* 减小滚动条高度 */
}

.waterfall-scroller::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.waterfall-scroller::-webkit-scrollbar-thumb {
    background: rgba(136, 136, 136, 0.5);
    /* 半透明效果 */
    border-radius: 3px;
    transition: background-color 0.3s;
}

.waterfall-scroller::-webkit-scrollbar-thumb:hover {
    background: rgba(85, 85, 85, 0.8);
}
</style>