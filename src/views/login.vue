<template>
    <!-- 顶部导航栏 -->
    <div class="nav-header">
        <div class="left">
            <div class="nav-logo-name" @click="handleToIndex">
                <svg viewBox="0 0 780 160" class="nav-svg-name" xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet" version="1.1">
                    <defs>
                        <linearGradient id="waterGradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="100%"
                            y2="0%">
                            <stop offset="0%" stop-color="#2196F3">
                                <animate attributeName="offset" from="0" to="1" dur="6s" begin="3s" fill="freeze" />
                            </stop>
                            <stop offset="0%" stop-color="#BBDEFB">
                                <animate attributeName="offset" from="0" to="1" dur="6s" begin="3s" fill="freeze" />
                            </stop>
                        </linearGradient>
                    </defs>

                    <g>
                        <title>首页</title>
                        <!-- 为所有路径添加渐变填充 -->
                        <path id="svg_1" class="logo-path" fill="url(#waterGradient)"
                            d="m303.27378,56.44028c12.31422,-0.19316 19.51528,-0.21298 20.87762,-0.2334c2.0984,3.03376 3.3301,6.9941 5.0485,10.73431c1.71841,3.74021 5.04698,12.56925 5.94084,14.03198c15.53857,-14.52774 20.21878,-20.45719 22.51217,-23.29217c30.57427,-0.1561 33.64971,-0.37801 40.67461,-0.10029c-32.35759,36.00535 -38.39739,42.42362 -39.62874,43.58601c22.22815,28.29483 28.01018,31.57366 29.07067,33.70579c-41.36845,0.30082 -34.33704,-0.20225 -45.83144,-0.35067c-7.88257,-12.1028 -6.24021,-9.75951 -10.21217,-15.73146c-14.49338,13.22875 -10.75507,13.69604 -19.06787,14c-35.13782,-0.03333 -37.17176,0.27199 -41.86728,-0.65591c24.3444,-21.74067 28.76645,-24.97445 36.83948,-32.3871c-6.26471,-13.80143 -20.4404,-38.2681 -22.57789,-42.82036c5.48963,-0.59746 12.47432,-0.44116 18.22151,-0.48673l-0.00002,0z" />
                        <path id="svg_2" class="logo-path" fill="url(#waterGradient)"
                            d="m162.56731,36.18815c16.26738,8.21435 22.98669,22.17431 23.43269,30.81185c1.62944,25.50145 -7.91393,56.30683 -8.2605,57.7915c-0.7395,2.2085 -0.7395,2.2085 -2.7395,3.2085c-26.00785,0.03779 -28.1655,-0.10525 -34,0c-1.10077,-4.62848 -0.47333,-8.44857 0.65234,-13.01172c6.53851,-24.94618 7.42608,-24.94618 8.12281,-33.25455c-0.01623,-24.22576 -29.66194,-18.16904 -31.67178,-3.02196c-9.74168,31.83968 -8.45403,35.78705 -11.5073,50.41627c-13.34668,0.0148 -29.16852,-0.72574 -36.07666,-1.36692c1.36772,-10.64117 3.15669,-16.81421 4.27778,-25.32483c10.32608,-54.72869 15.65038,-54.43971 23.76495,-63.43628c17.54448,-16.81534 43.12407,-14.5322 64.00518,-2.81185z" />
                        <path id="svg_3" class="logo-path" fill="url(#waterGradient)"
                            d="m99.93618,2.39893c9.2668,18.19702 10.29401,20.48972 12,24c-6.48902,2.75251 -8.8221,4.55986 -14.20313,7.98047c-9.12442,7.08925 -10.45834,8.15108 -11.79687,9.20703c-8.83593,7.8151 -10.66466,19.34071 -13.0625,30.375c-3.34086,15.03987 -5.27121,25.43951 -6.74634,35.9729c-2.74288,10.22322 -1.7084,15.05081 -7.19116,18.4646c-9.39356,1.60511 -17.37993,-1.74342 -25,-7c-9.28295,-7.30289 -14.76568,-15.38861 -17,-27c-2.01823,-8.41695 -2.59034,-17.42226 1.6687,-29.89795c4.25904,-12.47569 1.80154,-5.02002 4.3313,-13.10205c18.02037,-4.16135 18.58266,-5.07797 18.88281,-6.14844c4.41731,-15.26345 11.56393,-28.6708 25.65625,-37.09765c9.84808,-5.38571 20.58885,-7.63751 32.46094,-5.75391z" />
                        <path id="svg_4" class="logo-path" fill="url(#waterGradient)"
                            d="m277.94363,65.49123c13.39034,14.2746 4.85493,29.89609 1.24611,34.74969c-25.6805,-0.46218 -70.96681,-4.07045 -68.57654,4.55237c-0.12804,8.48411 51.98899,7.77677 66.38254,7.88987c-1.54617,7.40017 -3.04,11.9369 -17.39848,17.26009c-39.05962,0.67809 -57.87836,-0.75211 -64.8941,-6.587c-18.85963,-12.63448 -4.89844,-47.71864 -0.29151,-52.80491c18.32846,-30.60819 69.31385,-23.27963 83.53198,-5.06011zm-61.70834,17.39314c9.04468,1.36132 27.42522,1.16376 40.18523,1.86307c4.24782,-15.91611 -37.71862,-19.51345 -40.18523,-1.86307z" />
                        <path id="svg_5" class="logo-path" fill="url(#waterGradient)"
                            d="m528.02612,57.83203c26.90829,-0.0683 29.89997,-0.0053 33.14453,2.16797c-4,17 -3.48805,17.17065 -6,18c-43.53504,0.74292 -52.59761,-0.6038 -56.92491,2.31741c-1.68954,1.62176 -0.66565,4.52278 2.41297,5.68259c3.19384,1.93092 34.25185,0.05379 40.67696,-0.12026c1.83499,0.12026 2.51758,-0.22104 5.37083,0.43767c-0.90911,5.61265 -3.05577,11.39377 -5.53584,16.68259c-1.58476,1.58476 -3.22892,1.16427 -5.42798,1.20532c-31.46646,0.59536 -37.01919,0.69711 -42.57202,0.79468c-3.07167,1.6387 -3.92491,5.49584 -1.36519,7.70648c3.86189,1.00972 6.91074,0.55506 10.57686,0.5965c42.87433,0.53295 43.78382,0.54246 44.72087,0.55226c2.06746,0.14476 2.06746,0.14476 3.06746,1.14476c-0.1347,4.82868 -0.41033,13.41033 -4,17c-46.28533,0.44329 -47.51597,0.4608 -48.7839,0.47883c-8.3974,-0.02086 -16.94527,-0.68276 -23.48194,-6.49279c-5.20739,-6.63325 -6.29955,-8.52334 -6.01541,-19.91963c2.84387,-20.27001 3.69711,-26.584 16.34866,-38.97021c10.60377,-10.33843 39.50065,-9.25807 43.78806,-9.26417z" />
                        <path id="svg_6" class="logo-path" fill="url(#waterGradient)"
                            d="m687.3473,56.90736c-3.98398,21.79974 -4.15,24.77 -5,28c11.88,-0.33 23.76,-0.66 36,-1c3.19773,-14.77607 4.74275,-20.90543 7,-27c4.26011,-0.81084 8.29015,-1.13515 12.625,-1.125c5.88682,0.10356 7.96417,0.38411 10.375,1.125c0.48764,5.75689 -0.38508,10.78923 -1.63281,16.34766c-14.36719,55.65234 -14.36719,55.65234 -16.36719,56.65234c-16.0886,0.03702 -18.54427,0.02055 -21,0c-1.25415,-3.58753 -0.73272,-6.00509 0.21484,-9.64062c2.73329,-10.48688 3.74391,-14.36438 4.78516,-18.35938c-11.88,0.33 -23.76,0.66 -36,1c-5,23 -5,23.49423 -6,26.49423c-4.82357,2.55678 -21.30938,0.62696 -22,0.50577c-2,-3 -2,-3 -1.60376,-6.06152c14.54068,-62.87013 15.20883,-64.74576 16.60376,-66.93848c6.81515,-2.04454 15.10735,-1.45108 22,0z" />
                        <path id="svg_7" class="logo-path" fill="url(#waterGradient)"
                            d="m643.91008,62.08992c4.76787,4.63783 6.83446,7.85466 7.1875,14.5625c-0.1875,3.4375 -0.1875,3.4375 -2.1875,6.4375c-3.41598,0.65999 -6.90288,0.46296 -10.375,0.4375c-9.94444,0.05565 -9.45021,-1.5918 -13.3288,-3.5953c-9.80274,-4.20517 -16.5459,-5.02809 -17.38287,-5.02726c-18.1178,-2.13121 -23.84287,7.81611 -25.28833,9.87256c-5.55634,7.63352 -5.87276,15.2202 -1.6875,21.25c5.45288,5.45288 11.7598,7.76933 19.28974,7.81796c11.63454,0.15467 15.89829,-5.6436 17.71026,-7.34921c4.0762,-5.55699 23.07142,-2.89812 27.0625,-2.40625c-7.87054,18.11954 -11.49492,19.93173 -13.375,21c-10.54494,6.73272 -32.24828,6.74339 -36.65421,7.08563c-11.40077,0.01141 -23.9291,-1.84992 -32.9161,-9.80829c-5.96635,-6.27839 -8.14707,-12.43569 -8.42969,-21.02734c0.36535,-11.48656 2.89571,-20.43067 10.375,-29.25c9.49257,-10.62283 19.72993,-14.09319 31,-16c17.4694,-2.36903 36.1152,-3.27705 49,6z" />
                        <path id="svg_8" class="logo-path" fill="url(#waterGradient)"
                            d="m400.208,59.66579c25.08,0 50.16,0 76,0c-1.29412,12.94118 -1.29412,12.94118 -2,16c-2.62723,1.31362 -4.72611,1.21254 -7.66406,1.31641c-13.47644,0.48326 -16.4061,0.5853 -19.33594,0.68359c-1.35602,3.9023 -2.46389,7.75113 -3.33203,11.78906c-8.50419,37.34161 -8.73579,41.15699 -9.32667,43.08807c-6.4471,2.36519 -23.17065,0.14676 -25.17065,-0.85324c0.42403,-6.5725 1.33987,-13.8577 2.76685,-20.27389c8.70693,-30.96841 9.38528,-33.35904 10.0625,-35.75c-20.15269,0.10551 -20.15269,0.10551 -21.68335,0.11353c-2.31665,-0.11353 -2.31665,-0.11353 -3.31665,-1.11353c0.46863,-5.43616 1.462,-9.61698 3,-15z" />
                    </g>
                </svg>
            </div>

            <!-- slogan -->
            <div style="font-size: 1.8vw;color:#d25b5b; display: flex; align-items: center;">
                做最实惠的电子商品专卖店
            </div>
        </div>
    </div>
    <!-- 主体部分 -->
    <div class="body">
        <div class="container" :class="{ 'active': !isLogin }">
            <div class="form-box login">
                <form action="">
                    <h1>登录NexTech</h1>
                    <div class="input-box">
                        <input type="text" placeholder="用户名" name="用户名" id="username-login"></input>
                        <i class="bx bxs-user"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder="密码" name="密码" id="password-login"></input>
                        <i class="bx bxs-lock-alt"></i>
                    </div>
                    <div class="btn">登录</div>
                </form>
            </div>

            <div class="form-box register">
                <form action="">
                    <h1>注册NexTech</h1>
                    <div class="input-box">
                        <input type="text" placeholder="用户名" name="用户名" id="username-register"></input>
                        <i class="bx bxs-user"></i>
                    </div>
                    <div class="input-box">
                        <input type="email" placeholder="邮箱" name="邮箱" id="email-register"></input>
                        <i class="bx bxs-envelope"></i>
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder="密码" name="密码" id="password-register"></input>
                        <i class="bx bxs-lock-alt"></i>
                    </div>
                    <div class="btn">注册</div>
                </form>
            </div>

            <div class="toggle-box">
                <div class="toggle_circle"></div>
                <div class="toggle_circle toggle_circle-t"></div>
                <div class="toggle-panel toggle-left">
                    <h1>你好，欢迎！</h1>
                    <p>没有NexTech账号？</p>
                    <div @click="isLogin = false" class="btn register-btn">去注册</div>
                </div>
            </div>


            <div class="toggle-box">
                <div class="toggle-panel toggle-right">
                    <h1>欢迎回来！</h1>
                    <p>已有NexTech账号？</p>
                    <div @click="isLogin = true" class="btn login-btn">去登录</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount,ref } from 'vue';
