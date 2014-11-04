
document.addEventListener('DOMContentLoaded', function () {
  hello();
});

document.getElementById('riskRatingOff').onclick = function(){
  chrome.cookies.set({ url: "https://dev.austhealth.com", name: "", value: "RiskRating"});
  document.getElementById('refresh').className = "";
};

document.getElementById('riskRatingOn').onclick = function(){
  chrome.cookies.set({ url: "https://dev.austhealth.com", name: "", value: ""});
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
