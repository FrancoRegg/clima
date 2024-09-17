import React, {useEffect, useState} from "react";

export const Ubicacion = () => {
const [coords, setCoords] = useState({latitud: null, longitud: null})
const [localizacion, setLocalizacion] = useState(null)

console.log("Localizacion", localizacion);
  const options = {
    enableHighAccuracy: true, //Entrega las mejores coordenadas posibles.
    timeout: 5000, //Tiempo máximo que puede tardar para devolver las coordenadas.
    maximumAge: 0, //Guarda en caché la ultima localización por X tiempo.
  };
  
  const success = (posicion) => {
    const crd = posicion.coords;
    setCoords({latitud: crd.latitude, longitud: crd.longitude})


    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])
  
   const geoInversa = async () => {
    if(coords.latitud && coords.longitud){
    const URL = `https://us1.locationiq.com/v1/reverse?key=pk.bb957299e7910f56a63a888ddb2f7992&lat=${coords.latitud}&lon=${coords.longitud}&format=json`
    try{
      const respuesta = await fetch (URL)
      const data = await respuesta.json()
      setLocalizacion(data)
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
    {localizacion ? <h3>{localizacion.address.city}</h3> : <h3>Cargando...</h3>}
    </>
  )
}