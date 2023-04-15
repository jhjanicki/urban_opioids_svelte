<script>
  import { geoPath, geoAlbersUsa } from "d3-geo";
  import { draw } from "svelte/transition";
  import * as d3 from "d3";

  export let countiesData;
  export let stateData;

  let projection;
  let path;

  projection = d3.geoIdentity().fitSize([500, 400], stateData[0]);
  path = d3.geoPath().projection(projection);

  //   let mapWidth = mapWrapper.node().getBoundingClientRect().width;
  // let mapHeight = mapWrapper.node().getBoundingClientRect().height;
</script>

<div class="map-wrapper">
  <svg width="500" height="400">
    <g id="states">
      <path d={path(stateData)} />
    </g>
    <g id="counties">
      {#each countiesData as feature, i}
        <path d={path(feature)} />
      {/each}
    </g>
  </svg>
</div>
<div id="tooltip" />

<style>
</style>
