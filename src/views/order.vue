<template>
  <!-- 导航栏 -->
  <NavHeader />

  <div class="order-container">
    <el-tabs @tab-change="tabChange">
      <!-- tab切换 -->
      <el-tab-pane
        v-for="item in tabTypes"
        :key="item.name"
        :label="item.label"
      />

      <!-- 主体内容 -->
      <div class="main-container">
        <!-- 无订单数据 -->
        <div class="holder-container" v-if="orderList.length === 0">
          <el-empty description="暂无订单数据" />
        </div>

        <div v-else>
          <!-- 订单列表 -->
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <!-- 头部 -->
            <div class="head">
              <span>下单时间：{{ order.createTime }}</span>
              <span>订单编号：{{ order.id }}</span>
              <!-- 未付款，倒计时时间还有 -->
              <span class="down-time" v-if="order.orderState === 1">
                <i class="iconfont icon-down-time"></i>
                <b>付款截止: {{ order.countdown }}</b>
              </span>
            </div>

            <!-- 身体部分 -->
            <div class="body">
              <!-- 产品信息部分 -->
              <div class="column goods">
                <ul>
                  <li v-for="item in order.skus" :key="item.id">
                    <a class="image" href="javascript:;">
                      <img :src="item.image" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">{{ item.name }}</p>
                      <p class="attr ellipsis">
                        <span>{{ item.attrsText }}</span>
                      </p>
                    </div>
                    <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                    <div class="count">x{{ item.quantity }}</div>
                  </li>
                </ul>
              </div>

              <!-- 订单状态 -->
              <div class="column state">
                <p>{{ fomartPayState(order.orderState) }}</p>
              </div>

              <!-- 商品价格 -->
              <div class="column amount">
                <p class="red">¥{{ order.payMoney?.toFixed(2) }}</p>
                <p>（含运费：¥{{ order.postFee?.toFixed(2) }}）</p>
                <p>在线支付</p>
              </div>

              <!-- 操作部分 -->
              <div class="column action">
                <el-button v-if="order.orderState === 1" type="primary" size="small">
                  立即付款
                </el-button>
                <el-button v-if="order.orderState === 3" type="primary" size="small">
                  确认收货
                </el-button>
                <p><a href="javascript:;">查看详情</a></p>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                  <a href="javascript:;">再次购买</a>
                </p>
                <p v-if="[4, 5].includes(order.orderState)">
                  <a href="javascript:;">申请售后</a>
                </p>
                <p v-if="order.orderState === 1">
                  <a href="javascript:;">取消订单</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-tabs>
  </div>

  <!-- 底部 -->
  <shortFooter />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import NavHeader from '@/components/index/NavHeader.vue'
import shortFooter from '@/components/shortFooter.vue'

// tab列表
const tabTypes = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]

// 创建格式化函数
const fomartPayState = (payState) => {
  const stateMap = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已完成',
    6: '已取消'
  }
  return stateMap[payState]
}

// 订单列表
const orderList = ref([])

// 模拟API响应数据
const mockData = [
  {
    id: 1,
    createTime: '2024-01-01 10:00:00',
    orderState: 1,
    countdown: '01:30:00',
    skus: [
      {
        id: 101,
        image: './src/assets/phone.png',
        name: '商品1',
        attrsText: '颜色: 红色, 尺寸: M',
        realPay: 100,
        quantity: 2
      }
    ],
    payMoney: 200,
    postFee: 10
  },
  {
    id: 2,
    createTime: '2024-01-02 11:00:00',
    orderState: 3,
    skus: [
      {
        id: 102,
        image: './src/assets/phone.png',
        name: '商品2',
        attrsText: '颜色: 蓝色, 尺寸: L',
        realPay: 200,
        quantity: 1
      }
    ],
    payMoney: 210,
    postFee: 10
  }
]

// 获取订单数据
const getUserOrder = (orderState = 0) => {
  if (orderState === 0) {
    // 如果 orderState 为 0，显示全部订单
    orderList.value = mockData
  } else {
    // 否则根据 orderState 筛选对应的订单
    orderList.value = mockData.filter((item) => item.orderState === orderState)
  }
}

// 组件挂载时获取订单数据
onMounted(() => getUserOrder())

// 导航栏切换时触发
const tabChange = (index) => {
  // 根据索引值找到对应的 tabTypes 中的 name
  const selectedTab = tabTypes[index]
  if (!selectedTab) return

  // 根据 name 映射到 orderState
  const orderStateMap = {
    all: 0,
    unpay: 1,
    deliver: 2,
    receive: 3,
    comment: 4,
    complete: 5,
    cancel: 6
  }
  const orderState = orderStateMap[selectedTab.name]

  // 调用获取订单数据的函数
  getUserOrder(orderState)
}
</script>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;
  padding-top: 50px;
  background-color: #fff;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    flex-wrap: wrap; /* 允许内容换行 */
    align-items: stretch;

    .column {
      border-left: 3px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      flex: 1; /* 允许列自动调整宽度 */
      min-width: 200px; /* 设置最小宽度 */

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            flex-wrap: wrap; /* 允许内容换行 */

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 100px;
              height: 100px;
              border: 1px solid #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover; /* 确保图片填充容器 */
              }
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;
      }

      &.amount {
        width: 200px;
      }

      &.action {
        width: 140px;

        a {
          display: block;
          color: #000;
          text-decoration: none;

          &:hover {
            color: rgb(94, 164, 225);
          }
        }
      }
    }
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  .order-item {
    .body {
      flex-direction: column; /* 小屏幕下垂直排列 */

      .column {
        border-left: none;
        border-top: 3px solid #f5f5f5;
        min-width: 100%; /* 小屏幕下占满宽度 */

        &:first-child {
          border-top: none;
        }
      }
    }
  }
}
</style>