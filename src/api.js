export const getURLFromName = (name) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=b1a4a4fe775fa1a1884c46ef49452ef6`
}

export const setLocation = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
        return 'undefined';
    }
}