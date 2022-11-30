let weather = {
    "apikey"  :"c05c4b5755eaba8ef98518e5cf84b491",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid="
            + this.apikey,
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data)
        );
    },
    displayWeather: function(data){
        const{name} = data;
        const{ icon, description }=data.weather[0];
        const{ temp, humidity }=data.main;
        const{speed}=data.wind;
        document.querySelector(".city").innerHTML="Weather in "+ name;
        document.querySelector(".temp").innerHTML= temp+"° Celcius";
        document.querySelector(".description").innerHTML= description;
        document.querySelector(".humidity").innerHTML= "Humidity " +humidity+ "%";
        document.querySelector(".wind").innerHTML= speed+" km/h";
        document.querySelector(".icon").src= "https://openweathermap.org/img/wn/"+ icon +".png";
        movieupdate(name);
    },
    search:function(){
       this.fetchWeather(document.querySelector(".search-bar").value);

    }
}
document.querySelector(".search button")
.addEventListener("click",function(){
weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup",function(event){
if(event.key == "Enter"){
    weather.search();
}
})


function movieupdate(city){
    document.getElementById("movies").innerHTML="";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '31c90c254cmsh8313a7f357894f4p18c4e9jsnf87149f29d4c',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };
    
    fetch('https://imdb8.p.rapidapi.com/auto-complete?q='+city, options)
        .then(response => response.json())
        .then(data => {
            const list = data.d;
            console.log(list);
            list.map((item) => {
                const name =item.l;
                const poster = item.i.imageUrl;
  
                const movie = `<li><img src=${poster}><h2>${name}</h2></li>`;
                document.getElementById("movies").innerHTML+=movie;
            })
            
        })
        .catch(err => console.error(err));


            fetch(
                "https://newsapi.org/v2/top-headlines?country=us&apiKey=846c300731224ebcabe7ba0ae24cdae9")
               .then((response) => response.json())
            .then((data) => {
                const list =data.articles;
                list.map((item) =>{
                    const name = item.content;
                    const description = item.description;
                    const news = `<li><h1>${name}></h1><h2>${description}</h2></li>`;
                    document.getElementById("news").innerHTML+=news;
                })
            })
            .catch(err => console.error(err));

}
