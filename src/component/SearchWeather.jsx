import React, {useState, useEffect} from 'react'
//import { useEffect } from 'react/cjs/react.production.min'

export default function SearchWeather() {
    
    const [search,setSearch]= useState("london")
    const [data,setData]= useState([])
    const [input,setInput]= useState("")
    let componentMounted= true

    //console.log(data)
    
    useEffect(() =>{
        const fetchWeather = async () =>{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ec81dbcadf9e1c889a2073a3ed8ffd32`).catch((error) => {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            })    
            if(componentMounted){
                //console.log(data)
                setData(await response.json())
                //console.log(data)
            }
            return () =>{
                componentMounted = false
            }
        }
        fetchWeather()

    }, [search]);


     console.log(data.message)
    
     
  

    //console.log(data.main)
    if(data.main){



            let temp= (data.main.temp - 273.15).toFixed(2)
            console.log(temp)

            let min= (data.main.temp_min - 273.15).toFixed(2)
            let max =(data.main.temp_max - 273.15).toFixed(2)
            let cloud= data.weather[0].main
            let desc = data.weather[0].description

            


            let emoji= null

            if(typeof data.main !="undefined"){
                if(data.weather[0].main ==="Clouds"){
                    emoji= "fa-cloud"
                }else if(data.weather[0].main ==="Thunderstorm"){
                    emoji = "fa-bolt"
                }else if(data.weather[0].main ==="Drizzle"){
                    emoji = "fa-cloud-rain"
                }else if(data.weather[0].main ==="Rain"){
                    emoji = "fa-cloud-shower-heavy"
                }else if(data.weather[0].main ==="Snow"){
                    emoji="fa-snow-flake"
                }else {
                    emoji= "fa-smog"
                }
            }else{
                return (
                    <div>..... Loading.....</div>
                )
            }


            ///Date
            let d= new Date()
            let date = d.getDate()
            let day = d.toLocaleString("default", {weekday: 'long'})
            let month= d.toLocaleString("default", {month: 'long'})
            console.log(month)
            let year= d.getFullYear()
            
            ///Time
            let time= d.toLocaleString([],{
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })

            console.log(time)

            const handleSubmit = (event) =>{
                event.preventDefault()
                setSearch(input)
            }
        
            return (
                <div>
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div class="card bg-dark text-white text-center border-0">
                                    <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} class="card-img" alt="..."/>
                                    <div class="card-img-overlay">
                                        <form onSubmit={handleSubmit}>
                                            <div class="input-group mb-4 w-75 mx-auto">
                                                <input type="text" class="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="basic-addon2" name="search" 
                                                value={input}
                                                onChange={(e) =>setInput(e.target.value)}
                                                required
                                                />
                                                <div class="input-group-append">
                                                    <button type="submit" class="input-group-text" id="basic-addon2">
                                                        <i className="fas fa-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="bg-dark bg-opacity-50 py-3">
                                        <h2 class="card-title">{data.name}</h2>
                                        <p class="card-text lead">
                                            {day}, {month} {date}, {year}
                                            <br />
                                            {time}
                                        </p>
                                        <hr />
                                        <i className={`fas ${emoji} fa-4x`}></i>
                                        <p className='fw-bolder mb-5'>{temp}&deg;C</p>
                                        <p class="lead fw-bolder mb-0">{cloud}</p>
                                        <p class="lead fw-bolder mb-0">{desc}</p>
                                        <p className="lead">{min} &deg;C | {max} &deg;C</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
    
        
}
