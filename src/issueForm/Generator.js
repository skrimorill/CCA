let planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']

let statuses = ['Actual', 'Archived', 'Handled']

let types = ['Aliens attack', 'Global heating', 'Planet explosion', 'Connection lost', 'Full annihilation', 'Meteorite attack']

const issue = []

getIssueFromLocalStorage()
function getIssueFromLocalStorage() {
  let temporaryArray = []
  let formData = {}
  let LS = localStorage
  if(LS.getItem('formData')) {
    formData = JSON.parse(LS.getItem('formData'));
    temporaryArray.push(formData)
  let intermediateObj = temporaryArray.at(-1)
  let objFromIssueForm = {}
  let locationDist = []
  let IssueStatusDict = []

  let locObj = {
    id: intermediateObj.location,
    value: `${intermediateObj.location[0].toUpperCase()}${intermediateObj.location.slice(1)}` 
  }
  
locationDist.push(locObj)
  objFromIssueForm.locationDist = locationDist
  objFromIssueForm.title = `${intermediateObj.reporter[0].toUpperCase()}${intermediateObj.reporter.slice(1)}`
  objFromIssueForm.startDate = intermediateObj.startDate.split('-').join('.')

let statObj = {
  id: intermediateObj.comment,
  value: `${intermediateObj.comment[0].toLocaleUpperCase()}${intermediateObj.comment.slice(1)}`
}

IssueStatusDict.push(statObj)
  objFromIssueForm.IssueStatusDict = IssueStatusDict

  issue.push(objFromIssueForm)
  LS.clear()
  }
}


function issueGenerator() {
  const myObj = {}
    myObj.locationDist = doLocation(planets)
    myObj.title = doType(types)
    myObj.startDate = doDate(1900, 2999, 1, 12, 1, 30)
    myObj.IssueStatusDict = doStatus(statuses) 
  return myObj
}


fillIssue()
function fillIssue() {
  while (issue.length < 900) { 
    issue.push(issueGenerator())
  }
}

function doLocation(arr) {
  let locationArray = []
  let locationObject = {}
  let planet = planets[randomNumberForIndex(planets.length)]
  locationObject.id = planet.toLowerCase()
  locationObject.value = planet
  locationArray.push(locationObject)
 return locationArray
}

function doType(arr) {
  let typeString = types[randomNumberForIndex(types.length)]
  return typeString
}

function doStatus(arr) {
  let statusArray = []
  let statusObject = {}
  let status = statuses[randomNumberForIndex(statuses.length)]
  statusObject.id = status.toLowerCase()
  statusObject.value = status
  statusArray.push(statusObject)
 return statusArray
}

function randomNumberForIndex(x = 10) {
  return Math.floor(Math.random() * x)
}

function doDate(minY, maxY, minM, maxM, minD, maxD) {
  let year = Math.floor(minY + Math.random() * (maxY - minY))
  let month = Math.floor(minM + Math.random() * (maxM - minM))
  if (month < 10) {
    month = '0' + month
  }
  let day = Math.floor(minD + Math.random() * (maxD - minD))
    if (day < 10) {
    day = '0' + day
  }
  return `${year}.${month}.${day}`
}

export { issue }