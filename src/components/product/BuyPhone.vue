<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
    selectedBrand: {
        type: String,
        default: 'all'
    }
})

// 监听品牌变化
watch(() => props.selectedBrand, (newBrand) => {
    selectedBrand.value = newBrand;
    filteredProducts.value = newBrand === 'all'
        ? products.value
        : products.value.filter(p => p.brand === newBrand);

    nextTick(() => {
        initLayout();
        setPosition();
    });
});



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

const selectedBrand = ref('all');
const divContainer = ref(null);
const imgWidth = 366;
const filteredProducts = ref([]);
let resizeObserver = null;

function initLayout() {
    nextTick(() => {
        const images = divContainer.value.querySelectorAll('img');

        images.forEach(img => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener('load', handleImageLoad);
            }
        });
    });
}

const handleImageLoad = debounce(() => {
    setPosition();
}, 100);

function setPosition() {
    if (!divContainer.value) return;

    const containerWidth = divContainer.value.clientWidth;
    const { columns, space, totalWidth } = calculateLayout(containerWidth);
    const columnHeights = new Array(columns).fill(0);
    const cards = divContainer.value.querySelectorAll('.product-card');

    // 计算左边起始位置，使整体居中
    const startX = (containerWidth - totalWidth) / 2;

    // 确定最后一行的起始索引
    const lastRowStart = Math.floor((cards.length - 1) / columns) * columns;

    cards.forEach((card, index) => {
        const minHeight = Math.min(...columnHeights);
        const columnIndex = columnHeights.indexOf(minHeight);
        const isLastRow = index >= lastRowStart;

        // 计算x坐标，考虑居中对齐
        const x = startX + columnIndex * (imgWidth + space);
        card.style.left = `${x}px`;

        // 计算y坐标，最后一行不需要底部间距
        card.style.top = `${minHeight}px`;

        // 更新列高度，最后一行不添加间距
        const bottomSpace = isLastRow ? 0 : space;
        columnHeights[columnIndex] += card.offsetHeight + bottomSpace;
    });

    // 设置容器高度为最高列的高度
    divContainer.value.style.height = `${Math.max(...columnHeights)}px`;
}
const recalculateLayout = debounce(() => {
    nextTick(() => {
        setPosition();
    });
}, 100);

function calculateLayout(containerWidth) {
    // 计算可以放置的最大列数
    const columns = Math.floor((containerWidth - 20) / (imgWidth + 20)); // 减去容器的左右padding
    // 计算实际间距，使卡片在容器中均匀分布
    const totalGap = containerWidth - columns * imgWidth;
    const space = totalGap / (columns + 1); // 包括左右边距

    return {
        columns,
        space: Math.max(space, 10),
        totalWidth: columns * imgWidth + (columns - 1) * space// 总宽度，用于居中
    };
}

function initResizeObserver() {
    resizeObserver = new ResizeObserver(debounce(() => {
        setPosition();
    }, 300));

    if (divContainer.value) {
        resizeObserver.observe(divContainer.value);
    }
}

