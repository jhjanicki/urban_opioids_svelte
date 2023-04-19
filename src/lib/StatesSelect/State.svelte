<script>
  import * as d3 from "d3";
  import {
    selectedState,
    stateID,
    allCountiesData,
    allStatesData,
    countiesData,
    stateData,
    metricData,
    path,
    projection,
  } from "../../store/store";

  export let state;
  export let stateCode;
  export let svgPath;
  export let id;
  export let imgWidth;

  d3.selectAll("svg").attr("width", imgWidth);

  let currentData;
  let filteredCountyData;
  let filteredStateData;

  updateState("New Jersey");
  // $selectedState = "New Jersey";
  // $stateID = 34;

  function updateState(st) {
    $selectedState = st;
    $stateID = id; // this shouldn't be ID here

    currentData = $metricData.filter((d) => d.state === "New Jersey")[0].data; // replace with $selectedState

    filteredCountyData = $allCountiesData;
    // .filter((d) => {
    //   d.stateID === $stateID;
    // });

    filteredStateData = $allStatesData.features.filter(
      (d) => d.properties.name === $selectedState
    );

    $stateData = filteredStateData;

    filteredCountyData.forEach(function (county) {
      currentData.forEach(function (countyData) {
        county.id = +county.id;
        if (county.stateID === $stateID && county.id === countyData.fips) {
          county.properties.OTPcount = countyData.OTPcount;
        }
      });
    });

    $countiesData = filteredCountyData;

    console.log($stateID);

    $projection = d3.geoIdentity().fitSize([500, 400], $stateData[0]);
    // how to update this???
    $path = d3.geoPath().projection($projection);
  }
</script>

<div class="img-wrapper">
  <svg
    id={state}
    x="0px"
    y="0px"
    viewBox="0 0 90 90"
    width={imgWidth}
    on:click={updateState(state)}
  >
    <path d={svgPath} />
  </svg>
  <p id="{state}-p">{stateCode}</p>
</div>

<style>
  svg {
    flex: 1;
    padding: 0px 20px;
    fill: #d2d2d2;
  }

  svg:not(#wisconsin) {
    border-right: 0.5px solid #fff;
  }
  .svg-selected {
    fill: #fdbf11;
  }

  .p-selected {
    color: #fdbf11;
  }

  p {
    text-align: center;
    color: #d9d9d9;
  }

  .img-wrapper {
    position: relative;
  }

  .img-wrapper:hover {
    cursor: pointer;
  }

  .img-wrapper:hover:after {
    content: "";
    display: block;
    border: 20px solid #fff;
    border-top-color: #353535;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    top: calc(100% + 30px);
  }
</style>
