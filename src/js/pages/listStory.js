import { LitElement, html } from 'lit'
import CheckUserAuth from './auth/check-user-auth'
import EndpointStory from '../story/endpointStory'

class ListStory extends LitElement {
  createRenderRoot() {
    return this
  }

  async init() {
    CheckUserAuth.checkLoginState()

    await this._initialData()
    this.requestUpdate()
  }

  connectedCallback() {
    super.connectedCallback()
    this.init()
  }

  stories = []
  isLoading = false

  async _initialData() {
    this.isLoading = true

    try {
      const loading = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

      await loading(1000)

      const newFetchRecords = await EndpointStory.getAll()
      const response = await newFetchRecords.data.listStory

      if (response && response) {
        this.stories = response
        this.isLoading = false
      } else {
        console.log('Data tidak ditemukan dalam JSON.')
        this.isLoading = false
      }
    } catch (error) {
      console.log('Error :', error)
      this.isLoading = false
    }

    function hideAlert() {
      var alertElement = document.querySelector('.alert')
      if (alertElement) {
        alertElement.remove()
      }
    }

    setTimeout(hideAlert, 4000)
  }

  render() {
    if (this.isLoading === true) {
      return html`
        <div class="loading">
          <div class="loading-logo">
            <div class="spinner-grow text-danger" role="status"></div>
            <div class="spinner-grow mx-3 text-warning" role="status"></div>
            <div class="spinner-grow text-success" role="status"></div>
          </div>
          <span class="mt-1">Mengambil data ...</span>
        </div>
      `
    } else {
      return html`
        <div class="alert alert-success d-flex align-items-center mt-5" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check-circle-fill me-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 
              0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 
              0 0 0-1.06 1.06L6.97 11.03a.75.75 
              0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
            />
          </svg>
          <div>Berhasil mendapatkan data!</div>
        </div>

        <div class="slogan">"Satu Klik, Sejuta Kisah."</div>

        <div class="row pt-4">
          ${this.stories.map((story) => {
            const options = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }

            const formattedDate = new Date(story.createdAt).toLocaleDateString('id-ID', options)

            return html`
              <div class="col-lg-3 col-md-6">
                <div class="card mb-4 custom-card">
                  <img
                    src="${story.photoUrl}"
                    width="300"
                    height="300"
                    class="card-img-top"
                    alt="gambar"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${story.name}</h5>
                    <span class="badge text-bg-primary p-1 rounded-pill">${formattedDate}</span>
                    <div class="mt-2">
                      <a
                        class="btn btn-sm btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-${story.id}"
                      >
                        <i class="bi bi-eye-fill me-1"></i>Lihat Detail
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Modal -->
              <div
                class="modal fade"
                id="modal-${story.id}"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="modal-${story.id}-label"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-4" id="modal-${story.id}-label">Detail Story</h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <img
                        src="${story.photoUrl}"
                        width="300"
                        height="250"
                        class="card-img-top"
                        alt="gambar"
                      />
                      <h5 class="modal-title">${story.name}</h5>
                      <p class="modal-text">${story.description}</p>
                      <span class="badge text-bg-primary p-1 rounded-pill">${formattedDate}</span>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `
          })}
        </div>
      `
    }
  }
}
customElements.define('list-story', ListStory)

export default ListStory
