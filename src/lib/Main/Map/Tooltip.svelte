<script>
  import { selectedYear, stateView, print } from "../../../store/store";
  export let hoveredData;
  export let hoveredPointer;

  let tooltipWidth;
</script>

<div
  class={$stateView === "stateview" ? "tooltip none" : "tooltip"}
  style="position: absolute; top: {hoveredPointer[1] - 80}px; left: {$print
    ? hoveredPointer[0] - 95
    : hoveredPointer[0] - 60}px"
  bind:clientWidth={tooltipWidth}
>
  <h1>
    {$selectedYear == 12
      ? hoveredData.properties.OUD_tx_12m
      : hoveredData.properties.OUD_tx_6m}%
  </h1>
  <h2>{hoveredData.properties.name} county</h2>
</div>

<style>
  .tooltip {
    width: 94px;
    min-height: 50px;
    background: white;
    color: black;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 10px 14px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 300;
    z-index: 1;
    pointer-events: none;
  }

  .tooltip:after {
    left: 50%;
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-top-color: #ffffff;
    border-width: 10px;
    margin-left: -10px;
  }

  h1,
  h2 {
    margin: 0;
    padding: 0;
    font-weight: 300;
  }

  h1 {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 6px;
    width: 100%;
  }

  h2 {
    font-size: 14px;
  }

  .none {
    display: none;
  }
</style>
