
document.addEventListener('DOMContentLoaded', function () {
  init();
});

document.getElementById('riskRatingOff').onclick = function(){

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    chrome.cookies.set({ url: url, name: loadToggle(), value: ""});
  });

  document.getElementById('refresh').className = "";
};

document.getElementById('riskRatingOn').onclick = function(){

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    chrome.cookies.remove({url: url, name: loadToggle() });
  });

  document.getElementById('refresh').className = "";
};

function loadToggle() {
  //set default if you havent set a toggle
  var toggleText;

  console.log(localStorage.toggles);

  if (localStorage.toggles == undefined){
    toggleText = "RiskRating";
  }
  else {
    toggleText = localStorage.toggles;
  }

  return toggleText;
}


function init() {

  var listFeatures = "";
  var allowedsites = ["austhealth", "nib"];

  document.getElementById('currentToggles').innerText = loadToggle();

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    for (var i = 0; i < allowedsites.length; i++ ) {
      if (url.indexOf(allowedsites[i]) > -1){
        document.getElementById('invalidPage').className = "is-hidden";
        document.getElementById('validPage').className = "";
      }
    }


  });


  chrome.runtime.sendMessage({
      greeting: "getFeatures"
    },
    function(response) {
      listFeatures = response.msg;

      document.getElementById("features").textContent = listFeatures;

      if(listFeatures === " ft-risk-rating"){
        document.getElementById('riskRatingOff').className += " is-hidden";


      }
      else {
        document.getElementById('riskRatingOn').className += " is-hidden";
      }


    });




}
