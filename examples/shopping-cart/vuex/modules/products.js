import {
    RECEIVE_PRODUCTS,
    ADD_TO_CART
} from '../mutation-types'

// initial state
const state = {
    all: []
}

// mutations
const mutations = {
    [RECEIVE_PRODUCTS](state, products) {
        state.all = products
    },

    [ADD_TO_CART](state, productId) {
        state.all.find(p => p.id === productId).inventory--
    },
    //测试，自定义mutations方法
    testMutations: function (state, num) {
        console.log("products.js mutations testMutations---", state, num);//当前子仓库的state对象，1000
    }
}

export default {
    state,
    mutations
}
