<script>
  import Bar from "./Bar.svelte";

  import {
    selectedState,
    selectedCounty,
    selectedYear,
    stateView,
    stateMetricData,
    countyMetricData,
    submitted,
    selectedTreatment,
    selectedProvider,
  } from "../../store/store";

  let width;
  let active = false;

  //newprov vs curpr, fill_gap vs 2xcap...currently not being called
  const getMetricOutput = () => {
    const metric = `${$selectedTreatment}_${$selectedProvider}_${$selectedYear}m`;
    if ($stateView === "stateview") {
      return $stateMetricData[metric];
    } else {
      return $countyMetricData[0][metric];
    }
  };
</script>

<div class="main-viz">
  <div class="viz-wrapper" bind:clientWidth={width}>
    <h3>What would it take to change the treatment gap?</h3>
    {#if $submitted}
      <h4>
        It would take {$stateView === "stateview"
          ? $stateMetricData.newprov_fill_gap_12m
          : $countyMetricData[0].newprov_fill_gap_12m} new providers offering treatment
        for
        {$selectedYear} months to close the current treatment gap of xxx people in
        {$selectedCounty} County, {$selectedState}.
      </h4>
    {:else}
      <h4>
        {#if $stateMetricData && $countyMetricData}
          {$stateView === "stateview" ? $selectedState : $selectedCounty}
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
    <p>
      {$selectedYear === 12
        ? $stateView === "stateview"
          ? $stateMetricData.capacity_current_12m
          : $countyMetricData[0].capacity_current_12m
        : $stateView === "stateview"
        ? $stateMetricData.capacity_current_6m
        : $countyMetricData[0].capacity_current_6m} people are receiving treatment
      for opioid use disorder
    </p>
    <br />
    <div>
      <p class="inline">
        {$selectedYear === 12
          ? $stateView === "stateview"
            ? $stateMetricData.bup_patients_12m
            : $countyMetricData[0].bup_patients_12m
          : $stateView === "stateview"
          ? $stateMetricData.bup_patients_6m
          : $countyMetricData[0].bup_patients_6m} people are receiving buprenorphine
      </p>
      <img
        class="inline"
        id="info"
        src="information-gray.svg"
        on:mouseover={() => (active = true)}
        on:mouseleave={() => (active = false)}
      />
      <span class={active ? "tooltiptext visible" : "tooltiptext hidden"}
        >Buprenorphine and methadone are two of the main opioid use treatment
        medications available.</span
      >
    </div>
    <p>
      {$selectedYear === 12
        ? $stateView === "stateview"
          ? $stateMetricData.methadone_12m
          : $countyMetricData[0].methadone_12m
        : $stateView === "stateview"
        ? $stateMetricData.methadone_6m
        : $countyMetricData[0].methadone_6m} people are receiving methadone at an
      opioid treatment program
    </p>
  </div>
</div>

<style>
  .main-viz {
    background-color: #353535;
    color: #3f2626;
    height: auto;
  }

  h3 {
    margin: 0.9rem 0px;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
    color: white;
  }

  h4 {
    margin: 1.4rem 0px;
    font-size: 1.3rem;
    font-weight: 400;
    color: white;
  }

  p {
    color: white;
    margin: 10px 0px;
  }

  .viz-wrapper {
    padding: 30px;
  }

  #bar-percent {
    color: #fdbf11;
  }

  .inline {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 0px;
  }

  #info:hover {
    cursor: pointer;
  }

  /* Tooltip text */
  .tooltiptext {
    width: 250px;
    margin-top: 8px;
    margin-left: 5px;
    background-color: #d2d2d2;
    color: #353535;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
  }

  .tooltiptext.hidden {
    display: none;
  }

  .tooltiptext.visible {
    display: inline-block;
  }
</style>
