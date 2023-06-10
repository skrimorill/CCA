import { issueDuplicate, planetsObj, types } from "./issue.js"
import { createLiFromIssue } from './createLiFromIssue.js'
import { ObjForTypedGrouped, isGroupedLocationType } from './groupedByType.js'


function sortByType(itemsPanelBody) {
  return (e) => {
    let objForTypeGrouped = {}
    const typedElems = []
    const checkedL = document.querySelector('.location-filter__check')
    let issueValue = document.querySelector('.issue-type').value.toLowerCase().trim()
    const statusValue = document.querySelector('.issue-status').value.toLowerCase().trim()
    let dateTo = document.querySelector('.issue-date-to').value.split('-').join('.')
    if (!dateTo) {
      dateTo = '9999.99.99'
    }
    let dateFrom = document.querySelector('.issue-date-from').value.split('-').join('.')
    objForTypeGrouped = ObjForTypedGrouped(planetsObj, dateFrom, dateTo, issueValue, statusValue)
    if (checkedL.checked) {
      let gList = document.querySelector('.gbl-list')
      if (gList && issueValue) {
        gList.remove()
        itemsPanelBody.append(isGroupedLocationType(objForTypeGrouped))
      }
    } else if (!types.includes(issueValue)) {
      issueValue = ''
    } else {
      issueDuplicate.forEach((elem) => {
        if (elem.title.toLowerCase() === issueValue) {
          typedElems.push(elem)
        }
      })
      itemsPanelBody.firstElementChild.remove()
      const list = document.createElement('UL')
      list.classList.add('list')
      list.append(...createLiFromIssue(typedElems))
      itemsPanelBody.append(list)
      if (issueValue === '' && statusValue === '') {
        itemsPanelBody.firstElementChild.remove()
        itemsPanelBody.append(createLiFromIssue(issueDuplicate))
      }
    }
  }
}




export { sortByType }