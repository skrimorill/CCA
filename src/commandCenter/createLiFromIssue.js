import {isStatusDict, isLocation, isTitle, isStartDate} from "./divS.js"


function createLiFromIssue(array) {
  let liToArray = []
  
  array.forEach((block) => {
    const LI = document.createElement("LI")
    LI.classList.add('list-item')
    LI.dataset.li = 'item'
    if (block.locationDist) {
      LI.innerHTML += isLocation(block)
    } if (block.title) {
      LI.innerHTML += isTitle(block)
    } if (block.startDate) {
      LI.innerHTML += isStartDate(block)
    } if (block.IssueStatusDict) {
      LI.innerHTML += isStatusDict(block)
    }
    return liToArray.push(LI)
  })
  return liToArray
}




export { createLiFromIssue } 