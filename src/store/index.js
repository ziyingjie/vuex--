import Vue from "vue";
import Vuex from "./myVuex"; //修改代码
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    num: 0
  },
  getter: {
    getNum: (state) => {
      return state.num + 1
    }
  },
  mutations: {
    incre(state, arg) {
      state.num += arg
    }
  },
  actions: {
    asyncIncre({ commit }, arg) {
      setTimeout(() => {
        //store实例的解构
        commit('incre', arg)
      }, 1000)
    }
  },
  modules: {},
});
