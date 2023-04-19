import { writable } from 'svelte/store';
import * as topojson from "topojson-client";
import usData from "../assets/data/usData.json";
import data from "../assets/data/metricData.json";




const ids = [21,26,34,35,37,42,55];
let allCounties = topojson
.feature(usData, usData.objects.counties).features.filter(d=>{
    const idPrefix = +d.id.substr(0, 2);
    return ids.includes(idPrefix); // returns true or false
  });

  allCounties = allCounties.map(d => ({
    ...d,
    stateID:+d.id.substr(0, 2)
  }));


export const selectedState = writable("New Jersey");
export const stateView = writable("stateview");
export const stateID = writable(34);
export const allCountiesData = writable(allCounties);
export const allStatesData = writable(topojson
    .feature(usData, usData.objects.states));
export const countiesData = writable();
export const stateData = writable();
export const path = writable();
export const projection = writable();
export const metricData = writable(data);

// let selectedCounty = "";
// let selectedTreatment = "";
// let selectedProvider = "";
// let selectedYear = "";