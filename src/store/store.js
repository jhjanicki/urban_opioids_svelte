import { writable } from 'svelte/store';
import * as topojson from "topojson-client";
import usData from "../assets/data/usData.json";
import data from "../assets/data/metricData.json";


// FILTER FOR RELEVANT STATES
const ids = [21,26,34,35,37,42,55];
let allCounties = topojson
.feature(usData, usData.objects.counties).features.filter(d=>{
    const idPrefix = +d.id.substr(0, 2);
    return ids.includes(idPrefix); // returns true or false
  })
  .map(d => ({
    ...d,
    stateID:+d.id.substr(0, 2)
  }));

// BIND DATA HERE
data.forEach(function(state){
  allCounties.forEach(function (county) {
    state.data.forEach(function (countyData) {
      county.id = +county.id;
      if (
        county.stateID === state.id &&
        county.id === countyData.countyfips
      ) {
        county.properties.OTPcount = countyData.OTPcount;
        county.properties.OUD_tx_12m = countyData.OUD_tx_12m;
        county.properties.OUD_tx_6m = countyData.OUD_tx_6m;
      }
    });
  });
})

// PREP STATE LEVEL DATA HERE
// find all where countiesftp = ""
let stateMetricData = []

data.forEach(state=>{
  state.data.forEach(row=>{
    if(row.countyfips===""){
      stateMetricData.push(row);
    }
  })
})




export const clicked = writable(false); //false on load, true after clicked on a state
export const selectedState = writable(""); //updated in State
export const selectedCounty = writable(""); //updated in Dropdown
export const stateView = writable("stateview");
export const stateID = writable();
export const allCountiesData = writable(allCounties);
export const allStatesData = writable(topojson
    .feature(usData, usData.objects.states));
export const countiesData = writable(); // counties data for one state, used in Map and also Dropdown
export const stateData = writable();  // used in Map, for bounding box
export const path = writable();
export const projection = writable(); //used in Map
export const stateLevelData = writable(stateMetricData);
export const statePercent = writable(50); //updated in State
export const countyPercent = writable(30); //updated in Dropdown
export const selectedYear = writable("year");
export const countyList = writable(); //for dropdown

