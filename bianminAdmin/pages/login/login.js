import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const utils = new Utils()
const api = new Api()
const app = getApp()

let page = 1;

Page({
  data: {

  },

  onLoad: function () {

  },

  tijiao_(e) {
    console.log('tijiao', e.detail.value)   // zhanghao,mima
    // 提交服务器验证登录
    api.getAdminToken({ zhanghao: e.detail.value.zhanghao, mima: e.detail.value.mima }, back => {
      if (back.msg == "ok") {
        // 缓存token
        wx.setStorageSync('admin_token', back.data)
        // 跳转首页
        wx.reLaunch({ url: '/pages/index/index' })
      } else {
        wx.showToast({ title: '登陆失败' })
      }
    })
  },




})
