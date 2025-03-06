<template>
    <!-- 修改外层容器结构 -->
    <footer class="footer-container">
        <div class="main-footer">
            <div class="footer-columns">
                <!-- 每个栏目增加语义化类名 -->
                <div class="footer-col nav-section">
                    <h3 class="footer-title">主页</h3>
                    <nav class="footer-links">
                        <a @click="handleToRouter('/introduction/1')">？？？？</a>
                        <a @click="handleToRouter('/introduction/1')">？？？？</a>
                        <a @click="handleToRouter('/introduction/1')">？？？？</a>
                    </nav>
                </div>

                <!-- 案例展示部分 -->
                <div class="footer-col case-section">
                    <h3 class="footer-title">购买商品</h3>
                    <nav class="footer-links">
                        <a @click="handleToRouter('/product')">？？？？</a>
                        <a @click="handleToRouter('/product')">？？？？</a>
                        <a @click="handleToRouter('/product')">？？？？</a>
                        <a @click="handleToRouter('/product')">？？？？</a>
                        <a @click="handleToRouter('/product')">？？？？</a>
                    </nav>
                </div>

                <!-- 新闻资讯部分 -->
                <div class="footer-col news-section">
                    <h3 class="footer-title">个人中心</h3>
                    <nav class="footer-links">
                        <a @click="handleToRouter('/mycenter')">？？？？</a>
                        <a @click="handleToRouter('/mycenter')">？？？？</a>
                        <a @click="handleToRouter('/mycenter')">？？？？</a>
                    </nav>
                </div>

                <!-- 联系方式部分 -->
                <div class="footer-col contact-section">
                    <h3 class="footer-title">联系我们</h3>
                    <div class="contact-content">
                        <div :default-active="activeIndex" class="city-selector" mode="horizontal"
                            @select="handleSelect">
                            <div index="1" class="city-item">{{ cityInfomation[showCity].city }}</div>
                        </div>
                        <div class="contact-info">
                            <p>{{ cityInfomation[showCity].phone }}</p>
                            <p>{{ cityInfomation[showCity].eamil }}</p>
                            <p>{{ cityInfomation[showCity].address }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 友情链接部分 -->
        <div class="sub-footer">
            <div class="friend-links">
                <span>友情链接：</span>
                <nav class="links">
                    <a href="https://www.jxnu.edu.cn/main.htm" target="_blank">江西师范大学</a>
                </nav>
            </div>
            <div class="copyright">
                <p>Copyright ©2025 Homyit . All Rights Reserved .</p>
                <a href="https://beian.miit.gov.cn" target="_blank" class="beian">赣B2-20050166号-1</a>
            </div>
        </div>
    </footer>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 响应式数据
const activeIndex = ref('1')
const showCity = ref(0)
const cityInfomation = ref([
    {
        city: '南昌',
        phone: '000-0000-0000',
        eamil: '@qq.com',
        address: '江西省南昌市南昌县紫阳大道99号(江西师范大学瑶湖校区)',
    },
])

// 方法
const handleSelect = (index) => {
    showCity.value = parseInt(index) - 1
}

const handleToRouter = (url) => {
    router.replace(url)
}

</script>

<style scoped>
.footer-container {
    background: #21282d;
    color: rgba(255, 255, 255, 0.8);
    padding: 4rem 0 0;
    font-size: 0.9rem;
    width: 100%;
    border-radius: 50px;
}

.main-footer {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
}

.footer-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2.5rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-col {
    margin-bottom: 1.5rem;
}

.footer-title {
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
    font-weight: 600;
    position: relative;
    padding-bottom: 0.5rem;
}

.footer-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.footer-links a {
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
}

.footer-links a:hover {
    color: #fff;
    transform: translateX(3px);
}

/* 联系方式部分 */
.contact-content {
    margin-top: 1rem;
}

.city-selector {
    background: transparent !important;
    border: none !important;
}

.city-selector .city-item {
    color: rgba(255, 255, 255, 0.6) !important;
    padding: 0 !important;
    height: auto !important;
    line-height: 1.5 !important;
    font-size: 0.95rem !important;
}

.city-selector .city-item:hover {
    background: transparent !important;
    color: #fff !important;
}

.contact-info p {
    margin: 0.6rem 0;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.6);
}

/* 底部友情链接 */
.sub-footer {
    max-width: 1280px;
    margin: 2rem auto 0;
    padding: 0 2rem 2rem;
}

.friend-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 1.5rem;
}

.friend-links span {
    color: rgba(255, 255, 255, 0.8);
}

.links a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.3s ease;
    white-space: nowrap;
    margin-right: 10px;
}

.links a:hover {
    color: #fff;
    text-decoration: underline;
}

.copyright {
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 2rem;
}

.beian {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    margin-left: 0.5rem;
}

.beian:hover {
    color: #fff;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .footer-columns {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .footer-title {
        font-size: 1rem;
    }

    .friend-links {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
}

@media (max-width: 480px) {

    .main-footer,
    .sub-footer {
        padding: 0 1rem;
    }

    .copyright {
        font-size: 0.8rem;
    }
}
</style>