import {isStatusDict, isTitle, isStartDate} from './divS.js'
import { issueDuplicate, planetsObj } from "./issue.js"

function thatLocation(arr) {
  return arr.locationDist.map((el) => el.value).join('')
}

function ObjForStatusdGrouped(obj, from, to, type = '', status = '') {
  let objStatusMatchInput = {}
  if (!from && to === '9999.99.99' && !type) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let stat = el.IssueStatusDict.map((item) => item.value).join('').toLowerCase();
        if (stat === status.toLowerCase()) {
          elementsTrueArray.push(el)
          objStatusMatchInput[key] = elementsTrueArray
        }
      })
    }
  } else if (type && !from && to === '9999.99.99') {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let stat = el.IssueStatusDict.map((item) => item.value).join('').toLowerCase();
        if (stat === status.toLowerCase() && el.title.toLowerCase() === type.toLowerCase()) {
          elementsTrueArray.push(el)
          objStatusMatchInput[key] = elementsTrueArray
        }
        })
    }
  } else if ((!from || from) && to && !type) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let stat = el.IssueStatusDict.map((item) => item.value).join('').toLowerCase();
        if (el.startDate > from && el.startDate < to && stat === status.toLowerCase()) {
          elementsTrueArray.push(el)
          objStatusMatchInput[key] = elementsTrueArray
        }  
      })
    }
  } else if (type && (from || !from) && to) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let stat = el.IssueStatusDict.map((item) => item.value).join('').toLowerCase();
        if (el.startDate > from && el.startDate < to && stat === status.toLowerCase() && el.title.toLowerCase() === type.toLowerCase()) {
          elementsTrueArray.push(el)
          objStatusMatchInput[key] = elementsTrueArray
        }  
      })
    }
  }
  return objStatusMatchInput
}


// console.log(ObjForStatusdGrouped(planetsObj, 'actual'));

// Формируем сортированный список, аргумент - ObjTypeMatchInput
function isGroupedLocationStatus(obj) {
  const gblList = document.createElement('UL')
  gblList.classList.add('gbl-list', 'gbl-list__status')
  let html = document.createElement('div')
  for (let[key, value] of Object.entries(obj)) {
    if (value.length > 0) {
      html.innerHTML = `
      <li class="gbl-group status-group">
        <div class="gbl-location gbl-item ">${key}</div> 
        <div class="gbl-total gbl-item">${value.length} issues</div> 
        <div class="${key.toLowerCase()}-expand gbl-item gbl-sing gbl-sing__status gbl-sing__status-plus"> + </div> 
      </li>
    `
    const elem = html.firstElementChild
    gblList.append(elem)
    }

  }
  return gblList
} 

function findSelectedStatusLocation(location, array, from, to, type, status) {
  const locStatusList = document.createElement('UL')
  locStatusList.classList.add('status-list')
  let loc = ''
  let date = ''

  array.forEach(elem => {
    date = elem.startDate
    let typeFromIssue = elem.title.toLowerCase()
    let statusFromIssue = elem.IssueStatusDict.map((item) => item.value).join('').toLowerCase()
    loc = elem.locationDist.map((item) => item.value).join('').toLowerCase()
  
    if (!from && to === '9999.99.99' && !type) {
      if (loc === location && statusFromIssue === status) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locStatusList.append(LI) 
    }
  } else if (type && !to && !from) {
      if (loc === location && (date > from && date < to) && typeFromIssue === type) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locStatusList.append(LI) 
    }
  } else if (to && (from || !from) && !type) {
      if (loc === location && (date > from && date < to) && statusFromIssue === status) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locStatusList.append(LI) 
    }
  } else if (to && (from || !from) && type) {
      if (loc === location && (date > from && date < to) && statusFromIssue === status && typeFromIssue === type.toLowerCase()) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locStatusList.append(LI) 
    }
  }
})
  return locStatusList
}

function selectedStatusLocationList(itemsPanelBody) {
  return (e) => {
    e.preventDefault()
    const typeValue = document.querySelector('.issue-type').value.toLowerCase().trim()
    const statusValue = document.querySelector('.issue-status').value.toLowerCase().trim()
    let dateTo = document.querySelector('.issue-date-to').value.split('-').join('.')
    if (!dateTo) {
      dateTo = '9999.99.99'
    }
    let dateFrom = document.querySelector('.issue-date-from').value.split('-').join('.')
    let planetName = null
    const checkedL = document.querySelector('.location-filter__check')
    if (checkedL.checked) {
      const elem = e.target.parentNode.nextElementSibling
      if (e.target.classList.contains('gbl-sing__status-plus')) {
        planetName = e.target.parentNode.firstElementChild.innerHTML.toLowerCase()
        e.target.classList.toggle('gbl-sing__status-plus')
        e.target.classList.toggle('gbl-sing__status-minus')
        e.target.innerHTML = '-'
        e.target.parentNode.insertAdjacentElement('afterend', findSelectedStatusLocation(planetName, issueDuplicate, dateFrom, dateTo, typeValue, statusValue))
      } else if (e.target.classList.contains('gbl-sing__status-minus')) {
          if (elem && elem.classList.contains('status-list')) {
            elem.remove()
          }
          e.target.innerHTML = ' + '
          e.target.classList.toggle('gbl-sing__status-minus')
          e.target.classList.toggle('gbl-sing__status-plus')
      }
    }
  }
}

export { selectedStatusLocationList, ObjForStatusdGrouped, isGroupedLocationStatus } 