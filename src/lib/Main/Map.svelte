<script>
  import * as d3 from "d3";
  import { countiesData, path, stateID, clicked } from "../../store/store";

  let width = 500;
  let height = 400;

  $stateID = 34;

  const colorScale = d3.scaleSequential(d3.interpolatePuBuGn).domain([0, 5]);

  //rotate state due to projection distortions
  const rotateScale = d3
    .scaleOrdinal()
    .domain([42, 35, 21, 26, 37, 55, 34])
    .range([10, -5, 5, 5, 10, 2, 0]); //"PE", "NM", "KY", "MI", "NC", "WI", "NJ"

  function calculateBreaks() {}
</script>

<div class="map-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
  <!-- <p>{$stateData[0].id}</p> -->
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
          />
        {/each}
      {/if}
    </g>
  </svg>
</div>
<div id="tooltip" />

<style>
  .map-wrapper {
    width: 100%;
    height: 400px;
  }
</style>
