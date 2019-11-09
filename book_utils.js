import * as API from '../main'
var token = ''
let user = JSON.parse(localStorage.getItem('access-user'))
if (user) {
  token = user.token
}
var prePercent = 0
export default {
  calculatePercentAdd(category) {
    category.forEach(e => {})
  },
  calculatePercent(category, words_number) {
    //计算章百分比
    category.forEach(e => {
      if (e.child.length != 0) {
        this.calculatePercent(e.child, words_number)
      } else {
        e.percent = e.words_number / words_number
      }
    })
    return category
  },
}
