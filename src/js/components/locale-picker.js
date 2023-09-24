/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit'
import { getLocale, setLocaleFromUrl } from './localization.js'
import { allLocales } from '../../generated/locale-codes.js'
import { updateWhenLocaleChanges } from '@lit/localize'

const localeNames = {
  id: 'Indonesia',
  es: 'Spanyol',
  en: 'English',
  ru: 'Russia'
}

// Note we use updateWhenLocaleChanges here so that we're always up to date with
// the active locale (the result of getLocale()) when the locale changes via a
// history navigation.
export class LocalePicker extends LitElement {
  static styles = css`
    .language-picker {
      margin-top: 2rem;
      text-align: center;
    }

    select {
      appearance: none;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      width: 200px;
      cursor: pointer;
    }

    select:hover {
      border-color: #888;
    }

    select:focus {
      outline: none;
      border-color: #555;
      box-shadow: 0 0 5px rgba(85, 85, 85, 0.2);
    }

    select::after {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      pointer-events: none;
    }

    /* Stil untuk option dalam dropdown */
    select option {
      padding: 10px;
      background-color: #fff;
    }

    select option:hover {
      background-color: #f0f0f0;
    }
  `

  constructor() {
    super()
    updateWhenLocaleChanges(this)
  }

  render() {
    return html`
      <div class="language-picker">
        <select @change=${this.localeChanged}>
          ${allLocales.map(
            (locale) =>
              html`<option value=${locale} ?selected=${locale === getLocale()}>
                ${localeNames[locale]}
              </option>`
          )}
        </select>
      </div>
    `
  }

  localeChanged(event) {
    const newLocale = event.target.value
    if (newLocale !== getLocale()) {
      const url = new URL(window.location.href)
      url.searchParams.set('locale', newLocale)
      window.history.pushState(null, '', url.toString())
      setLocaleFromUrl()
    }
  }
}
customElements.define('locale-picker', LocalePicker)
