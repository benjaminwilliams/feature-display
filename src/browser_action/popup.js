
document.addEventListener('DOMContentLoaded', function () {
  hello();
});

document.getElementById('riskRatingOff').onclick = function(){

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    chrome.cookies.set({ url: url, name: "RiskRating", value: ""});
  });

  document.getElementById('refresh').className = "";
};

document.getElementById('riskRatingOn').onclick = function(){

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    chrome.cookies.remove({url: url, name: "RiskRating" });
  });

  document.getElementById('refresh').className = "";
};

function hello() {

  var listFeatures = "";

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
