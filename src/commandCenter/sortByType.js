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
      if (!statusValue && dateTo === '9999.99.99' && !dateFrom) {
      issueDuplicate.forEach((elem) => {
        if (elem.title.toLowerCase() === issueValue) {
          typedElems.push(elem)
        }
      })
    } else if (statusValue && dateTo === '9999.99.99' && !dateFrom) {
      issueDuplicate.forEach((elem) => {
        let status = elem.IssueStatusDict.map((el) => el.value.toLowerCase()).join('') 
        if (elem.title.toLowerCase() === issueValue && status === statusValue) {
          typedElems.push(elem)
          console.log(elem.startDate);
        }
      })
    } else if (statusValue && dateTo === '9999.99.99' && dateFrom) { 
            issueDuplicate.forEach((elem) => {
        let status = elem.IssueStatusDict.map((el) => el.value.toLowerCase()).join('') 
        if (elem.title.toLowerCase() === issueValue && status === statusValue && elem.startDate >= dateFrom) {
          typedElems.push(elem)
        }
      })
    } else if (statusValue && dateTo !== '9999.99.99' && dateFrom) {
      issueDuplicate.forEach((elem) => {
        let status = elem.IssueStatusDict.map((el) => el.value.toLowerCase()).join('') 
        if (elem.title.toLowerCase() === issueValue && status === statusValue && elem.startDate >= dateFrom && elem.startDate <= dateTo) {
          typedElems.push(elem)
        }
      })
    } else if (!statusValue && dateTo === '9999.99.99' && dateFrom) {
      issueDuplicate.forEach((elem) => {
        if (elem.title.toLowerCase() === issueValue && elem.startDate >= dateFrom) {
          typedElems.push(elem)
        }
      })
    } else if (!statusValue && dateTo !== '9999.99.99' && !dateFrom) {
      issueDuplicate.forEach((elem) => {
        if (elem.title.toLowerCase() === issueValue && elem.startDate <= dateTo) {
          typedElems.push(elem)
        }
      })
    }  else if (!statusValue && dateTo !== '9999.99.99' && !dateFrom) {
      issueDuplicate.forEach((elem) => {
        let status = elem.IssueStatusDict.map((el) => el.value.toLowerCase()).join('') 
        if (elem.title.toLowerCase() === issueValue && status === statusValue && elem.startDate <= dateTo) {
          typedElems.push(elem)
        }
      })
    }
      itemsPanelBody.firstElementChild.remove()
      const list = document.createElement('UL')
      list.classList.add('list')
      list.append(...createLiFromIssue(typedElems))
      itemsPanelBody.append(list)
    }
  }
}




export { sortByType }