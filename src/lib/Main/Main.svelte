<script>
  import Button from "./Button.svelte";
  import Tab from "./Tab.svelte";
  import Dropdown from "./Dropdown.svelte";
  import Viz from "./Viz.svelte";
  import ToggleSelect from "./ToggleSelect.svelte";
  import Map from "./Map.svelte";
  import {
    selectedState,
    stateMetricData,
    selectedYear,
  } from "../../store/store";

  let width = 100;
  let height = 100;

  export let data;
  $: console.log($stateMetricData);
</script>

<section class="main-selection">
  <div class="wrapper">
    <h3 id="main-selection-title">{$selectedState}</h3>
    <div class="buttons-wrapper">
      <Button id={"download"} text={"Download data"} />
      <Button id={"print"} text={"Print page"} />
    </div>
    <div class="tab-wrapper">
      <Tab id="stateview" text="State view" />
      <Tab id="countyview" text="County view" />
    </div>
  </div>
  <div class="wrapper">
    <Dropdown />
  </div>
  <div class="wrapper">
    <Viz />
    <ToggleSelect />
  </div>
</section>
<section class="map-view">
  <div class="wrapper">
    <div class="left-wrapper">
      <div bind:clientWidth={width} bind:clientHeight={height}>
        <h4>Where people with opioid use disorder are receiving treatment</h4>
        <Map {data} />
      </div>
      {#if $stateMetricData}
        <h4>Overdose deaths</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">{$stateMetricData.deaths_allod_rt_100k}</span> people
            die of overdoses each year (per 100,000 residents)
          </p>
          <p>
            <span class="number"
              >{$stateMetricData.deaths_opioidod_rt_100k}</span
            > people die of opioid-related overdoses each year (per 100,000 residents)
          </p>
          <p>
            <span class="number"
              >{$stateMetricData.deaths_opioidod_rt_allod}</span
            > percent of overdose deaths are opioid related
          </p>
        </div>
        <h4>Language characteristics</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">{$stateMetricData.ACS_PCT_LIMIT_ENGLISH}</span>
            percent of the population speaks limited English
          </p>
          <p>
            <span class="number">{$stateMetricData.ACS_PCT_OTH_LANG}</span> percent
            of the population speaks Spanish
          </p>
          <p>
            <span class="number">{$stateMetricData.ACS_PCT_SPANISH}</span> percent
            of the population speaks another language
          </p>
        </div>
      {/if}
    </div>

    <div class="right-wrapper">
      {#if $stateMetricData}
        <h4>Access to treatment</h4>
        <div class="text-wrapper">
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? $stateMetricData.gap_current_12m
                : $stateMetricData.gap_current_6m}</span
            > OTPs operate in the state
          </p>
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? $stateMetricData.capacity_current_12m
                : $stateMetricData.capacity_current_6m}</span
            > patients receive methadone at an OTP in the state (per 100,000 residents)
          </p>
          <p>
            <span class="number">{$stateMetricData.OTPcount}</span> patients receive
            buprenorphine (per 100,000 residents)
          </p>
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? $stateMetricData.methadone_rt_12m
                : $stateMetricData.methadone_rt_6m}</span
            > people lack access to treatment
          </p>
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? $stateMetricData.bup_patients_rt_12m
                : $stateMetricData.bup_patients_rt_6m}</span
            > people have access to treatment
          </p>
        </div>
        <h4>Prescribers and potential patient caseloads</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">{$stateMetricData.prescriber}</span> prescribers
            practice in the state
          </p>
          <p>
            <span class="number">{$stateMetricData.perc_waiver_DEA}</span> prescribers
            have a buprenorphine waiver
          </p>
          <p>
            <span class="number">{$stateMetricData.activeprx30}</span> active buprenorphine
            prescribers had a 30-patient limit in January 2023
          </p>
          <p>
            <span class="number">{$stateMetricData.activeprx100}</span> active buprenorphine
            prescribers had a 100-patient limit in January 2023
          </p>
          <p>
            <span class="number">{$stateMetricData.activeprx275}</span> active buprenorphine
            prescribers had a 275-patient limit in January 2023
          </p>
        </div>
        <h4>Transportation characteristics</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">{$stateMetricData.drivetime_methadone}</span> minutes
            is the average driving time to the nearest opioid treatment program for
            methadone treatment
          </p>
          <p>
            <span class="number">{$stateMetricData.transittime_methadone}</span>
            minutes is the average travel time via public transit to nearest opioid
            treatment program for methadone treatment
          </p>
          <p>
            <span class="number">{$stateMetricData.drivetime_bup}</span> minutes
            is the average driving time to the nearest buprenorphine treatment
          </p>
          <p>
            <span class="number">{$stateMetricData.transittime_bup}</span> aminutes
            is the average travel time via public transit to the nearest buprenorphine
            treatment
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
    grid-template-columns: 3fr 2fr;
    column-gap: 10px;
  }

  .map-view {
    background-color: #fff;
    margin: 0px;
    padding: 10px 40px;
  }

  .map-view .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
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
    display: flex;
    gap: 32px;
  }

  .text-wrapper {
    border-left: 14px solid #fdbf11;
    padding-left: 20px;
  }
</style>
