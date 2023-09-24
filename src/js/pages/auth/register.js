import Auth from '../../network/auth'
import CheckUserAuth from './check-user-auth'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const Register = {
  async init() {
    CheckUserAuth.checkLoginState()

    this._initialListener()
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm')
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault()
        event.stopPropagation()

        registerForm.classList.add('was-validated')
        await this._getRegistered()
      },
      false
    )

    const togglePasswordButton = document.getElementById('togglePasswordButton')
    togglePasswordButton.addEventListener('click', () => {
      this._togglePassword()
    })
  },

  _togglePassword() {
    const passwordInput = document.getElementById('validationCustomPassword')
    const eyeIcon = document.getElementById('eyeIcon')

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      eyeIcon.classList.remove('bi-eye')
      eyeIcon.classList.add('bi-eye-slash')
    } else {
      passwordInput.type = 'password'
      eyeIcon.classList.remove('bi-eye-slash')
      eyeIcon.classList.add('bi-eye')
    }
  },

  async _getRegistered() {
    const submitButton = document.getElementById('submitButton')
    const loadingButton = document.getElementById('loadingButton')
    const formData = this._getFormData()

    if (this._validateFormData({ ...formData })) {
      try {
        submitButton.classList.add('d-none')
        loadingButton.classList.remove('d-none')

        const response = await Auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })

        const successToast = new bootstrap.Toast(document.getElementById('successToast'))
        successToast.show()

        const successToastBody = document.querySelector('#successToast .toast-body')
        successToastBody.textContent = response.data.message

        this._goToLoginPage()
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
    const name = document.querySelector('#validationCustomRecordName')
    const email = document.querySelector('#validationCustomEmail')
    const password = document.querySelector('#validationCustomPassword')

    return {
      name: name.value,
      email: email.value,
      password: password.value
    }
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '')

    return formDataFiltered.length === 0
  },

  _goToLoginPage() {
    window.location.href = '/auth/login.html'
  }
}

export default Register
