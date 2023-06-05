import {isStatusDict, isTitle, isStartDate} from './divS.js'
import { issueDuplicate } from "./issue.js"

function ObjForDateGrouped(obj, from, to, type = '', status = '') {
  let ObjDateGrouped = {}
  if (!type && !status) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        if (el.startDate > from && el.startDate < to) {
          elementsTrueArray.push(el)
          ObjDateGrouped[key] = elementsTrueArray
        }  
      })
    }
  } else if (type && !status) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        if (el.startDate > from && el.startDate < to && el.title.toLowerCase() === type.toLowerCase()) {
          elementsTrueArray.push(el)
          ObjDateGrouped[key] = elementsTrueArray
        }  
      })
    }
  } else if (status && !type) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let stat = el.IssueStatusDict.map((item) => item.value).join('').toLowerCase();
        if (el.startDate > from && el.startDate < to && stat === status.toLowerCase()) {
          elementsTrueArray.push(el)
          ObjDateGrouped[key] = elementsTrueArray
        }  
      })
    }
  } else if (type && status) {
    for(let [key, val] of Object.entries(obj)) {
      let elementsTrueArray = []
      val.map((el) => {
        let stat = el.IssueStatusDict.map((item) => item.value).join('').toLowerCase();
        if (el.startDate > from && el.startDate < to && stat === status.toLowerCase() && el.title.toLowerCase() === type.toLowerCase()) {
          elementsTrueArray.push(el)
          ObjDateGrouped[key] = elementsTrueArray
        }  
      })
    }
  }
  return ObjDateGrouped
}


function isGroupedLocationDate(obj) {
  const statusValue = document.querySelector('.issue-status').value.toLowerCase().trim()
  const typeValue = document.querySelector('.issue-type').value.toLowerCase().trim()
  const gbdList = document.createElement('UL')
  gbdList.classList.add('gbl-list', 'gbl-list__date')
  let html = document.createElement('div')
  for (let[key, value] of Object.entries(obj)) {
    html.innerHTML = `
      <li class="gbl-group date-group">
        <div class="gbl-location gbl-item ">${key}</div> 
        <div class="gbl-total gbl-item">${value.length} issues</div> 
        <div class="${key.toLowerCase()}-expand gbl-item gbl-sing__date gbl-sing gbl-sing-plus"> + </div> 
      </li>
    `
    const elem = html.firstElementChild
    gbdList.append(elem)
  }
  return gbdList
} 

function createGroupedByDateList(location, array, from, to, type, status) {
  
  const locDateList = document.createElement('UL')
  locDateList.classList.add('location__list')
  let loc = ''
  let date = ''
  let typeFromIssue = ''
  let statusFromIssue = ''

  array.forEach(elem => {
    date = elem.startDate
    typeFromIssue = elem.title.toLowerCase()
    statusFromIssue = elem.IssueStatusDict.map((item) => item.value).join('').toLowerCase()
    loc = elem.locationDist.map((item) => item.value).join('').toLowerCase()
  
    if (!type && !status) {
      if (loc === location && (date > from && date < to)) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locDateList.append(LI) ;
    }
  } else if (type && !status) {
      if (loc === location && (date > from && date < to) && typeFromIssue === type) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locDateList.append(LI) 
    }
  } else if (status && !type) {
      if (loc === location && (date > from && date < to) && statusFromIssue === status) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locDateList.append(LI) 
    }
  } else if (status && type) {
      if (loc === location && (date > from && date < to) && statusFromIssue === status && typeFromIssue === type.toLowerCase()) {
        const LI = document.createElement("LI")
        LI.classList.add('location-item')
        LI.innerHTML += isTitle(elem)
        LI.innerHTML += isStartDate(elem)
        LI.innerHTML += isStatusDict(elem) 
        locDateList.append(LI) 
    }
  }
})
  return locDateList
}

function selectedDateLocationList(itemsPanelBody) {
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
      if (e.target.classList.contains('gbl-sing__date')) {
        planetName = e.target.parentNode.firstElementChild.innerHTML.toLowerCase()
        const liForGrouped =  createGroupedByDateList(planetName, issueDuplicate, dateFrom, dateTo, typeValue, statusValue)
        e.target.parentNode.insertAdjacentElement('afterend', liForGrouped)
        e.target.innerHTML = '-'
        e.target.classList.toggle('gbl-sing__date')
        e.target.classList.toggle('gbl-sing__date-minus')
      } else if (e.target.classList.contains('gbl-sing__date-minus')) {
        if (elem && elem.classList.contains('location-item')) {
          elem.remove()
        }
        e.target.innerHTML = ' + '
        e.target.classList.toggle('gbl-sing__date-minus')
        e.target.classList.toggle('gbl-sing__date')
      } 
    }
  }
}



export { selectedDateLocationList, ObjForDateGrouped, isGroupedLocationDate }