import {isStatusDict, isTitle, isStartDate} from './divS.js'
import { issueDuplicate } from "./issue.js"

function thatLocation(arr) {
  return arr.locationDist.map((el) => el.value).join('')
}

function ObjForTypedGrouped(obj, from, to, type = '', status = '') { 
  let ObjTypeMatchInput = {}
  if (!from && to === '9999.99.99' && !status) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let typeInsider = el.title.toLowerCase()
        if (typeInsider === type.toLowerCase()) {
          elementsTrueArray.push(el)
          ObjTypeMatchInput[key] = elementsTrueArray
        }
      })
    }
  } else if (status && !from && to === '9999.99.99') {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let statusInsider = el.IssueStatusDict.map((item) => item.value.toLowerCase()).join('')
        if (statusInsider === status.toLowerCase() && el.title.toLowerCase() === type.toLowerCase()) {
          elementsTrueArray.push(el)
          ObjTypeMatchInput[key] = elementsTrueArray
        }
        })
    }
  } else if ((!from || from) && to && !status) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        if (el.startDate > from && el.startDate < to && el.title.toLowerCase() === type.toLowerCase()) {
          console.log(111);
          elementsTrueArray.push(el)
          ObjTypeMatchInput[key] = elementsTrueArray
        }  
      })
    }
  } else if (status && (from || !from) && to) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let stat = el.IssueStatusDict.map((item) => item.value).join('').toLowerCase();
        if (el.startDate > from && el.startDate < to && stat === status.toLowerCase() && el.title.toLowerCase() === type.toLowerCase()) {
          elementsTrueArray.push(el)
          ObjTypeMatchInput[key] = elementsTrueArray
        }  
      })
    }
  }
  return ObjTypeMatchInput
}

function isGroupedLocationType(obj) {
  const gblList = document.createElement('UL')
  gblList.classList.add('gbl-list', 'gbl-list__type')
  let html = document.createElement('div')
  for (let[key, value] of Object.entries(obj)) {
    html.innerHTML = `
      <li class="gbl-group type-group">
        <div class="gbl-location gbl-item ">${key}</div> 
        <div class="gbl-total gbl-item">${value.length} issues</div> 
        <div class="${key.toLowerCase()}-expand gbl-item gbl-sing__type gbl-sing-plus"> + </div> 
      </li>
    `
    const elem = html.firstElementChild
    gblList.append(elem)
  }
  return gblList
} 

function findSelectedTypeLocation(location, array, from, to, type, status) {
  const locTypeList = document.createElement('UL')
  locTypeList.classList.add('type-list')
  let loc = ''
  let date = ''

  array.forEach(elem => {
    date = elem.startDate
    let typeFromIssue = elem.title.toLowerCase()
    let statusFromIssue = elem.IssueStatusDict.map((item) => item.value).join('').toLowerCase()
    loc = elem.locationDist.map((item) => item.value).join('').toLowerCase()
    
    if (!from && to === '9999.99.99' && !status) {
      if (loc === location && typeFromIssue === type) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locTypeList.append(LI) 
      }
    } else if (status && to === '9999.99.99' && !from) { 
      if (loc === location && statusFromIssue === status && typeFromIssue === type) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locTypeList.append(LI) 
      }
    } else if (to && (from || !from) && !status) {
      if (loc === location && (date > from && date < to) && typeFromIssue === type) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locTypeList.append(LI) 
      }
    } else if (to && (from || !from) && status) {
    if (loc === location && (date > from && date < to) && statusFromIssue === status && typeFromIssue === type) {
      const LI = document.createElement("LI")
      LI.classList.add('location-item')
      LI.innerHTML += isTitle(elem)
      LI.innerHTML += isStartDate(elem)
      LI.innerHTML += isStatusDict(elem) 
      locTypeList.append(LI) 
    }
  }
})
  return locTypeList
}

function selectedTypLocationList(itemsPanelBody) {
  return (e) => {
    e.preventDefault()
    const issueValue = document.querySelector('.issue-type').value.toLowerCase().trim()
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
      if (e.target.classList.contains('gbl-sing__type') && e.target.innerHTML === ' + ') {
        planetName = e.target.parentNode.firstElementChild.innerHTML.toLowerCase()
        e.target.parentNode.insertAdjacentElement('afterend', findSelectedTypeLocation(planetName, issueDuplicate, dateFrom, dateTo, issueValue, statusValue))
        e.target.innerHTML = '-'
      } else if (e.target.classList.contains('gbl-sing__type') && e.target.innerHTML === '-') {
        e.target.innerHTML = ' + '
        elem.remove()
      } 
    }
  }
}


export { selectedTypLocationList, thatLocation, ObjForTypedGrouped, isGroupedLocationType }