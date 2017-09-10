// Base stylesheet
require('../sass/main.scss')
require('../sass/vendor/material-icons.css')

var $ = require('jquery')
var axios = require('axios')

// Hack to hot reload hbs in webpack dev server
require('file-loader!../index.hbs')

$(document).ready(function(){
  console.log('app loaded')

  enableCameraImageCapture()

  // App state
  var steps = {
    "step-1": 1,
    "step-2": 0
  }

  // Hide back btn
  $('button.nav-btn.back-btn').hide();

  // Navigation
  $('button.nav-btn.next-btn').on('click', function(){
    navigate(true)
  })
  $('button.nav-btn.back-btn').on('click', function(){
    navigate()
  })

  // Navigation helper
  function navigate(forward) {
    // Find the current active step
    for (key in steps) {
      if (steps[key]) {
        var cstep = key
        break
      }
    }

    // Find the next step to show
    var nstep = forward ? (cstep.slice(-1) * 1 + 1) : (cstep.slice(-1) * 1 - 1)
    navigate_go(cstep, nstep)
  }
  function navigate_go(cstep, nstep) {
    console.log('current step: ' + cstep)
    console.log('next step: ' + nstep)
    // Hide current step
    $('#' + cstep).fadeOut(function(){
      steps[cstep] = 0

      // Only update app state if the next step exists
      if (steps.hasOwnProperty('step-' + nstep)) {
        // Show the next step
        $('#step-' + nstep).fadeIn(function(){
          steps['step-' + nstep] = 1
        })
      } else {
        // Show error
      }

      // Hide nav btns
      if (nstep === Object.keys(steps).length) {
        $('button.nav-btn.next-btn').fadeOut()
      } else if (nstep === 1) {
        $('button.nav-btn.back-btn').fadeOut()
      } else {
        // Show nav btns
        if (!$('button.nav-btn.next-btn').is(':visible')) {
          $('button.nav-btn.next-btn').fadeIn();
        }
        if (!$('button.nav-btn.back-btn').is(':visible')) {
          $('button.nav-btn.back-btn').fadeIn();
        }
      }
    })
  }

  function enableCameraImageCapture() {
    // Grab elements, create settings, etc.
    var video = document.getElementById('video');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }
  }
})
