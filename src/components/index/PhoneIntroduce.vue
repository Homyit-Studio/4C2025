<template>
    <div class="container-wrapper">
        <!-- 图片轮播区域 -->
        <transition name="fade" mode="out-in">
            <img :key="selectedManufacturer.name" :src="selectedManufacturer.img" class="product-image"
                alt="phone image">
        </transition>

        <!-- 左侧滚动选择器 -->
        <div class="left-panel">
            <div class="carousel-container" @click="resetAutoPlay">
                <div class="title-troduce" style="font-size: 1.5vw;color: #ffffff;height: 100px;">国内外部分知名手机厂商汇总</div>
                <div class="play-controls">
                    <i class='bx bxl-play-store' :class="{ 'active': isPlaying }" @click="startAutoPlay"
                        v-show="!isPlaying"></i>
                    <i class='bx bx-pause' :class="{ 'active': !isPlaying }" @click="stopAutoPlay"
                        v-show="isPlaying"></i>
                </div>
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
                <div
                    style="vertical-align:text-top; font-size: 2vw;color: #409EFF; cursor: pointer; background: rgba(64, 158, 255, 0.1) !important;border-radius: 50px;line-height: 3vw;filter: drop-shadow(0 0 20px #409EFF);">
                    最新高端机型购买
                </div>
            </div>
        </div>

        <!-- 右侧详细信息 -->
        <div class="right-panel">
            <transition name="flip" mode="out-in">
                <div :key="selectedManufacturer.name" class="content-wrapper">
                    <div class="header-section">
                        <div class="name">{{ selectedManufacturer.name }}</div>
                        <!-- 子品牌渲染 -->
                        <div class="sub-brands" v-if="selectedManufacturer.subBrands.length">
                            <span class="sub-label">关联品牌：</span>
                            <span v-for="(brand, idx) in selectedManufacturer.subBrands" :key="idx" class="brand-tag">
                                {{ brand }}
                            </span>
                        </div>
                    </div>

                    <!-- 修改后的现状展示区域 -->
                    <div class="status-container">
                        <div v-for="(category, catIndex) in selectedManufacturer.status" :key="catIndex"
                            class="status-category">
                            <!-- 分类标题 -->
                            <h3>{{ Object.keys(category)[0] }}</h3>

                            <!-- 具体条目 -->
                            <ul>
                                <li v-for="(item, itemIndex) in Object.values(category)[0]" :key="itemIndex">
                                    <div class="status-item">
                                        <div class="status-title">{{ Object.keys(item)[0] }}</div>
                                        <div class="status-content">{{ Object.values(item)[0] }}</div>
                                    </div>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 手机厂商数据
