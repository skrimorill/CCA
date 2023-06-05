import { issueDuplicate, statuses, planetsObj } from "./issue.js"
import { createLiFromIssue } from './createLiFromIssue.js'
import { ObjForStatusdGrouped, isGroupedLocationStatus } from './groupedByStatus.js'


function sortByStatus(itemsPanelBody) {
  return (e) => {
    let objForStatusGrouped = {}
    const typeValue = document.querySelector('.issue-type').value.toLowerCase().trim()
    let dateTo = document.querySelector('.issue-date-to').value.split('-').join('.')
    if (!dateTo) {
      dateTo = '9999.99.99'
    }
    let dateFrom = document.querySelector('.issue-date-from').value.split('-').join('.')
    const checkedL = document.querySelector('.location-filter__check')
    const listElements = document.querySelectorAll('.list-item')
    const statusValue = e.target.value.toLowerCase().trim()
    
    objForStatusGrouped = ObjForStatusdGrouped(planetsObj, dateFrom, dateTo, typeValue, statusValue)
    if (checkedL.checked) {
      let list = document.querySelector('.gbl-list')
      if (list && statusValue) {
        list.remove()
        itemsPanelBody.append(isGroupedLocationStatus(objForStatusGrouped))
      }
    } else {
    for (let elem of listElements) {
      if (!statuses.includes(statusValue)) continue
      if (statuses.includes(statusValue) && statusValue === elem.lastElementChild.innerHTML.toLowerCase().trim()) {
        elem.classList.remove('hidden')
      } else {
        elem.classList.add('hidden')
      }
    }
      if (statusValue === '') {
      itemsPanelBody.firstElementChild.remove()
      itemsPanelBody.append(createLiFromIssue(issueDuplicate))
      }
    }
  }
}

export { sortByStatus }