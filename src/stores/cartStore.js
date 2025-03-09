// stores/cartStore.js
import { defineStore } from 'pinia';
import phoneImage from '@/assets/phone.png';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartList: [
      {
        id: 1,
        skuId: '1001',
        name: 'Apple iPhone 14 Pro Max',
        picture: phoneImage,
        price: 9999.99,
        count: 1,
        selected: true,
      },
      {
        id: 2,
        skuId: '1002',
        name: 'Samsung Galaxy S23 Ultra',
        picture: phoneImage,
        price: 8999.99,
        count: 2,
        selected: false,
      },
      {
        id: 3,
        skuId: '1003',
        name: 'Xiaomi 13 Pro',
        picture: phoneImage,
        price: 4999.99,
        count: 1,
        selected: true,
      },
      {
        id: 4,
        skuId: '1004',
        name: 'Huawei Mate 50 Pro',
        picture: phoneImage,
        price: 6999.99,
        count: 3,
        selected: false,
      },
      {
        id: 5,
        skuId: '1005',
        name: 'OnePlus 11',
        picture: phoneImage,
        price: 3999.99,
        count: 1,
        selected: true,
      },
    ],
  }),
  getters: {
    // 是否全选
    isAll: (state) => state.cartList.every((item) => item.selected),
    // 总数量
    allCount: (state) => state.cartList.length,
    // 已选数量
    selectedCount: (state) =>
      state.cartList.filter((item) => item.selected).length,
    // 已选商品总价
    selectedPrice: (state) =>
      state.cartList
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.price * item.count, 0),
  },
  actions: {
    // 全选/反选
    allCheck(selected) {
      this.cartList.forEach((item) => (item.selected = selected));
    },
    // 单选
    singleCheck(skuId, selected) {
      const item = this.cartList.find((item) => item.skuId === skuId);
      if (item) item.selected = selected;
    },
    // 修改数量
    changeCount(skuId, count) {
      const item = this.cartList.find((item) => item.skuId === skuId);
      if (item) item.count = count;
    },
    // 删除商品
    deleteCart(skuId) {
      this.cartList = this.cartList.filter((item) => item.skuId !== skuId);
    },
  },
});