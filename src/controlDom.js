import droplet from './droplet.svg';
import cloud from './cloud-rain.svg';
import thermometer from './thermometer.svg';
import wind from './wind.svg'

export class mainInfo {
    constructor(city, description, time, temperature, iconid) {
        this.element = document.createElement('div')
        this.element.setAttribute('id', 'mainInfo')
         

        this.description(description)
        this.element.appendChild(this.description)

        this.city(city)
        this.element.appendChild(this.city)

        this.time(time);
        this.element.appendChild(this.time)
        
        this.temperature(temperature)
        this.element.appendChild(this.temperature)

        this.changeDegrees()
        this.element.appendChild(this.units)
        this.units.addEventListener('click', ()=> this.changeUnits(temperature) )

        this.makeWeatherIcon(iconid)
    }

    city(content) {
        this.city = document.createElement('p')
        this.city.textContent = content
        this.city.setAttribute('id', 'city')
    }
    
    description(content) {
        this.description = document.createElement('p')
        this.description.textContent = content
        this.description.setAttribute('id', 'description')
    }

    time(content) {
        this.time = document.createElement('p')
        this.time.textContent = content
        this.time.setAttribute('id', 'time')
    }

    temperature(content) {
        this.temperature = document.createElement('p')
        this.temperature.textContent = `${Math.floor(content)} °C`
        this.temperature.setAttribute('id','temperature')
    }

    changeDegrees() {
        this.units = document.createElement('p')
        this.units.textContent = `Toggle units`
        this.units.setAttribute('id', 'toggle-units')

        this.unit = 'metric'
    }

    async makeWeatherIcon(iconid) {
        this.icon = document.createElement('img');
        this.iconsrc = await fetch(`https://openweathermap.org/img/wn/${iconid}@2x.png`)
        this.icon.src = this.iconsrc.url
        this.element.appendChild(this.icon)
    }

    changeUnits(temperature) {
        if (this.unit === 'metric') {
            this.temperature.textContent = 
                `${this.celsiusToFarenheight(temperature)} °F`
            this.unit = 'fahrenheit'
        } else {
            this.temperature.textContent = 
                `${Math.floor(temperature)} °C`
            this.unit = 'metric'
        }
    }

    celsiusToFarenheight(celsius) {
        return Math.floor((celsius * 1.8 + 32))
    }

    farenheightToCelcius(fahrenheit) {
        return Math.floor((fahrenheit - 32) * 1.8)
    }
}


export class sideInfo {
    constructor(feelslike, humidity, windspeed) {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'sideInfo')


        this.feelsLike = new weatherDetail('Feels like:', feelslike, thermometer);
        this.humidity = new weatherDetail('Humitidy:', humidity, droplet);
        this.windspeed = new weatherDetail('Wind speed:', windspeed, wind)
    
        this.appendToElement(this.element, [
            this.feelsLike.element,
            this.humidity.element,
            this.windspeed.element
        ])
    }

    appendToElement(element, args) {
        for (let i=0; i < args.length; i++) {
            element.appendChild(args[i])
        }
    }
    
}

class weatherDetail {
    constructor(detailLabel, detailData, icon) {
        this.element = document.createElement('div')
        this.icon = new Image();
        this.icon.src = icon
        this.icon.classList = 'weatherDetailIcon'

        this.element.appendChild(this.icon)
        this.element.classList = 'weatherDetails'
        this.detailsContainer = document.createElement('div');
        this.detailsContainer.classList = 'weatherDetailsInfo'

        
        this.detailLabel = document.createElement('label');
        this.detailLabel.textContent = detailLabel
        this.detail = document.createElement('p')
        this.detail.textContent = detailData

        this.detailsContainer.appendChild(this.detailLabel)
        this.detailsContainer.appendChild(this.detail)
        this.element.appendChild(this.detailsContainer)

        
        
    }
}