const manufacturers = [
    {
        name: '关于手机',
        img: 'null',
        subBrands: [],
        status: [
            {
                '国内市场现状': [
                    { "国产品牌主导地位加强": "华为、小米、vivo、OPPO等国产厂商在2024年销量增长显著，2025年1月华为以19.3%的市场份额重回榜首，小米同比增长超42%，激活量达570万台，位列第二。苹果则因销量下滑5%而市场份额缩减至13.7%。国产手机凭借技术迭代（如5G、AI影像）和性价比优势，进一步挤压国际品牌空间。" },
                    { '高端市场竞争白热化': '国产厂商通过子品牌（如Redmi、iQOO、一加）冲击高端市场，2025年国内手机均价预计突破4000元。华为Mate70系列、小米15系列等旗舰机型热销，显示国产高端化战略初见成效。' },
                    { '政策刺激与消费升级': '中国“两新政策”（新型消费与新型基础设施）实施后，补贴覆盖全国，拉动换机需求。例如，2025年1月安卓手机销量同比增70%，苹果增长20%，小米在补贴下销量激增至补贴前的四倍。' }
                ]
            },
            {
                '国际市场现状': [
                    { "国产厂商海外扩张加速": "国内市场竞争饱和后，华为、荣耀、传音等品牌加大海外投入，尤其在东南亚、中东非等新兴市场。传音凭借低价策略在非洲稳居头部，荣耀则通过渠道重建恢复海外份额。" },
                    { "国际品牌面临压力": "苹果、三星在高端市场仍具优势，但2024年销量分别下滑0.9%和1.4%，部分市场被国产手机替代。苹果通过调整定价策略（如入门机型降价）应对竞争，但创新乏力导致增长受限。" },
                    { "技术差异化竞争": "国产手机在快充（如120W有线快充）、折叠屏（2025年中国出货量预计达1000万部）、卫星通信等领域领先，而三星依赖供应链优势，苹果则聚焦生态整合与芯片自研（如A18芯片）。" }
                ]
            },
            {
                "未来趋势与挑战": [
                    { "技术驱动": "AI手机（2025年预计占中国市场的40.7%）、折叠屏和端侧AI功能将成为增长核心。" },
                    { "价格分化": "高端（600美元以上）与低端（200美元以下）市场份额扩大，中端市场萎缩。" },
                    { "生态布局": "厂商加速布局智能家居、物联网，构建软硬件协同生态。" }
                ]
            }
        ]
    },
    {
        name: '华为',
        img: '/phone/huaweimate70rs.png',
        subBrands: ['荣耀'],
        status: [
            {
                '国内市场现状': [
                    { "高端市场强势回归": "2025年Q1华为以19.3%的市场份额重回国内第一，Mate70系列带动高端市场回归，销量同比增长超50%。" },
                    { "技术突破": "5G芯片国产化取得重大突破，卫星通信技术行业领先，成为高端用户首选品牌。" }
                ]
            },
            {
                '国际市场现状': [
                    { "海外市场复苏": "荣耀独立后，华为通过Mate系列和P系列重新布局欧洲市场，2024年欧洲市场份额回升至8%。" },
                    { "技术壁垒": "受制于芯片供应问题，海外市场仍面临一定挑战，但凭借技术优势保持高端品牌形象。" }
                ]
            },
            {
                "未来趋势与挑战": [
                    { "生态整合": "加速鸿蒙OS生态建设，目标2025年接入设备数突破10亿。" },
                    { "芯片自研": "继续加大芯片研发投入，推动5G芯片全面国产化。" }
                ]
            }
        ]
    },
    {
        name: '苹果',
        img: '/phone/iPhone16pro.png',
        subBrands: [],
        status: [
            {
                '国内市场现状': [
                    { "市场份额下滑": "2025年Q1苹果在中国市场份额降至13.7%，销量同比下滑5%，主要受国产高端机型冲击。" },
                    { "品牌忠诚度高": "iOS生态留存率仍维持在92%的高位，高端用户群体稳定。" }
                ]
            },
            {
                '国际市场现状': [
                    { "全球销量下滑": "2024年全球销量下滑0.9%，主要受新兴市场国产手机替代影响。" },
                    { "技术优势": "A18芯片性能领先安卓阵营，iPhone 16系列在欧美市场仍占据高端主导地位。" }
                ]
            },
            {
                "未来趋势与挑战": [
                    { "创新压力": "需突破硬件创新瓶颈，应对国产手机的快速迭代。" },
                    { "生态扩展": "加速AR/VR设备与iPhone的生态整合，拓展新增长点。" }
                ]
            }
        ]
    },
    {
        name: '小米',
        img: '/phone/xiaomi15ultra.png',
        subBrands: ['红米'],
        status: [
            {
                '国内市场现状': [
                    { "销量激增": "2025年Q1激活量同比激增42%，红米K70系列成为中端市场爆款。" },
                    { "高端突破": "小米15 Ultra在5000元以上价位段销量突破百万台，高端化战略初见成效。" }
                ]
            },
            {
                '国际市场现状': [
                    { "海外市场占比提升": "2024年海外市场占比提升至58%，印度、东南亚市场表现强劲。" },
                    { "生态扩展": "智能家居生态设备破8亿，海外IoT收入同比增长30%。" }
                ]
            },
            {
                "未来趋势与挑战": [
                    { "汽车生态": "澎湃OS接入汽车生态，推动手机与汽车互联。" },
                    { "高端化挑战": "需进一步提升品牌溢价能力，巩固高端市场地位。" }
                ]
            }
        ]
    },
    {
        name: 'OPPO',
        img: '/phone/OPPOFind5.png',
        subBrands: ['一加'],
        status: [
            {
                '国内市场现状': [
                    { "Find系列热销": "Find X7系列首销破百万台，成为5000元价位段热门机型。" },
                    { "技术领先": "240W快充技术持续领先，AI影像算法专利申请数量行业第一。" }
                ]
            },
            {
                '国际市场现状': [
                    { "东南亚市场": "东南亚市场份额保持前三，一加在印度高端市场表现亮眼。" },
                    { "欧洲布局": "通过Find系列加速欧洲市场布局，2024年欧洲市场份额提升至5%。" }
                ]
            },
            {
                "未来趋势与挑战": [
                    { "AI影像": "加大AI影像技术研发，巩固拍照手机市场地位。" },
                    { "生态建设": "推动ColorOS与IoT设备深度融合，构建全场景生态。" }
                ]
            }
        ]
    },
    {
        name: '三星',
        img: '/phone/Samsungs25ultra.png',
        subBrands: [],
        status: [
            {
                '国内市场现状': [
                    { "市场份额萎缩": "2025年Q1中国市场份额降至1%以下，主要受国产高端机型冲击。" },
                    { "折叠屏领先": "Galaxy Z Fold5在国内折叠屏市场占据40%份额，技术优势明显。" }
                ]
            },
            {
                '国际市场现状': [
                    { "全球销量下滑": "2024年全球销量下滑1.4%，但仍是全球出货量第一的品牌。" },
                    { "供应链优势": "凭借屏幕、存储等供应链优势，保持高端市场竞争力。" }
                ]
            },
            {
                "未来趋势与挑战": [
                    { "折叠屏普及": "推动折叠屏成本下降，加速市场普及。" },
                    { "本地化不足": "需加强系统本地化，提升中国市场竞争力。" }
                ]
            }
        ]
    },
    {
        name: 'VIVO',
        img: '/phone/VIVOX200pro.png',
        subBrands: ['IQOO'],
        status: [
            {
                '国内市场现状': [
                    { "影像技术领先": "VIVO X200 Pro搭载自研V3影像芯片，成为拍照手机标杆。" },
                    { "游戏性能突出": "IQOO系列在游戏手机市场占据30%份额，性能调校领先。" }
                ]
            },
            {
                '国际市场现状': [
                    { "东南亚市场增长": "2024年东南亚市场份额提升至15%，中端机型表现亮眼。" },
                    { "欧洲布局": "通过X系列加速欧洲市场布局，2024年欧洲市场份额提升至3%。" }
                ]
            },
            {
                "未来趋势与挑战": [
                    { "影像技术": "继续深耕影像技术，巩固拍照手机市场地位。" },
                    { "高端化挑战": "需提升品牌溢价能力，突破高端市场。" }
                ]
            }
        ]
    },
    {
        name: '中兴',
        img: '/phone/hongmo10.png',
        subBrands: ['努比亚', '红魔'],
        status: [
            {
                '国内市场现状': [
                    { "市场份额较低": "2025年Q1中兴在国内智能手机市场份额不足1%，主要集中在中低端市场，面临华为、小米等品牌的激烈竞争。" },
                    { "影像技术突破": "努比亚Z60 Ultra搭载定制光学镜头和AI影像算法，在星空摄影和长焦拍摄领域表现突出，成为影像爱好者的热门选择。" },
                    { "游戏手机领域": "红魔系列凭借出色的散热设计和游戏性能优化，在国内游戏手机市场占据约15%的份额，深受电竞玩家青睐。" }
                ]
            },
            {
                '国际市场现状': [
                    { "海外市场布局": "中兴通过努比亚和红魔品牌布局欧洲、拉美和东南亚市场，2024年海外收入占比提升至40%，尤其在德国和西班牙市场表现亮眼。" },
                    { "5G技术优势": "凭借在5G技术领域的深厚积累，中兴与多个海外运营商达成合作，为其提供定制化5G终端设备。" },
                    { "品牌认知度提升": "通过赞助电竞赛事和影像比赛，努比亚和红魔品牌在海外年轻用户群体中的认知度显著提升。" }
                ]
            },
            {
                "未来趋势与挑战": [
                    { "品牌重塑": "中兴需加强品牌建设，提升消费者对努比亚和红魔品牌的认知度和忠诚度，突破中低端市场的局限。" },
                    { "技术突破": "继续深耕5G、影像技术和游戏手机领域，打造差异化竞争力，巩固在细分市场的优势。" },
                    { "生态布局": "加速布局智能家居和IoT生态，推动手机与其他智能设备的互联互通，提升用户粘性。" },
                    { "国际市场拓展": "加大对欧洲和东南亚市场的投入，通过本地化营销和渠道建设，进一步提升海外市场份额。" }
                ]
            }
        ]
    }
];
// 动态计算参数
const itemCount = computed(() => manufacturers.length)
const itemAngle = computed(() => 360 / itemCount.value) // 每个项目的旋转角度
const radius = 25 * manufacturers.length // 3D旋转半径

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
    resetAutoPlay() // 点击后重置定时器
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
        opacity: activeIndex.value === index ? 1 : 0.6
    }
}

