import {isStatusDict, isLocation, isTitle, isStartDate} from "./divS.js"


function createLiFromIssue(array) {
  const itemList = document.createElement('UL')
  itemList.classList.add('list')
  
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
    return itemList.append(LI)
  })
  return itemList
}




export { createLiFromIssue } 