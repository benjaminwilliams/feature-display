
document.addEventListener('DOMContentLoaded', function () {
  hello();
});

function hello() {

  chrome.runtime.sendMessage({
      greeting: "getFeatures"
    },
    function(response) {
      document.getElementById("features").textContent = response.msg;
    });
}