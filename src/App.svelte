<script>
  import Header from "./lib/Header.svelte";
  import Intro from "./lib/Intro/Intro.svelte";
  import StatesSelect from "./lib/StatesSelect/StatesSelect.svelte";
  import Main from "./lib/Main/Main.svelte";
  import * as topojson from "topojson-client";
  import usData from "./assets/data/usData.json";
  import data from "./assets/data/metricData.json";

  // global state
  const states = [
    "Kentucky",
    "Michigan",
    "New Jersey",
    "New Mexico",
    "North Carolina",
    "Pennsylvania",
    "Wisconsin",
  ];

  const stateMap = [
    {
      state: "New Jersey",
      id: 34,
    },
  ];
  let selectedState = "New Jersey";
  let stateID = stateMap.find((d) => d.state === selectedState).id;
  let stateView = "stateview";
  let countyVisited = false;
  let selectedCounty = "";
  let selectedTreatment = "";
  let selectedProvider = "";
  let selectedYear = "";

  let stateData;
  let countiesData;
  let currentData = data.filter((d) => (d.state = selectedState))[0].data;

  function prepData() {
    countiesData = topojson
      .feature(usData, usData.objects.counties)
      .features.filter((d) => +d.id.slice(0, 2) === stateID);

    stateData = topojson
      .feature(usData, usData.objects.states)
      .features.filter((d) => d.properties.name === selectedState);

    // bind properties from data to geo data
    countiesData.forEach(function (county) {
      currentData.forEach(function (countyData) {
        county.id = +county.id;
        if (county.id === countyData.fips) {
          county.properties.OTPcount = countyData.OTPcount;
        }
      });
    });
  }

  prepData();
</script>

<Header />
<div class="main">
  <Intro />
  <StatesSelect bind:selectedState />
  <Main bind:selectedState bind:stateView {countiesData} {stateData} />
</div>

<style>
</style>
