export function createCCA() {
  const myApp = document.querySelector('#cca');
  const CCA = document.createElement('div');

  CCA.innerHTML = `
  <div class="command-center">
  <div class="command-center__header">
    <div class="logo">CCA</div>
    <div class="title">Command center application</div>
  </div>
  <div class="command-center__sort-panel">
  <div class="sort-panel__item sort-panel__issue">
    <label class="label-issue" for="">Issue type</label>
    <input type='text' class='issue-type' name='issue-type'>
  </div>
  <div class="sort-panel__item sort-panel__date">Issue date
    <div class="sort-panel__date-inputs">
      <div class="date-input"> 
        <label class="label-from label-date" for="">From</label>
        <input type='date' class='issue-date issue-date-from' name='issue-date-from' placeholder="dd.mm.yyyy">
      </div>
      <div class="date-input">   
        <label class="label-to label-date" for="">To</label>
        <input type='date' class='issue-date issue-date-to' name='issue-date-to' placeholder="dd.mm.yyyy">
      </div>
    </div>
  </div>
    <div class="sort-panel__item sort-panel__status">
      <label class="label-status" for="">Status</label>
      <input type='text' class='issue-status' name='issue-status'>
    </div>
  </div>
    <div class='command-center__body'>
    <div class='items-panel'>
    <div class='items-panel__header'>
      <div class='location-filter'>
      <label class='location-filter__title'>Group by location</label>
      <input type='checkbox' class='location-filter__check'>
      </div>
      <div class='plus-minus'>
      <a href='../src/issueForm/issueForm.html' class='change-page'>+</a> 
      </div>
    </div>
      <div class='items-panel__body'>
      </div>
    </div>
    </div>
</div>
  `
  return myApp.append(CCA.firstElementChild)
}