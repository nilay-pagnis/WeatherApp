const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const cityDetails = data.cityDetails;      // destructure property
    const weatherDetail = data.weatherDetail;  // const {cityDetails, weatherDetail} = data; -> it will doo the same thing...

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weatherDetail.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weatherDetail.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
    `;

    //update night and day icon images
    const iconSrc = `img/icons/${weatherDetail.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    let timeSrc = null;                  //  ternary operator: it checks the value in single line ans assign to it..
    if(weatherDetail.IsDayTime){         //   example:
        timeSrc = 'img/day.svg';         //       ->     let timeSrc = weatherDetail.IsDayTime ? 'img/day.svg' : 'img/night.svg'; <-
    }else{                               //                     ^
        timeSrc = 'img/night.svg';       //                     |
    }                                    //  ->  7 line to 1 line code  <-
    time.setAttribute('src', timeSrc);   //

    //remove d-none
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updatecity = async (city) => {
    
    const cityDetails = await getcity(city);
    const weatherDetail = await getweather(cityDetails.Key);

    return {
        cityDetails: cityDetails,     // object shorthand notation
        weatherDetail: weatherDetail  // we can write as -> return{cityDetails, weatherDetail}; ->it will work as same...
    };
}






cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value    
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updatecity(city)
        .then(data => updateUI(data))  // this data we are taking to updateUI function
        .catch(err => console.log(err)); 

    
});