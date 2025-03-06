<template>
    <NavHeader></NavHeader>
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
                    <div class="forgot-link">
                        <a href="#">忘记密码？</a>
                    </div>
                    <div class="btn">登录</div>
                    <p>用社交账号登录？</p>
                    <div class="social-icons">
                        <a href="#"><img src="../assets/icons/icons8-qq.svg" alt=""></a>
                        <a href="#"><img src="../assets/icons/icons8-wechat.svg" alt=""></a>
                        <a href="#"><i class="bx bxl-github"></i></a>
                    </div>
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
                    <p>用社交账号注册？</p>
                    <div class="social-icons">
                        <a href="#"><img src="../assets/icons/icons8-qq.svg" alt=""></a>
                        <a href="#"><img src="../assets/icons/icons8-wechat.svg" alt=""></a>
                        <a href="#"><i class="bx bxl-github"></i></a>
                    </div>
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

import { ref } from 'vue';
import NavHeader from '@/components/NavHeader.vue';
const isLogin = ref(true);
</script>


<style scoped>
.body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(90deg, #ecf0f3, #c9d6ff);
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
        color: #999;
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
        background-color: #c9d6ff;
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
        color: #999;
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