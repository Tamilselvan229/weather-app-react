import "./style.css";
import Cloud from "./assets/weather.png"
import Weather from "./assets/cloud.jpg"
import Rain from "./assets/raining.png"
import {useState,useEffect} from "react"
function Search()
{
    const [city,setCity]=useState("");
    const [temp,setTemp]=useState();
    const [hum,setHum]=useState();
    const [wind,setWind]=useState();
    const [img,setImg]=useState();
    const [current,setCurrent]=useState();
    const [search,setSearch]=useState("coimbatore");
    useEffect(function load()
    {  
      clicked();
    },[]);
    function handle(e)
    {
        setSearch(e.target.value);
    }
    function keyEvent(event)
    {
        if(event.key==="Enter")
        {
            if(event.target.value=='')
            {
                alert("Enter City Name");
            }
            else{
            clicked();
            }
        }
    }
    function clicked()
    {
        if(search==='')
        {
            alert("Enter City Name");
        }
        else
        {
        fetch(`http://api.weatherapi.com/v1/current.json?key=76ea595079234752a51131740240211&q=${search}&aqi=no`).then((response)=>response.json())
        .then((response)=>{
            setCity(response.location.name)
            setTemp(response.current.temp_c)
            setImg(response.current.condition.icon)
            setCurrent(response.current.condition.text)
            setHum(response.current.humidity)
            setWind(response.current.wind_kph)
        }
        ).catch((error)=>
        {
            alert("City Name Not Found");
            setSearch("");
        })
    }
    }
    return(
        <>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <div className="container">
            <div className="search">
            <input type="text" placeholder="Enter city name" onChange={handle} value={search} onKeyDown={keyEvent}></input>
            <i className="material-icons" onClick={clicked}>search</i>
            </div>
            <div className="main">
                <img src={img} />
                <div className="current">
                 <table>
                    <tr>
                        <th>City </th>
                        <td>{city}</td>
                    </tr>
                    <tr>
                        <th>Weather</th>
                        <td>{current}</td>
                    </tr>
                 </table>
                 </div>
           </div>
           <div className="image">
                <img src={Weather} />
                 <h5>Temparature<br/><b>{temp} ℃</b></h5>
           </div>
           <div className="image">
                <img src={Rain} />
                 <h5>Humidity<br/><b>{hum} G/KG</b></h5>
           </div>
           <div className="image">
                <img src={Cloud} />
                 <h5>Wind force<br/><b>{wind} KM/H</b></h5>
           </div>
           <footer>
             <center><p>@Mohanraj 2024</p></center>
           </footer>
        </div>
        </>
    )
}
export default Search;