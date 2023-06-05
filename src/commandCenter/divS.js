function isStatusDict(block) {
  const status = block.IssueStatusDict.map((el) => el.value).join('')
  return `
  <div class='li-status item-element' >
    ${status}
  </div>
`
}

function isLocation(block) {
  const location = block.locationDist.map((el) => el.value).join('')
  return `
  <div class='li-status item-element' >
    ${location}
  </div>
`
}

function isTitle(block) {
  return `
  <div class='li-title item-element' >
    ${block.title}
  </div>
`
}

function isStartDate(block) {
  return `
  <div class='li-date item-element' >
    ${block.startDate}
  </div>
`
}


export {isStatusDict, isLocation, isTitle, isStartDate}

