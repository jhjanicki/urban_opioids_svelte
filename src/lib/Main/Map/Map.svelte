<script>
  import * as d3 from "d3";
  import Tooltip from "./Tooltip.svelte";
  import {
    projection,
    stateData,
    stateView,
    countySelected,
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
  import { moveToFront } from "../../utils";
  import { logClickToGA } from "../../analytics.js";

  let width = 100;
  let height = 100;
  let legendHeight = 20;
  let legendPadding = 30;

  let innerWidth = 0;

  $stateID = 34;

  const colors = [
    "#cfe8f3",
    "#73bfe2",
    "#1696d2",
    "#12719e",
    "#0a4c6a",
    "#062635",
  ]; //   "#a2d4ec", "#46abdb",
  const colorScale = d3
    .scaleLinear()
    .domain([0, 20, 40, 60, 80, 100])
    .range(colors);

  let hoveredData;
  let hoveredPointer;
  let hoveredID;

  $: $mapWidth = width;
  $: $mapHeight = height - legendHeight - legendPadding;

  $: $projection = d3
    .geoIdentity()
    .reflectY(true)
    .fitSize([$mapWidth, $mapHeight], $stateData[0]);

  $: $path = d3.geoPath().projection($projection); //to make projection & path responsive add $:
</script>

<svelte:window bind:innerWidth />

<div class="map-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
  {#if hoveredData}
    <Tooltip {hoveredData} {hoveredPointer} />
  {/if}

  {#if $stateClicked}
    <svg
      {width}
      height={height + legendHeight}
      class:print={$print}
      role="img"
      aria-label="State map broken out by county showing where people with opioid use disorder are receiving treatment."
    >
      <g id="counties">
        {#each $countiesData as feature}
          <path
            class="counties"
            id={feature.properties.name.replaceAll(" ", "")}
            d={$path(feature)}
            fill={colorScale(
              $selectedYear == 12
                ? feature.properties.OUD_tx_12m
                : feature.properties.OUD_tx_6m,
            )}
            stroke-linecap="round"
            stroke={(hoveredData != null &&
              feature.properties.name === hoveredID) ||
            feature.properties.name === $selectedCounty
              ? "black"
              : "white"}
            stroke-width={(hoveredData != null &&
              feature.properties.name === hoveredID) ||
            feature.properties.name === $selectedCounty
              ? "2.5px"
              : "1px"}
            on:mouseout={(e) => {
              if (e.toElement.id === "") {
                if (hoveredID != $selectedCounty) {
                  hoveredData = null;
                }
              }
            }}
            on:mouseover={(e) => {
              // prevent hover on print layout
              if (!$print) {
                hoveredData = feature;
                hoveredID = feature.properties.name;
                hoveredPointer = d3.pointer(e);
                $countiesData = moveToFront(feature, $countiesData);
              }
            }}
            on:click={(e) => {
              logClickToGA(e.target, "map-county-click");
              $countySelected = true;
              $selectedCounty = feature.properties.name;
              $selectedCountyData = $countiesData.filter(
                (d) => d.properties.name === $selectedCounty,
              );
              $countyPercent =
                $selectedYear == 12
                  ? $selectedCountyData[0].properties.OUD_tx_12m
                  : $selectedCountyData[0].properties.OUD_tx_6m;
              $stateView = "countyview";

              $countyMetricData = $allCountyMetricData.filter(
                (d) => d.county === $selectedCounty,
              );
              $countiesData = moveToFront(feature, $countiesData);
            }}
          />
        {/each}
      </g>
      <g
        id="legend"
        transform={`translate(${legendPadding},${height - 10})`}
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
    pointer-events: none;
  }
  .map-wrapper {
    width: 100%;
    height: 400px;
  }

  .counties:hover {
    cursor: pointer;
  }
</style>