// 滚轮处理
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

// 自动轮播
const autoPlayInterval = ref(null) // 自动播放定时器
// 鼠标悬停状态
// 新增自动播放相关逻辑
const getNextIndex = () => {
    return (activeIndex.value + 1) % itemCount.value
}

// 添加播放状态控制
const isPlaying = ref(false)

// 修改自动播放相关逻辑
const startAutoPlay = () => {
    isPlaying.value = true
    resetAutoPlay()
}

const stopAutoPlay = () => {
    isPlaying.value = false
    clearInterval(autoPlayInterval.value)
}

// 修改自动播放函数
const autoPlay = () => {
    if (isPlaying.value) {
        const nextIndex = getNextIndex()
        handleClick(nextIndex)
    }
}

// 修改重置自动播放函数
const resetAutoPlay = () => {
    clearInterval(autoPlayInterval.value)
    if (isPlaying.value) {
        autoPlayInterval.value = setInterval(autoPlay, 4000)
    }
}

// 修改 mounted 钩子,默认不自动播放
onMounted(() => {
    activeRotateY.value = 0
})

// ...其他代码保持不变...

onBeforeUnmount(() => {
    clearInterval(autoPlayInterval.value)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.fade-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.product-image {
    position: absolute;
    height: 100%;
    left: 52.5%;
    pointer-events: none;
    user-select: none;
    opacity: 0.1;
    /* 添加投影增强立体感 */
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2));
}

