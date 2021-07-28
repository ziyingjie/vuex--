let Vue;

class Store {
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state || {}
      }
    })
    //getters
    let getters = options.getter || {}
    this.getters = {}
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state)
        }
      })
    })
    //mutations
    let mutations = options.mutations || {}
    this.mutations = {}
    Object.keys(mutations).forEach(mutationName => {
      this.mutations[mutationName] = (arg) => {
        mutations[mutationName](this.state, arg)
      }
    })
    //actions
    let actions = options.actions
    this.actions = {}
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] = (arg) => {
        //这个this代表的就是store实例本身
        actions[actionName](this, arg)
      }
    })
  }
  dispatch(method, arg) {
    this.actions[method](arg)
  }
  commit = (method, arg) => {
    this.mutations[method](arg)
  }
  get state() {
    return this.vm.state
  }
}


let install = function (vue) {
  Vue = vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {//如果是根组件
        console.log(this, 'aaa', this._uid);
        this.$store = this.$options.store
      } else {//如果是子组件就将我们根组件的$store也复制给子组件
        this.$store = this.$parent && this.$parent.$store;
        console.log(this, 'bbb', this._uid);
      }
    },
  });
};
//https://zhuanlan.zhihu.com/p/99014472
//install方法的作用是将store这个实例挂载到所有的组件上，注意是同一个store实例。
//Store这个类拥有commit，dispatch这些方法，Store类里将用户传入的state包装成data，作为new Vue的参数，从而实现了state 值的响应式。
let Vuex = {
  Store,
  install,
};
export default Vuex;

//父组件和子组件的执行顺序
//父beforeCreate-> 父created -> 父beforeMounte -> 
//子beforeCreate ->子create ->子beforeMount ->子 mounted -> 
//父mounted