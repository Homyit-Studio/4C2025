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
const imgWidth = 300;
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

        // 使用直接定位代替transform
        card.style.left = `${columnIndex * (imgWidth + space)}px`;
        card.style.top = `${minHeight}px`;

        columnHeights[columnIndex] += card.offsetHeight + space;
    });

    divContainer.value.style.height = Math.max(...columnHeights) + 'px';
}


const recalculateLayout = debounce(() => {
    nextTick(() => {
        setPosition();
    });
}, 100);


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


const activeProduct = ref(null)
const isDragging = ref(false)
const cartZone = ref(null)
const isOverCart = ref(false)

// 在拖拽相关事件中触发
const startDrag = (event, product) => {
    isDragging.value = true
    event.dataTransfer.setData('product', JSON.stringify(product))

    const currentCard = event.target.closest('.product-card')
    currentCard.style.opacity = '0.7'
    currentCard.style.zIndex = '999'
    currentCard.style.transition = 'none'
}

const endDrag = () => {
    isDragging.value = false
    isOverCart.value = false

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = ''
        card.style.zIndex = ''
        card.style.transition = ''
        card.style.pointerEvents = ''
    })

    recalculateLayout()
}

// 显示商品详情
const showProductDetail = (product) => {
    activeProduct.value = product
}

// 隐藏商品详情
const hideProductDetail = () => {
    activeProduct.value = null
}

// 拖拽经过购物车区域
const dragOverCart = (event) => {
    event.preventDefault()
    isOverCart.value = true
}

// 离开购物车区域
const dragLeaveCart = () => {
    isOverCart.value = false
}

// 放入购物车
const dropToCart = (event) => {
    event.preventDefault()
    const product = JSON.parse(event.dataTransfer.getData('product'))
    // TODO: 这里添加购物车逻辑
    console.log('Added to cart:', product)
    isOverCart.value = false

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '';
        card.style.zIndex = '';
    });
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
                }" :class="{ 'blur': activeProduct && activeProduct.id !== product.id }" draggable="true"
                    @mouseenter="showProductDetail(product)" @mouseleave="hideProductDetail"
                    @dragstart="startDrag($event, product)" @dragend="endDrag">
                    <img :src="product.img" :alt="product.name" :style="{}" @load="handleImageLoad">
                    <div class="product-info">
                        <div class="product-name">{{ product.name }}</div>
                        <div class="product-price">
                            ￥{{ Math.floor(Math.random() * 1000) }}
                        </div>
                    </div>
                    <!-- 商品详情卡片 -->
                    <div v-if="activeProduct && activeProduct.id === product.id" class="product-detail">
                        <h3>{{ product.name }}</h3>
                        <p>品牌: {{ product.brand }}</p>
                        <p>价格: ￥{{ Math.floor(Math.random() * 1000) }}</p>
                        <p>库存: {{ Math.floor(Math.random() * 100) }}件</p>
                        <p>描述: 这是一款性能强大的智能手机...</p>
                        <div class="drag-hint">拖拽以加入购物车</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 购物车提示区域 -->
        <div class="cart-zone" ref="cartZone" :class="{ 'active': isOverCart }" @dragover="dragOverCart"
            @dragleave="dragLeaveCart" @drop="dropToCart">
            <div class="cart-icon">+</div>
            <div class="cart-text">拖拽至此加入购物车</div>
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
    transition: height 0.5s ease-out;
}

/* 添加布局变化的入场动画 */


/* 应用入场动画 */
.product-card {
    animation: cardEnter 0.6s ease forwards;
}

@keyframes cardEnter {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.product-card {
    position: absolute;
    will-change: transform, opacity;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: shake 0.5s ease-in-out 3;
    animation-play-state: paused;
    position: absolute;
    will-change: top, left, opacity;
    transition:
        top 0.5s cubic-bezier(0.4, 0, 0.2, 1),
        left 0.5s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s ease,
        transform 0.2s ease;
    transform: translateZ(0);
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    animation-play-state: running;
}


/* 拖拽时的状态 */
.product-card[draggable="true"] {
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
}


.product-detail {
    position: absolute;
    font-size: 32px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    transform: translateY(100%);
    animation: slideUp 0.3s forwards;
    z-index: 2;
}

.blur {
    filter: blur(5px);
    transition: filter 0.3s;
}

.cart-zone {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 100px;
    border: 2px dashed #4a90e2;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
}

.cart-zone.active {
    background: rgba(74, 144, 226, 0.1);
    border-color: #357abd;
}

.cart-icon {
    font-size: 40px;
    color: #4a90e2;
}

.cart-text {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-5px);
    }

    75% {
        transform: translateX(5px);
    }
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