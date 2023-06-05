import { planetsObj } from "./issue.js"
import { ObjForDateGrouped, isGroupedLocationDate } from './groupedByDate.js'


function sortByDateFrom(itemsPanelBody) {
  return (e) => {
    e.preventDefault()
    const statusValue = document.querySelector('.issue-status').value.toLowerCase().trim()
    const typeValue = document.querySelector('.issue-type').value.toLowerCase().trim()
    let dateFrom = document.querySelector('.issue-date-from').value.split('-').join('.')
    let dateTo = document.querySelector('.issue-date-to').value.split('-').join('.')
    if (!dateTo) {
      dateTo = '9999.99.99'
    }
    let objForDateGrouped = ObjForDateGrouped(planetsObj, dateFrom, dateTo, typeValue, statusValue) 
    const checkedL = document.querySelector('.location-filter__check')
    if (checkedL.checked) {
      let list = document.querySelector('.gbl-list')
      if (list) {
        list.remove()
      }
      objForDateGrouped
      itemsPanelBody.append(isGroupedLocationDate(objForDateGrouped))
    } else {
      let el = document.querySelectorAll('.list-item')
      el.forEach((item) => {
      const elem = item.lastElementChild.previousElementSibling.innerHTML.trim()
      if (elem < dateFrom) {
        item.classList.add('hidden')
      }
    })
    } 
  }
}


function sortByDateTo(itemsPanelBody) {
  return (e) => {
    e.preventDefault()
    const statusValue = document.querySelector('.issue-status').value.toLowerCase().trim()
    const typeValue = document.querySelector('.issue-type').value.toLowerCase().trim()
    let dateFrom = document.querySelector('.issue-date-from').value.split('-').join('.')
    let dateTo = document.querySelector('.issue-date-to').value.split('-').join('.')
    if (!dateTo) {
      dateTo = '9999.99.99'
    }
    let objForDateGrouped = ObjForDateGrouped(planetsObj, dateFrom, dateTo, typeValue, statusValue) 
    const checkedL = document.querySelector('.location-filter__check')
    if(checkedL.checked) {
      let list = document.querySelector('.gbl-list')
      if (list) {
        list.remove()
      }
      itemsPanelBody.append(isGroupedLocationDate(objForDateGrouped))
    } else {
      let el = document.querySelectorAll('.list-item')
      el.forEach((item) => {
        const elem = item.lastElementChild.previousElementSibling.innerHTML.trim()
        if (elem > dateTo) {
          item.classList.add('hidden')
        }
      })
    }
  }
}



export { sortByDateFrom, sortByDateTo }
