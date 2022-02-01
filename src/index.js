import './index.css';
import * as controlDom from './controlDom.js'
import * as search from './search.js'
import {secondsToHours, format, add} from 'date-fns'


async function createDisplay(city, units) {
    try {
        let data = await search.search(city, units)
        let time = convertToReadableTime(data.timezone)
        let description = titleCase(data.weather[0].description)
        let mainInfo = new controlDom.mainInfo(
            data.name, 
            description,
            time,
            data.main.temp,
            data.weather[0].icon
        )
        let main = document.querySelector('main')
        if (main.firstChild) {
            main.firstChild.remove()
        }
        main.appendChild(mainInfo.element)

        let sideInfo = new controlDom.sideInfo(
            data.main.feels_like,
            data.main.humidity,
            data.wind.speed
        )

        let aside = document.querySelector('aside')
        if (aside.firstChild) {
            aside.firstChild.remove()
        }
        aside.appendChild(sideInfo.element)
    } catch(err) {
        console.log(err)
    }
}



function convertToReadableTime(timezone) {
    let timeDifference = {hours:secondsToHours(timezone)};
    return format(add(new Date(), timeDifference), 'PPpp');
}

createDisplay()

function titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1) 
    }
    return splitStr.join(' ');
}

let searchform = document.querySelector('#search-form')
let searchbar = document.querySelector('#searchbar')
searchform.addEventListener(
    'submit', (event) => {
        event.preventDefault();
        createDisplay(searchbar.value);
    } 
)

