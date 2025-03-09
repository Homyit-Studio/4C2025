<template>
    <!-- 修改外层容器结构 -->
    <footer class="footer-container">
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
/* 整体页脚容器样式 */
.footer-container {
    background: #21282d;
    color: rgba(255, 255, 255, 0.8);
    padding: 3rem 0;
    font-size: 0.9rem;
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

/* 子页脚部分样式 */
.sub-footer {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* 友情链接部分样式 */
.friend-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.friend-links span {
    font-weight: 600;
}

.links a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.links a:hover {
    color: #fff;
    text-decoration: underline;
}

/* 版权信息部分样式 */
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
    .sub-footer {
        padding: 0 1rem;
    }

    .copyright {
        font-size: 0.8rem;
    }
}
</style>