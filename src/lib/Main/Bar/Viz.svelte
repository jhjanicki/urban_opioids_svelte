<script>
  import Bar from "./Bar.svelte";

  import {
    countySelected,
    selectedState,
    selectedCounty,
    selectedYear,
    stateView,
    stateMetricData,
    countyMetricData,
    submitted,
    selectedTreatment,
    selectedProvider,
    statePercent,
    countyPercent,
    print,
  } from "../../../store/store";

  let width;
  let active = false;

  $: isStateView =
    $stateView === "stateview" ||
    ($stateView === "countyview" && $countySelected == false);
  $: year = $selectedYear;
  $: treatment = $selectedTreatment;
  $: provider = $selectedProvider;

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

  $: above = $countyPercent > $statePercent;

  const getMetricOutput = (noYear, metric, metricData, year) => {
    const metricFinal = noYear ? metric : `${metric}_${year}m`;
    // $: console.log(metricFinal);
    // : `${metric}_${$submitted ? year : 12}m`;
    return metricData[metricFinal];
  };

  const getToggleMetric = (metric, metricData, year, treatment, provider) => {
    let metricFinal = `${metric}_${year}m`;
    return metricData[metricFinal];
  };

  $: outputText = getText(
    isStateView ? $stateMetricData : $countyMetricData[0],
    year,
    treatment,
    provider
  );

  // the OUD_num below is where the Y residents was before
  const getText = (metricData, year, treatment, provider) => {
    let metricFinal = `${provider}_${treatment}_${year}m`;
    let final = metricData[metricFinal];
    if (provider === "newprov") {
      if (treatment === "fill_gap") {
        return `${
          isStateView ? $selectedState : $selectedCounty + " county"
        } would need ${final} new buprenorphine prescribers to close the treatment gap of ${
          isStateView ? $stateMetricData.OUD_num : $countyMetricData[0].OUD_num
        } residents with opioid use disorder, assuming all prescribers offer
treatment for ${year} months.`;
      } else {
        return `${
          isStateView ? $selectedState : $selectedCounty + " county"
        } would need ${final} new buprenorphine prescribers to double the current treatment capacity, assuming all prescribers offer
treatment for ${year} months.`;
      }
    } else {
      if (treatment === "fill_gap") {
        return `Active buprenorphine prescribers would have to treat ${final} times as many patients to close the treatment
gap of ${
          isStateView ? $stateMetricData.OUD_num : $countyMetricData[0].OUD_num
        } residents with opioid use disorder in ${
          isStateView ? $selectedState : $selectedCounty
        }, assuming all prescribers offer treatment
for ${year} months.`;
      } else {
        return `Active buprenorphine prescribers would have to treat ${final} times as many patients to double the current treatment capacity in ${
          isStateView ? $selectedState : $selectedCounty
        }, assuming all prescribers offer treatment for ${year} months.`;
      }
    }
  };
  // new provider + double (newprov_2xcap)
  //new provider + close gap (newprov_fill_gap)
  // active provide + double .... doesn't exist in data atm
  // active provider + close gap (no gap)  (curprx_fill_gap)
  // active provider + close gap (gap exists)  (curprx_fill_gap)
  //newprov_incr_fill_gap... what is this?

  //
</script>

<div class="main-viz" class:print={$print}>
  <div class="viz-wrapper" bind:clientWidth={width}>
    <h3>What would it take to narrow the treatment gap?</h3>
    {#if isStateView}
      {#if $submitted}
        <h4>
          {outputText}
        </h4>
      {:else}
        <h4>
          {#if $stateMetricData}
            {$selectedState}
            <span id="bar-state" /> is treating
            <span id="bar-percent">{OUD}% of residents</span>
            <!-- {$statePercent} -->
            with opioid use disorder
          {/if}
        </h4>
      {/if}
    {:else if $submitted}
      <h4>
        {outputText}
      </h4>
    {:else}
      <h4>
        {#if $stateMetricData && $countyMetricData}
          {$selectedCounty} is treating {OUD}% of residents with opioid use
          disorder. That is
          <!-- {$countyPercent} -->
          {above ? "above" : "below"} the state average of {$statePercent}%.
        {/if}
      </h4>
    {/if}
    <Bar {OUD} {bup} {methadone} />
    <p id="numTreatment">
      {OUD}% receiving treatment ({bup}% buprenorphine, {methadone}% methadone)
    </p>
    <p id="capacity">
      {capacity} residents are receiving treatment for opioid use disorder
    </p>
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
    background-color: #000000;
    color: #000000;
    height: auto;
  }

  h3 {
    margin: 18px 0px;
    font-size: 30px;
    line-height: 40px;
    font-weight: 600;
    color: white;
  }

  h4 {
    margin: 28px 0px;
    font-size: 26px;
    font-weight: 400;
    color: white;
  }

  p {
    color: white;
    margin: 8px 0px;
    font-size: 16px;
  }

  .viz-wrapper {
    padding: 48px;
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

  #numTreatment {
    display: none;
  }

  #capacity {
    margin-top: -20px;
    margin-bottom: 8px;
  }

  .main-viz.print {
    background-color: #fff;
  }
  .print h3,
  .print h4,
  .print p {
    color: #353535;
  }

  .print h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 0px;
  }
  .print h4 {
    font-size: 1rem;
    color: #353535;
    margin: 30px 0px 0px 0px;
  }

  .print p {
    font-size: 0.8rem;
    line-height: 1.4rem;
    margin: 0px;
  }

  .print .viz-wrapper {
    padding: 0px;
  }

  .print #numTreatment {
    display: inherit;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .print #capacity {
    margin-bottom: 0px;
  }

  .print #info {
    display: none;
  }

  .print #bar-percent {
    color: #353535;
  }

  .print .tooltiptext.visible {
    display: none;
    visibility: hidden;
  }

  @media (max-width: 576px) {
    .viz-wrapper {
      padding: 30px;
    }
  }
</style>
