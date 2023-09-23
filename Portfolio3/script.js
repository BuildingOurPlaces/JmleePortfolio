function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("Please write something!");
    return;
  }

  var li = document.createElement("li");
  li.appendChild(document.createTextNode(inputValue));

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  document.getElementById("myUL").appendChild(li);
  document.getElementById("myInput").value = "";

  span.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  };

  li.onclick = function() {
    li.classList.toggle('checked');
  };
}

function addTask(event) {
  if (event.key === 'Enter') {
    newElement();
  }
}

const apiKey = '2519d50bca2d036899d1ffad5960abba';

function getWeather() {
  fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=Sydney`)
    .then(response => response.json())
    .then(data => {
      const temperature = data.current.temperature;
      const temperatureElement = document.getElementById('temperature');
      temperatureElement.textContent = temperature;
    })
    .catch(error => console.error('Error fetching weather:', error));
}

window.addEventListener('load', getWeather);

function updateClock() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById("current-time").textContent = formattedTime;
}

setInterval(updateClock, 1000);

updateClock();

function showRotate() {
  const smileyIcon = document.querySelector('.smiley-icon');

  smileyIcon.classList.add('rotate');

  setTimeout(() => {
    smileyIcon.classList.remove('rotate');
    greetingText.style.display = 'none';
  }, 2000);
}
