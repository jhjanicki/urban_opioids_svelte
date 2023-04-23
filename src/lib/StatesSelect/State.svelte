<script>
  import * as d3 from "d3";
  import {
    selectedState,
    stateID,
    allCountiesData,
    allStatesData,
    countiesData,
    stateData,
    stateLevelData,
    path,
    projection,
    clicked,
    selectedYear,
    statePercent,
  } from "../../store/store";

  export let state;
  export let stateCode;
  export let svgPath;
  export let id;
  export let imgWidth;

  d3.selectAll("svg").attr("width", imgWidth);

  let filteredCountyData;
  let filteredStateData;

  function updateState(st) {
    $clicked = true;
    $selectedState = st;
    $stateID = id; // this shouldn't be ID here

    filteredCountyData = $allCountiesData;
    filteredStateData = $allStatesData.features.filter(
      (d) => d.properties.name === $selectedState
    );

    $stateData = filteredStateData; // in order to zoom to bounding box
    $countiesData = filteredCountyData;

    $projection = d3.geoIdentity().fitSize([500, 400], $stateData[0]);
    // how to update this???
    $path = d3.geoPath().projection($projection);

    let filteredStateMetricData = $stateLevelData.filter(
      (d) => d.state === $selectedState
    )[0];

    $statePercent =
      $selectedYear === "year"
        ? filteredStateMetricData.OUD_tx_12m
        : filteredStateMetricData.OUD_tx_6m;

    console.log(filteredStateMetricData);
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
