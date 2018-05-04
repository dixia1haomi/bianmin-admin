import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const utils = new Utils()
const api = new Api()
const app = getApp()

let page = 1;

Page({

  data: {
    Res: [],
    noData: false,              // 上拉更多
  },

  onLoad: function (op) {
    this._load()

  },

  // 信息列表
  _load(callback) {
    // 分页1
    page = 1
    api.getList({ page: page }, res => {
      console.log('aa', res.data)
      this.setData({ Res: res.data })
      // 回调给下拉刷新用
      callback && callback()
    })
  },

  // ------------------------------------------------- 删除信息 -------------------------------------------------
  deleteXinxi_(e) {
    wx.showModal({
      title: '删除这条信息？',
      success: (res) => {
        if (res.confirm) { api.deleteMyFabu({ list_id: e.currentTarget.id }, back => { console.log('删除信息', back) }) }
      }
    })
  },


  // ------------------------------------------------- 展开 -------------------------------------------------
  flodFn_: function (e) {
    let index = e.currentTarget.dataset.index, res = this.data.Res
    // 如果hid是初始的false,允许改成true
    if (res[index].hid == false) {
      var param = {};
      var str = "Res[" + index + "].hid"
      // param[str] = !res[index].hid  // 展开折叠
      param[str] = true             // 只展开
      this.setData(param, () => {
        // 调用API发送请求增加点击
        api.incLiulangcishu({ id: res[index].id }, back => {
          console.log('增加点击成功', back)
        })
      })
    }
  },


  // ------------------------------------------------- 下拉刷新、上拉加载 -------------------------------------------------

  // 下拉刷新
  onPullDownRefresh: function () { this._load(back => { wx.stopPullDownRefresh() }) },

  // 上拉触底
  onReachBottom: function () {
    console.log('上拉触底')
    if (this.data.noData != true) {
      if (this.data.Res.length < 20) {
        this.setData({ noData: true })
      } else {
        page++
        api.getList({ page: page }, res => {
          console.log('上拉触底分页', page)
          if (res.data.length == 0) {
            this.setData({ noData: true })
          } else {
            if (res.data.length < 20) {
              let newRes = this.data.Res.concat(res.data)
              this.setData({ Res: newRes, noData: true })
            } else {
              let newRes = this.data.Res.concat(res.data)
              this.setData({ Res: newRes })
            }
          }
        })
      }
    }
  },


})
