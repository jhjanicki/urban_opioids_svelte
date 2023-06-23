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

	// adding extra arguments so that the values that change can be passed down to the function rather than referenced inside
  const getMetricOutput = (noYear, metric, metricData) => {
    //get metric given selected state / county and year
    let metricFinal;
    if (!noYear) {
      metricFinal = `${metric}_${$submitted ? $selectedYear : 12}m`;
    } else {
      metricFinal = `${metric}`;
    }
		return metricData[metricFinal];
	}


	// storing the result of isStateView so you don't have to keep checking it throughout the template
	$: isStateView = $stateView == "stateview";
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

<!-- getMetricOutput(true, "deaths_allod_rt_100k") -->
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
              >{isStateView
                ? $stateMetricData.deaths_allod_rt_100k
                : $countyMetricData[0].deaths_allod_rt_100k} /
							{#if isStateView}
								{getMetricOutput(true, "deaths_allod_rt_100k", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "deaths_allod_rt_100k", $countyMetricData[0])}
							{/if}
             </span>people die of overdoses each year (per 100,000 residents)
          </p>
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.deaths_opioidod_rt_100k
                : $countyMetricData[0].deaths_opioidod_rt_100k} /
							{#if isStateView}
								{getMetricOutput(true, "deaths_opioidod_rt_100k", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "deaths_opioidod_rt_100k", $countyMetricData[0])}
							{/if}
            </span> people die of opioid-related overdoses each year (per 100,000 residents)
          </p>
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.deaths_opioidod_rt_allod
                : $countyMetricData[0].deaths_opioidod_rt_allod} /
							{#if isStateView}
								{getMetricOutput(true, "deaths_opioidod_rt_allod", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "deaths_opioidod_rt_allod",$countyMetricData[0])}
							{/if}
							</span> percent of overdose deaths are opioid related
          </p>
        </div>
        <h4>Language characteristics</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {isStateView
                ? $stateMetricData.ACS_PCT_LIMIT_ENGLISH
                : $countyMetricData[0].ACS_PCT_LIMIT_ENGLISH} /
							{#if isStateView}
								{getMetricOutput(true, "ACS_PCT_LIMIT_ENGLISH", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "ACS_PCT_LIMIT_ENGLISH", $countyMetricData[0])}
							{/if}
							</span>
            percent of the population speaks limited English
          </p>
          <p>
            <span class="number">
              {isStateView
                ? $stateMetricData.ACS_PCT_SPANISH
                : $countyMetricData[0].ACS_PCT_SPANISH} /
							{#if isStateView}
								{getMetricOutput(true, "ACS_PCT_SPANISH", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "ACS_PCT_SPANISH", $countyMetricData[0])}
							{/if}
							</span> percent of the population speaks Spanish
          </p>
          <p>
            <span class="number">
              {isStateView
                ? $stateMetricData.ACS_PCT_OTH_LANG
                : $countyMetricData[0].ACS_PCT_OTH_LANG} /
							{#if isStateView}
								{getMetricOutput(true, "ACS_PCT_OTH_LANG", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "ACS_PCT_OTH_LANG", $countyMetricData[0])}
							{/if}
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
            <span class="number"
              >{$selectedYear === 12
                ? isStateView
                  ? $stateMetricData.gap_current_12m
                  : $countyMetricData[0].gap_current_12m
                : isStateView
                ? $stateMetricData.gap_current_6m
                : $countyMetricData[0].gap_current_6m}/
							{#if isStateView}
								{getMetricOutput(false, "gap_current", $stateMetricData)}
							{:else}
								{getMetricOutput(false, "gap_current", $countyMetricData[0])}
							{/if}
            </span> people lack access to treatment
          </p>
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? isStateView
                  ? $stateMetricData.capacity_current_12m
                  : $countyMetricData[0].capacity_current_12m
                : isStateView
                ? $stateMetricData.capacity_current_6m
                : $countyMetricData[0].capacity_current_6m}/
							{#if isStateView}
								{getMetricOutput(false, "capacity_current", $stateMetricData)}
							{:else}
								{getMetricOutput(false, "capacity_current", $countyMetricData[0])}
							{/if}
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
            <span class="number"
              >{$selectedYear === 12
                ? isStateView
                  ? $stateMetricData.methadone_rt_12m
                  : $countyMetricData[0].methadone_rt_12m
                : isStateView
                ? $stateMetricData.methadone_rt_6m
                : $countyMetricData[0].methadone_rt_6m} /
							{#if isStateView}
								{getMetricOutput(false, "methadone_rt", $stateMetricData)}
							{:else}
								{getMetricOutput(false, "methadone_rt", $countyMetricData[0])}
							{/if}
            </span> patients receive methadone at an opioid treatment program (per 100,000
            residents)
          </p>
          <p>
            <span class="number"
              >{$selectedYear === 12
                ? isStateView
                  ? $stateMetricData.bup_patients_12m
                  : $countyMetricData[0].bup_patients_12m
                : isStateView
                ? $stateMetricData.bup_patients_6m
                : $countyMetricData[0].bup_patients_6m} /
							{#if isStateView}
								{getMetricOutput(false, "bup_patients", $stateMetricData)}
							{:else}
								{getMetricOutput(false, "bup_patients", $countyMetricData[0])}
							{/if}
            </span> patients receive buprenorphine at an opioid treatment program (per
            100,000 residents)
          </p>
        </div>
        <h4>Prescribers and potential patient caseloads</h4>
        <div class="text-wrapper">
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.prescriber
                : $countyMetricData[0].prescriber} /
							{#if isStateView}
								{getMetricOutput(true, "prescriber", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "prescriber", $countyMetricData[0])}
							{/if}
            </span>
            prescribers practice in the {isStateView
              ? "state"
              : "county"}
          </p>
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.perc_waiver_DEA
                : $countyMetricData[0].perc_waiver_DEA} /
							{#if isStateView}
								{getMetricOutput(true, "perc_waiver_DEA", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "perc_waiver_DEA", $countyMetricData[0])}
							{/if}
            </span> prescribers have a buprenorphine waiver
          </p>
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.activeprx30
                : $countyMetricData[0].activeprx30} /
							{#if isStateView}
								{getMetricOutput(true, "activeprx30", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "activeprx30", $countyMetricData[0])}
							{/if}
            </span> active buprenorphine prescribers had a 30-patient limit in January
            2023
          </p>
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.activeprx100
                : $countyMetricData[0].activeprx100}/
							{#if isStateView}
								{getMetricOutput(true, "activeprx100", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "activeprx100", $countyMetricData[0])}
							{/if}
            </span> active buprenorphine prescribers had a 100-patient limit in January
            2023
          </p>
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.activeprx275
                : $countyMetricData[0].activeprx275}/
							{#if isStateView}
								{getMetricOutput(true, "activeprx275", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "activeprx275", $countyMetricData[0])}
							{/if}
            </span> active buprenorphine prescribers had a 275-patient limit in January
            2023
          </p>
        </div>

        <h4>Opioid use disorder</h4>
        <div class="text-wrapper">
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.OUD_num
                : $countyMetricData[0].OUD_num}/
							{#if isStateView}
								{getMetricOutput(true, "OUD_num", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "OUD_num", $countyMetricData[0])}
							{/if}
            </span>
            {isStateView ? "state" : "county"}
            residents ({isStateView
              ? $stateMetricData.OUD_state
              : $countyMetricData[0].OUD_state}/
							{#if isStateView}
								{getMetricOutput(true, "OUD_state", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "OUD_state", $countyMetricData[0])}
							{/if}
          </p>
        </div>

        <h4>Transportation characteristics</h4>
        <div class="text-wrapper">
          <p>
            <span class="number">
              {isStateView
                ? $stateMetricData.drivetime_methadone
                : $countyMetricData[0].drivetime_methadone}/
							{#if isStateView}
								{getMetricOutput(true, "drivetime_methadone", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "drivetime_methadone", $countyMetricData[0])}
							{/if}
            </span> minutes is the average driving time to the nearest opioid treatment
            program for methadone treatment
          </p>
          <p>
            <span class="number">
              {isStateView
                ? $stateMetricData.transittime_methadone
                : $countyMetricData[0].transittime_methadone}/
							{#if isStateView}
								{getMetricOutput(true, "transittime_methadone", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "transittime_methadone", $countyMetricData[0])}
							{/if}
            </span>
            minutes is the average travel time via public transit to nearest opioid
            treatment program for methadone treatment
          </p>
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.drivetime_bup
                : $countyMetricData[0].drivetime_bup}/
							{#if isStateView}
								{getMetricOutput(true, "drivetime_bup", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "drivetime_bup", $countyMetricData[0])}
							{/if}
            </span> minutes is the average driving time to the nearest buprenorphine treatment
          </p>
          <p>
            <span class="number"
              >{isStateView
                ? $stateMetricData.transittime_bup
                : $countyMetricData[0].transittime_bup}/
							{#if isStateView}
								{getMetricOutput(true, "transittime_bup", $stateMetricData)}
							{:else}
								{getMetricOutput(true, "transittime_bup", $countyMetricData[0])}
							{/if}
            </span> aminutes is the average travel time via public transit to the nearest
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
