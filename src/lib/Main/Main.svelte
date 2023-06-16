<script>
  import Button from "./Button.svelte";
  import Tab from "./Tab.svelte";
  import Dropdown from "./Dropdown.svelte";
  import Viz from "./Viz.svelte";
  import OptionsSection from "./OptionsSection.svelte";
  import Map from "./Map.svelte";
  import {
    selectedState,
    selectedCounty,
    stateMetricData,
    countyMetricData,
    selectedYear,
    stateView,
  } from "../../store/store";

  export let data;

  let width; //if I change to $: it doesn't work

  function getNumber(noYear, metric) {
    //get metric given selected state / county and year
    let metricFinal;
    if (!noYear) {
      metricFinal = `${metric}_${$selectedYear}m`;
    } else {
      metricFinal = `${metric}`;
    }
    if ($stateView === "stateview") {
      return $stateMetricData[metricFinal];
    } else {
      return $countyMetricData[0][metricFinal];
    }
  }
</script>

<section class="main-selection">
  <div class="wrapper">
    <h3 id="main-selection-title">
      {$stateView === "stateview" ? $selectedState : $selectedCounty}
    </h3>
    <div class="buttons-wrapper">
      <Button id={"download"} text={"Download data"} />
      <Button id={"print"} text={"Print page"} />
    </div>
    <div class={$stateView === "stateview" ? "tab-wrapper" : "tab-wrapper2"}>
      <Tab id="stateview" text="State view" />
      <Tab id="countyview" text="County view" />
    </div>
  </div>
  <div class="wrapper">
    <Dropdown />
  </div>
  <div class="wrapper">
    <Viz />
    <OptionsSection />
  </div>
</section>

