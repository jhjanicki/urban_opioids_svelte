<script>
  import * as d3 from "d3";
  import TooltipBar from "./TooltipBar.svelte";
  import {
    countySelected,
    stateClicked,
    stateView,
    statePercent,
    countyPercent,
    selectedYear,
    selectedTreatment,
    stateMetricData,
    countyMetricData,
    submitted,
    print,
  } from "../../../store/store";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // gave width a default value and removed the bar width variable since it wasn't necessary
  let width = 200;
  let barHeight = 100;
  let hoveredPointer;

  let isBarHover;

  $: isStateView =
    $stateView === "stateview" ||
    ($stateView === "countyview" && !$countySelected);
  // the second part is to ensure that no county is selected when the tab is switched to countyview at first

  $: year = $selectedYear;
  $: treatment = $selectedTreatment; //double or close, 2xcap or fill_gap

  const margin = { top: 20, left: 2, bottom: 40, right: 10 };
  // made this scale a reactive statement as well so that the xScale range updates when the width changes
  $: $statePercent =
    $selectedYear === 12
      ? $stateMetricData.OUD_tx_12m
      : $stateMetricData.OUD_tx_6m;
  $: $countyPercent =
    $selectedYear === 12
      ? $countyMetricData[0].OUD_tx_12m
      : $countyMetricData[0].OUD_tx_6m;

  $: xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

  let barInnerWidth = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  // $: if (
  //   $stateView === "stateview" ||
  //   ($stateView === "countyview" && !$countySelected)
  // ) {
  //   barInnerWidth.set(xScale($statePercent) - margin.right);
  // } else {
  //   barInnerWidth.set(xScale($countyPercent) - margin.right);
  // }

  $: {
    barInnerWidth.set(xScale(OUD_pct) - margin.right);
  }

  $: OUD_pct = getPercent(
    "OUD",
    "totaltrt",
    isStateView ? $stateMetricData : $countyMetricData[0]
  );

  $: bup_pct = getPercent(
    "bup",
    "buptrt",
    isStateView ? $stateMetricData : $countyMetricData[0]
  );

  $: meth_pct = getPercent(
    "methadone",
    "methtrt",
    isStateView ? $stateMetricData : $countyMetricData[0]
  );

  // THIS PART STILL UNSURE
  $: lollipop = getStateAvg();

  $: getPercent = (metric1, metric2, metricData) => {
    let metricFinal;
    if (!$submitted) {
      metricFinal = `${metric1}_tx_${year}m`;
    } else {
      if (treatment === "2xcap") {
        metricFinal = `${metric2}_2xcap_pct_${year}m`;
      } else {
        metricFinal = `${metric2}_fillgap_pct`;
      }
    }
    return metricData[metricFinal];
  };

  $: getStateAvg = () => {
    let metricFinal;
    if (!$submitted) {
      metricFinal = `OUD_tx_${year}m`;
    } else {
      if (treatment === "2xcap") {
        metricFinal = `totaltrt_2xcap_pct_${year}m`;
      } else {
        metricFinal = `totaltrt_fillgap_pct`;
      }
    }
    return $stateMetricData[metricFinal];
  };
</script>

{#if hoveredPointer}
  <TooltipBar
    {OUD_pct}
    {bup_pct}
    {meth_pct}
    {lollipop}
    {hoveredPointer}
    {isBarHover}
  />
{/if}

{#if $stateClicked}
  <div class="bar-wrapper" bind:clientWidth={width}>
    <svg
      {width}
      height={$print ? 60 : barHeight}
      role="img"
      aria-label="Bar chart"
    >
      <rect
        id="barInner"
        x={margin.left}
        y="20"
        width={$barInnerWidth ? $barInnerWidth : null}
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
          isBarHover = true;
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
      <text
        x={$barInnerWidth ? $barInnerWidth / 2 - 10 : null}
        y={$print ? barHeight / 2 - 7 : barHeight / 2 + 2}
        fill="black"
      >
        {OUD_pct}%
      </text>

      <line
        id="stateAvg"
        x1={lollipop ? xScale(lollipop) - margin.right + 1 : null}
        x2={lollipop ? xScale(lollipop) - margin.right + 1 : null}
        y1={margin.top + 50}
        y2={margin.top - 10}
        stroke="white"
        stroke-width="2.5"
        fill="none"
        display={$print || isStateView ? "none" : "inherit"}
      />
      <circle
        id="circle"
        cx={lollipop ? xScale(lollipop) - margin.right : null}
        cy={margin.top - 10}
        r="5"
        fill="white"
        display={$print || isStateView ? "none" : "inherit"}
        on:mouseout={() => {
          hoveredPointer = null;
        }}
        on:mousemove={(e) => {
          if (!$print) {
            hoveredPointer = d3.pointer(e);
            isBarHover = false;
          }
        }}
      />
    </svg>
  </div>
{/if}

<style>
  .bar-wrapper {
    width: 100%;
  }
</style>
