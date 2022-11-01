import {getURLFromName} from './api.js';
import {setLocation} from './api.js'

const createHeader = () => {
    const test = new Promise((resolve, reject) => {
        const div = document.createElement('div');
        div.classList.add('header');
        // Create a textbox to type in a city name
        resolve(div);
    });
    return test;
}

const createMain = () => {
    const test = new Promise((resolve, reject) => {
        const div = document.createElement('div');
        div.classList.add('main');
        // Create layout for main display
        resolve(div);
    });
    return test;
}

const createFooter = () => {
        
    const test = new Promise((resolve, reject) => {
        const div = document.createElement('div');
        div.classList.add('footer');
        // Create the typical footer information
        resolve(div);
    });
    return test;
}

export const initialPageLoad = async () => {
    console.log(`let's get started`)
    const contentMain = document.getElementById('content');

    await Promise.all([createHeader(), createMain(), createFooter()]).then((values) => {
        console.log(values);
        values.forEach(element => {
            contentMain.appendChild(element);
        });
    });
    
    const initialLocation = getURLFromName('Cincinnati');

    setLocation(initialLocation);
}