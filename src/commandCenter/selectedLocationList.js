import {isStatusDict, isTitle, isStartDate} from './divS.js'
import { issueDuplicate } from "./issue.js"


function thatLocation(arr) {
  return arr.locationDist.map((el) => el.value).join('')
}

function findSelectedLocation(location, array) {
  const locList = document.createElement('UL')
  locList.classList.add('location-list')
  let loc = ''
  array.forEach(elem => {
    if (elem.locationDist) {
      loc = thatLocation(elem)
    } if (loc === location) {
      const LI = document.createElement("LI")
      LI.classList.add('location-item')
      LI.innerHTML += isTitle(elem)
      LI.innerHTML += isStartDate(elem)
      LI.innerHTML += isStatusDict(elem) 
      locList.append(LI) 
    }
  })
  return locList
}

function selectedLocationList(itemsPanelBody) {
  return (e) => {
    e.preventDefault()
    let planetName = null
    const checkedL = document.querySelector('.location-filter__check')
    if (checkedL.checked) {
      const elem = e.target.parentNode.nextElementSibling
      if (!e.target.classList.contains('gbl-sing__status') && !e.target.classList.contains('gbl-sing__date') && e.target.classList.contains('gbl-sing') && e.target.innerHTML === ' + ') {
        planetName = e.target.parentNode.firstElementChild.innerHTML
        e.target.parentNode.insertAdjacentElement('afterend', findSelectedLocation(planetName, issueDuplicate))
        e.target.innerHTML = '-'

      } else if (e.target.classList.contains('gbl-sing') && e.target.innerHTML === '-') {
        e.target.innerHTML = ' + '
        elem.remove()
      } 
    }
  }
}


export { selectedLocationList }