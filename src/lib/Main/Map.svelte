<script>
  import * as d3 from "d3";
  import Tooltip from "./Tooltip.svelte";
  import {
    projection,
    stateData,
    stateView,
    selectedCounty,
    selectedCountyData,
    allCountyMetricData,
    countyMetricData,
    countyPercent,
    countiesData,
    path,
    stateID,
    stateClicked,
    mapWidth,
    mapHeight,
    legendDomain,
  } from "../../store/store";
	// importing moveToFront from the utils module
	import { moveToFront } from "../utils";

  let width = 100;
  let height = 100;
  let legendHeight = 20;
  let legendPadding = 30;

  $stateID = 34;

  // const colorScale = d3.scaleSequential(d3.interpolatePuBuGn).domain([0, 5]);
  const colors = [
    "#f6eff7",
    "#d0d1e6",
    "#a6bddb",
    "#67a9cf",
    "#1c9099",
    "#016c59",
  ];
  const colorScale = d3.scaleOrdinal().domain($legendDomain).range(colors);

  //rotate state due to projection distortions
  const rotateScale = d3
    .scaleOrdinal()
    .domain([42, 35, 21, 26, 37, 55, 34])
    .range([11, -5, 5, 5, 10, 3, 0]); //"PE", "NM", "KY", "MI", "NC", "WI", "NJ"

  let hoveredData;
  let hoveredPointer;

  $: $mapWidth = width;
  $: $mapHeight = height - legendHeight - legendPadding;

  $: $projection = d3
    .geoIdentity()
    .fitSize([$mapWidth, $mapHeight], $stateData[0]);

  $: $path = d3.geoPath().projection($projection); //to make projection & path responsive add $:

</script>

<div class="map-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
  {#if hoveredData}
    <Tooltip {hoveredData} {hoveredPointer} />
  {/if}

  {#if $stateClicked}
    <svg {width} {height}>
      <g id="counties" transform={`rotate(${rotateScale($stateID)})`}>
        {#each $countiesData as feature, i}
          <path
            class="counties"
            id={feature.properties.name.replaceAll(" ", "")}
            d={$path(feature)}
            fill={feature.id.toString().slice(0, 2) === "34"
              ? colorScale(feature.properties.OTPcount)
              : "black"}
            stroke={feature.properties.name === $selectedCounty
              ? "black"
              : "white"}
            stroke-width="1px"
            opacity={feature.stateID === $stateID ? 1 : 0}
            on:mouseout={() => {
              hoveredData = null;
            }}
            on:mousemove={(e) => {
              hoveredData = feature;
              hoveredPointer = d3.pointer(e);
            }}
            on:click={(e) => {
              $selectedCounty = feature.properties.name;
              $selectedCountyData = $countiesData.filter(
                (d) => d.properties.name === $selectedCounty
              );
              $countyPercent = $selectedCountyData[0].properties.OUD_tx_12m; //for now 12, but will need to update based on the toggles
              $stateView = "countyview";

              $countyMetricData = $allCountyMetricData.filter(
                (d) => d.county === $selectedCounty
              );
              $countiesData = moveToFront(feature, $countiesData);
            }}
          />
        {/each}
      </g>
      <g
        id="legend"
        transform={`translate(${legendPadding},${height - legendHeight})`}
        {width}
        height={legendHeight}
      >
        <defs>
          <linearGradient id="legendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {#each colors as color, i}
              <stop
                offset={`${(i * 100) / colors.length}%`}
                stop-color={color}
              />
            {/each}
          </linearGradient>
        </defs>
        <rect
          width={width - legendPadding * 2}
          height={legendHeight}
          fill={`url("#legendGradient")`}
        />
      </g>
    </svg>
  {/if}
</div>

<style>
  .map-wrapper {
    width: 100%;
    height: 400px;
  }

  .counties:hover {
    cursor: pointer;
  }
</style>
