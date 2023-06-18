import { planetsObj, issueDuplicate } from "./issue.js"
import { ObjForDateGrouped, isGroupedLocationDate } from './groupedByDate.js'
import { createLiFromIssue } from './createLiFromIssue.js'

let dateArray = []

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
      let gList = document.querySelector('.gbl-list')
      if (gList) {
        gList.remove()
      }
      objForDateGrouped
      itemsPanelBody.append(isGroupedLocationDate(objForDateGrouped))
    } else {
      issueDuplicate.forEach((elem) =>  {
        if(!statusValue && !typeValue) {
          if (dateTo === '9999.99.99') {
            if (elem.startDate > dateFrom && itemsPanelBody.firstElementChild) {
              dateArray.push(elem)
              itemsPanelBody.firstElementChild.remove()
              const list = document.createElement('UL')
              list.classList.add('list')
              list.append(...createLiFromIssue(dateArray))
              itemsPanelBody.append(list)
            } 
            } else if (dateTo !== '9999.99.99') {
            if (elem.startDate < dateTo && itemsPanelBody.firstElementChild && elem.startDate > dateFrom) {
              dateArray.push(elem)
              itemsPanelBody.firstElementChild.remove()
              const list = document.createElement('UL')
              list.classList.add('list')
              list.append(...createLiFromIssue(dateArray))
              itemsPanelBody.append(list)
            } 
          }
        } else if (!statusValue && typeValue) {
          if (elem.startDate < dateTo && itemsPanelBody.firstElementChild && elem.startDate > dateFrom && typeValue === elem.title.toLowerCase()) {
            dateArray.push(elem)
            itemsPanelBody.firstElementChild.remove()
            const list = document.createElement('UL')
            list.classList.add('list')
            list.append(...createLiFromIssue(dateArray))
            itemsPanelBody.append(list)
          }
        } else if (statusValue && !typeValue) {
          let status = elem.IssueStatusDict.map((el) => el.value.toLowerCase()).join('')
          if (elem.startDate < dateTo && itemsPanelBody.firstElementChild && elem.startDate > dateFrom && statusValue === status) {
            dateArray.push(elem)
            itemsPanelBody.firstElementChild.remove()
            const list = document.createElement('UL')
            list.classList.add('list')
            list.append(...createLiFromIssue(dateArray))
            itemsPanelBody.append(list)
          }
        } else if (statusValue && typeValue) {
          let status = elem.IssueStatusDict.map((el) => el.value.toLowerCase()).join('')
          if (elem.startDate < dateTo && itemsPanelBody.firstElementChild && elem.startDate > dateFrom && statusValue === status && typeValue === elem.title.toLowerCase()) {
            dateArray.push(elem)
            itemsPanelBody.firstElementChild.remove()
            const list = document.createElement('UL')
            list.classList.add('list')
            list.append(...createLiFromIssue(dateArray))
            itemsPanelBody.append(list)
          }
        }
      })
      dateArray.length = ''
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
      let gList = document.querySelector('.gbl-list')
      if (gList) {
        gList.remove()
      }
      itemsPanelBody.append(isGroupedLocationDate(objForDateGrouped))
    } else {
        issueDuplicate.forEach((elem) =>  {
          if(!statusValue && !typeValue) {
            if (!dateFrom) {
              if (elem.startDate < dateTo && itemsPanelBody.firstElementChild) {
                dateArray.push(elem)
                itemsPanelBody.firstElementChild.remove()
                const list = document.createElement('UL')
                list.classList.add('list')
                list.append(...createLiFromIssue(dateArray))
                itemsPanelBody.append(list)
              } 
                } else if (dateFrom) {
              if (elem.startDate < dateTo && itemsPanelBody.firstElementChild && elem.startDate > dateFrom) {
                dateArray.push(elem)
                itemsPanelBody.firstElementChild.remove()
                const list = document.createElement('UL')
                list.classList.add('list')
                list.append(...createLiFromIssue(dateArray))
                itemsPanelBody.append(list)
              } 
            }
          } else if (!statusValue && typeValue) {
            if (elem.startDate < dateTo && itemsPanelBody.firstElementChild && elem.startDate > dateFrom && typeValue === elem.title.toLowerCase()) {
              dateArray.push(elem)
              itemsPanelBody.firstElementChild.remove()
              const list = document.createElement('UL')
              list.classList.add('list')
              list.append(...createLiFromIssue(dateArray))
              itemsPanelBody.append(list)
            }
          } else if (statusValue && !typeValue) {
            let status = elem.IssueStatusDict.map((el) => el.value.toLowerCase()).join('')
            if (elem.startDate < dateTo && itemsPanelBody.firstElementChild && elem.startDate > dateFrom && statusValue === status) {
              dateArray.push(elem)
              itemsPanelBody.firstElementChild.remove()
              const list = document.createElement('UL')
              list.classList.add('list')
              list.append(...createLiFromIssue(dateArray))
              itemsPanelBody.append(list)
            }
          } else if (statusValue && typeValue) {
          let status = elem.IssueStatusDict.map((el) => el.value.toLowerCase()).join('')
          if (elem.startDate < dateTo && itemsPanelBody.firstElementChild && elem.startDate > dateFrom && statusValue === status && typeValue === elem.title.toLowerCase()) {
            dateArray.push(elem)
            itemsPanelBody.firstElementChild.remove()
            const list = document.createElement('UL')
            list.classList.add('list')
            list.append(...createLiFromIssue(dateArray))
            itemsPanelBody.append(list)
          }
        }
      })
      dateArray.length = ''
    }
  }
}

// function sortByDate(itemsPanelBody) {
//   return (e) => {
//     e.preventDefault()
//     const statusValue = document.querySelector('.issue-status').value.toLowerCase().trim()
//     const typeValue = document.querySelector('.issue-type').value.toLowerCase().trim()
//     let dateFrom = document.querySelector('.issue-date-from').value.split('-').join('.')
//     let dateTo = document.querySelector('.issue-date-to').value.split('-').join('.')
//     if (!dateTo) {
//       dateTo = '9999.99.99'
//     }
//     let objForDateGrouped = ObjForDateGrouped(planetsObj, dateFrom, dateTo, typeValue, statusValue) 
//     const checkedL = document.querySelector('.location-filter__check')
//     if (checkedL.checked) {
//       let gList = document.querySelector('.gbl-list')
//       if (gList) {
//         gList.remove()
//       }
//       objForDateGrouped
//       itemsPanelBody.append(isGroupedLocationDate(objForDateGrouped))
//     }
//   }
// }

export { sortByDateFrom, sortByDateTo }