watch(() => props.selectedBrand, (newBrand) => {
    filteredProducts.value = newBrand === 'all'
        ? products.value
        : products.value.filter(p => p.brand === newBrand);

    nextTick(() => {
        // 等待动画完成后重新布局
        setTimeout(() => {
            initLayout();
            setPosition();
        }, 300);
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

const startDrag = (event, product) => {
    isDragging.value = true
    event.dataTransfer.setData('product', JSON.stringify(product))

    const currentCard = event.target.closest('.product-card')
    currentCard.style.opacity = '0.7'
    currentCard.style.zIndex = '999'
    // currentCard.style.transition = 'none'
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

const showProductDetail = (product) => {
    activeProduct.value = product
}

const hideProductDetail = () => {
    activeProduct.value = null
}

const dragOverCart = (event) => {
    event.preventDefault()
    isOverCart.value = true
}

const dragLeaveCart = () => {
    isOverCart.value = false
}

const dropToCart = (event) => {
    event.preventDefault()
    const product = JSON.parse(event.dataTransfer.getData('product'))
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
        <div class="waterfall-container" ref="divContainer">
            <div class="waterfall-inner">
                <div v-for="product in filteredProducts" :key="product.id" :data-id="product.id" class="product-card"
                    :style="{
                        width: imgWidth + 'px',
                    }" :class="{ 'blur': activeProduct && activeProduct.id !== product.id }" draggable="true"
                    @mouseenter="showProductDetail(product)" @mouseleave="hideProductDetail"
                    @dragstart="startDrag($event, product)" @dragend="endDrag">
                    <img :src="product.img" :alt="product.name"
                        :style="{ opacity: activeProduct && activeProduct.id === product.id ? '1' : '0.8' }"
                        @load="handleImageLoad">
                    <div class="product-info">
                        <div class="product-name">{{ product.name }}</div>
                        <div class="product-price">
                            ￥{{ Math.floor(Math.random() * 1000) }}
                        </div>
                    </div>
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

        <div class="cart-zone" ref="cartZone" :class="{ 'active': isOverCart }" @dragover="dragOverCart"
            @dragleave="dragLeaveCart" @drop="dropToCart">
            <div class="cart-text">拖拽至此加入购物车</div>
            <svg viewBox="0 0 2240 529" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg"
                version="1.1" class="svg-title-container">
                <g>
                    <path id="svg_1" fill="#00ffff"
                        d="m1046.07697,231.23077c15.51,0 29.80049,-0.271 45.78049,-0.271c0.6305,3.37099 1.03701,4.8615 2.21951,9.271c21.81021,60.95511 22.77433,69.27881 29.96748,73.76152c1.84513,2.10714 57.85751,0.14151 69.03252,-0.76152c-2,-21.99 -2,-22.98 -2,-24c-68.1744,0.46298 -69.48234,0.47187 -70.82991,0.48102c-3.17009,-0.48102 -3.17009,-0.48102 -5.02438,-2.30628c-11.14571,-27.37228 -11.14571,-27.37228 -11.14571,-33.17474c157.2052,-0.09055 162.59306,-0.10075 168,0c-6.73489,32.87039 -6.87039,32.87039 -8,34c-28.26436,0.03778 -32.63216,0.0205 -37,0c2.01487,17.07762 2.67006,17.05325 4,26c17.56886,-0.11256 23.74686,0.33883 30,1c5.16527,25.79898 6.07875,29.89954 7,34c-168.36551,2.73133 -169.30963,2.74976 -170.28237,2.76875c-8.24916,-0.10342 -13.51874,-3.49251 -19.20152,-9.3127c-4.86354,-6.76905 -7.52661,-13.17318 -9.64111,-21.20605c-17.91891,-70.17347 -20.33937,-80.10747 -22.875,-90.25z" />
                    <path id="svg_2" fill="#00ffff"
                        d="m1269.47308,46.24182c6.59995,0.02356 12.48384,0.19352 18.5288,0.12132c4.53801,6.98449 3.88782,12.57086 3.70547,18.45504c-0.53949,5.52974 -2.17931,9.02807 -5.72319,13.34485c-7.45635,2.6394 -22.75227,2.54348 -30.77791,2.59911c-73.0833,0.61651 -79.01082,-0.61901 -84.48429,0.92663c-6.67159,5.22035 34.75818,135.43241 35.62602,140.81301c-34.12748,0.13019 -33.99198,0.13019 -35,0c-1.19182,-2.87175 -1.36836,-4.16707 -2.78907,-7.60938c-28.94372,-110.11333 -33.74399,-129.33334 -41.03067,-130.53134c-160.64439,1.44812 -160.64439,1.44812 -164.40536,-1.75339c-4.73754,-6.84027 -6.60936,-14.66405 -5.38037,-22.89105c1.05044,-3.84257 1.5892,-8.43139 5.60547,-10.21484l306.1251,-3.25996z" />
                    <path id="svg_3" fill="#00ffff"
                        d="m1202.42785,189.87989l205,0c-10.91092,17.80013 -8.99796,15.29669 -15.91244,31.47651c-12.87938,0.74123 -52.13006,2.27099 -73.08756,2.52349c-4.11371,15.40993 -3.25901,14.89711 -6,29c26.73,0.33 53.46,0.66 81,1c-4.83085,24.14925 -5.71895,28.51901 -7,34c-63.41245,0.80572 -76.57567,-0.224 -80,2c-2.32262,6.0289 -3.95894,11.48928 -3,18c1.71192,3.76399 1.71192,3.76399 5,6c15.92369,-0.22844 47.15229,-1.14004 74.60227,-3.21048c-8.96007,40.15154 -8.89907,36.78507 -9.60227,39.21048c-78.89882,1.14567 -86.70595,0.70818 -97,0c-9.2359,-35.26328 -9.4718,-36.52656 -9.71484,-37.82812c7.41159,-40.66716 13.20856,-74.33399 15.80179,-88.43238c-12.44942,-0.59419 -58.01695,0.2605 -70.08695,0.2605c-7.31311,-23.57864 -8.80343,-29.4487 -10,-34z" />
                    <path id="svg_4" fill="#7f00ff"
                        d="m1134.07697,121.36627c0.92258,19.21951 1.45018,24.93361 1.76178,35.44648c-8.08948,-0.05623 -50.13476,0.75677 -63.76178,0.55352c2.42075,15.58265 4.79231,26.38699 5,27c73.47842,1.82614 73.34292,1.28413 77,3c2.57307,3.74838 7.08143,28.37408 8,32c-70.24171,0.28272 -95.19027,-0.32454 -120,-1c-15.0401,-48.73826 -15.35363,-49.85933 -15.67667,-51.01437c-3.01357,-11.0061 -4.71454,-20.04956 1.07511,-30.51297c5.15844,-7.40078 5.71531,-8.32891 6.28906,-9.28516c8.51857,-8.0581 21.51783,-6.80825 32.40234,-6.83203c65.84117,-0.19396 66.53084,0.08553 67.91016,0.64453z" />
                    <path id="svg_5" fill="#7f00ff"
                        d="m1337.46257,112.84517c-0.957,4.40522 -1.06244,8.37904 -1.51414,12.51414c7.26039,1.69294 82.73619,-1.17588 86,1c-4.74564,22.80909 -6.73733,28.62662 -9,33c-79.6293,0.91642 -81.81488,1 -84,1c-4.02156,20.95999 -4.02156,20.95999 -5,25c-10.89,0 -21.78,0 -33,0c3.52367,-21.10043 3.77151,-23.05048 4,-25c-3.12113,-3.12113 -6.98203,-2.48266 -11.1914,-2.6211c-71.78387,-0.41715 -80.29623,-0.40018 -88.8086,-0.3789c-6.12757,-20.55424 -7.24823,-25.12838 -9,-32c100.33338,-1.2396 108.6667,-1.12082 117,-1c0.84017,-6.64891 0.56285,-11.01124 1.08024,-12.99791l33.4339,1.48377z" />
                    <path id="svg_6" fill="#00ffff"
                        d="m1196.43205,422.96967c13.33599,10.59583 16.63945,20.26049 18,29c-45.68532,-0.18131 -49.80073,-0.94682 -54,2c-2.46717,2.91575 -2.36111,6.30601 -2.25,10.03516c0.37693,2.96245 1.32214,4.70459 3.25,6.96484c49.16679,1.82785 50.90808,2.23436 53.76152,2.10298c-0.08401,2.81301 -0.76152,3.89702 -1.44121,6.58452c-5.05159,13.99917 -12.80576,21.25716 -26.32031,28.3125c-11.16068,5.05259 -23.79681,5.06493 -35.19922,0.80469c-13.51695,-6.33445 -22.74057,-15.32143 -28.73828,-28.99219c-3.95655,-11.06272 -3.39278,-25.10367 0.82031,-36.12109c10.83948,-21.6147 22.84523,-24.75179 29.45313,-26.94532c14.42996,-4.04123 30.10453,-2.0001 42.66406,6.25391z" />
                    <path id="svg_7" fill="#7f00ff"
                        d="m1395.16685,452.54731c2.54871,20.49656 -5.94551,33.20338 -8.83182,38.48026c-26.51957,-27.23742 -26.51957,-27.23742 -27.30469,-27.98975c-8.25939,-8.17362 -8.67089,-9.81881 -13.66579,-10.20077c-4.31114,-0.38196 -8.07748,2.03775 -9.02952,3.19052c-1.90409,2.30554 -2.32994,6.81773 -1.66797,10.94531c1.59221,4.89767 5.52919,9.05308 9.70774,11.83878c26.41494,23.19746 26.18766,22.28837 27.96023,24.21591c-1.86516,3.11037 -2.81782,3.93957 -5.6875,6.125c-13.94933,4.76193 -22.68756,4.24823 -23.58911,4.24731c-7.23685,-0.13099 -13.00635,-1.31171 -20.72339,-4.37231c-7.09821,-4.72823 -6.41492,-3.89993 -11,-8c-13.88228,-13.9955 -26.73889,-40.91043 -0.18936,-71.43311c43.72355,-41.1131 81.16032,5.12646 84.02118,22.95285zm-41.14262,-11.41597c-2.77943,8.16702 2.96821,3.43282 4.3108,4.89623c2.84801,3.69714 3.57264,6.11205 6,8c3.63633,0.60605 5.28315,0.47161 8.375,-1.5625c2.34666,-3.51998 2.3893,-5.26861 1.625,-9.4375c-2.23454,-3.85475 -4.77942,-7.19556 -9.07031,-8.75c-5.34135,-0.48742 -8.11918,-0.97137 -11.24049,6.85377z" />
                    <path
                        d="m1558.76927,24.84616c4.24834,5.75581 4.7827,12.01669 4,19c-4.23465,17.84678 -21.98081,17.59882 -30.13672,17.60937c-24.32023,0.30391 -33.35655,-1.90324 -34.86328,0.39063c-20.97274,86.17138 -23.70046,99.47024 -26.84229,112.7102c-17.93889,87.89136 -18.34506,89.86792 -18.75122,91.84449c-21.59043,106.58759 -26.1292,118.81527 -35.40649,127.44531c-11.90871,12.5544 -22.19375,11.07619 -36.58203,12.28125c-268.18241,1.07366 -269.6168,2.08348 -274.41797,-2.28125c-4.36858,-20.79438 -4.36858,-20.79438 -4.42578,-22.625c0.54426,-4.31413 1.08099,-5.54878 4.42578,-8.375c244.45219,-0.0768 254.89174,2.39573 277,-8c13.48049,-4.76761 40.82132,-163.50627 43,-173c25.07192,-115.14484 29.46822,-135.46307 29.79443,-136.95682c2.84308,-12.97936 10.19393,-27.37026 17.20557,-29.04318c28.66667,-0.33333 57.33333,-0.66667 86,-1z"
                        fill="#0000ff" id="svg_8" />
                    <path stroke="null"
                        d="m833.08851,172.18393c23.98348,-0.47985 38.00845,-0.52909 40.66177,-0.57982c4.0869,7.53656 6.48579,17.37497 9.83258,26.66652c3.34682,9.29155 9.82962,31.22494 11.57053,34.8587c30.26331,-36.09028 39.3786,-50.82041 43.84526,-57.86316c59.54721,-0.38779 65.53702,-0.93906 79.21889,-0.24914c-63.02045,89.44566 -74.78372,105.39013 -77.18192,108.27778c43.2921,70.29093 54.55333,78.43631 56.61876,83.73302c-80.57023,0.74731 -66.87568,-0.50244 -89.26246,-0.87115c-15.35229,-30.06617 -12.15359,-24.24489 -19.88948,-39.0806c-28.22767,32.86329 -20.94684,34.02415 -37.13706,34.77925c-68.4353,-0.0828 -72.39665,0.67569 -81.54176,-1.62943c47.41376,-54.00888 56.02626,-62.04234 71.74949,-80.45708c-12.20131,-34.28596 -39.81023,-95.06686 -43.97326,-106.37573c10.69174,-1.48423 24.2953,-1.09594 35.48867,-1.20915l-0.00004,0l0.00002,0z"
                        fill="#0000ff" id="svg_9" />
                    <path stroke="null"
                        d="m469.99057,146.77097c42.25314,19.94501 59.70598,53.84075 60.86442,74.81329c4.23233,61.91928 -20.55576,136.71686 -21.45595,140.32174c-1.92079,5.36239 -1.92079,5.36239 -7.11562,7.79046c-67.55318,0.09176 -73.1575,-0.25555 -88.31211,0c-2.85916,-11.23827 -1.22943,-20.51371 1.6944,-31.59335c16.98322,-60.57104 19.28861,-60.57104 21.09831,-80.74434c-0.04216,-58.82181 -77.04437,-44.11568 -82.26476,-7.33753c-25.30319,77.30893 -21.95863,86.89342 -29.88924,122.41417c-34.66687,0.03594 -75.76276,-1.76215 -93.70606,-3.31898c3.55254,-25.83749 8.19923,-40.82606 11.11117,-61.49043c26.82112,-132.88503 40.65053,-132.18336 61.72744,-154.02765c45.5703,-40.8288 112.01111,-35.28518 166.24802,-6.82737l-0.00003,-0.00002z"
                        fill="#0000ff" id="svg_10" />
                    <path stroke="null"
                        d="m302.69706,52.86196c18.71826,33.17962 20.79314,37.36003 24.23912,43.76051c-13.10734,5.0188 -17.81999,8.31424 -28.68928,14.55123c-18.43066,12.92622 -21.12508,14.86231 -23.82881,16.78768c-17.84793,14.2497 -21.54183,35.26497 -26.38529,55.3844c-6.74829,27.42302 -10.64746,46.38525 -13.62711,65.59136c-5.54042,18.64056 -3.45084,27.44297 -14.52561,33.66752c-18.9743,2.92668 -35.10618,-3.17887 -50.49816,-12.76348c-18.75088,-13.31576 -29.82559,-28.05889 -34.33875,-49.23058c-4.07668,-15.34709 -5.2323,-31.76696 3.37065,-54.51457c8.60295,-22.74761 3.63898,-9.15328 8.74891,-23.88968c36.39982,-7.58762 37.53561,-9.25894 38.14189,-11.21079c8.92264,-27.83068 23.35829,-52.27704 51.82374,-67.64218c19.8924,-9.82006 41.58796,-13.92589 65.56871,-10.49142z"
                        fill="#7f00ff" id="svg_11" />
                    <path stroke="null"
                        d="m765.56208,203.4686c32.38548,36.646 11.74199,76.74976 3.0138,89.21001c-62.1101,-1.18652 -171.63823,-10.44973 -165.8572,11.68692c-0.30967,21.78055 125.73904,19.96466 160.55085,20.25501c-3.73952,18.99785 -7.35245,30.64462 -42.07945,44.3104c-94.46845,1.7408 -139.9829,-1.93083 -156.95096,-16.91026c-45.61335,-32.43546 -11.84722,-122.50412 -0.70504,-135.56168c44.32867,-78.57788 167.64043,-59.76387 202.02798,-12.9904zm-149.24597,44.65197c21.8752,3.4948 66.32983,2.98762 97.19081,4.78291c10.27365,-40.86011 -91.22514,-50.09527 -97.19081,-4.78291z"
                        fill="#0000ff" id="svg_12" />
                    <path stroke="null"
                        d="m1805.77369,164.48156c48.5335,-0.14696 53.92949,-0.0114 59.78158,4.66468c-7.21465,36.5778 -6.29127,36.94497 -10.82198,38.72943c-78.52256,1.59849 -94.86839,-1.29916 -102.67338,4.98622c-3.04736,3.48944 -1.20061,9.73137 4.35219,12.22686c5.76061,4.15464 61.77881,0.11574 73.36755,-0.25876c3.3097,0.25876 4.54087,-0.4756 9.68717,0.94171c-1.63973,12.07637 -5.51158,24.51523 -9.98479,35.89484c-2.85837,3.40983 -5.82389,2.50508 -9.79025,2.59341c-56.75491,1.281 -66.77016,1.49993 -76.7856,1.70986c-5.54026,3.52588 -7.07922,11.82504 -2.46234,16.58153c6.96555,2.17255 12.46465,1.19429 19.0771,1.28345c77.33087,1.14671 78.97128,1.16718 80.6614,1.18826c3.729,0.31147 3.729,0.31147 5.53267,2.46311c-0.24295,10.38956 -0.7401,28.85414 -7.21465,36.5778c-83.48316,0.9538 -85.70282,0.99147 -87.98974,1.03027c-15.14608,-0.04488 -30.56357,-1.46905 -42.35352,-13.97011c-9.39238,-14.27233 -11.36227,-18.33912 -10.84978,-42.85977c5.12938,-43.61366 6.66834,-57.19907 29.48748,-83.84967c19.12563,-22.24453 71.24588,-19.91999 78.97893,-19.93311l-0.00002,0z"
                        fill="#00ffff" id="svg_13" />
                    <path transform="rotate(1 2123.36 244.681)" stroke="null"
                        d="m2101.83561,173.3969c-7.68092,42.8734 -8.001,48.715 -9.63975,55.06742c22.90406,-0.64901 45.80812,-1.29802 69.40624,-1.96669c6.16507,-29.06 9.14379,-41.11457 13.49566,-53.10072c8.21328,-1.59467 15.983,-2.23249 24.34038,-2.21253c11.3495,0.20367 15.35453,0.75543 20.00249,2.21253c0.94015,11.32204 -0.74242,21.21911 -3.14798,32.15084c-27.69924,109.45109 -27.69924,109.45109 -31.55514,111.41778c-31.01803,0.07281 -35.75244,0.04042 -40.48697,0c-2.41794,-7.05557 -1.41265,-11.81017 0.4142,-18.96014c5.26965,-20.62448 7.21808,-28.25033 9.22555,-36.10727c-22.90406,0.64901 -45.80812,1.29802 -69.40624,1.96669c-9.63975,45.23395 -9.63975,46.20595 -11.56771,52.10603c-9.29961,5.0284 -41.08344,1.23304 -42.41492,0.99469c-3.8559,-5.90008 -3.8559,-5.90008 -3.09197,-11.92115c28.03372,-123.64627 29.32188,-127.33506 32.01124,-131.64747c13.13928,-4.02098 29.12623,-2.85383 42.41492,0z"
                        fill="#00ffff" id="svg_14" />
                    <path stroke="null"
                        d="m2024.10635,178.69402c8.87294,10.131 12.71884,17.15792 13.37584,31.8107c-0.34893,7.50896 -0.34893,7.50896 -4.07091,14.06224c-6.35709,1.4417 -12.84617,1.0113 -19.30774,0.95569c-18.50647,0.12156 -17.58671,-3.47717 -24.80472,-7.85367c-18.24277,-9.18588 -30.7917,-10.98349 -32.34929,-10.98168c-33.71698,-4.65547 -44.37126,17.07371 -47.06124,21.56587c-10.34027,16.67486 -10.92913,33.2474 -3.14041,46.41905c10.14774,11.91141 21.88483,16.97152 35.89795,17.07775c21.65172,0.33787 29.5865,-12.32803 32.95856,-16.0538c7.58575,-12.13883 42.9356,-6.33073 50.36295,-5.25627c-14.64697,39.58079 -21.39189,43.53938 -24.89069,45.87294c-19.62399,14.70713 -60.01361,14.73043 -68.21299,15.47803c-21.21668,0.02492 -44.53173,-4.04101 -61.25642,-21.42548c-11.1033,-13.71468 -15.16159,-27.16484 -15.68754,-45.93266c0.67991,-25.09154 5.38888,-44.62928 19.30774,-63.89445c17.66554,-23.20478 36.71713,-30.78553 57.69058,-34.95081c32.51032,-5.17497 67.2099,-7.15847 91.18834,13.10655z"
                        fill="#00ffff" id="svg_15" />
                    <path stroke="null"
                        d="m1522.14958,162.28118c63.1762,0 126.3524,0 191.44303,0c-3.25987,28.52033 -3.25987,28.52033 -5.03797,35.26148c-6.61796,2.89501 -11.90501,2.67225 -19.30567,2.90116c-33.94698,1.06503 -41.32676,1.28991 -48.70699,1.50652c-3.4158,8.60006 -6.20651,17.08227 -8.39334,25.98124c-21.42195,82.29504 -22.00534,90.70354 -23.49376,94.95933c-16.24016,5.21251 -58.36657,0.32344 -63.40455,-1.88041c1.06813,-14.48476 3.37512,-30.54019 6.96966,-44.68047c21.93265,-68.24951 23.6414,-73.51808 25.34731,-78.78738c-50.76437,0.23253 -50.76437,0.23253 -54.62008,0.2502c-5.83561,-0.2502 -5.83561,-0.2502 -8.3546,-2.45405c1.18047,-11.98044 3.68276,-21.19431 7.55696,-33.05764z"
                        fill="#00ffff" id="svg_16" />
                </g>
            </svg>
        </div>
    </div>
</template>

<style scoped>
/* 更新 product-card 的样式 */
.product-card {
    position: absolute;
    will-change: transform, opacity, top, left;
    transition:
        top 1s cubic-bezier(0.4, 0, 0.2, 1),
        left 1s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s ease,
        transform 0.3s ease;
    transform: translateZ(0);
}


@keyframes cardExit {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(0.8);
    }
}

@keyframes cardEnter {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* 优化现有的卡片动画 */
/* .fade-enter-active,
.fade-leave-active {
    transition: all 3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.9);
} */

.waterfall-inner {
    direction: ltr;
    position: relative;
    min-height: 100%;
}

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
    width: 85%;
    /* background-color: #fff; */
    transition: height 3s ease-out;
}

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
        top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s ease,
        transform 0.3s ease;
    transform: translateZ(0);
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    animation-play-state: running;
}

.product-card[draggable="true"] {
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
}

.product-detail {
    position: absolute;
    font-size: 16px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
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
    transform: translateX(-40%);
    width: 500px;
    height: 200px;
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


.svg-title-container {
    width: 100%;
    /* margin-top: -100px; */
    /* height: 120px; */
}


.cart-icon {
    font-size: 40px;
    color: #4a90e2;
}

.cart-text {
    font-size: 40px;
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

.product-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    transform: translateY(100%);
    animation: slideUp 0.3s forwards;
    z-index: 2;
    display: flex;
    align-items: center;
}

.product-name {
    font-size: 1vw;
    font-weight: 600;
    margin-bottom: 4px;
}

.product-price {
    color: #e63946;
    font-size: 1.3vw;
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
</style>