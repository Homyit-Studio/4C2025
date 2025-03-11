<template>
  <!-- 导航栏 -->
  <NavHeader />

  <!-- 购物车页面 -->
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <!-- 表头 -->
          <thead>
            <tr>
              <th width="120">
                <el-checkbox
                  :modelValue="cartStore.isAll"
                  @change="handleAllCheck"
                />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>

          <!-- 商品列表 -->
          <tbody>
            <tr v-for="i in cartStore.cartList" :key="i.id">
              <td>
                <el-checkbox
                  :modelValue="i.selected"
                  @change="(selected) => handleCheck(i.skuId, selected)"
                />
              </td>
             <td>
                <div class="goods">
                  <div class="image-container">
                      <el-popover
                      placement="right"
                      :width="200"
                      trigger="hover"
                      >
                        <template #reference>
                          <img :src="i.picture" alt="Product Image" class="product-image" />
                        </template>
                        <img :src="i.picture" alt="Product Image" class="zoom-image" />
                      </el-popover>
                  </div>
                  <div v-if="!i.isEditing">
                    <p class="name ellipsis">{{ i.name }}</p>
                  </div>
                  <div v-else>
                    <el-input v-model="i.name" placeholder="请输入商品名称"></el-input>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p v-if="!i.isEditing">&yen;{{ i.price }}</p>
                <el-input v-else v-model="i.price" placeholder="请输入商品单价"></el-input>
              </td>
              <td class="tc">
                <el-input-number
                  :min="1"
                  :modelValue="i.count"
                  @input="(count) => handeChangeCount(i.skuId, count)"
                />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm
                    title="确认删除吗?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="deleteCart(i)"
                  >
                    <template #reference>
                      <a href="javascript:;"><el-icon color="red"><Delete /></el-icon></a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>

            <!-- 如果列表为空 -->
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary" @click="$router.push('/')">
                      随便逛逛
                    </el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ cartStore.allCount }} 件商品，已选择
          {{ cartStore.selectedCount }} 件，商品合计：
          <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
        </div>
        <div class="total">
          <el-button
            size="large"
            type="primary"
            @click="handleCheckout"
            :disabled="cartStore.selectedCount === 0"
          >
            下单结算
          </el-button>
        </div>
      </div>
    </div>
  </div>

  <shortFooter />

</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'vue-router';
import NavHeader from '@/components/index/NavHeader.vue';
import shortFooter from '@/components/shortFooter.vue';
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';

const cartStore = useCartStore();
const router = useRouter();

// 单选操作
const handleCheck = (skuId, selected) => {
  cartStore.singleCheck(skuId, selected);
};

// 全选操作
const handleAllCheck = (selected) => {
  cartStore.allCheck(selected);
};

// 修改商品数量
const handeChangeCount = (skuId, count) => {
  cartStore.changeCount(skuId, count);
};

// 删除商品
const deleteCart = (item) => {
  cartStore.deleteCart(item.skuId);
};

// 结算功能
const handleCheckout = () => {
  if (cartStore.selectedCount > 0) {
    router.push('/checkout');
  } else {
    ElMessage.warning('请选择至少一件商品');
  }
};
</script>

<style scoped>
.xtx-cart-page {
  padding-top: 30px;
}

.cart {
  background: #fff;
  color: #666;
  overflow-x: auto;
   /* 小屏幕时出现水平滚动条 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart table {
  border-spacing: 0;
  border-collapse: collapse;
  line-height: 24px;
  min-width: 1200px; 
  /* 确保表格在小屏幕下不会过度压缩 */
  width: 100%;
}

.cart th,
.cart td {
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.cart th {
  font-size: 16px;
  font-weight: 600;
  line-height: 50px;
  background-color: #f5f5f5;
  text-align: center;
}

.cart th:first-child,
.cart td:first-child {
  text-align: left;
  padding-left: 30px;
  color: #999;
}

.cart-none {
  text-align: center;
  padding: 120px 0;
  background: #fff;
}

.cart-none p {
  color: #999;
  padding: 20px 0;
}

.tc {
  text-align: center;
}

.tc a {
  color: #007bff;
}

.tc .xtx-numbox {
  margin: 0 auto;
  width: 120px;
}

.red {
  color: #dc3545;
}

.green {
  color: #28a745;
}

.f16 {
  font-size: 16px;
}

.goods {
  display: flex;
  align-items: center;
}

.goods img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.goods > div {
  width: 280px;
  font-size: 16px;
  padding-left: 10px;
}

.goods > div .attr {
  font-size: 14px;
  color: #999;
}

/* hover放大部分效果样式 */
.image-container {
  position: relative;
  display: inline-block;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.3s ease;
}

.zoom-image {
  width: 100%; /* 放大图片的宽度 */
  height: 100%; /* 放大图片的高度 */
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container:hover .product-image {
  transform: scale(1.05); /* 鼠标悬停时图片稍微放大 */
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  flex-wrap: wrap; /* 小屏幕时换行 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.action .xtx-checkbox {
  color: #999;
}

.action .batch {
  margin-bottom: 10px; /* 小屏幕时增加间距 */
}

.action .batch a {
  margin-left: 20px;
}

.action .red {
  font-size: 18px;
  margin-right: 20px;
  font-weight: bold;
}

.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}

/* 小屏幕样式 */
@media (max-width: 768px) {
  .cart table {
    font-size: 14px;
  }

  .goods img {
    width: 60px;
    height: 60px;
  }

  .goods > div {
    width: auto;
  }

  .action {
    height: auto;
    padding: 20px;
  }
}
</style>