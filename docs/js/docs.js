/* eslint-disable no-unused-vars */
/* global document, window, Element, AdobeSpectrum */

'use strict';

// Polyfill closest() on IE 11
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return null;
  };
}

function changeCSS(colorStop) {
  document.body.className = 'spectrum spectrum--'+colorStop;
}

function openDialog(dialog, withOverlay) {
  if (withOverlay !== false) {
    document.getElementById('spectrum-underlay').classList.add('is-open');
  }

  dialog.classList.add('is-open');
}

function closeDialog(dialog) {
  document.getElementById('spectrum-underlay').classList.remove('is-open');
  dialog.classList.remove('is-open');
}

document.addEventListener('DOMContentLoaded', function() {
  changeCSS('light');
});

// Show and hide code samples
function toggleMarkupVisibility(event) {
  event.preventDefault();
  var exampleMarkup = event.target.closest('.sdldocs-component').querySelector('.sdldocs-code-example');
  var style = window.getComputedStyle(exampleMarkup);
  var isHidden = style.getPropertyValue('display') === 'none';
  event.target.innerHTML = isHidden ? 'hide markup' : 'show markup';
  exampleMarkup.style.display = isHidden ? 'block' : 'none';
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('sdldocs-code-link')) {
    toggleMarkupVisibility(event);
  }
});

window.addEventListener('click', function(event) {
  var el;
  if ((el = event.target.closest('.spectrum-TreeView-item')) !== null) {
    el.classList.toggle('is-open');
    event.preventDefault();
  }
});

// Display Slider focus style
function toggleSliderFocus(event) {
  if (!event.target.classList.contains('spectrum-Slider-input')) {
    return;
  }
  var func = event.type === 'focus' ? 'add' : 'remove';
  var handle = event.target.closest('.spectrum-Slider-handle');
  handle.classList[func]('is-focused');
}

document.addEventListener('focus', toggleSliderFocus, true);
document.addEventListener('blur', toggleSliderFocus, true);

AdobeSpectrum.loadIcons('../icons/spectrum-css-icons.svg');
AdobeSpectrum.loadIcons('../icons/spectrum-icons.svg');
