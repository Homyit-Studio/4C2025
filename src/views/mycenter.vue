<template>
  <div class="profile-container">
    <!-- 顶部背景 -->
    <el-card class="header-bg" :style="{ backgroundImage: `url(${bgImage})` }">
      <div class="user-info">
        <el-avatar :size="60" :src="avatar" class="avatar" />
        <div class="details">
          <span class="username">{{ username }}</span>
          <el-button type="primary" @click="showEditModal = true">编辑个人信息</el-button>
        </div>
      </div>
    </el-card>

    <!-- 导航栏 -->
    <el-tabs v-model="activeTab" class="nav-bar">
      <el-tab-pane label="主页" name="home"></el-tab-pane>
      <el-tab-pane label="优惠券" name="coupons"></el-tab-pane>
      <el-tab-pane label="浏览历史" name="history"></el-tab-pane>
      <el-tab-pane label="收藏" name="favorites"></el-tab-pane>
    </el-tabs>

    <!-- 内容区域 -->
    <el-card class="content">
      <div v-show="activeTab === 'home'">
        <h2>猜你喜欢</h2>
        <!-- 这里可以添加猜你喜欢的具体内容 -->
      </div>
      <div v-show="activeTab === 'coupons'">
        <h2>优惠券内容</h2>
      </div>
      <div v-show="activeTab === 'history'">
        <h2>浏览历史内容</h2>
      </div>
      <div v-show="activeTab === 'favorites'">
        <h2>收藏内容</h2>
      </div>
    </el-card>

    <!-- 编辑个人信息弹窗 -->
    <el-dialog v-model="showEditModal" title="编辑个人信息" width="30%">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditModal = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 顶部背景图片地址
const bgImage = ref('./src/assets/主页背景.jpg'); 
// 用户头像地址
const avatar = ref('./src/assets/头像.jpg'); 
// 用户名
const username = ref('默认用户名'); 
// 编辑时的用户名
const editForm = ref({
  username: ''
});
// 控制弹窗显示
const showEditModal = ref(false); 
// 当前激活的导航栏选项
const activeTab = ref('home'); 

const saveEdit = () => {
  username.value = editForm.value.username;
  showEditModal.value = false;
};
</script>

<style scoped>
.profile-container {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.header-bg {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}
.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 10px;
}
.nav-bar {
  margin-top: 20px;
}
.content {
  margin-top: 20px;
}
</style>