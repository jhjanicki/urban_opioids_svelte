<script>
  import { geoPath, geoAlbersUsa } from "d3-geo";
  import { draw } from "svelte/transition";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  export let countiesData;
  export let stateData;

  let projection;
  let path;
  let mapWrapper;
  let width;
  let height;

  const colorScale = d3.scaleSequential(d3.interpolatePuBuGn).domain([0, 5]);

  onMount(() => {
    width = mapWrapper.getBoundingClientRect().width;
    height = mapWrapper.getBoundingClientRect().height;
    console.log(countiesData[0].id.toString().slice(0, 2));
    // projection = d3.geoIdentity().fitSize([width, height], stateData[0]);
    // path = d3.geoPath().projection(projection);
  });

  projection = d3.geoIdentity().fitSize([500, 400], stateData[0]); // how to update this???
  path = d3.geoPath().projection(projection);
</script>

<div class="map-wrapper" bind:this={mapWrapper}>
  <svg {width} {height}>
    <g id="states">
      <path d={path(stateData)} />
    </g>
    <g id="counties">
      {#each countiesData as feature, i}
        <path
          d={path(feature)}
          fill={feature.id.toString().slice(0, 2) === "34"
            ? colorScale(feature.properties.OTPcount)
            : "black"}
          stroke="white"
          stroke-width="1px"
        />
      {/each}
    </g>
  </svg>
</div>
<div id="tooltip" />

<style>
  .map-wrapper {
    min-height: 400px;
  }
</style>
