<script>
  import * as d3 from "d3";
  import TooltipBar from "./TooltipBar.svelte";
  import {
    stateClicked,
    stateView,
    statePercent,
    countyPercent,
    selectedYear,
    stateMetricData,
    countyMetricData,
    print,
  } from "../../../store/store";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let OUD;
  export let bup;
  export let methadone;

  // gave width a default value and removed the bar width variable since it wasn't necessary
  let width = 200;
  let barHeight = 100;
  let hoveredPointer;

  const margin = { top: 20, left: 5, bottom: 40, right: 5 };
  // made this scale a reactive statement as well so that the xScale range updates when the width changes
  $: $statePercent =
    $selectedYear === 12
      ? $stateMetricData.OUD_tx_12m
      : $stateMetricData.OUD_tx_6m;
  $: $countyPercent =
    $selectedYear === 12
      ? $countyMetricData[0].OUD_tx_12m
      : $countyMetricData[0].OUD_tx_6m;

  //I had to add the above code for the bar to update when the year is toggled

  $: xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, width - margin.left - margin.right]);

  let barInnerWidth = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  $: if ($stateView === "stateview") {
    barInnerWidth.set(xScale($statePercent) - margin.right);
  } else {
    barInnerWidth.set(xScale($countyPercent) - margin.right);
  }
</script>

{#if hoveredPointer}
  <TooltipBar {OUD} {bup} {methadone} {hoveredPointer} />
{/if}

<!-- need this if statement otherwise I get an error on negative value in rect -->
{#if $stateClicked}
  <div class="bar-wrapper" bind:clientWidth={width}>
    <svg {width} height={$print ? 60 : barHeight}>
      <rect
        id="barInner"
        x={margin.left}
        y="20"
        width={$barInnerWidth}
        height={$print ? 30 : 50}
        stroke-width={$print ? 1.5 : 2.5}
        fill="#FDBF11"
        on:mouseout={() => {
          hoveredPointer = null;
        }}
        on:mousemove={(e) => {
          if (!$print) {
            hoveredPointer = d3.pointer(e);
          }
        }}
      />
      <rect
        id="barOutline"
        x={margin.left}
        y="20"
        width={width - margin.right}
        height={$print ? 30 : 50}
        stroke={$print ? "#353535" : "#fff"}
        stroke-width="1.5"
        fill="none"
      />
      <text x={$barInnerWidth / 2 - 10} y={barHeight / 2 + 2} fill="black">
        {$stateView === "stateview" ? $statePercent : $countyPercent}%
      </text>

      <line
        id="stateAvg"
        x1={xScale($statePercent)}
        x2={xScale($statePercent)}
        y1={margin.top + 50}
        y2={margin.top - 10}
        stroke="white"
        stroke-width="2.5"
        fill="none"
        display={$print || $stateView === "stateview" ? "none" : "inherit"}
      />
      <circle
        id="circle"
        cx={xScale($statePercent)}
        cy={margin.top - 10}
        r="5"
        fill="white"
        display={$print || $stateView === "stateview" ? "none" : "inherit"}
      />
    </svg>
  </div>
{/if}

<style>
  .bar-wrapper {
    width: 100%;
  }
</style>
