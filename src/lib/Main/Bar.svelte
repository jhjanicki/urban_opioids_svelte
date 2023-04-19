<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { stateView } from "../../store/store";

  let stateViewValue;
  stateView.subscribe((value) => {
    stateViewValue = value;
  });

  let statePercent = 50;
  let stateAverage = 40;
  let countyPercent = 30;
  const barWrapper = d3.select(".bar-wrapper");
  let barWidth = 500;
  let barHeight = 100;
  const margin = { top: 20, left: 5, bottom: 40, right: 5 };
  let xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, barWidth - margin.left - margin.right]);

  //   onMount(() => {
  //     barWidth = barWrapper.node().getBoundingClientRect().width;
  //     xScale = d3
  //       .scaleLinear()
  //       .domain([0, 100])
  //       .range([0, barWidth - margin.left - margin.right]);
  //   });
</script>

<div class="bar-wrapper">
  <svg width={barWidth} height={barHeight}>
    <rect
      id="barOutline"
      x={margin.left}
      y="20"
      width={barWidth - margin.right}
      height="50"
      stroke="white"
      stroke-width="2.5"
      fill="#353535"
    />
    <rect
      id="barInner"
      x={margin.left}
      y="20"
      width={xScale(
        stateViewValue === "stateview" ? statePercent : countyPercent
      )}
      height="50"
      stroke-width="2.5"
      fill="#FDBF11"
    />
    <line
      id="stateAvg"
      x1={xScale(stateAverage)}
      x2={xScale(stateAverage)}
      y1={margin.top + 50}
      y2={margin.top - 10}
      stroke="white"
      stroke-width="2.5"
      fill="none"
    />
    <circle
      id="circle"
      cx={xScale(stateAverage)}
      cy={margin.top - 10}
      r="5"
      fill="white"
    />
  </svg>
</div>
