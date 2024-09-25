import React, { useEffect, useState } from "react";

export const Ubicacion = () => {
  const [coords, setCoords] = useState({})
  const [datos, setDatos] = useState(null)
  const [localizacion, setLocalizacion] = useState(null)

  const options = {
    enableHighAccuracy: true, //Entrega las mejores coordenadas posibles.
    timeout: 5000, //Tiempo máximo que puede tardar para devolver las coordenadas.
    maximumAge: 0, //Guarda en caché la ultima localización por X tiempo.
  };

  const success = (posicion) => {
    const crd = posicion.coords;
    setCoords({ latitud: crd.latitude, longitud: crd.longitude }) //Almacena en un estado la latitud y longitud
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  //Se ejecuta cuando el componente se monta
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])

  //Obtengo geolocalizacion inversa
  const geoInversa = async () => {
    if (coords.latitud && coords.longitud) { //Verifico que las coordenadas tengan valores validos
      const ubiAPI = `https://us1.locationiq.com/v1/reverse?key=pk.bb957299e7910f56a63a888ddb2f7992&lat=${coords.latitud}&lon=${coords.longitud}&format=json`
      try {
        const respuesta = await fetch(ubiAPI)
        const data = await respuesta.json()
        setLocalizacion(data)
      } catch (error) {
        console.log("La localizacion no existe", error);
      }
    }
  }
  //Obtengo todo tipos de datos desde weatherAPI
  const datosClima = async () => {
    if (coords.latitud && coords.longitud) { //Verifico que las coordenadas tengan valores validos
    const datosApi = `https://api.weatherapi.com/v1/forecast.json?key=a6e61a741ad94b46a0d173802242009&q=${coords.latitud},${coords.longitud}&days=11&aqi=yes&alerts=yes&lang=es`
      try {
        const respuesta = await fetch(datosApi)
        const data = await respuesta.json()
        setDatos(data)
        console.log("Datos", data);

      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("Coordenadas no disponibles");
    }
  }
  //Se ejecuta cada vez que las coordenadas cambian
  useEffect(() => {
    if (coords.latitud && coords.longitud) {
      geoInversa()
      datosClima()
    }
  }, [coords])

  return (
    <>
      <h1>Mi ubicación</h1>
      {localizacion ? localizacion.address.city : <p>Cargando...</p>}
      {datos ? (
      <div className="temperatura">
        <img className="temperatura_img" src={datos.current.condition.icon} alt="foto" />
        <p className="temperatura_actual">{datos.current.temp_c}</p>
      </div>
      ) : <p>--</p>}
      <div className="previsiones">
        <section className="previsionHora"></section>
        <section className="presionSemana"></section>
      </div>
      <div className="infoAdicional">
        
      </div>
    </>
  )
}