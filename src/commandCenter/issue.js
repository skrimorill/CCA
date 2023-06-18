import { issue } from '../issueForm/Generator.js'

let statuses = []
let types = []
let issueDuplicate = []
let planetsObj = {}


function findStatusInIssue(array) {
  return array.map((elem) => {
    if (elem.title) {
      types.push(elem.title.toLowerCase())
      types = [...new Set(types)]
    } if (elem.IssueStatusDict) {
      elem.IssueStatusDict.map((el) => {
        statuses.push(el.value.toLowerCase())
        statuses = [...new Set(statuses)]
      })
    }
  })
}

fromIssue(issue)
function fromIssue(array) {
  return issueDuplicate = JSON.parse(JSON.stringify(issue))
}

findStatusInIssue(issueDuplicate)

sortIssueForLocations(issueDuplicate)
function sortIssueForLocations(issueDuplicate) {
  planetsObj = issueDuplicate.reduce((planets, el) =>{
    el.locationDist.value
    let arr =  planets[el.locationDist[0].value] || []
    planets[el.locationDist[0].value] = [...arr , el]
    return planets} , planetsObj)
}



export { issue, issueDuplicate, types, statuses, planetsObj }

  

