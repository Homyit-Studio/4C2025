<script setup>
import { ref, onMounted } from 'vue'

import MacDock from '@/components/MacDock.vue';
import NavHeader from '@/components/NavHeader.vue';
import Bubble from '@/components/Bubble.vue';
import Title from '@/components/Title.vue';
import IndexFooter from '@/components/IndexFooter.vue';
import PhoneIntroduce from '@/components/PhoneIntroduce.vue';

const icons = ref(['/icons/icon1_home.svg', '/icons/icon2_phone.svg', '/icons/icon3_computer.svg', "/icons/icon4_plane.svg", "/icons/icon5_robot.svg"])

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

</script>

<template>
  <NavHeader />
  <MacDock :icons="icons" @item-click="handleDockClick" />
  <div class="container">
    <div class="item" id="item-0">
      <Title></Title>
      <Bubble></Bubble>
    </div>
    <div class="item" id="item-1">
      <PhoneIntroduce></PhoneIntroduce>
    </div>
    <div class="item" id="item-2">3</div>
    <div class="item" id="item-3">4</div>
    <div class="item" id="item-4">5</div>
    <div class="footer">
      <IndexFooter></IndexFooter>
    </div>
  </div>
</template>

<style scoped>
#item-0 {
  position: relative;
  /* overflow: hidden; */
  height: 60vh;

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
}

.item {
  width: 100%;
  height: 95vh;
  margin: 0 auto;
  /* align-items: center; */
  font-size: 3em;
  scroll-snap-align: start;
  /* 在滚动此元素的滚动容器的可见视口时，滚动容器可“越过”吸附位置。 */
  scroll-snap-stop: normal;

}

.footer {
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  scroll-snap-align: start;
  /* 在滚动此元素的滚动容器的可见视口时，滚动容器可“越过”吸附位置。 */
  scroll-snap-stop: normal;
}
</style>