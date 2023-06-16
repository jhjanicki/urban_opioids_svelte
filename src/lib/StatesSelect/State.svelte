<script>
  import * as d3 from "d3";
  import {
    selectedState,
    stateID,
    allCountiesData,
    allStatesData,
    countiesData,
    stateData,
    allMetricData,
    stateMetricData,
    path,
    projection,
    clicked,
    selectedYear,
    statePercent,
    countyList,
    selectedCounty,
    mapWidth,
    mapHeight,
    legendDomain,
  } from "../../store/store";

  export let state;
  export let stateCode;
  export let svgPath;
  export let id;
  export let imgWidth;

  d3.selectAll("svg").attr("width", imgWidth);

  let filteredCountyData;
  let filteredStateData;
  let stateFill = "#d2d2d2";

  function getMean(arr) {
    let mean =
      arr.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / arr.length;
    return mean;
  }

  function getStandardDeviation(arr) {
    let mean = getMean(arr);
    // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k) => {
      return (k - mean) ** 2;
    });
    // Calculating the sum of updated array
    let sum = arr.reduce((acc, curr) => acc + curr, 0);
    // Returning the Standered deviation
    return Math.sqrt(sum / arr.length);
  }

  function updateState(st) {
    $selectedCounty === ""; //reset county selection when clicking on another state, not working though
    $clicked = true;
    $selectedState = st;
    $stateID = id; // this shouldn't be ID here

    filteredCountyData = $allCountiesData;
    filteredStateData = $allStatesData.features.filter(
      (d) => d.properties.name === $selectedState
    );

    $stateData = filteredStateData; // in order to zoom to bounding box
    $countiesData = filteredCountyData.filter((d) => d.stateID === $stateID);

    const OTPcounts = $countiesData.map((d) => d.properties.OTPcount);
    const mean = getMean(OTPcounts);
    const sd = getStandardDeviation(OTPcounts);
    $legendDomain = [
      d3.max([mean - 2 * sd, 0]),
      Math.ceil(mean - sd),
      Math.ceil(mean),
      Math.ceil(mean + sd),
      Math.ceil(mean + 2 * sd),
    ];

    $projection = d3
      .geoIdentity()
      .fitSize([$mapWidth, $mapHeight], $stateData[0]);
    // how to update this???
    $path = d3.geoPath().projection($projection);

    let filteredStateMetricData = $allMetricData.filter(
      (d) => d.state === $selectedState
    )[0];

    $stateMetricData = filteredStateMetricData;
    // ADD IN OTHER TOGGLE OPTIONS
    $statePercent =
      $selectedYear === "year"
        ? filteredStateMetricData.OUD_tx_12m
        : filteredStateMetricData.OUD_tx_6m;

    $countyList = $countiesData.map((county) => county.properties.name);
  }

  function handleMouseOver() {
    stateFill = "#fdbf11";
  }

  function handleMouseOut() {
    stateFill = "#d2d2d2";
  }
</script>

<div class="img-wrapper" on:click={updateState(state)}>
  <svg
    id={state}
    x="0px"
    y="0px"
    viewBox="0 0 90 90"
    width={imgWidth ? imgWidth : 200}
    fill={stateFill}
    on:mouseover={handleMouseOver}
    on:mouseout={handleMouseOut}
  >
    {#if state !== "Michigan"}
      <path d={svgPath} />
    {:else}
      {#each svgPath as path}
        <path d={path} />
      {/each}
    {/if}
  </svg>
  <p>{stateCode}</p>
</div>

<style>
  svg {
    flex: 1;
    padding: 0px 20px;
  }

  svg:not(#wisconsin) {
    border-right: 0.5px solid #fff;
  }
  .selected {
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
