// Saves options to chrome.storage
function save_options() {

  var data  = document.getElementById('addToggle').value;



  chrome.storage.sync.set({
    toggles: data
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  restore_options();
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get("toggles", function(items) {
    document.getElementById('currentToggles').innerText = items.toggles;
    localStorage.toggles = items.toggles;

  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);
