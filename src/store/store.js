import { writable } from 'svelte/store';
import * as topojson from "topojson-client";
import usData from "../assets/data/usData.json";
import data from "../assets/data/metricData.json";


const processCountyData = (state, county) => {
  county.id = +county.id;
  state.data.forEach(function (countyData) {
    if (county.stateID === state.id && county.id === countyData.countyfips) {
      county.properties.OTPcount = countyData.OTPcount;
      county.properties.OUD_tx_12m = countyData.OUD_tx_12m;
      county.properties.OUD_tx_6m = countyData.OUD_tx_6m;
    }
  });
}

// filter for only the relevant states
const ids = [26,34];

// // get all geojson data for counties
let allCounties = topojson
.feature(usData, usData.objects.counties).features.filter(d => ids.includes(+d.id.substr(0, 2)))
  .map(d => ({
    ...d,
    stateID:+d.id.substr(0, 2)
  }));

// get all geojson data for states
let allStates = topojson.feature(usData, usData.objects.states)

// for the map, bind metric data to counties geojson data, for map only, the rest of county metric data don't need to be bound to spatial data
data.forEach(state => {
  allCounties.forEach(county => processCountyData(state, county));
});


// Prepare state-level data
// find all where countiesftp = ""
const allMetrics = data.reduce((all, state) => all.concat(
  state.data.filter(row => row.countyfips === "")
), []);


// get county data: get the obj in the array that corresponds to the state
let allCountyMetrics = []

data.forEach(state=>{
  state.data.forEach(row=>{
      allCountyMetrics.push(row);
  })
})

export const stateClicked = writable(false); //false on load, true after clicked on a state
export const submitted = writable(false); //when the toggle button values are submitted

export const selectedState = writable(""); //updated in State
export const selectedCounty = writable(""); //updated in Dropdown
export const selectedYear = writable(12); //treatment length, 12 vs 6
export const selectedTreatment = writable(""); // close gap vs double
export const selectedProvider = writable(""); // new vs increase capacity

export const stateView = writable("stateview");
export const stateID = writable();
export const countySelected = writable(false); //when first switch to countyview tab the default is no county is selected so need to keep track

export const path = writable(); // need to make reactive
export const projection = writable(); //used in Map

export const allCountiesData = writable(allCounties);
export const allStatesData = writable(allStates);
export const countiesData = writable(); // counties data for one state, used in Map and also Dropdown
export const selectedCountyData = writable(); // selected couonty data, used in Map and also Dropdown
export const stateData = writable();  // used in Map, for bounding box

export const allMetricData = writable(allMetrics); // all metric data on state level, now only NJ but later will include all
export const stateMetricData = writable();  //filter allMetricData to only the selected state
export const allCountyMetricData = writable(allCountyMetrics); // all metric data on county level
export const countyMetricData = writable(allCountyMetrics); //filter allMetricData to only the selected county

export const statePercent = writable(0); //updated in State
export const countyPercent = writable(0); //updated in Dropdown

export const countyList = writable(); // list of counties for selectef state for dropdown
export const mapWidth = writable();
export const mapHeight = writable();
export const legendDomain = writable([]); //to store the legend breaks


// print store!
// here we can track whether or not to show print-friendly versions of everything
export const print = writable(false);