/* 子品牌样式 */
.header-section {
    margin-bottom: 10px;
}

.sub-brands {
    font-size: 1vw;
    margin-top: 1rem;
    opacity: 0.8;
}

.sub-label {
    font-size: 1vw;
    color: #a8abb2;
}

.brand-tag {
    display: inline-block;
    margin: 0 5px;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 1vw;
    transition: all 0.3s;
    background: rgba(64, 158, 255, 0.1);
    color: #409EFF;
}

.brand-tag:hover {
    transform: translateY(-2px);
}

/* 优化现有样式 */
.details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.advantages h3 {
    color: #4CAF50;
}

.disadvantages h3 {
    color: #F44336;
}



.container-wrapper {
    /* z-index: -1; */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.carousel-container {
    width: 100%;
    display: flex;
    perspective: 1500px;
    height: 100%;
    border-radius: 10px;
    /* margin-left: 1vw; */
    background-color: #00000070;
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
    background: #fff;
    /* border: 1px solid #eee; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition:
        all 0.3s ease,
        opacity 0.3s,
        transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.item:hover {
    background: #409EFF;
    transform: scale(1);
    filter: drop-shadow(0 0 20px #409EFF);
}

.left-panel {
    width: 30%;
    height: 100%;
    /* 控制可视区域高度 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* 内容垂直居中 */
}

.right-panel {
    width: 70%;
    height: 100%;
    /* margin-left: 2.5vw; */
    padding: 20px;
    background: #00000070;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    /* 控制可视区域高度 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 30px 150px 30px 30px;
}


/* 现状展示样式 */
.status-container {
    /* margin-top: 2rem; */
    max-height: 80vh;
    /* 限制最大高度 */
    overflow-y: auto;
    /* 添加垂直滚动条 */
    padding-right: 15px;
    /* 为滚动条预留空间 */
    border-radius: 10px;
    border: 1px solid #ffffff;
    filter: drop-shadow(0 0 2px #ffffff);
    /* 自定义滚动条样式 */
    scrollbar-width: thin;
    /* Firefox */
    scrollbar-color: #409EFF rgba(255, 255, 255, 0.1);
    /* Firefox */
}

/* 自定义 WebKit 浏览器的滚动条样式 */
.status-container::-webkit-scrollbar {
    width: 6px;
}

.status-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

.status-container::-webkit-scrollbar-thumb {
    background: #409EFF;
    border-radius: 3px;
    transition: all 0.3s;
}

.status-container::-webkit-scrollbar-thumb:hover {
    background: #66b1ff;
}

/* 优化内容布局 */
.status-category {
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
}

/* 确保最后一个类别底部有足够空间 */
.status-category:last-child {
    margin-bottom: 2rem;
}


.content-wrapper {
    height: 100%;
    /* 确保内容包裹器填满右侧面板 */
    display: flex;
    flex-direction: column;
}

.status-category h3 {
    color: #409EFF;
    font-size: 1.3vw;
    border-left: 4px solid #409EFF;
    padding-left: 12px;
    margin: 1.5rem 0;
}

.status-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    transition: all 0.3s;
}

.status-item:hover {
    background: rgba(64, 158, 255, 0.1);
    transform: translateX(10px);
}

.status-title {
    color: #67C23A;
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 1vw;
}

.status-content {
    color: #333;
    line-height: 1.6;
    font-size: 0.8vw;
    opacity: 0.9;
}


.name {
    font-size: 2.2rem !important;
    color: #fff;
    letter-spacing: 2px;
}



.scroll-wrapper {
    overscroll-behavior: contain;
    height: 300px;
    perspective: 800px;
    /* 3D透视 */
    overflow: visible;
    /* 允许3D溢出 */
}

/* 保持原有过渡效果 */
.flip-enter-active,
.flip-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    transform-style: preserve-3d;
}



.name {
    font-size: 1.6vw;
}


.details {
    font-size: 1.3vw;
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
    margin: 10px 10px 10px 10px;
    padding: 8px 12px;
    background: #f8f8f8;
    border-radius: 4px;
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
    margin-bottom: 100px;
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

/* 添加播放控制按钮样式 */
.play-controls {
    /* position: absolute;
    top: 20px;
    display: flex;
    gap: 10px;
    z-index: 10; */
    display: flex;
    height: 100px;
}

.play-controls i {
    font-size: 36px;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;

}

.play-controls i:hover {
    color: #409EFF;
    transform: scale(1.1);
    animation: pulse 0.5s infinite;
}

.play-controls i.active {
    color: #409EFF;
    animation: pulse 0.5s infinite;

}
</style>