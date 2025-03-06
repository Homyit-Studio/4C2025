<template>
    <div class="body">
        <div class="shell" ref="shellRef">
            <!-- 登录注册容器 -->
            <div class="forms-wrapper" :class="{ 'mobile-slide': !showLogin }">
                <div class="container a-container" :class="{ 'is-txl': !showLogin, 'mobile-top': isMobile }">
                    <form class="form" @submit.prevent="handleSubmit(false)">
                        <h2 class="form_title title">创建账号</h2>
                        <span class="form_span">选择注册方式或电子邮箱注册</span>
                        <input type="text" class="form_input" placeholder="Name">
                        <input type="email" class="form_input" placeholder="Email">
                        <input type="password" class="form_input" placeholder="Password">
                        <button class="form_button button submit">SIGN UP</button>
                    </form>
                </div>

                <div class="container b-container" :class="{ 'is-txl': showLogin, 'mobile-bottom': isMobile }">
                    <form class="form" @submit.prevent="handleSubmit(true)">
                        <h2 class="form_title title">登入账号</h2>
                        <span class="form_span">选择登录方式或电子邮箱登录</span>
                        <input type="email" class="form_input" placeholder="Email">
                        <input type="password" class="form_input" placeholder="Password">
                        <a class="form_link">忘记密码？</a>
                        <button class="form_button button submit">SIGN IN</button>
                    </form>
                </div>
            </div>
            <!-- 切换容器 -->
            <div class="switch" :class="{
                'is-txr': !showLogin,
                'mobile-switch': isMobile,
                'switch-vertical': isMobile
            }">
                <div class="switch_circle" :class="{ 'mobile-circle': isMobile }"></div>
                <div class="switch_circle switch_circle-t" :class="{ 'mobile-circle-t': isMobile }"></div>

                <div class="switch_container" v-show="showLogin">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
                    <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
                    <button class="switch_button button" @click="toggleForm">SIGN IN</button>
                </div>

                <div class="switch_container" v-show="!showLogin">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
                    <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
                    <button class="switch_button button" @click="toggleForm">SIGN UP</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const shellRef = ref(null)

// 处理响应式
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
}

// 提交处理
const handleSubmit = (isLogin) => {
    console.log(isLogin ? 'Login submit' : 'Register submit')
}

// 生命周期
onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile)
})

const showLogin = ref(true)
const isMobile = ref(false)

const toggleForm = () => {
    showLogin.value = !showLogin.value
}

// 添加响应式监听
watch(showLogin, (newVal) => {
    if (isMobile.value) {
        // 移动端通过CSS transform实现滑动
        // 动画由CSS transition控制
    }
})
</script>

<style scoped>
.body {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: #ecf0f3;
    color: #a0a5a8;
    user-select: none;
}

.shell {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
}

/* 设置响应式 */
@media (max-width: 1200px) {
    .shell {
        transform: scale(0.7);
    }
}

@media (max-width: 1000px) {
    .shell {
        transform: scale(0.6);
    }
}

@media (max-width: 800px) {
    .shell {
        transform: scale(0.5);
    }
}

@media (max-width: 700px) {
    .shell {
        transform: scale(0.4);
    }
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: 1.25s;
}

.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.iconfont {
    margin: 0 5px;
    border: rgba(0, 0, 0, 0.5) 2px solid;
    border-radius: 50%;
    font-size: 25px;
    padding: 3px;
    opacity: 0.5;
    transition: 0.1s;
}

.iconfont:hover {
    opacity: 1;
    transition: 0.15s;
    cursor: pointer;
}

.form_input {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    padding-left: 25px;
    font-size: 13px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.form_input:focus {
    box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
    margin-top: 30px;
    margin-bottom: 12px;
}

.form_link {
    color: #181818;
    font-size: 15px;
    margin-top: 25px;
    border-bottom: 1px solid #a0a5a8;
    line-height: 2;
}

.title {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #181818;
    letter-spacing: 10px;
}

.description {
    font-size: 14px;
    letter-spacing: 0.25px;
    text-align: center;
    line-height: 1.6;
}

.button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.15px;
    background-color: #4B70E2;
    color: #f9f9f9;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    border: none;
    outline: none;
}

.a-container {
    z-index: 100;
    left: calc(100% - 600px);
}

.b-container {
    left: calc(100% - 600px);
    z-index: 0;
}

.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: #ecf0f3;
    box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
}

.switch_circle-t {
    top: -30%;
    left: 60%;
    width: 300px;
    height: 300px;
}

.switch_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    padding: 50px 55px;
    transition: 1.25s;
}

.switch_button {
    cursor: pointer;
}

.switch_button:hover,
.submit:hover {
    box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
    transform: scale(0.985);
    transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
    box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
    transform: scale(0.97);
    transition: 0.25s;
}

.is-txr {
    left: calc(100% - 400px);
    transition: 1.25s;
    transform-origin: left;
}

.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
}

.is-z {
    z-index: 200;
    transition: 1.25s;
}

.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}

.is-gx {
    animation: is-gx 1.25s;
}

@keyframes is-gx {

    0%,
    10%,
    100% {
        width: 400px;
    }

    30%,
    50% {
        width: 500px;
    }
}

@media (max-width: 768px) {
    .shell {
        width: 100vw;
        min-width: 100vw;
        height: 100vh;
        min-height: 100vh;
        box-shadow: none;
        border-radius: 0;
        overflow: hidden;
        padding: 0;
    }

    /* 表单容器父级 */
    .forms-wrapper {
        display: flex;
        width: 200%;
        height: calc(100% - 120px);
        transition: transform 0.5s ease;
    }

    .container {
        width: 100vw;
        height: 100%;
        position: relative;
        left: auto !important;
        transform: none !important;
    }

    /* 切换按钮区域 */
    .switch {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.05);
        background: #ecf0f3;
        flex-direction: column;
        z-index: 300;
    }

    /* 移动端滑动动画 */
    .mobile-slide {
        transform: translateX(-50%);
    }

    /* 隐藏桌面端元素 */
    .switch_circle,
    .switch_circle-t {
        display: none;
    }

    .form {
        padding: 40px 20px 20px;
    }

    .form_input {
        width: 80%;
        max-width: 300px;
    }

    .button {
        margin-top: 30px;
        width: 140px;
        height: 40px;
    }
}
</style>