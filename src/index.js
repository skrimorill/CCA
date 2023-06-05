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
itemsPanelBody.append(createLiFromIssue(issueDuplicate))
const checkedL = document.querySelector('.location-filter__check')
const dFrom = document.querySelector('.issue-date-from')
const dTo = document.querySelector('.issue-date-to')
const issueType = document.querySelector('.issue-type')
const statusType = document.querySelector('.issue-status')


checkedL.addEventListener("change", appendGroupedList(itemsPanelBody))
dFrom.addEventListener("blur", sortByDateFrom(itemsPanelBody))
dTo.addEventListener("blur", sortByDateTo(itemsPanelBody))
issueType.addEventListener("blur", sortByType(itemsPanelBody))
statusType.addEventListener("blur", sortByStatus(itemsPanelBody))
itemsPanelBody.addEventListener("click", selectedLocationList(itemsPanelBody))
itemsPanelBody.addEventListener("click", selectedTypLocationList(itemsPanelBody))
itemsPanelBody.addEventListener("click", selectedDateLocationList(itemsPanelBody))
itemsPanelBody.addEventListener("click", selectedStatusLocationList(itemsPanelBody))

