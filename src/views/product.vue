<script setup>
import { ref, onMounted } from 'vue'

import NavHeader from '@/components/index/NavHeader.vue';
import MacDockProduct from '@/components/product/MacDockProduct.vue';
import BuyPhone from '@/components/product/BuyPhone.vue';

const icons = ref(['/icons/icon2_phone.svg', '/icons/icon3_computer.svg', "/icons/icon4_plane.svg", "/icons/icon5_robot.svg"])
const titles = ref(['手机', '电脑', '耳机', '智能设备'])
const activeIndex = ref(0)

const handleDockClick = (index) => {
    const element = document.getElementById(`item-${index}`)
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }
}

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

const manufacturers = [
    { name: 'All', id: 'all' },
    { name: '苹果', id: 'Apple' },
    { name: '三星', id: 'Samsung' },
    { name: '小米', id: 'Xiaomi' },
    { name: '华为', id: 'Huawei' },
    { name: 'OPPO', id: 'Oppo' }
];

const selectedBrand = ref('all') // 新增: 管理当前选中的品牌

// 新增: 处理品牌切换
const handleBrandChange = (brandId) => {
    selectedBrand.value = brandId
}

</script>

<template>
    <NavHeader />
    <MacDockProduct :icons="icons" :titles="titles" :activeIndex="activeIndex" :manufacturers="manufacturers"
        @item-click="handleDockClick" @brand-change="handleBrandChange" />
    <div class="maincontainer">
        <div class="item" id="item-0">
            <BuyPhone :selectedBrand="selectedBrand"></BuyPhone> <!-- 新增: 传递选中的品牌 -->
        </div>
        <div class="item" id="item-1">2</div>
        <div class="item" id="item-2">3</div>
        <div class="item" id="item-3">4</div>
    </div>
</template>

<style scoped>
/* #item-0 {
  position: relative;
  overflow: hidden;
  height: 60vh;
} */

.maincontainer {
    font-size: 5em;
    scroll-snap-type: y proximity;
    overflow-y: scroll;
    height: 100vh;
    overflow: hidden;
}

.item {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    /* align-items: center; */
    font-size: 3em;
    scroll-snap-align: start;
    /* 在滚动此元素的滚动容器的可见视口时，滚动容器可“越过”吸附位置。 */
    scroll-snap-stop: normal;
    overflow: hidden;
}

.footer1 {
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