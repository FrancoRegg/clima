import React from "react";

export const Clima = async () => {
const URL = 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=OD8EB5BG518KOgeDecq0JDwL0EgwJKb7'

try{
  const respuesta = await fetch (URL)
  const data = await respuesta.json()
  console.log("Datos de clima",data);
}catch (error){
  console.log(error);
}

return (
  <>
  <h1>Clima</h1>
  </>
)
}

