<script>
  import Bar from "./Bar.svelte";

  import {
    selectedYear,
    stateView,
    stateMetricData,
    countyMetricData,
    submitted,
    selectedTreatment,
    selectedProvider,
  } from "../../store/store";

  let width;

  //newprov vs curpr, fill_gap vs 2xcap
  function getNumber() {
    const metric = `${$selectedTreatment}_${$selectedProvider}_${$selectedYear}m`;
    if ($stateView === "stateview") {
      return $stateMetricData[metric];
    } else {
      return $countyMetricData[0][metric];
    }
  }
</script>

<div class="main-viz">
  <div class="viz-wrapper" bind:clientWidth={width}>
    <h3>What would it take to change the treatment gap?</h3>
    {#if $submitted}
      <h4>{getNumber()}</h4>
    {:else}
      <h4>
        {#if $stateMetricData && $countyMetricData}
          <span id="bar-state" /> is treating
          <span id="bar-percent"
            >{$selectedYear === 12
              ? $stateView === "stateview"
                ? $stateMetricData.OUD_tx_12m
                : $countyMetricData[0].OUD_tx_12m
              : $stateView === "stateview"
              ? $stateMetricData.OUD_tx_6m
              : $countyMetricData[0].OUD_tx_6m}% of residents</span
          >
          with opioid use disorder
        {/if}
      </h4>
    {/if}
    <Bar />
  </div>
</div>

<style>
  .main-viz {
    background-color: #353535;
    color: #3f2626;
    height: 450px;
  }

  h3 {
    margin: 0.9rem 0px;
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 600;
    color: white;
  }

  h4 {
    margin: 1.4rem 0px;
    font-size: 1.4rem;
    font-weight: 400;
    color: white;
  }

  .viz-wrapper {
    padding: 30px;
  }

  #bar-percent {
    color: #fdbf11;
  }
</style>
