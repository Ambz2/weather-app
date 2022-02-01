export async function search(city = 'London', units = 'metric') {
    try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=a824f5a0abcab3b4759d19626fe7ba20`
            )
        let localeData = await response.json()
        return localeData
    } catch(err) {
        console.log(err)
    }
}

