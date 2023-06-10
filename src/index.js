import { issueDuplicate } from "./commandCenter/issue.js"
import { createCCA } from './commandCenter/template.js'
import { createLiFromIssue } from './commandCenter/createLiFromIssue.js'
import { appendGroupedList } from './commandCenter/divsGroupedLocation.js'
import { sortByDateFrom, sortByDateTo } from './commandCenter/sortByDate.js'
import { sortByType } from './commandCenter/sortByType.js'
import { sortByStatus } from './commandCenter/sortByStatus.js'
import { selectedLocationList } from './commandCenter/selectedLocationList.js'
import { selectedTypLocationList } from './commandCenter/groupedByType.js'
import { selectedDateLocationList } from './commandCenter/groupedByDate.js'
import { selectedStatusLocationList } from './commandCenter/groupedByStatus.js'

createCCA()


const itemsPanelBody = document.querySelector('.items-panel__body')
const list = document.querySelector('.list')
const checkedL = document.querySelector('.location-filter__check')
const dFrom = document.querySelector('.issue-date-from')
const dTo = document.querySelector('.issue-date-to')
const issueType = document.querySelector('.issue-type')
const statusType = document.querySelector('.issue-status')


checkedL.addEventListener("change", appendGroupedList(itemsPanelBody))
dFrom.addEventListener("blur", sortByDateFrom(itemsPanelBody))
dTo.addEventListener("blur", sortByDateTo(itemsPanelBody))
issueType.addEventListener("change", sortByType(itemsPanelBody))
statusType.addEventListener("change", sortByStatus(itemsPanelBody))
itemsPanelBody.addEventListener("click", selectedLocationList(itemsPanelBody))
itemsPanelBody.addEventListener("click", selectedTypLocationList(itemsPanelBody))
itemsPanelBody.addEventListener("click", selectedDateLocationList(itemsPanelBody))
itemsPanelBody.addEventListener("click", selectedStatusLocationList(itemsPanelBody))


const arrayOfLi = createLiFromIssue(issueDuplicate)

let offset = 0;
let limit = 13;

const observer = new IntersectionObserver((entity, observer) => {
  if (entity[0].isIntersecting) {
    observer.disconnect(entity[0]?.target); 
    add((offset += limit)); 
  }
});

add()
function add(offset = 0) {
  const liList = arrayOfLi.slice(offset, offset + limit).map((el, index, arr) => {
    if (index === arr.length - 2) {
      observer.observe(el);
    }
    return el;
  });
  liList.forEach((item) => {
    list.append(item);
  });
}

