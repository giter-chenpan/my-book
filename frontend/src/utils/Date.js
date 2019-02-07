export function substractDate (date1, date2) {
  let type1 = typeof date1
  let type2 = typeof date2
  if (type1 === 'string') {
    date1 = new Date(date1)
  }
  if (type2 === 'string') {
    date2 = new Date(date2)
  }
  let statusDate = (date1 - date2) / 1000
  if (statusDate < 60) {
    return parseInt(statusDate) + '秒前'
  }
  if (statusDate < 3600) {
    return parseInt(statusDate / 60) + '分前'
  }
  if (statusDate < 3600 * 24) {
    return parseInt(statusDate / 60 / 60) + '时前'
  }
  if (statusDate < 3600 * 24 * 30) {
    return parseInt(statusDate / 60 / 60 / 24) + '天前'
  }
  return parseInt(statusDate / 60 / 60 / 24 / 30) + '月前'
}
