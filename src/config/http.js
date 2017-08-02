/**
 * Created by qiangbi on 17-7-27.
 */
// 本地配置变量
import Config from './base.js'
// ajax请求
import Axios from 'axios'
Axios.defaults.baseURL = Config.login
Axios.defaults.timeout = 1000 * 15
Axios.defaults.headers['Content-Type'] = 'application/json'
Axios.defaults.withCredentials = true
const Http = {
  conf: Config,
  // ajax get请求
  get: (url, callback, config = '') => {
    Axios.get(url, config).then((responent) => {
      // 正确接收到响应后我们的所有数据都在data里面
      callback(responent.data)
    }).catch((error) => {
      if (error) {
        callback(-1, error)
      }
    })
  },
  // ajax post请求
  post: (url, data, callback, config = '') => {
    Axios.post(url, data, config).then((response) => {
      callback(response.data)
    }).catch((error) => {
        if (error) {
          callback(-1, error)
        }
    })
  }
}
export default Http
