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

  $: isStateView = $stateView == "stateview";
  $: year = $selectedYear;

  const metricName = {
    OUD_tx: "OUD_tx",
    capacity_current: "capacity_current",
    bup_patients: "bup_patients",
    methadone: "methadone",
    bup_tx: "bup_tx",
    methadone_tx: "methadone_tx",
  };

  $: capacity = getMetricOutput(
    false,
    metricName.capacity_current,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: OUD = getMetricOutput(
    false,
    metricName.OUD_tx,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: bup = getMetricOutput(
    false,
    metricName.bup_tx,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: methadone = getMetricOutput(
    false,
    metricName.methadone_tx,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: bup_num = getMetricOutput(
    false,
    metricName.bup_patients,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: methadone_num = getMetricOutput(
    false,
    metricName.methadone,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  const getMetricOutput = (noYear, metric, metricData, year) => {
    const metricFinal = noYear ? metric : `${metric}_${year}m`;
    // : `${metric}_${$submitted ? year : 12}m`;
    return metricData[metricFinal];
  };
</script>

<div class="main-viz">
  <div class="viz-wrapper" bind:clientWidth={width}>
    <h3>What would it take to narrow the treatment gap?</h3>
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
          <span id="bar-percent">{OUD}% of residents</span>
          with opioid use disorder
        {/if}
      </h4>
    {/if}
    <Bar {OUD} {bup} {methadone} />
    <p>
      {capacity} residents are receiving treatment for opioid use disorder
    </p>
    <br />
    <div>
      <p class="inline">
        {bup_num} residents are receiving buprenorphine
      </p>
      <img
        class="inline"
        id="info"
        src="information-gray.svg"
        on:mouseover={() => (active = true)}
        on:mouseleave={() => (active = false)}
      />
      <span class={active ? "tooltiptext visible" : "tooltiptext hidden"}
        >Buprenorphine (sold under several brand names including Suboxone and
        Subutex) and methadone are two of the main medication treatments
        available for opioid use disorder.</span
      >
    </div>
    <p>
      {methadone_num} residents are receiving methadone at an opioid treatment program
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
    width: 230px;
    margin-top: 8px;
    margin-left: 5px;
    background-color: #d2d2d2;
    color: #353535;
    text-align: left;
    padding: 8px;
    border-radius: 6px;
    position: absolute;
    font-size: 16px;
    z-index: 1;
  }

  .tooltiptext.hidden {
    display: none;
  }

  .tooltiptext.visible {
    display: inline-block;
  }
</style>
