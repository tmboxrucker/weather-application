import {getURLFromName} from './api.js';
import {setLocation} from './api.js'

const createHeader = () => {
    const test = new Promise((resolve, reject) => {
        const div = document.createElement('div');
        const form = document.createElement('form');
        const inputText = document.createElement('input');
        const inputButton = document.createElement('button');

        div.classList.add('header');
        form.classList.add('searchForm');
        inputText.classList.add('searchCity');
        inputButton.classList.add('searchCityButton');

        form.setAttribute('id','searchForm')

        inputText.setAttribute('id','searchCity')
        inputText.setAttribute('type','text');
        inputText.setAttribute('placeholder','Search Location...');

        inputButton.setAttribute('type','submit');
        inputButton.innerHTML = 'Submit'

        inputButton.addEventListener('click',async (e) => {
            e.preventDefault();
            const citySelect = document.getElementById('searchCity');
            const formSelect = document.getElementById('searchForm');
            function setName(name) {
                if (name) {
                    return name.replace(/(\s+$|^\s+)/g, '') //remove whitespace from beginning and end of string
                        .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
                        .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
                        .replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
                }
                return '';
            }
            let passedCity = setName(citySelect.value);
            const urlName = getURLFromName(passedCity);
            const info = await setLocation(urlName);
            if ((typeof info) == 'string') {
                passedCity = '';
                displaySearchError();
            }
            if (passedCity != '') {
                window.localStorage.setItem('cityNameLocalSave',passedCity);
                displayMain(info);
            }
            formSelect.reset();
        });

        form.appendChild(inputText);
        form.appendChild(inputButton);

        div.appendChild(form);
        
        resolve(div);
    });
    return test;
}

const createMain = async (info) => {
    const test = new Promise((resolve, reject) => {
        const div = document.createElement('div');
        const upperDiv = document.createElement('div');
        const lowerDiv = document.createElement('div')
        const weatherType = document.createElement('p');
        const cityName = document.createElement('h1');
        const tempContainer = document.createElement('div');
        const temp = document.createElement('h2');
        const typeOfTemp = document.createElement('p');
        const informationContainer = document.createElement('div');
        const feelsLike = document.createElement('p');
        const humidity = document.createElement('p');
        const wind = document.createElement('p');
        
        div.classList.add('main');
        upperDiv.setAttribute('id','upperDiv');
        lowerDiv.setAttribute('id','lowerDiv');
        weatherType.setAttribute('id','weatherType');
        cityName.setAttribute('id','cityName');
        tempContainer.setAttribute('id','tempContainer')
        temp.setAttribute('id','temp');
        typeOfTemp.setAttribute('id','typeOfTemp');
        informationContainer.setAttribute('id','informationContainer');
        feelsLike.setAttribute('id','feelsLike');
        humidity.setAttribute('id','humidity');
        wind.setAttribute('id','wind');

        upperDiv.appendChild(weatherType);
        upperDiv.appendChild(cityName);
        div.appendChild(upperDiv);
        tempContainer.appendChild(temp);
        tempContainer.appendChild(typeOfTemp);
        informationContainer.appendChild(feelsLike);
        informationContainer.appendChild(humidity);
        informationContainer.appendChild(wind);
        lowerDiv.appendChild(tempContainer);
        lowerDiv.appendChild(informationContainer);
        div.appendChild(lowerDiv);

        resolve(div);
        
    });
    return await test;
}

const createFooter = () => {
        
    const test = new Promise((resolve, reject) => {
        const div = document.createElement('div');
        const footerNote = document.createElement('p');
        div.classList.add('footer');
        footerNote.classList.add('footerNote');

        footerNote.innerText = 'Page made by Troy Boxrucker 2022';  
        
        div.appendChild(footerNote);
        resolve(div);
    });
    return test;
}

const displayMain = (info) => {
    const weatherType = document.getElementById('weatherType');
    const cityName = document.getElementById('cityName');
    const temp = document.getElementById('temp');
    const typeOfTemp = document.getElementById('typeOfTemp');
    const feelsLike = document.getElementById('feelsLike');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');


    let weatherTypeInfo = info.weather[0].description;
    let cityNameInfo = info.name;
    let tempInfo = info.main.temp;
    let typeOfTempInfo = '\u00B0F';
    let feelsLikeInfo = info.main.feels_like;
    let humidityInfo = `${info.main.humidity}%`;
    let windInfo = info.wind.speed;

    const getTitleCase = (string) => {
        const titleCase = string
            .toLowerCase()
            .split(' ')
            .map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');

            return titleCase;
    };

    weatherTypeInfo = getTitleCase(weatherTypeInfo);
    tempInfo = Math.round(((tempInfo-273.15)*(9/5)+32)*10)/10;
    feelsLikeInfo = Math.round(((feelsLikeInfo-273.15)*(9/5)+32)*10)/10;
    feelsLikeInfo = `${feelsLikeInfo}\u00B0F`
    windInfo = Math.round((windInfo*2.237)*10)/10;
    windInfo = `${windInfo} mph`

    weatherType.innerHTML = weatherTypeInfo;
    cityName.innerHTML = cityNameInfo;
    temp.innerHTML = tempInfo;
    typeOfTemp.innerHTML = typeOfTempInfo;
    feelsLike.innerHTML = feelsLikeInfo;
    humidity.innerHTML = humidityInfo;
    wind.innerHTML = windInfo;
}

const displaySearchError = () => {
    console.log('this is where I add the error under the search bar')
}
export const initialPageLoad = async () => {
    const contentMain = document.getElementById('content');
    const localCityName = localStorage.getItem('cityNameLocalSave');
    let initialLocation;

    if (localCityName) {
        initialLocation = await getURLFromName(localCityName);
    }
    else {
        initialLocation = await getURLFromName('Cincinnati');
    }

    const info = await setLocation(initialLocation);

    await Promise.all([createHeader(), createMain(info), createFooter()]).then((values) => {
        values.forEach(element => {
            contentMain.appendChild(element);
        });
    });

    displayMain(info);
}