<script>
  import * as d3 from "d3";
  import { stateView, statePercent, countyPercent } from "../../store/store";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // gave width a default value and removed the bar width variable since it wasn't necessary
  let width = 400;
  let barHeight = 100;

  const margin = { top: 20, left: 5, bottom: 40, right: 5 };
  // made this scale a reactive statement as well so that the xScale range updates when the width changes

  $: xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, width - margin.left - margin.right]);

  $: barInnerWidth = tweened(xScale($statePercent) - margin.right, {
    duration: 400,
    easing: cubicOut,
  });

  $: if ($stateView === "stateview") {
    barInnerWidth.set(xScale($statePercent) - margin.right);
  } else {
    barInnerWidth.set(xScale($countyPercent) - margin.right);
  }
</script>

<div class="bar-wrapper" bind:clientWidth={width}>
  <svg {width} height={barHeight}>
  <svg width={width} height={barHeight}>
    <rect
      id="barOutline"
      x={margin.left}
      y="20"
      width={width - margin.right}
      height="50"
      stroke="white"
      stroke-width="2.5"
      fill="#353535"
    />
    <rect
      id="barInner"
      x={margin.left}
      y="20"
      width={$barInnerWidth}
      height="50"
      stroke-width="2.5"
      fill="#FDBF11"
    />
    <line
      id="stateAvg"
      x1={xScale($statePercent)}
      x2={xScale($statePercent)}
      y1={margin.top + 50}
      y2={margin.top - 10}
      stroke="white"
      stroke-width="2.5"
      fill="none"
    />
    <circle
      id="circle"
      cx={xScale($statePercent)}
      cy={margin.top - 10}
      r="5"
      fill="white"
    />
  </svg>
</div>

<style>
  .bar-wrapper {
    width: 100%;
  }
</style>
