/*export function getFormattedDate(date) {
  return `${date.getDay() + 1}/${date.getMonth() + 1}/${
    date.getFullYear() - 2000
  }`
}*/

export function getFormattedDate(date){
  return `${date.getFullYear()}-${date.getMonth() +1}-${date.getDay()}`
}


export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay() - days)
}
