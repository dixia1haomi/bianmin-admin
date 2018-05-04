import { Api } from '../../utils/Api.js'

const api = new Api()


Page({


  data: {
    Res: [],
  },


  onLoad: function (options) {
    this.chaxunFormId()
  },


  // 查询form_id有效的用户
  chaxunFormId() {
    api.selectFormId_User({}, back => {
      console.log('formId', back)
      this.setData({ Res: back.data })
    })
  },
})