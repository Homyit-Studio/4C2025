<script setup>
import { ref, onMounted } from 'vue'

import MacDock from '@/components/index/MacDock.vue';
import NavHeader from '@/components/index/NavHeader.vue';
import Bubble from '@/components/index/Bubble.vue';
import Title from '@/components/index/Title.vue';
import IndexFooter from '@/components/index/IndexFooter.vue';
import PhoneIntroduce from '@/components/index/PhoneIntroduce.vue';
import ComputerIntroduce from '@/components/index/ComputerIntroduce.vue';

const icons = ref(['/icons/icon1_home.svg', '/icons/icon2_phone.svg', '/icons/icon3_computer.svg', "/icons/icon4_plane.svg", "/icons/icon5_robot.svg", "/icons/icon6_more.svg"])

const images = ref(['bg_phone.webp', 'bg_computer.png', 'bg_phone.webp', 'bg_computer.png', 'bg_phone.webp', 'bg_computer.png'])
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


const scrollContainer = ref(null)
</script>

<template>
  <MacDock :icons="icons" @item-click="handleDockClick" />
  <div class="container" ref="scrollContainer">
    <NavHeader :scrollContainer="scrollContainer" />
    <div class="item" id="item-0">
      <Title></Title>
      <Bubble></Bubble>
    </div>
    <div class="item" id="item-1">
      <PhoneIntroduce></PhoneIntroduce>
      <Bubble></Bubble>
    </div>
    <div class="item" id="item-2">
      <ComputerIntroduce></ComputerIntroduce>
      <Bubble></Bubble>
    </div>
    <div class="item" id="item-3">4
      <Bubble></Bubble>
    </div>
    <div class="item" id="item-4">5
      <Bubble></Bubble>
    </div>
    <div class="footer" id="item-5">
      <IndexFooter></IndexFooter>
    </div>
  </div>
</template>

<style scoped>
/* 修改container样式 */
.container {
  position: relative;
  overflow-y: scroll;
  height: 100vh;
  scroll-behavior: smooth;
}

/* 添加视差背景层 */
.container::before {
  content: '';
  position: fixed;
  width: 100vw;
  height: 100vw;
  top: 0;
  left: 0;
  opacity: 0.6;
  background-image: url('/bg_phone.png');
  /* 使用你的图片路径 */
  background-size: cover;
  background-position: center;
  transform: translateZ(-3px) scale(3.5);
  /* 通过3D变换创建视差效果 */
  z-index: -1;
  will-change: transform;
  /* 优化动画性能 */
}

/* 创建3D上下文 */
.container {
  perspective: 1px;
  transform-style: preserve-3d;
}

#item-0 {
  position: relative;
  /* overflow: hidden; */
  height: 40vh;

}

#item-1 {
  position: relative;
  /* overflow: hidden; */
  /* height: 60vh; */
}

.container {
  font-size: 5em;
  scroll-snap-type: y proximity;
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.item {
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  /* align-items: center; */
  font-size: 3em;
  scroll-snap-align: start;
  /* 在滚动此元素的滚动容器的可见视口时，滚动容器可“越过”吸附位置。 */
  scroll-snap-stop: normal;

}

.footer {
  width: 100%;
  /* height: 60vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  scroll-snap-align: start;
  /* 在滚动此元素的滚动容器的可见视口时，滚动容器可“越过”吸附位置。 */
  scroll-snap-stop: normal;
}
</style>