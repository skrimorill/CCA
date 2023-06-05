function formTemplate() {
  const IssueForm = document.createElement('div');

  IssueForm.classList.add('wrapper', 'hidden')

  IssueForm.innerHTML = `
  <div class="form" id="form">
  <div class="form__header">
  <h3 class='form__title'> Issue Report Form </h3>
</div>
<div class="form__inputs">
  <div class="form__input form__input-location">
    <label class="label-input" for="">Location:</label>
    <input type='text' class='location form__input-item' name='location'>
  </div>
  <div class="form__input form__input-reporter">
    <label class="label-input" for="">Reporter:</label> 
    <input type='text' class='reporter form__input-item' name='reporter'> 
  </div>
  <div class="form__input form__input-date">
    <label class="label-input" for="">Start date:</label> 
    <input type='date' class='startDate form__input-item' name='startDate'>
  </div>
  <div class="form__input form__input-comment">
    <label class="label-input" for="">Comment:</label> 
    <input type='text' class='comment form__input-item' name='comment'>
  </div>
</div> 
<div class='form__buttons'>
  <button type='cancel' class='form__cancel' form__button>Cancel</button>
  <button type='submit' class='form__submit' form__button>Submit</button>
</div>
</div>
<div class='button-wrapper'>
  <a href='../index.html' class='btn'>My super Button</a>
</div>
  `
  return document.body.append(IssueForm)
}

export { formTemplate }

