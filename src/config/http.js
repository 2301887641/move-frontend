/**
 * Created by qiangbi on 17-7-27.
 */
// 本地配置变量
import Config from './base.js'
// ajax请求
import Axios from 'axios'
// 路由跳转
import route from '../router'
// element组件
import Ele from 'element-ui'
Axios.defaults.baseURL = Config.login
Axios.defaults.timeout = 1000 * 15
Axios.defaults.headers['Content-Type'] = 'application/json'
Axios.defaults.withCredentials = true
  let Http = function() {
    // 配置文件信息
    this.conf = Config
    // ajax get请求  get带参数和header头 axios.get(`http://***/api/v1/public/homepage`, {params: params,headers:{"sn":"201021622343"}})
    this.get = (url, callback, config = '') => {
      // let _this = this
      Axios.get(url, config).then((responent) => {
        // 正确接收到响应后我们的所有数据都在data里面
        callback(responent.data)
      }).catch((error, responent) => {
        if (error) {
          // this.errorMessage()
        }
      })
    }
    // ajax post请求
    this.post = (url, data, callback, config = '') => {
      Axios.post(url, data, config).then((response) => {
        callback(response.data)
      }).catch((error) => {
        if (error) {
          // this.errorMessage()
        }
      })
    }
    // 未登录get信息
    this.unauthGet = (url, callback, config = '') => {
      Axios.get(url, config).then((responent) => {
        // 正确接收到响应后我们的所有数据都在data里面
        callback(responent.data)
      }).catch((error) => {
        if (error) {
          callback(-1, error)
        }
      })
    }
    // 未登录post
    this.unauthPost = (url, data, callback, config = '') => {
      Axios.post(url, data, config).then((responent) => {
        // 正确接收到响应后我们的所有数据都在data里面
        callback(responent.data)
      }).catch((error) => {
        if (error) {
          callback(-1, error)
        }
      })
    }
    // 错误路由跳转
    this.errorMessage = () => {
      route.replace('/')
      Ele.Message.error('登录超时,请重新登录')
    }
  }
export default Http
