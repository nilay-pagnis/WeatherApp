const key = 'tHNpEDxgRz3VVmJqO3CS1OGYRpA1uSY3';

//get weather information
const getweather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};


//get city information
const getcity = async (city) =>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

/*getcity('indore').then( data => {
    return getweather(data.Key);
    }).then(data => {
        console.log(data);
    })
        
    .catch(err => console.log(err));*/
    
   