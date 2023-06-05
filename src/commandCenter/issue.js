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
function sortIssueForLocations(issueDuplicate) {
let locMars = []
let locEarth = []
let locVenus = []
let locPluto = []
let locMercury = []
let locJupiter = []
let locSaturn = []
let locUranus = []
let locNeptune = []
  issueDuplicate.map((el) => {
    if(el.locationDist) {
       el.locationDist.map((item) => {
        if(item.value === 'Mars') {
           locMars.push(el)
           planetsObj.Mars = locMars
        }
        if(item.value === 'Earth') {
           locEarth.push(el)
           planetsObj.Earth = locEarth
        }
        if(item.value === 'Pluto') {
          locPluto.push(el)
          planetsObj.Pluto = locPluto
        }
        if(item.value === 'Venus') {
          locVenus.push(el)
          planetsObj.Venus = locVenus
        }
        if(item.value === 'Mercury') {
          locMercury.push(el)
          planetsObj.Mercury = locMercury
        }
        if(item.value === 'Jupiter') {
          locJupiter.push(el)
          planetsObj.Jupiter = locJupiter
        }
        if(item.value === 'Saturn') {
          locSaturn.push(el)
          planetsObj.Saturn = locSaturn
        }
        if(item.value === 'Uranus') {
          locUranus.push(el)
          planetsObj.Uranus = locUranus
        }
        if(item.value === 'Neptune') {
          locNeptune.push(el)
          planetsObj.Neptune = locNeptune
        }
      })
    }
  })
}
sortIssueForLocations(issueDuplicate)


export { issue, issueDuplicate, types, statuses, planetsObj }