import { useRouter } from 'vue-router'

const isLogin = ref(true);
const router = useRouter()

const handleToIndex = () => {
    router.push('/')
}

// 新增：滚动监听函数
const handleScroll = () => {
    const navHeader = document.querySelector('.nav-header')
    const scrollTop = window.scrollY
    const threshold = window.innerHeight * 0.5 // 50vh的像素值

    // 计算透明度比例（0-1）
    let opacity = 1 - (scrollTop / threshold)
    opacity = Math.max(0, Math.min(1, opacity)) // 确保0-1范围

    // 设置透明度
    navHeader.style.opacity = opacity
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

onMounted(() => {
    document.querySelectorAll('.logo-path').forEach(path => {
        const length = path.getTotalLength()
        path.style.strokeDasharray = length
        path.style.strokeDashoffset = length
    })
})
</script>


<style scoped>
/* 顶部导航栏样式 */
.nav-header {
    z-index: 10;
    position: fixed;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.3s ease;

    .left {
        display: flex;
        align-items: center;
        /* margin-top: 20px; */
    }
}

.nav-logo-name {
    cursor: pointer;
    width: 14vw;
    height: 3vw;
    color: #666;
    margin-right: 20px;
    /* color: #4b89ff; */
    /* 新增容器样式 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    /* background-color: rgba(255, 255, 255, 0.8); */
    border-radius: 100px;
    /* 确保溢出部分可见 */
}

.nav-logo-name {
    cursor: pointer;
    width: 14vw;
    height: 3vw;
    color: #666;
    margin-right: 20px;
    /* color: #4b89ff; */
    /* 新增容器样式 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    /* background-color: rgba(255, 255, 255, 0.8); */
    border-radius: 100px;
    /* 确保溢出部分可见 */
}

.nav-svg-cart {
    cursor: pointer;
    transform-origin: center;
    transition: transform 0.3s ease;
}

.nav-svg-name {
    cursor: pointer;
    transform-origin: center;
    transition: transform 0.3s ease;
}


/* 添加关键样式 */
.logo-path {
    stroke: currentColor;
    stroke-width: 5px;
    stroke-linecap: round;
    stroke-linejoin: round;
    animation: draw 3s ease-in-out forwards,
        pulse 3s ease-in-out infinite;
}

/* 优化动画效果 */
@keyframes draw {
    to {
        stroke-dashoffset: 0;
        stroke-width: 4px;
    }
}

/* 添加悬停效果 */
.nav-logo-cart:hover .logo-path {
    animation:
        draw 3s ease-in-out infinite alternate,
        pulse 3s ease-in-out infinite;
}

/* 添加悬停效果 */
.nav-logo-name:hover .logo-path {
    /* 悬停时放大 */
    animation:
        draw 3s ease-in-out infinite alternate,
        pulse 3s ease-in-out infinite;
}


@keyframes pulse {
    50% {
        filter: drop-shadow(0 0 5px currentColor);
    }
}

.body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(90deg, #ecf0f3, #4993ec);
    background-color: #ecf0f3;


    .container {
        position: relative;
        width: 850px;
        height: 550px;
        margin: 20px;
        background: #ecf0f3;
        border-radius: 30px;
        box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
        overflow: hidden;
    }

    .form-box {
        position: absolute;
        padding: 60px;
        right: 0;
        width: 50%;
        height: 100%;
        background-color: #ecf0f3;
        display: flex;
        align-items: center;
        color: #333;
        text-align: center;
        z-index: 1;
        transition: .3s ease-in-out .6s, visibility 0s .6s;
    }

    .container.active .form-box {
        right: 50%;
    }

    .form-box.register {
        visibility: hidden;
    }

    .container.active .form-box.register {
        visibility: visible;
    }

    form {
        width: 100%;
    }

    .container h1 {
        font-size: 36px;
        margin: -10px 0;
    }

    .input-box {
        position: relative;
        width: 100%;
        margin: 30px auto;
    }

    .input-box input {
        width: 100%;
        padding: 13px 50px 13px 20px;
        background-color: #ecf0f3;
        border: none;
        outline: none;
        font-size: 16px;
        color: #333;
        font-weight: 500;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    }


    .input-box input:focus {
        box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
    }

    .input-box input::placeholder {
        color: #888;
        font-weight: 400;

    }

    .input-box i {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 18px;
        color: #888;
        pointer-events: none;
    }

    .forgot-link {
        margin: -15px 0 15px;
    }

    .forgot-link a {
        font-size: 14.5px;
        text-decoration: none;
        color: #333;
    }

    .btn {
        line-height: 43px;
        width: 100%;
        height: 48px;
        border-radius: 8px;
        line-height: 43px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .1);
        border: none;
        cursor: pointer;
        font-size: 26px;
        color: #333;
        font-weight: 600;
        text-align: center;
        box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    }

    .register-btn,
    .login-btn {
        color: #fff;
        box-shadow: 8px 8px 16px #ecf0f3, -8px -8px 16px #f9f9f9;
    }

    .container p {
        font-size: 14.5px;
        margin: 15px 0;
    }

    .social-icons a {
        display: inline-flex;
        padding: 10px;
        border: 2px solid #999;
        border-radius: 8px;
        font-size: 24px;
        color: #333;
        text-decoration: none;
        margin: 0 8px;

        img {
            width: 24px;
            height: 24px;
        }
    }


    .toggle-box {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .toggle_circle {
        position: absolute;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        /* background-color: #c9d6ff; */
        box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #c9d6ff;
        bottom: -40%;
        left: -40%;
        z-index: 3;
        transition: 1.2s ease-in-out;
    }

    .toggle_circle-t {
        width: 400px;
        height: 400px;
        top: -40%;
        left: 0%;
        /* right: -40%; */
    }

    .container.active .toggle_circle {
        left: 50%;
        bottom: 68%;
    }

    .container.active .toggle_circle-t {
        top: 85%;
        left: 50%;
    }

    .toggle-box::before {
        content: '';
        position: absolute;
        left: -250%;
        width: 300%;
        height: 100%;
        background-color: #4993ec;
        /* border-radius: 150px; */
        box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
        z-index: 2;
        transition: 1.2s ease-in-out;
    }

    .container.active .toggle-box::before {
        left: 50%;
    }

    .toggle-panel {
        position: absolute;
        width: 50%;
        height: 100%;
        display: flex;
        color: #fff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 3;
        transition: 1.2s ease-in-out;
    }

    .toggle-panel.toggle-left {
        left: 0%;
        transition-delay: .6s;
    }

    .container.active .toggle-panel.toggle-left {
        left: -50%;
        transition-delay: .3s;
    }

    .toggle-panel.toggle-right {
        right: -50%;
        transition-delay: .3s;
    }

    .container.active .toggle-panel.toggle-right {
        right: 0;
        transition-delay: .6s;
    }

    .toggle-panel p {
        margin-bottom: 20px;
    }

    .toggle-panel .btn {
        width: 160px;
        height: 46px;
        background: transparent;
        /* border: 2px solid #333; */
    }
}


@media screen and (max-width: 768px) {
    .body {
        .container {
            height: 94vh;
        }

        .form-box {
            padding: 20px;
            bottom: 0;
            width: 100%;
            height: 70%;
        }

        .container.active .form-box {
            right: 0;
            bottom: 30%;
        }

        .toggle-box::before {
            top: -270%;
            width: 100%;
            height: 300%;
            left: 0;
            border-radius: 20vw;
        }

        .container.active .toggle-box::before {
            left: 0;
            top: 70%;
        }

        .toggle-panel {
            width: 100%;
            height: 30%;
        }

        .toggle-panel.toggle-left {
            top: 0%;
        }

        .container.active .toggle-panel.toggle-left {
            left: 0;
            top: -30%;
        }

        .toggle-panel.toggle-right {
            right: 0;
            bottom: -30%;
        }

        .container.active .toggle-panel.toggle-right {
            bottom: 0;
        }

        .toggle_circle {
            bottom: -52%;
            left: -59%;
        }

        .toggle_circle-t {
            width: 450px;
            height: 450px;
            top: -50%;
            left: 33%;
            /* right: -40%; */
        }

        .container.active .toggle_circle {
            left: -2%;
            bottom: 88%;
        }

        .container.active .toggle_circle-t {
            top: 87%;
            left: -41%;
        }


    }
}


@media screen and (max-width: 480px) {
    .body {
        .container {
            height: 80vh;
        }

        .form-box {
            padding: 20px;
        }

        .toggle-box::before {
            font-size: 28px;
        }

        .toggle_circle {
            bottom: -50%;
            left: -126%;
        }

        .toggle_circle-t {
            width: 265px;
            height: 332px;
            top: -40%;
            left: 33%;
        }

        .container.active .toggle_circle {
            left: 81%;
            bottom: 55%;
        }

        .container.active .toggle_circle-t {
            top: 92%;
            left: -20%;
        }
    }

}
</style>