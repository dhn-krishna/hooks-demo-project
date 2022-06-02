import { Country, State, City }  from 'country-state-city';
import { getStatesOfCountry } from 'country-state-city/dist/lib/state';
export const getCountries=()=>{
    return Object.values(Country.getAllCountries())
}
export const getStatesById=(id)=>{
    return Object.values(getStatesOfCountry(id))
}

const statusArray=["Approved","Submit"]
export const initStatusCheck = (status)=>{
    for(let i=0;i<statusArray.length;i++){
        if(statusArray[i]===status){
            return true
        }
    }
    return false
}

const boptions = [
    { code: "tin", description: "TIN" },
    { code: "gst", description: "GST" },
  ];
export const kybOptions=()=>{
    return boptions
}

const coptions = [
    { code: "passport", description: "Passport" },
    { code: "pan", description: "PAN" },
    { code: "nationalid", description: "National Id" },
];
export const kycOptions = () =>{
    return coptions
}
