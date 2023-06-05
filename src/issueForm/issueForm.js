import { formTemplate } from './formTemplate.js';

formTemplate()

savedDataInLocalStorage() 
function savedDataInLocalStorage() {
  const LS = localStorage
  const submitButton = document.querySelector('.form__submit')
  const form = document.querySelector('.form')
  let formData = {}

  form.addEventListener('change', (e) => {
    formData[e.target.name] = e.target.value
    LS.setItem('formData', JSON.stringify(formData))
  })
}



