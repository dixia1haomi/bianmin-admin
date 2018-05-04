import { Api } from './utils/Api.js'
import { Base } from './utils/Base.js'

const base = new Base()
const api = new Api()


App({

  data: {
    // LoginState: false,   // 登陆状态
  },

  onError: function (msg) {

  },


  onLaunch: function (op) {
    // 小程序初始化检查token
    this.checkToken()
  },



  // ---------------------------------------------------Token-----------------------------------------------------

  // 小程序初始化检查token
  checkToken(callback) {
    let admin_token = wx.getStorageSync('admin_token')
    //用户可能第一次来，缓存中没有token
    if (!admin_token) {
      console.log('第一次来')
      // 跳转登陆页
      wx.reLaunch({ url: '/pages/login/login' })
    } else {
      console.log('检查admin_token是否有效')
      this._verifyAdminToken(admin_token)
    }
  },

  // 检查adminToken是否有效
  _verifyAdminToken(admin_token) {
    api.verifyAdminToken({ token: admin_token }, back => {
      console.log('admin_token', back)
      if (back.data) {
        // 有效
      } else {
        // 跳转登陆页
        wx.reLaunch({ url: '/pages/login/login' })
      }
    })
  }


  // 获得token
  // _getToken(callback) {
  //   wx.login({
  //     success: (res) => {
  //       if (res.code) {
  //         api.getToken({ code: res.code }, (back) => {
  //           wx.setStorageSync('token_key', back.token_key)
  //           console.log('已获得token', back.token_key, '设置登陆态', back.loginstate)
  //           this.data.LoginState = back.loginstate
  //           callback && callback()
  //         })
  //       }
  //     }
  //   })
  // },

  // 去服务器检查token,如果失效,调用获取token
  // _service_CheckToken(token_key, callback) {
  //   api.checkToken({ token: token_key }, back => {
  //     console.log('service_CheckToken', back)
  //     if (back.token) {
  //       console.log('服务器token还有效,登陆态', back.loginstate)
  //       this.data.LoginState = back.loginstate
  //       callback && callback()
  //     } else {
  //       console.log('服务器token已失效')
  //       this._getToken(() => { callback && callback() })
  //     }
  //   })
  // },


  // ----------------------------------------------- 登陆 ---------------------------------------------------

  // 保存用户信息
  // saveUserInfo(info, callback) {
  //   console.log('保存用户信息', info)
  //   api.saveUserInfo({ info: info.userInfo }, (back) => {
  //     console.log('保存用户信息OK', back)
  //     wx.setStorageSync('userinfo', info.userInfo)
  //     wx.showToast({ title: '登陆成功' })
  //     this.data.LoginState = true
  //     this.data.uid = back
  //     callback && callback()
  //   })
  // },

})