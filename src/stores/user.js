import { ref } from 'vue'
import { defineStore } from 'pinia'

//  token setToken removeToken
export const useUserStore = defineStore(
    'user',
    () => {
        const token = ref('')
        // const someState = ref('hello pinia')
        const setToken = (newToken) => {
            token.value = newToken
        }
        const removeToken = () => {
            token.value = ''
        }
        return {
            token,
            setToken,
            removeToken,
        }
    },
    {
        persist: {
            key: 'user_data', // 存储名称
            storage: localStorage, // 存储方式
            paths: ['token'], // 指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
        }
    }
)
