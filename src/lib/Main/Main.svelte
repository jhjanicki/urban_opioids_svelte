<script>
  import Button from "./Button.svelte";
  import Tab from "./Tab.svelte";
  import Dropdown from "./Dropdown.svelte";
  import Viz from "./Viz.svelte";
  import OptionsPanel from "./OptionsPanel.svelte";
  import Map from "./Map.svelte";
  import {
    submitted,
    selectedState,
    selectedCounty,
    stateMetricData,
    countyMetricData,
    selectedYear,
    stateView,
  } from "../../store/store";

  export let data;
  let width;

  $: isStateView = $stateView == "stateview";
  $: year = $selectedYear;

  const metricName = {
    deaths_opioidod_rt_100k: "deaths_opioidod_rt_100k",
    deaths_allod_rt_100k: "deaths_allod_rt_100k",
    deaths_opioidod_rt_allod: "deaths_opioidod_rt_allod",
    ACS_PCT_LIMIT_ENGLISH: "ACS_PCT_LIMIT_ENGLISH",
    ACS_PCT_SPANISH: "ACS_PCT_SPANISH",
    ACS_PCT_OTH_LANG: "ACS_PCT_OTH_LANG",
    gap_current: "gap_current",
    capacity_current: "capacity_current",
    methadone_rt: "methadone_rt",
    bup_patients: "bup_patients",
    prescriber: "prescriber",
    perc_waiver_DEA: "perc_waiver_DEA",
    activeprx30: "activeprx30",
    activeprx100: "activeprx100",
    activeprx275: "activeprx275",
    OUD_num: "OUD_num",
    OUD_state: "OUD_state",
    drivetime_methadone: "drivetime_methadone",
    transittime_methadone: "transittime_methadone",
    drivetime_bup: "drivetime_bup",
    transittime_bup: "transittime_bup",
  };

  $: deathsop = getMetricOutput(
    true,
    metricName.deaths_opioidod_rt_100k,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );
  $: deathall = getMetricOutput(
    true,
    metricName.deaths_allod_rt_100k,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: deathsopall = getMetricOutput(
    true,
    metricName.deaths_opioidod_rt_allod,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: eng = getMetricOutput(
    true,
    metricName.ACS_PCT_LIMIT_ENGLISH,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: esp = getMetricOutput(
    true,
    metricName.ACS_PCT_SPANISH,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: otherLang = getMetricOutput(
    true,
    metricName.ACS_PCT_OTH_LANG,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: gap_curr = getMetricOutput(
    false,
    metricName.gap_current,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );
  $: cap_curr = getMetricOutput(
    false,
    metricName.capacity_current,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: methadone = getMetricOutput(
    false,
    metricName.methadone_rt,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: bupP = getMetricOutput(
    false,
    metricName.bup_patients,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: prescriber = getMetricOutput(
    true,
    metricName.prescriber,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: waiver = getMetricOutput(
    true,
    metricName.perc_waiver_DEA,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: activeprx30 = getMetricOutput(
    true,
    metricName.activeprx30,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: activeprx100 = getMetricOutput(
    true,
    metricName.activeprx100,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: activeprx275 = getMetricOutput(
    true,
    metricName.activeprx275,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: OUDnum = getMetricOutput(
    true,
    metricName.OUD_num,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: OUDstate = getMetricOutput(
    true,
    metricName.OUD_state,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: driveM = getMetricOutput(
    true,
    metricName.drivetime_methadone,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: transitM = getMetricOutput(
    true,
    metricName.transittime_methadone,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: driveB = getMetricOutput(
    true,
    metricName.drivetime_bup,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: transitB = getMetricOutput(
    true,
    metricName.transittime_bup,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  const getMetricOutput = (noYear, metric, metricData, year) => {
    const metricFinal = noYear ? metric : `${metric}_${year}m`;
    // : `${metric}_${$submitted ? year : 12}m`;
    return metricData[metricFinal];
  };
</script>

<section class="main-selection">
  <div class="wrapper">
    <h3 id="main-selection-title">
      {isStateView ? $selectedState : $selectedCounty}
    </h3>
    <div class="buttons-wrapper">
      <Button id={"download"} text={"Download data"} />
      <Button id={"print"} text={"Print page"} />
    </div>
    <div class={isStateView ? "tab-wrapper" : ""}>
      <Tab id="stateview" text="State view" />
      <Tab id="countyview" text="County view" />
    </div>
  </div>
  <div class="wrapper">
    <Dropdown />
  </div>
  <div class="wrapper">
    <Viz />
    <OptionsPanel />
  </div>
</section>

<section class="map-view">
  <div class="wrapper">
    <div class="left-wrapper" bind:clientWidth={width}>
      <div>
        <h4>Where people with opioid use disorder are receiving treatment</h4>
        <Map {data} />
      </div>
      {#if $stateMetricData && $countyMetricData}
        <h4>Overdose deaths</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {deathall}
            </span>people die of overdoses each year (per 100,000 residents)
          </p>
          <p>
            <span class="number">
              {deathsop}
            </span> people die of opioid-related overdoses each year (per 100,000
            residents)
          </p>
          <p>
            <span class="number">
              {deathsopall}
            </span> percent of overdose deaths are opioid related
          </p>
        </div>
        <h4>Language characteristics</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {eng}
            </span>
            percent of the population speaks limited English
          </p>
          <p>
            <span class="number">
              {esp}
            </span> percent of the population speaks Spanish
          </p>
          <p>
            <span class="number">
              {otherLang}
            </span> percent of the population speaks another language
          </p>
        </div>
      {/if}
    </div>

    <div class="right-wrapper" bind:clientWidth={width}>
      {#if $stateMetricData && $countyMetricData}
        <h4>Access to treatment</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {gap_curr}
            </span> people lack access to treatment
          </p>
          <p>
            <span class="number">
              {cap_curr}
            </span> people have access to treatment
          </p>
          <p>
            <span class="number">
              {isStateView
                ? $stateMetricData.OTPcount
                : $countyMetricData[0].OTPcount}</span
            > opioid treatment programs operate
          </p>
          <p>
            <span class="number">
              {methadone}
            </span> patients receive methadone at an opioid treatment program (per
            100,000 residents)
          </p>
          <p>
            <span class="number">
              {bupP}
            </span> patients receive buprenorphine at an opioid treatment program
            (per 100,000 residents)
          </p>
        </div>
        <h4>Prescribers and potential patient caseloads</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {prescriber}
            </span>
            prescribers practice in the {isStateView ? "state" : "county"}
          </p>
          <p>
            <span class="number">
              {waiver}
            </span> percent of prescribers have a buprenorphine waiver
          </p>
          <p>
            <span class="number">
              {activeprx30}
            </span> active buprenorphine prescribers had a 30-patient limit in January
            2023
          </p>
          <p>
            <span class="number">
              {activeprx100}
            </span> active buprenorphine prescribers had a 100-patient limit in January
            2023
          </p>
          <p>
            <span class="number">
              {activeprx275}
            </span> active buprenorphine prescribers had a 275-patient limit in January
            2023
          </p>
        </div>

        <h4>Opioid use disorder</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {OUDnum}
            </span>
            state residents (
            {OUDstate}
            percent) have opioid use disorder
          </p>
        </div>

        <h4>Transportation characteristics</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {driveM}
            </span> minutes is the average driving time to the nearest opioid treatment
            program for methadone treatment
          </p>
          <p>
            <span class="number">
              {transitM}
            </span>
            minutes is the average travel time via public transit to nearest opioid
            treatment program for methadone treatment
          </p>
          <p>
            <span class="number">
              {driveB}
            </span> minutes is the average driving time to the nearest buprenorphine
            treatment
          </p>
          <p>
            <span class="number">
              {transitB}
            </span> minutes is the average travel time via public transit to the
            nearest buprenorphine treatment
          </p>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  /* MAIN VIZ */

  .main-selection {
    background-color: #fff;
    margin: 0px;
    padding: 10px 40px;
  }

  .main-selection .wrapper {
    display: grid;
    /* minmax() helps these columns stay responsive even with SVGs with hard-coded widths inside them*/
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    column-gap: 10px;
  }

  .map-view {
    background-color: #fff;
    margin: 0px;
    padding: 10px 40px;
  }

  .map-view .wrapper {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 20px;
  }

  @media screen and (max-width: 600px) {
    .map-view .wrapper {
      grid-template-columns: 1fr;
      column-gap: 0px;
    }
  }

  h3 {
    font-size: 1.4rem;
    max-width: 650px;
    font-weight: 600;
    margin: 20px 0px;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 400;
  }

  p {
    font-size: 0.8rem;
  }

  .number {
    font-size: 0.9rem;
    font-weight: 700;
  }

  .buttons-wrapper {
    text-align: left;
    padding: 0px 30px;
  }

  .tab-wrapper {
    margin-bottom: 30px;
  }

  .text-wrapper {
    border-left: 14px solid #fdbf11;
    padding-left: 20px;
  }
</style>
