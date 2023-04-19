<script>
  import * as d3 from "d3";
  import { stateData, countiesData, path, stateID } from "../../store/store";

  let width = 500;
  let height = 400;

  const colorScale = d3.scaleSequential(d3.interpolatePuBuGn).domain([0, 5]);

  // rotate PE: 10, NM: -5, KY: 5, MI: 5, NC: 10 but also trasnalte left, WI:2

  console.log($stateID);
</script>

<div class="map-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
  <p>{$stateData[0].id}</p>
  <svg {width} {height}>
    <!-- <g id="states">
      <path d={$path($stateData)} />
    </g> -->

    <g id="counties" transform="rotate(0)">
      {#each $countiesData as feature, i}
        <path
          d={$path(feature)}
          fill={feature.id.toString().slice(0, 2) === "34"
            ? colorScale(feature.properties.OTPcount)
            : "black"}
          stroke="white"
          stroke-width="1px"
          opacity={feature.stateID === $stateID ? 1 : 0.1}
        />
      {/each}
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