<!-- getNumber(true, "deaths_allod_rt_100k") -->
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
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.deaths_allod_rt_100k
                : $countyMetricData[0].deaths_allod_rt_100k} /
              {getNumber(true, "deaths_allod_rt_100k")}</span
            > people die of overdoses each year (per 100,000 residents)
          </p>
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.deaths_opioidod_rt_100k
                : $countyMetricData[0].deaths_opioidod_rt_100k} /
              {getNumber(true, "deaths_opioidod_rt_100k")}</span
            > people die of opioid-related overdoses each year (per 100,000 residents)
          </p>
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.deaths_opioidod_rt_allod
                : $countyMetricData[0].deaths_opioidod_rt_allod} /
              {getNumber(true, "deaths_opioidod_rt_allod")}</span
            > percent of overdose deaths are opioid related
          </p>
        </div>
        <h4>Language characteristics</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {$stateView === "stateview"
                ? $stateMetricData.ACS_PCT_LIMIT_ENGLISH
                : $countyMetricData[0].ACS_PCT_LIMIT_ENGLISH} /
              {getNumber(true, "ACS_PCT_LIMIT_ENGLISH")}</span
            >
            percent of the population speaks limited English
          </p>
          <p>
            <span class="number">
              {$stateView === "stateview"
                ? $stateMetricData.ACS_PCT_SPANISH
                : $countyMetricData[0].ACS_PCT_SPANISH} /
              {getNumber(true, "ACS_PCT_SPANISH")}</span
            > percent of the population speaks Spanish
          </p>
          <p>
            <span class="number">
              {$stateView === "stateview"
                ? $stateMetricData.ACS_PCT_OTH_LANG
                : $countyMetricData[0].ACS_PCT_OTH_LANG} /
              {getNumber(true, "ACS_PCT_OTH_LANG")}</span
            > percent of the population speaks another language
          </p>
        </div>
      {/if}
    </div>

    <div class="right-wrapper" bind:clientWidth={width}>
      {#if $stateMetricData && $countyMetricData}
        <h4>Access to treatment</h4>
        <div class="text-wrapper">
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? $stateView === "stateview"
                  ? $stateMetricData.gap_current_12m
                  : $countyMetricData[0].gap_current_12m
                : $stateView === "stateview"
                ? $stateMetricData.gap_current_6m
                : $countyMetricData[0].gap_current_6m}/
              {getNumber(false, "gap_current")}</span
            > people lack access to treatment
          </p>
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? $stateView === "stateview"
                  ? $stateMetricData.capacity_current_12m
                  : $countyMetricData[0].capacity_current_12m
                : $stateView === "stateview"
                ? $stateMetricData.capacity_current_6m
                : $countyMetricData[0].capacity_current_6m}/
              {getNumber(false, "capacity_current")}</span
            > people have access to treatment
          </p>
          <p>
            <span class="number">
              {$stateView === "stateview"
                ? $stateMetricData.OTPcount
                : $countyMetricData[0].OTPcount}</span
            > opioid treatment programs operate
          </p>
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? $stateView === "stateview"
                  ? $stateMetricData.methadone_rt_12m
                  : $countyMetricData[0].methadone_rt_12m
                : $stateView === "stateview"
                ? $stateMetricData.methadone_rt_6m
                : $countyMetricData[0].methadone_rt_6m} /
              {getNumber(false, "methadone_rt")}</span
            > patients receive methadone at an opioid treatment program (per 100,000
            residents)
          </p>
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? $stateView === "stateview"
                  ? $stateMetricData.bup_patients_12m
                  : $countyMetricData[0].bup_patients_12m
                : $stateView === "stateview"
                ? $stateMetricData.bup_patients_6m
                : $countyMetricData[0].bup_patients_6m} /
              {getNumber(false, "bup_patients")}</span
            > patients receive buprenorphine at an opioid treatment program (per
            100,000 residents)
          </p>
        </div>
        <h4>Prescribers and potential patient caseloads</h4>
        <div class="text-wrapper">
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.prescriber
                : $countyMetricData[0].prescriber} /
              {getNumber(true, "prescriber")}</span
            >
            prescribers practice in the {$stateView === "stateview"
              ? "state"
              : "county"}
          </p>
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.perc_waiver_DEA
                : $countyMetricData[0].perc_waiver_DEA} /
              {getNumber(true, "perc_waiver_DEA")}</span
            > prescribers have a buprenorphine waiver
          </p>
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.activeprx30
                : $countyMetricData[0].activeprx30} /
              {getNumber(true, "activeprx30")}</span
            > active buprenorphine prescribers had a 30-patient limit in January
            2023
          </p>
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.activeprx100
                : $countyMetricData[0].activeprx100}/
              {getNumber(true, "activeprx100")}</span
            > active buprenorphine prescribers had a 100-patient limit in January
            2023
          </p>
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.activeprx275
                : $countyMetricData[0].activeprx275}/
              {getNumber(true, "activeprx275")}</span
            > active buprenorphine prescribers had a 275-patient limit in January
            2023
          </p>
        </div>

        <h4>Opioid use disorder</h4>
        <div class="text-wrapper">
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.OUD_num
                : $countyMetricData[0].OUD_num}/
              {getNumber(true, "OUD_num")}</span
            >
            {$stateView === "stateview" ? "state" : "county"}
            residents ({$stateView === "stateview"
              ? $stateMetricData.OUD_state
              : $countyMetricData[0].OUD_state}/
            {getNumber(true, "OUD_state")} percent) have opioid use disorder
          </p>
        </div>

        <h4>Transportation characteristics</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {$stateView === "stateview"
                ? $stateMetricData.drivetime_methadone
                : $countyMetricData[0].drivetime_methadone}/
              {getNumber(true, "drivetime_methadone")}</span
            > minutes is the average driving time to the nearest opioid treatment
            program for methadone treatment
          </p>
          <p>
            <span class="number">
              {$stateView === "stateview"
                ? $stateMetricData.transittime_methadone
                : $countyMetricData[0].transittime_methadone}/
              {getNumber(true, "transittime_methadone")}</span
            >
            minutes is the average travel time via public transit to nearest opioid
            treatment program for methadone treatment
          </p>
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.drivetime_bup
                : $countyMetricData[0].drivetime_bup}/
              {getNumber(true, "drivetime_bup")}</span
            > minutes is the average driving time to the nearest buprenorphine treatment
          </p>
          <p>
            <span class="number"
              >{$stateView === "stateview"
                ? $stateMetricData.transittime_bup
                : $countyMetricData[0].transittime_bup}/
              {getNumber(true, "transittime_bup")}</span
            > aminutes is the average travel time via public transit to the nearest
            buprenorphine treatment
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
    display: flex;
    gap: 32px;
  }

  .tab-wrapper2 {
    display: flex;
    gap: 32px;
  }

  .text-wrapper {
    border-left: 14px solid #fdbf11;
    padding-left: 20px;
  }
</style>
