import Auth from '../../network/auth'
import Config from '../../config/config'
import Utils from '../../utils/utils'
import CheckUserAuth from './check-user-auth'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const Login = {
  async init() {
    CheckUserAuth.checkLoginState()

    this._initialListener()
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm')
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault()
        event.stopPropagation()

        loginForm.classList.add('was-validated')
        await this._getLogged()
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

  async _getLogged() {
    const submitButton = document.getElementById('submitButton')
    const loadingButton = document.getElementById('loadingButton')
    const formData = this._getFormData()

    if (this._validateFormData({ ...formData })) {
      try {
        submitButton.classList.add('d-none')
        loadingButton.classList.remove('d-none')

        const response = await Auth.login({
          email: formData.email,
          password: formData.password
        })
        Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token)

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
    const email = document.querySelector('#validationCustomRecordEmail')
    const password = document.querySelector('#validationCustomPassword')

    return {
      email: email.value,
      password: password.value
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

export default Login
