import { issueDuplicate } from './issue.js'
import { createLiFromIssue } from './createLiFromIssue.js'

const liGpouped = {}

function prepareLocationObj(block) {
  const location = block.locationDist.map((el) => el.value)
  location.reduce((akk, el) => {
    akk[el] = (akk[el] || 0) + 1
    return akk
  }, liGpouped)
}

function GroupedLocationObj(arr) {
  arr.forEach((block) => {
    prepareLocationObj(block)
  })
  return liGpouped
}
GroupedLocationObj(issueDuplicate)

function isGroupedLocation(liGpouped) {
  const gblList = document.createElement('UL')
  gblList.classList.add('gbl-list')
  let html = document.createElement('div')
  for (let[key, value] of Object.entries(liGpouped)) {
    html.innerHTML = `
      <li class="gbl-group">
        <div class="gbl-location gbl-item">${key}</div> 
        <div class="gbl-total gbl-item">${value} issues</div> 
        <div class="${key.toLowerCase()}-expand gbl-item gbl-sing gbl-sing-plus"> + </div> 
      </li>
    `
    const elem = html.firstElementChild
    gblList.append(elem)
  }
  return gblList
} 


function appendGroupedList(itemsPanelBody) {
  return (e) => {
    if (e.target.checked) {
      itemsPanelBody.innerHTML = ""
      itemsPanelBody.append(isGroupedLocation(liGpouped))
    } else {
      itemsPanelBody.innerHTML = ""
      itemsPanelBody.append(createLiFromIssue(issueDuplicate))
    }
  }
}



export { isGroupedLocation, appendGroupedList}



