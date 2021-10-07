var loc = document.getElementById("location");
var tempicon = document.getElementById("temp-icon");
var tempvalue = document.getElementById("temp-value");
var climate = document.getElementById("climate");
var iconfile;
const searchInput = document.getElementById("search-input");
const searchButton=document.getElementById("search-button");









searchButton.addEventListener('click',(e)=>
{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';


});

const getWeather=async(city)=>
{
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city }&appid=a7b585ea8c3518d421f138dde83eccdf`,
              {mode:'cors'}
            
        );


        const weatherData = await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];


        
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);


        if(id<300 && id>200){
            tempicon.src ="./thunder.jpg"
        }
       else if(id<400 && id>300){
            tempicon.src ="./sun with cloud.jpg"
        }
        else if(id<600 && id>400){
            tempicon.src ="./rainy.jpg"
        }


    }


 catch(error)
 {
      alert('city not found');
 }

}






window.addEventListener("load",()=>{
    let long;
    let lat;
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition((position)=>
        {
            long= position.coords.longitude;
            lat= position.coords.latitude;
            const proxy ="http://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a7b585ea8c3518d421f138dde83eccdf`
          

        
            fetch(api).then((response)=>{

            return response.json();

            })

       
            .then (data =>
                {
                const{name}=data;
                const{feels_like}=data.main;
                const{id,main}= data.weather[0];


                loc.textContent= name;
                climate.textContent = main;
                tempvalue.textContent=Math.round(feels_like-273);
                
                if(id<300 && id>200){
                    tempicon.src ="./thunder.jpg"
                    
                }
               else if(id<400 && id>300){
                    tempicon.src ="./sun with cloud.jpg"
                }
                else if(id<600 && id>500){
                    tempicon.src ="./rainy.jpg"
                }
                


            })

        })
        
    }        

})