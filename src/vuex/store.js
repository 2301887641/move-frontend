import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'
import Lockr from 'lockr'
// import Config from '../config/base.js'
import HTTP from '../config/http.js'
let https = new HTTP()
Vue.use(Vuex)

const Menu = {
  // 存放数据
  state: {
    menus: []
  },
  // Getter 就是把组件中共有的对state 的操作进行了提取，它就相当于 对state 的computed. 所以它会获得state 作为第一个参数
  // 注意getters中的第一个参数是state数据,没有其他的参数了
  getters: {
      getMenus(state) {
        return state.menus
      }
  },
  // mutation是同步的,只要comit muation, 它就会立即改变state    提交mutation是更改Vuex中的store中的状态的唯一方法  调用store.commit('increment')
  mutations: {
    setMenus(state, param) {
      state.menus = param
    }
  },
  // 1)action 是异步的
  // 2)action通过 store.dispatch 方法触发
  // 3)可以通过 action 来提交 mutations
  // 4)action 也有一个固有参数 context，但是 context 是 state 的父级，包含  state、getters
  actions: {
    ajaxMenu(state) {
      let headers = Lockr.get('headers')
      return https.syncMenu(headers)
      // Axios.get(Config.domain + 'menu', headers).then((response) => {
      //     state.commit('setMenus', response.data)
      // }).catch((error) => {
      //   if (error) {
      //     // this.errorMessage()
      //   }
      // })
    }
  }
}

export default new Vuex.Store({
    modules: {
      menu: Menu
    }
})
