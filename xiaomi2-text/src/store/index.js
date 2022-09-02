import Vue from 'vue'
import Vuex from 'vuex'
import pers from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[pers()],
  state: {
    list: []
  },
  getters: {
    num(state){
      let totalNum=0
      state.list.forEach(item=>{totalNum+=item.num})
      return totalNum
    }
  },
  mutations: {
    // 添加购物车
    addshopping(state, arr) {
      state.list = arr
    }
  },
  actions: {},
  modules: {
  }
})