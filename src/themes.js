/*!
 * XYZUI Framework - Theme Utilities
 * JavaScript utilities for theme management
 * Version 2.1.0 - HTML-first approach for base color
 */

(function(global) {
  'use strict';

  class Theme {
    constructor() {
      this.keys = {
        mode: 'xyzui-mode',
        base: 'xyzui-base',
        accent: 'xyzui-accent'
      };

      this.options = {
        bases: ['zinc', 'slate', 'stone', 'gray', 'neutral'],
        accents: ['red', 'rose', 'orange', 'green', 'blue', 'yellow', 'violet', 'purple', 'fuchsia', 'pink', 'indigo', 'emerald', 'teal', 'cyan', 'sky', 'lime', 'amber']
      };
      
      this.docEl = document.documentElement;

      this.init();
    }

    init() {
      const mode = localStorage.getItem(this.keys.mode) || this.docEl.getAttribute('xyz-mode') || 'system';
      const accent = this.docEl.getAttribute('xyz-accent') || localStorage.getItem(this.keys.accent) || '';
      const base = this.docEl.getAttribute('xyz-base') || localStorage.getItem(this.keys.base) || 'zinc';
      
      this._setMode(mode, false);
      this._setBase(base, false);
      this._setAccent(accent, false);
      
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const currentMode = this.docEl.getAttribute('xyz-mode') || localStorage.getItem(this.keys.mode) || 'system';
        if (currentMode === 'system') {
          this._applyMode(e.matches ? 'dark' : 'light');
        }
      });
    }
    
    _applyMode(mode) {
      this.docEl.classList.remove('light', 'dark');
      if (mode === 'dark') {
        this.docEl.classList.add('dark');
      } else {
        this.docEl.classList.add('light');
      }
    }
    
    _setMode(mode, save = true) {
      if (save) localStorage.setItem(this.keys.mode, mode);
      let finalMode = mode;
      if (mode === 'system') {
        finalMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      this._applyMode(finalMode);
    }

    _setBase(base, save = true) {
      if (!this.options.bases.includes(base)) return;
      if (save) localStorage.setItem(this.keys.base, base);
      this.docEl.setAttribute('xyz-base', base);
    }
    
    _setAccent(accent, save = true) {
      if (!this.options.accents.includes(accent)) {
        if (save) localStorage.removeItem(this.keys.accent);
        this.docEl.removeAttribute('xyz-accent');
        return;
      }
      if (save) localStorage.setItem(this.keys.accent, accent);
      this.docEl.setAttribute('xyz-accent', accent);
    }

    mode(mode) { this._setMode(mode, true); }
    color(base) { this._setBase(base, true); }
    accent(accent) { this._setAccent(accent, true); }
  }

  global.theme = new Theme();

})(typeof window !== 'undefined' ? window : this);