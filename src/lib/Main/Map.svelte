<script>
  import * as d3 from "d3";
  import Tooltip from "./Tooltip.svelte";
  import {
    countiesData,
    path,
    stateID,
    clicked,
    mapWidth,
    mapHeight,
  } from "../../store/store";

  let width;
  let height;
  let legendHeight = 20;
  let legendPadding = 20;

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
  const colorScale = d3.scaleOrdinal().domain([0, 1, 2, 3, 4, 5]).range(colors);

  //rotate state due to projection distortions
  const rotateScale = d3
    .scaleOrdinal()
    .domain([42, 35, 21, 26, 37, 55, 34])
    .range([10, -5, 5, 5, 10, 2, 0]); //"PE", "NM", "KY", "MI", "NC", "WI", "NJ"

  function calculateBreaks() {}

  let hoveredData;
  let hoveredPointer;

  $: $mapWidth = width;
  $: $mapHeight = height - legendHeight - legendPadding;
</script>

<div class="map-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
  {#if hoveredData}
    <Tooltip {hoveredData} {hoveredPointer} />
  {/if}
  <svg {width} {height}>
    <g id="counties" transform={`rotate(${rotateScale($stateID)})`}>
      {#if $clicked}
        {#each $countiesData as feature, i}
          <path
            d={$path(feature)}
            fill={feature.id.toString().slice(0, 2) === "34"
              ? colorScale(feature.properties.OTPcount)
              : "black"}
            stroke="white"
            stroke-width="1px"
            opacity={feature.stateID === $stateID ? 1 : 0}
            on:mouseout={() => {
              hoveredData = null;
            }}
            on:mousemove={(e) => {
              hoveredData = feature;
              hoveredPointer = d3.pointer(e);
            }}
          />
        {/each}
      {/if}
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
            <stop offset={`${(i * 100) / colors.length}%`} stop-color={color} />
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
</div>

<style>
  .map-wrapper {
    width: 100%;
    height: 400px;
  }
</style>
