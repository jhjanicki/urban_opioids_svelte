<script>
  import * as d3 from "d3";
  import Tooltip from "./Tooltip.svelte";
  import {
    projection,
    stateData,
    stateView,
    selectedYear,
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
    print,
  } from "../../../store/store";
  // importing moveToFront from the utils module
  import { moveToFront } from "../../utils";

  let width = 100;
  let height = 100;
  let legendHeight = 20;
  let legendPadding = 30;

  let innerWidth = 0;

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
  const colorScale = d3
    .scaleLinear()
    .domain([0, 20, 40, 60, 80, 100])
    .range(colors);

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

<svelte:window bind:innerWidth />

<div class="map-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
  {#if hoveredData}
    <Tooltip {hoveredData} {hoveredPointer} />
  {/if}

  {#if $stateClicked}
    <svg {width} height={height + 10} class:print={$print}>
      <g id="counties" transform={`rotate(${rotateScale($stateID)})`}>
        {#each $countiesData as feature}
          <path
            class="counties"
            id={feature.properties.name.replaceAll(" ", "")}
            d={$path(feature)}
            fill={feature.id.toString().slice(0, 2) === "34"
              ? colorScale(
                  $selectedYear == 12
                    ? feature.properties.OUD_tx_12m
                    : feature.properties.OUD_tx_6m
                )
              : "black"}
            stroke-linecap="round"
            stroke={feature.properties.name === $selectedCounty
              ? "black"
              : "white"}
            stroke-width={feature.properties.name === $selectedCounty
              ? "2.5px"
              : "1px"}
            opacity={feature.stateID === $stateID ? 1 : 0}
            on:mouseout={() => {
              hoveredData = null;
            }}
            on:mousemove={(e) => {
              // prevent hover on print layout
              if (!$print) {
                hoveredData = feature;
                hoveredPointer = d3.pointer(e);
              }
            }}
            on:click={(e) => {
              $selectedCounty = feature.properties.name;
              $selectedCountyData = $countiesData.filter(
                (d) => d.properties.name === $selectedCounty
              );
              $countyPercent =
                $selectedYear == 12
                  ? $selectedCountyData[0].properties.OUD_tx_12m
                  : $selectedCountyData[0].properties.OUD_tx_6m; //for now 12, but will need to update based on the toggles
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
        height={legendHeight + 10}
      >
        <text font-size={innerWidth <= 1040 ? 14 : 16}
          >{innerWidth <= 1040
            ? "% people with OUD receiving treatment"
            : "Share of people with opioid use disorder receiving treatment"}</text
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
          transform={`translate(0,10)`}
        />
      </g>
    </svg>
  {/if}
</div>

<style>
  .print .counties:hover {
    cursor: inherit;
  }
  .map-wrapper {
    width: 100%;
    height: 400px;
  }

  .counties:hover {
    cursor: pointer;
  }

  .none {
    display: none;
  }
</style>
