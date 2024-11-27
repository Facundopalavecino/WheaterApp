const apiKey = "d102ce6f8a7f8c61a416505fdeb98697";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const weatherError = document.getElementById('wheather-error');
  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d102ce6f8a7f8c61a416505fdeb98697`; 

async function getWeatherByLocation(city){    
    
        main.innerHTML = ""; 
        weatherError.classList.add('inactive'); 
    
        try {
            const resp = await fetch(url(city), { origin: "cors" });
            const respData = await resp.json();
    
            if (respData.cod === '404') {
                weatherError.classList.remove('inactive');
                weatherError.textContent = "City or country invalid! Please enter again or correct the location.";
            } else {
                addWeatherToPage(respData);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            weatherError.classList.remove('inactive');
            weatherError.textContent = "An error occurred while fetching data. Please try again.";
        }          
     }

      function addWeatherToPage(data){
          const temp = Ktoc(data.main.temp);
          const weather = document.createElement('div')
          weather.classList.add('weather');
          weather.innerHTML = `
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <small>${data.weather[0].main}</small> `;
          main.innerHTML= "";
          main.appendChild(weather);
      };


     function Ktoc(K){
         return Math.floor(K - 273.15);
     }

     form.addEventListener('submit',(e) =>{
        e.preventDefault();
        const city = search.value;
        if(city){
            getWeatherByLocation(city)
        }

     });