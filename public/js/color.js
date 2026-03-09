/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const VALID_THEMES = new Set(['light', 'dark', 'auto'])

  const getStoredTheme = () => {
    try {
      const theme = localStorage.getItem('theme')
      return VALID_THEMES.has(theme) ? theme : null
    } catch (e) {
      return null
    }
  }
  const setStoredTheme = theme => {
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // Ignore storage errors (private mode, denied storage, etc.)
    }
  }

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  // Add keyboard shortcut for search (Cmd+K on macOS, Ctrl+K on Windows/Linux)
  document.addEventListener('keydown', function(event) {
    // Check for Cmd+K (macOS) or Ctrl+K (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      
      // Find and trigger the search modal
      const searchModal = document.getElementById('searchModal');
      if (searchModal) {
        // Use Bootstrap's modal API to show the modal
        const modal = bootstrap.Modal.getOrCreateInstance(searchModal);
        modal.show();
      }
    }
  });

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    if (!btnToActive) {
      return
    }
    const activeSvgUse = btnToActive.querySelector('svg use')
    const svgOfActiveBtn = activeSvgUse ? activeSvgUse.getAttribute('href') : null

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    if (activeThemeIcon && svgOfActiveBtn) {
      activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    }
    if (themeSwitcherText) {
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
    }

    if (focus) {
      themeSwitcher.focus()
    }
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onMediaChange = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  }
  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', onMediaChange)
  } else if (typeof media.addListener === 'function') {
    media.addListener(onMediaChange)
  }

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()
