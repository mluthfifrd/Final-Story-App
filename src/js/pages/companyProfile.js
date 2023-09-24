import { LitElement, html, css } from 'lit'
import { msg, updateWhenLocaleChanges } from '@lit/localize'
import CheckUserAuth from './auth/check-user-auth'

class CompanyProfile extends LitElement {
  constructor() {
    super()
    updateWhenLocaleChanges(this)
  }

  async init() {
    CheckUserAuth.checkLoginState()
  }

  static styles = css`
    .head {
      text-align: center;
    }

    p {
      font-size: 1.2rem;
    }

    .container {
      width: 100%;
      max-width: 1320px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 15px;
      padding-right: 15px;
    }
  `

  render() {
    return html`
      <div class="container">
        <div class="head">
          <h1 class="text-success">PT. Fee Berkah Indah</h1>
        </div>
        <div class="body">
          <p>
            ${msg(html`
              Story App adalah aplikasi yang diciptakan dengan tujuan memfasilitasi pengguna untuk
              berbagi cerita dan pengalaman mereka dengan cara yang kreatif dan berarti. Aplikasi
              ini mendedikasikan dirinya untuk menghidupkan kisah-kisah yang tak terlupakan dan
              mewujudkan makna dalam setiap momen. Dengan Story App, pengguna dapat membagikan
              perjalanan hidup, pencapaian, dan bahkan kejadian sederhana yang memiliki arti
              mendalam dalam hidup mereka. Ini adalah platform yang memungkinkan mereka untuk
              menyimpan kenangan, berempati dengan pengalaman orang lain, dan merayakan kreativitas
              dalam bentuk narasi visual yang beragam. Dari foto-foto indah hingga tulisan
              inspirasional, Story App menghadirkan sebuah wadah yang menyatukan orang-orang dari
              berbagai latar belakang, menjadikan setiap pengalaman berharga dan setiap cerita
              memiliki arti. Dengan Story App, dunia kita diberi kesempatan untuk berbicara melalui
              gambar-gambar, kata-kata, dan emosi yang menginspirasi, membantu kita merangkul
              keindahan dan makna dalam setiap langkah hidup kita.
            `)}
          </p>
        </div>
      </div>
    `
  }
}
customElements.define('company-profile', CompanyProfile)

export default CompanyProfile
