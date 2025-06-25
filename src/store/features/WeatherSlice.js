import { createSlice } from "@reduxjs/toolkit"


const initialState={
    clouds:undefined,
    main:undefined,
    sys:undefined,
    weather:undefined,
    name:undefined,
    isloaded:false,
    wind:undefined,
}
export const WeatherSlice=createSlice({
    name:'weather',
    initialState,
    reducers:{
        setData:(state,action)=> {
             const {clouds,main,sys,weather,wind,name}=action.payload
            state.clouds = clouds
            state.main = main
            state.sys = sys
            state.weather = weather
            state.name = name
            state.wind = wind
            state.isloaded=true
        },
        setIsLoaded:(state)=>{
            state.isloaded=false
        }
    }
})
export const {setData,setIsLoaded}=WeatherSlice.actions
export default WeatherSlice.reducer