import { LitElement, html } from 'lit'
import Utils from '../utils/utils'
import Config from '../config/config'
import CheckUserAuth from '../pages/auth/check-user-auth'

class FeeHeader extends LitElement {
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <nav class="navbar fixed-top navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand main-title text-light" href="/">Story App</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active text-light"
                  aria-current="page"
                  href="/company/companyProfile.html"
                  >Profil Perusahaan</a
                >
              </li>
            </ul>
            <div>
              <a class="btn btn-primary text-capitalize" href="/story/addStory.html" role="button">
                <i class="bi bi-plus-circle me-1"></i>Tambah Story
              </a>
              <a
                class="btn btn-danger text-capitalize"
                id="userLogOut"
                role="button"
                @click=${this._userLogOut}
              >
                <i class="bi bi-box-arrow-right me-1"></i>Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    `
  }

  _userLogOut(event) {
    event.preventDefault()
    Utils.destroyUserToken(Config.USER_TOKEN_KEY)
    CheckUserAuth.checkLoginState()
  }
}
customElements.define('fee-header', FeeHeader)
