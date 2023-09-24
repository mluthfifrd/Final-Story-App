import CheckUserAuth from '../pages/auth/check-user-auth'
import EndpointStory from './endpointStory'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const AddStory = {
  createRenderRoot() {
    return this
  },

  async init() {
    CheckUserAuth.checkLoginState()

    this._initialListener()
  },

  _initialListener() {
    const createStory = document.querySelector('#createStory')
    createStory.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault()
        event.stopPropagation()

        await this._createNewStory()
      },
      false
    )
  },

  async _createNewStory() {
    const submitButton = document.getElementById('submitButton')
    const loadingButton = document.getElementById('loadingButton')
    const formData = this._getFormData()

    if (this._validateFormData({ ...formData })) {
      try {
        submitButton.classList.add('d-none')
        loadingButton.classList.remove('d-none')

        const response = await EndpointStory.createNewStory({
          photo: formData.photo,
          description: formData.description
        })

        const successToast = new bootstrap.Toast(document.getElementById('successToast'))
        successToast.show()

        const successToastBody = document.querySelector('#successToast .toast-body')
        successToastBody.textContent = response.data.message

        this._goToDashboardPage()
      } catch (error) {
        submitButton.classList.remove('d-none')
        loadingButton.classList.add('d-none')
        const errorToast = new bootstrap.Toast(document.getElementById('errorToast'))
        errorToast.show()

        const errorToastBody = document.querySelector('#errorToast .toast-body')
        errorToastBody.textContent = error.response.data.message
      }
    }
  },

  _getFormData() {
    const photo = document.querySelector('#validationFile')
    const description = document.querySelector('#validationTextArea')

    const photoFile = photo.files[0]

    return {
      photo: photoFile,
      description: description.value
    }
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '')

    return formDataFiltered.length === 0
  },

  _goToDashboardPage() {
    window.location.href = '/'
  }
}

export default AddStory
