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
  import { numberWithCommas } from "../../utils";

  let width;
  let active = false;

  $: isStateView =
    $stateView === "stateview" ||
    ($stateView === "countyview" && $countySelected == false);
  // keep track of if stateview, or if countyview but no county selected yet
  $: year = $selectedYear;
  $: treatment = $selectedTreatment; //double or close
  $: provider = $selectedProvider; //add new or increase capacity (active prescribers)

  const metricName = {
    OUD_tx: "OUD_tx",
    capacity_current: "capacity_current",
    gap_current: "gap_current",
    bup_patients: "bup_patients",
    methadone: "OTP_methadone",
    bup_tx: "bup_tx",
    methadone_tx: "methadone_tx",
  };

  $: gap = getMetricOutput(
    false,
    metricName.gap_current,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: OUD = getMetricOutput(
    false,
    metricName.OUD_tx,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: total_num = getNumber(
    "capacity_current",
    "totaltrt",
    isStateView ? $stateMetricData : $countyMetricData[0]
  );

  $: bup_num = getNumber(
    "bup_patients",
    "buptrt",
    isStateView ? $stateMetricData : $countyMetricData[0]
  );

  $: meth_num = getNumber(
    "OTP_methadone",
    "methtrt",
    isStateView ? $stateMetricData : $countyMetricData[0]
  );

  $: getNumber = (metric1, metric2, metricData) => {
    let metricFinal;
    if (!$submitted) {
      metricFinal = `${metric1}_${year}m`;
    } else {
      if (treatment === "2xcap") {
        metricFinal = `${metric2}_2xcap_${year}m`;
      } else {
        metricFinal = `${metric2}_fillgap`;
      }
    }
    return metricData[metricFinal];
  };

  $: above = $countyPercent > $statePercent;

  const getMetricOutput = (noYear, metric, metricData, year) => {
    const metricFinal = noYear ? metric : `${metric}_${year}m`;
    return metricData[metricFinal];
  };

  $: outputText = getText(
    isStateView ? $stateMetricData : $countyMetricData[0],
    year,
    treatment,
    provider
  );

  const getText = (metricData, year, treatment, provider) => {
    let metricFinal = `${provider}_${treatment}_${year}m`;
    let finalNum = metricData[metricFinal];
    let metricIncNewProv = `newprov_incr_${treatment}_${year}m`;
    let newProvInc = metricData[metricIncNewProv];
    let metricCloseGap2xCap = `totaltrt_2xcap_pct_${year}m`;
    let closeGap2xCap = metricData[metricCloseGap2xCap];

    if (gap === 0) {
      return `${$selectedCounty} has no treatment gap, assuming all prescribers offer
treatment for ${year} months.`;
    } else {
      if (provider === "newprov") {
        // new providers (new buprenorphine prescribers)
        if (treatment === "fill_gap") {
          //
          return `${
            isStateView ? $selectedState : $selectedCounty
          } would need <span class="text-highlight">${numberWithCommas(
            finalNum
          )} new buprenorphine prescribers</span> to <span class="text-highlight">close the treatment gap</span> of ${numberWithCommas(
            gap
          )} residents with opioid use disorder, assuming all prescribers offer
treatment for ${year} months.`;
        } else {
          //2xcap
          if (closeGap2xCap === 100) {
            // gap closes
            return `${
              isStateView ? $selectedState : $selectedCounty
            } would need <span class="text-highlight">${numberWithCommas(
              finalNum
            )} new buprenorphine prescribers</span> to double the current number of people receiving
treatment, assuming all prescribers offer treatment for ${year} months.  This <span class="text-highlight">would close ${
              isStateView ? $selectedState : $selectedCounty
            }'s
treatment gap</span> of ${numberWithCommas(gap)} residents with opioid use disorder.`;
          } else {
            // gap exists
            return `${
              isStateView ? $selectedState : $selectedCounty
            } would need <span class="text-highlight">${numberWithCommas(
              finalNum
            )} new buprenorphine prescribers</span> to double the current number of people receiving
treatment, assuming all prescribers offer treatment for ${year} months.  This <span class="text-highlight">would not close ${
              isStateView ? $selectedState : $selectedCounty
            }'s
treatment gap</span> of ${numberWithCommas(gap)} residents with opioid use disorder.`;
          }
        }
      } else {
        // Increasing capacity of current providers (active buprenorphine prescribers)
        if (treatment === "fill_gap") {
          //fill gap
          //if gap can be closed
          if (closeGap2xCap === 100) {
            return `Active prescribers would have to treat <span class="text-highlight">${numberWithCommas(
              finalNum
            )} times as many patients</span> to <span class="text-highlight">close the treatment
gap</span> of ${numberWithCommas(gap)} residents with opioid use disorder in ${
              isStateView ? $selectedState : $selectedCounty
            }, assuming all prescribers offer treatment
for ${year} months.`;
          } else {
            //if gap still exists
            if (newProvInc === 0) {
              return `Increasing active prescribers' capacity isn't enough to close the treatment gap in ${
                isStateView ? $selectedState : $selectedCounty
              }. Active prescribers would have to treat <span class="text-highlight">${numberWithCommas(
                finalNum
              )} times as many patients</span> to close the treatment gap of ${numberWithCommas(
                gap
              )} residents with opioid use disorder in ${
                isStateView ? $selectedState : $selectedCounty
              }, assuming all prescribers offer treatment for ${year} months.`;
            } else {
              return `Increasing active prescribers' capacity isn't enough to close the treatment gap in ${
                isStateView ? $selectedState : $selectedCounty
              }. Active prescribers would have to treat <span class="text-highlight">${numberWithCommas(
                finalNum
              )} times as many patients</span> and <span class="text-highlight">${numberWithCommas(
                newProvInc
              )} additional new prescribers</span> would each have to treat about ${
                $selectedState === "Michigan" ? 3 : 5
              } patients (the state average prescribers with a 30-patient limit treated in 2022) <span class="text-highlight">to close the treatment gap</span> of ${numberWithCommas(
                gap
              )} residents with opioid use disorder in ${
                isStateView ? $selectedState : $selectedCounty
              }, assuming all prescribers offer treatment for ${year} months.`;
            }
          }
        } else {
          //double treatment
          //if gap can be closed
          if (closeGap2xCap === 100) {
            return `Active prescribers would have to treat <span class="text-highlight">${finalNum} times as many patients</span> to double the current number of people receiving treatment in ${
              isStateView ? $selectedState : $selectedCounty
            }, assuming all prescribers offer treatment for ${year} months.  <span class="text-highlight">This <span class="text-highlight">would close ${
              isStateView ? $selectedState : $selectedCounty
            }'s treatment gap</span> of ${numberWithCommas(
              gap
            )} residents with opioid use disorder`;
          } else {
            //if gap still exists
            return `Active prescribers would have to treat <span class="text-highlight">${finalNum} times as many patients</span> and <span class="text-highlight">${numberWithCommas(newProvInc)} additional new prescribers</span> would each have to treat about ${
              $selectedState === "Michigan" ? 3 : 5
            } patients (the state average that prescribers with a 30-patient limit treated in 2022) to double the current number of people receiving treatment in ${
              isStateView ? $selectedState : $selectedCounty
            }, assuming all prescribers offer treatment for ${year} months. This <span class="text-highlight">would not close ${
              isStateView ? $selectedState : $selectedCounty
            }'s treatment gap</span> of ${numberWithCommas(
              gap
            )} residents with opioid use disorder.`;
          }
        }
      }
    }
  };

  //
</script>

<div class="main-viz" class:print={$print}>
  <div class="viz-wrapper" bind:clientWidth={width}>
    <h3>What would it take to narrow the treatment gap?</h3>
    {#if isStateView}
      {#if $submitted}
        <h4>
          {@html outputText}
        </h4>
      {:else}
        <h4>
          {#if $stateMetricData}
            {$selectedState}
            <span id="bar-state" /> is treating an estimated
            <span class="bar-percent">{OUD}% of residents</span>
            with opioid use disorder, assuming prescribers offer treatment for {$selectedYear} months.
          {/if}
        </h4>
      {/if}
    {:else if $submitted}
      <h4>
        {@html outputText}
      </h4>
    {:else}
      <h4>
        {#if $stateMetricData && $countyMetricData}
          {#if gap === 0}
            {$selectedCounty}, {$selectedState} has no treatment gap, assuming prescribers offer treatment for {$selectedYear} months.
          {:else}
            {$selectedCounty} is treating an estimated
            <span class="bar-percent">{OUD}% of residents</span>
            with opioid use disorder, assuming all prescribers offer treatment for {$selectedYear} months. That is
            {above ? "above" : "below"} the state average of {$statePercent}%.
          {/if}
        {/if}
      </h4>
    {/if}
    <Bar />

    <p id="capacity">
      {numberWithCommas(total_num)} residents are receiving treatment for opioid
      use disorder
    </p>
    <div>
      <p class="inline">
        {numberWithCommas(bup_num)} residents are receiving buprenorphine
      </p>
      <img
        class="inline"
        id="info"
        src="information-gray.svg"
        on:mouseover={() => (active = true)}
        on:mouseleave={() => (active = false)}
      />
      <span class={active ? "tooltiptext visible" : "tooltiptext hidden"}
        >Buprenorphine (sold under brand names including Suboxone and Subutex)
        and methadone are two of the main medication treatments available for
        opioid use disorder. A small share of patients in opioid treatment
        programs receive a medication treatment other than methadone, such as
        buprenorphine.</span
      >
    </div>
    <p>
      {numberWithCommas(meth_num)} residents are receiving methadone at an opioid
      treatment program
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
    font-size: 36px;
    line-height: 46px;
    font-weight: 600;
    color: white;
  }

  h4 {
    margin: 28px 0px;
    font-size: 30px;
    line-height: 46px;
    font-weight: 300;
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

  .bar-percent {
    color: #fdbf11;
    font-weight: 700;
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

  #capacity {
    margin-top: -10px;
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
    font-size: 26px;
    font-weight: 600;
    margin-top: 0px;
  }
  .print h4 {
    font-size: 20px;
    color: #353535;
    margin: 30px 0px 0px 0px;
  }

  .print p {
    font-size: 16px;
    line-height: 28px;
    margin: 0px;
  }

  .print .viz-wrapper {
    padding: 0px;
  }

  .print #capacity {
    margin-bottom: 0px;
  }

  .print #info {
    display: none;
  }

  .print .bar-percent {
    color: #353535;
  }

  :global(.text-highlight) {
    color: #fdbf11;
    font-weight: 700;
  }

  .print .tooltiptext.visible {
    display: none;
    visibility: hidden;
  }

  @media (max-width: 700px) {
    .viz-wrapper {
      padding: 20px;
    }
  }

  @media (max-width: 576px) {
    .viz-wrapper {
      padding: 30px;
    }
  }
</style>
