import React, {useEffect, useState} from "react";

export const Ubicacion = () => {
const [coords, setCoords] = useState({latitud: null, longitud: null})
const [localizacion, setLocalizacion] = useState(null)

  const options = {
    enableHighAccuracy: true, //Entrega las mejores coordenadas posibles.
    timeout: 5000, //Tiempo máximo que puede tardar para devolver las coordenadas.
    maximumAge: 0, //Guarda en caché la ultima localización por X tiempo.
  };
  
  const success = (posicion) => {
    const crd = posicion.coords;
    setCoords({latitud: crd.latitude, longitud: crd.longitude}) //Almacena en un estado la latitud y longitud
  }
  
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])
  
   const geoInversa = async () => { //Genero un geocodificacion inversa 
    if(coords.latitud && coords.longitud){
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=a6e61a741ad94b46a0d173802242009 &q=${coords.latitud},${coords.longitud}&days=7&aqi=yes&alerts=yes`
    try{
      const respuesta = await fetch (URL)
      const data = await respuesta.json()
      setLocalizacion(data)
      console.log("Datos", data);
      
    }catch (error){
      console.log(error);
    }
    }else{
      console.error("Coordenadas no disponibles");
    }
  }

  useEffect(()=>{ 
    if(coords.latitud && coords.longitud){
      geoInversa()
    }
  }, [coords])
  
  return (
    <>
    <h1>Mi ubicación</h1>
    
    </>
  )
}