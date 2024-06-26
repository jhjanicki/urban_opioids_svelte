<script>
  import Button from "./Button.svelte";
  import Tab from "./Tab.svelte";
  import Dropdown from "./Dropdown.svelte";
  import Viz from "./Bar/Viz.svelte";
  import OptionsPanel from "./Toggles/OptionsPanel.svelte";
  import Map from "./Map/Map.svelte";
  import {
    countySelected,
    selectedState,
    selectedCounty,
    stateMetricData,
    countyMetricData,
    selectedYear,
    stateView,
    print,
  } from "../../store/store";
  import { numberWithCommas } from "../utils";

  export let data;
  let width;

  $: isStateView =
    $stateView === "stateview" ||
    ($stateView === "countyview" && !$countySelected);

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
    bup_patients: "bup_patients_rt",
    prescriber: "prescriber",
    perc_waiver_DEA: "perc_waiver_DEA",
    activeprx30: "activeprx30",
    activeprx100: "activeprx100",
    activeprx275: "activeprx275",
    OUD_num: "OUD_num",
    OUD: "OUD",
    drivetime_methadone: "drivetime_methadone",
    transittime_methadone: "transittime_methadone",
    drivetime_bup: "drivetime_bup",
    transittime_bup: "transittime_bup",
    OTP_methadone: "OTP_methadone",
    OTPcount_nbrs: "OTPcount_nbrs",
    OTP_methadone_nbrs: "OTP_methadone_nbrs",
    OTPcount: "OTPcount",
  };

  $: deathsop = getMetricOutput(
    true,
    metricName.deaths_opioidod_rt_100k,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: deathsopState = getMetricOutput(
    true,
    metricName.deaths_opioidod_rt_100k,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: deathall = getMetricOutput(
    true,
    metricName.deaths_allod_rt_100k,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: deathallState = getMetricOutput(
    true,
    metricName.deaths_allod_rt_100k,
    $stateMetricData
  ); // to store state level comparison for when a county is selected

  $: deathsopall = getMetricOutput(
    true,
    metricName.deaths_opioidod_rt_allod,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: deathsopallState = getMetricOutput(
    true,
    metricName.deaths_opioidod_rt_allod,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: eng = getMetricOutput(
    true,
    metricName.ACS_PCT_LIMIT_ENGLISH,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: engState = getMetricOutput(
    true,
    metricName.ACS_PCT_LIMIT_ENGLISH,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: esp = getMetricOutput(
    true,
    metricName.ACS_PCT_SPANISH,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: espState = getMetricOutput(
    true,
    metricName.ACS_PCT_SPANISH,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: otherLang = getMetricOutput(
    true,
    metricName.ACS_PCT_OTH_LANG,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: otherLangState = getMetricOutput(
    true,
    metricName.ACS_PCT_OTH_LANG,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: gap_curr = getMetricOutput(
    false,
    metricName.gap_current,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: gap_currState = getMetricOutput(
    false,
    metricName.gap_current,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: cap_curr = getMetricOutput(
    false,
    metricName.capacity_current,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: cap_currState = getMetricOutput(
    false,
    metricName.capacity_current,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: methadone = getMetricOutput(
    false,
    metricName.methadone_rt,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: methadoneState = getMetricOutput(
    false,
    metricName.methadone_rt,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: bupP = getMetricOutput(
    false,
    metricName.bup_patients,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: bupPState = getMetricOutput(
    false,
    metricName.bup_patients,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: OTPcount = getMetricOutput(
    true,
    metricName.OTPcount,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: OTPcountState = getMetricOutput(
    true,
    metricName.OTPcount,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: prescriber = getMetricOutput(
    true,
    metricName.prescriber,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: prescriberState = getMetricOutput(
    true,
    metricName.prescriber,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: waiver = getMetricOutput(
    true,
    metricName.perc_waiver_DEA,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: waiverState = getMetricOutput(
    true,
    metricName.perc_waiver_DEA,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: activeprx30 = getMetricOutput(
    true,
    metricName.activeprx30,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: activeprx30State = getMetricOutput(
    true,
    metricName.activeprx30,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: activeprx100 = getMetricOutput(
    true,
    metricName.activeprx100,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: activeprx100State = getMetricOutput(
    true,
    metricName.activeprx100,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: activeprx275 = getMetricOutput(
    true,
    metricName.activeprx275,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: activeprx275State = getMetricOutput(
    true,
    metricName.activeprx275,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: OUDnum = getMetricOutput(
    true,
    metricName.OUD_num,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: OUD = getMetricOutput(
    true,
    metricName.OUD,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: driveM = getMetricOutput(
    true,
    metricName.drivetime_methadone,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: getHour = (num) => {
    return num >= 60
      ? `[${Math.floor(num / 60)} hour${
          Math.floor(num / 60) > 1 ? "s" : ""
        } and ${num % 60} minute${Math.floor(num % 60) > 1 ? "s" : ""}]`
      : "";
  };

  $: driveMState = getMetricOutput(
    true,
    metricName.drivetime_methadone,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: transitM = getMetricOutput(
    true,
    metricName.transittime_methadone,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: transitMState = getMetricOutput(
    true,
    metricName.transittime_methadone,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: driveB = getMetricOutput(
    true,
    metricName.drivetime_bup,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: driveBState = getMetricOutput(
    true,
    metricName.drivetime_bup,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: transitB = getMetricOutput(
    true,
    metricName.transittime_bup,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: transitBState = getMetricOutput(
    true,
    metricName.transittime_bup,
    $stateMetricData,
    year
  ); // to store state level comparison for when a county is selected

  $: OTP_methadone = getMetricOutput(
    false,
    metricName.OTP_methadone,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: OTPcount_nbrs = getMetricOutput(
    true,
    metricName.OTPcount_nbrs,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  $: OTP_methadone_nbrs = getMetricOutput(
    true,
    metricName.OTP_methadone_nbrs,
    isStateView ? $stateMetricData : $countyMetricData[0],
    year
  );

  const getMetricOutput = (noYear, metric, metricData, year) => {
    const metricFinal = noYear ? metric : `${metric}_${year}m`;
    return metricData[metricFinal];
  };

  let innerWidth = 0;
  let innerHeight = 0;

  const togglePrintView = () => {
    $print = !$print;
  };
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<section class="mainSelection" class:print={$print}>
  <div class={$print ? "" : "none"}>
    <Button id={"print"} text={"Back to app"} on:click={togglePrintView} />
  </div>
  <div class="wrapper">
    <h3 id="mainTitle">
      {#if $print}
        {isStateView
          ? $selectedState
          : `${$selectedCounty} county, ${$selectedState}`}
      {:else}
        {isStateView ? $selectedState : $selectedCounty}
      {/if}
    </h3>
    <div class={innerWidth <= 1000 || $print ? "none" : "buttonsWrapper"}>
      <Button id={"download"} text={"Download data"} />
      <Button id={"print"} text={"Print page"} on:click={togglePrintView} />
    </div>
  </div>
  <div class="wrapper" id="tabWrapper">
    <div class="tabs">
      <Tab id="stateview" text="State view" />
      <Tab id="countyview" text="County view" />
    </div>
  </div>
  <div class="wrapper" id="dropdownWrapper">
    <Dropdown />
  </div>
  <div class="wrapper">
    <Viz />
    <div id="optionsWrapper">
      <OptionsPanel />
    </div>
  </div>
</section>

<section class="mapView" class:print={$print}>
  <div class="wrapper">
    <h4 id="treatmentLength">
      TREATMENT LENGTH: {$selectedYear} MONTH
    </h4>
  </div>
  <div class="wrapper">
    <div class="left-wrapper" bind:clientWidth={width}>
      <h4 id="mapTitle">
        Where people with opioid use disorder are receiving treatment
      </h4>
      <div class="mapWrapper">
        <Map {data} />
      </div>
      <div class="statsWrapper">
        {#if $stateMetricData && $countyMetricData}
          <h4>Opioid use disorder</h4>
          <div class="textWrapper">
            <p>
              <span class="number">
                {numberWithCommas(OUDnum)}
              </span>
              residents ({OUD}
              percent) are estimated to have opioid use disorder
            </p>
          </div>
          <h4>Overdose deaths</h4>
          <div class="textWrapper">
            <p>
              <span class="number">
                {deathall}
              </span>{isStateView
                ? "residents die of overdoses each year (per 100,000 residents)"
                : `residents die of overdoses per year per 100,000 residents (state average: ${deathallState})`}
            </p>
            <p>
              <span class="number">
                {deathsop}
              </span>
              {isStateView
                ? "residents die of opioid-related overdoses each year (per 100,000 residents)"
                : `overdose deaths per year per 100,000 residents are opioid related (state average: ${deathsopState})`}
            </p>
            <p>
              <span class="number">
                {deathsopall}
              </span>
              {isStateView
                ? "percent of overdose deaths in the state are opioid related"
                : `percent of all overdose deaths in the county are opioid related (state average: ${deathsopallState})`}
            </p>
          </div>
          <h4>Language characteristics</h4>
          <div class="textWrapper">
            <p>
              <span class="number">
                {eng}
              </span>
              {@html isStateView
                ? "percent of residents speak <a href='https://www.census.gov/topics/population/language-use/about/faqs.html' target='_blank'>limited English</a>"
                : `percent of residents speak  <a href='https://www.census.gov/topics/population/language-use/about/faqs.html' target='_blank'>limited English</a> (state average: ${engState})`}
            </p>
            <p>
              <span class="number">
                {esp}
              </span>
              {isStateView
                ? "percent of residents speak Spanish"
                : `percent of residents speak Spanish (state average: ${espState})`}
            </p>
            <p>
              <span class="number">
                {otherLang}
              </span>
              {isStateView
                ? "percent of residents speak a language other than English or Spanish"
                : `percent of residents speak a language other than English or Spanish (state average: ${otherLangState})`}
            </p>
          </div>
        {/if}
      </div>
    </div>

    <div class="right-wrapper" bind:clientWidth={width}>
      <div class="statsWrapper">
        {#if $stateMetricData && $countyMetricData}
          <h4>Access to treatment</h4>
          <div class="textWrapper">
            <p>
              <span class="number">
                {numberWithCommas(gap_curr)}
              </span>
              {isStateView
                ? "residents lack access to medication treatment"
                : `residents lack access to treatment (state total: ${gap_currState})`}
            </p>
            <p>
              <span class="number">
                {numberWithCommas(cap_curr)}
              </span>{isStateView
                ? "residents have access to medication treatment"
                : `residents have access to treatment (state total: ${cap_currState})`}
            </p>
            <p>
              <span class="number">
                {OTPcount}
              </span>
              {isStateView
                ? "opioid treatment programs operate in the state"
                : `opioid treatment programs operate in the county (state total: ${OTPcountState})`}
            </p>
            <p>
              <span class="number">
                {numberWithCommas(methadone)}
              </span>
              {isStateView
                ? "residents receive methadone or other medication treatment at an in-state opioid treatment program (per 100,000 residents)"
                : `residents receive methadone or other medication treatment at an opioid treatment
program per 100,000 residents (state average: ${numberWithCommas(
                    methadoneState
                  )})`}
            </p>
            <p>
              <span class="number">
                {numberWithCommas(bupP)}
              </span>
              {isStateView
                ? "residents receive buprenorphine (per 100,000 residents)"
                : `residents receive buprenorphine per 100,000 residents (state average: ${numberWithCommas(
                    bupPState
                  )})`}
            </p>

            {#if !isStateView}
              <p>
                <span class="number">
                  {numberWithCommas(OTP_methadone)}
                </span> residents receive methadone or other medication treatment
                at an opioid treatment program in the county
              </p>

              <p>
                <span class="number">
                  {OTPcount_nbrs}
                </span> opioid treatment programs are available in neighboring counties
                in the state
              </p>
              <p>
                <span class="number">
                  {numberWithCommas(OTP_methadone_nbrs)}
                </span> people receive methadone or other medication treatment at
                opioid treatment programs in neighboring counties in the state
              </p>
            {/if}
          </div>
          <h4>Prescribers and potential patient caseloads</h4>
          <div class="textWrapper">
            <p>
              <span class="number">
                {numberWithCommas(prescriber)}
              </span>
              {isStateView
                ? "prescribers practice in the state. Prescribers are all people licensed to write prescriptions"
                : `prescribers practice in the county (state total: ${numberWithCommas(
                    prescriberState
                  )}). Prescribers are all people licensed to write prescriptions`}
            </p>
            <p>
              <span class="number">
                {waiver}
              </span>
              {isStateView
                ? "percent of prescribers had a buprenorphine waiver in November 2022"
                : `percent of prescribers had a buprenorphine waiver in November 2022 (statewide percentage: ${waiverState})`}
            </p>
            <p>
              <span class="number">
                {numberWithCommas(activeprx30)}
              </span>
              {isStateView
                ? "active buprenorphine prescribers had a 30-patient limit in November 2022"
                : `active buprenorphine prescribers had a 30-patient limit in November 2022 (state total: ${numberWithCommas(
                    activeprx30State
                  )})`}
            </p>
            <p>
              <span class="number">
                {numberWithCommas(activeprx100)}
              </span>
              {isStateView
                ? "active buprenorphine prescribers had a 100-patient limit in November 2022"
                : `active buprenorphine prescribers had a 100-patient limit in November 2022 (state total: ${numberWithCommas(
                    activeprx100State
                  )})`}
            </p>
            <p>
              <span class="number">
                {numberWithCommas(activeprx275)}
              </span>
              {isStateView
                ? "active buprenorphine prescribers had a 275-patient limit in November 2022"
                : `active buprenorphine prescribers had a 275-patient limit in November 2022 (state total: ${numberWithCommas(
                    activeprx275State
                  )})`}
            </p>
          </div>

          <h4>Transportation characteristics</h4>
          <div class="textWrapper">
            <p>
              {#if driveM}
                <span class="number">
                  {driveM}
                </span>
                {isStateView
                  ? `minute${driveM % 60 > 1 ? "s" : ""} ${getHour(
                      driveM
                    )} is the average driving time to the nearest opioid treatment program for methadone treatment or other medication treatment`
                  : `minute${driveM % 60 > 1 ? "s" : ""} ${getHour(
                      driveM
                    )} is the average driving time to the nearest opioid treatment program for methadone treatment (state average: ${driveMState})`}
              {/if}
            </p>
            <p>
              {#if transitM}
                <span class="number">
                  {transitM}
                </span>
                {isStateView
                  ? `minute${transitM % 60 > 1 ? "s" : ""} ${getHour(
                      transitM
                    )} is the average travel time via public transit to nearest opioid treatment program for methadone treatment or other medication treatment`
                  : `minute${transitM % 60 > 1 ? "s" : ""} ${getHour(
                      transitM
                    )} is the average travel time via public transit to nearest opioid treatment program for methadone treatment (state average: ${transitMState})`}
              {/if}
            </p>
            <p>
              {#if driveB}
                <span class="number">
                  {driveB}
                </span>
                {isStateView
                  ? `minute${driveB % 60 > 1 ? "s" : ""} ${getHour(
                      driveB
                    )} is the average driving time to the nearest buprenorphine treatment`
                  : `minute${driveB % 60 > 1 ? "s" : ""} ${getHour(
                      driveB
                    )} is the average driving time to the nearest buprenorphine treatment (state average: ${driveBState})`}
              {/if}
            </p>
            <p>
              {#if transitB}
                <span class="number">
                  {transitB}
                </span>
                {isStateView
                  ? `minute${transitB % 60 > 1 ? "s" : ""} ${getHour(
                      transitB
                    )} is the average travel time via public transit to the nearest buprenorphine treatment`
                  : `minute${transitB % 60 > 1 ? "s" : ""} ${getHour(
                      transitB
                    )} is the average travel time via public transit to the nearest buprenorphine treatment (state average: ${transitBState})`}
              {/if}
            </p>
            <p>
              {#if transitM === "" && transitB === ""}
                {@html "Average travel times via public transit to the nearest buprenorphine treatment and opioid treatment program are not available. See our <a href='#'>technical appendix</a> for more information."}
              {:else if transitM === ""}
                {@html "We exclude the average public-transit travel time for methadone because a person cannot reasonably access an opioid treatment program via public transit from this county. See our <a href='#'>technical appendix</a> for more information."}
              {/if}
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<div class={innerWidth > 1000 ? "none" : "buttonsWrapper"}>
  <Button id={"download"} text={"Download data"} />
  <Button id={"print"} text={"Print page"} />
</div>

<section class="otherSection" class:print={$print}>
  <h3>Other Strategies to Close the Treatment Gap</h3>
  <p>
    It will take more than increasing the number and capacity of buprenorphine
    prescribers to close gaps in access to medication for opioid use disorder
    treatment. The following strategies can help ensure all people who need
    medication treatment for opioid use disorder can access it:
  </p>
  <ul>
    <li>
      <b>Engage health plans in prescriber outreach.</b> In some states,
      <a
        href="https://substanceabusepolicy.biomedcentral.com/articles/10.1186/s13011-022-00478-y"
        target="_blank">Medicaid reimbursement</a
      > for assessing patient needs and prescribing medication treatment for opioid
      use disorder is low, which can dissuade prescribers from offering treatment
      medications. But if prescribers know that a health plan—whether public or private—will
      adequately reimburse them for providing these services, they may be more willing
      to prescribe medications for treating opioid use disorder.
    </li>
    <li>
      <b
        >Make medication for opioid use disorder available in more places where
        people receive health care.</b
      >
      Making treatment
      <a
        href="https://www.dea.gov/press-releases/2022/03/23/deas-commitment-expanding-access-medication-assisted-treatment"
        target="_blank">more broadly available</a
      >—in places such as health centers, jails, emergency rooms, hospitals,
      primary care offices, and all addiction treatment programs—meets people
      where they are and can increase engagement in treatment.
    </li>
    <li>
      <b>Expand telehealth options.</b> Opioid use disorder–related telehealth
      services have been shown to improve
      <a
        href="https://www.cdc.gov/media/releases/2022/p0831-ccovid-19-opioids.html"
        target="_blank"
      >
        retention in treatment and reduce risks of overdose</a
      >. Telehealth can make treatment more accessible to people in rural areas
      and to people lacking transportation, and it can help counteract stigma by
      allowing people to receive care where they’re most comfortable.
    </li>
    <li>
      <b
        >Coordinate with community partners, such as <a
          href="https://www.behavioralhealthworkforce.org/project/understanding-the-roles-of-peer-providers-addiction-counselors-and-community-health-workers-in-behavioral-health/"
          target="_blank">community health workers and peer recovery workers</a
        >.</b
      >
      Because
      <a
        href="https://store.samhsa.gov/product/community-engagement-essential-component-substance-use-prevention-system/pep22-06-01-005"
        target="_blank">community partners</a
      > often have (or can build) trust with residents with opioid use disorder,
      they are well positioned to inform strategies to meet community needs for treatment
      and other services. They can also help community members understand their care
      options and access treatment.
    </li>
    <li>
      <b
        >Remove regulatory barriers to prescribing medications to treat opioid
        use disorder.</b
      >
      Restrictions on prescribing
      <a
        href="https://www.healthaffairs.org/content/forefront/expedited-regulatory-strategy-expanding-access-methadone-treatment-opioid-use-disorder"
        target="_blank">methadone</a
      >
      treatment for opioid use disorder and when and where patients can initiate
      medication treatment can deter people from getting needed care. Reforms to
      reimbursement policies, treatment guidelines, and
      <a
        href="https://www.healthaffairs.org/content/forefront/save-lives-opioid-overdose-deaths-bring-methadone-into-mainstream-medicine"
        target="_blank"
      >
        other regulations</a
      > could help prescribers better serve people with opioid use disorder.
    </li>
    <li>
      <b>Ensure pharmacies stock medication to treat opioid use disorder.</b>
      Barriers like stigma, prescribing restrictions, and limits on the amount of
      medication pharmacists can order can
      <a
        href="https://www.npr.org/sections/health-shots/2019/08/13/741113454/its-the-go-to-drug-for-opioid-addiction-so-why-won-t-more-pharmacists-stock-it"
        target="_blank">prevent pharmacists from stocking medications</a
      > to treat opioid use disorder. Policymakers, regulators, and advocates can
      work together to advance policies that would ensure pharmacies carry these
      medications.
    </li>
  </ul>
</section>

<section class="aboutSection" class:print={$print}>
  <h2>About</h2>
  <p>
    For this project, Urban Institute researchers collaborated with colleagues
    at Johns Hopkins University to conduct treatment-capacity assessments for
    two states in the Bloomberg Philanthropies <a
      href="https://www.bloomberg.org/public-health/combating-the-overdose-epidemic/"
      target="_blank">Overdose Prevention Initiative</a
    >.
  </p>
  <p>
    Throughout this tool, we use “active buprenorphine prescriber” to refer to
    the primary buprenorphine prescriber for at least one patient episode during
    the last 12 or 6 months. In the “prescribers and patient caseloads” section,
    we show the number of active buprenorphine prescribers across three patient
    limits associated with the <a
      href="https://www.acponline.org/advocacy/acp-advocate/archive/february-10-2023/elimination-of-x-waiver-removes-major-barrier-to-opioid-use-disorder-treatment"
      target="_blank">buprenorphine X-waiver</a
    > as of November 2022. The Substance Abuse and Mental Health Services Administration
    and the Drug Enforcement Administration eliminated the waiver and associated
    patient limits in January 2023.
  </p>
  <p>
    Where we discuss prescriber capacity, we assume opioid treatment programs
    operate at 80 percent capacity, and we increase their capacity to 100
    percent in all simulated results. For buprenorphine prescribers, we cap the
    amount by which they can increase capacity at double their current patient
    load.
  </p>
  <p>For more about the data and methodology, see our technical appendix.</p>
  <div class={$print ? "none" : "buttonsWrapper2"}>
    <Button id={"download2"} text={"View data"} />
    <Button id={"appendix"} text={"View Technical Appendix"} />
  </div>
</section>

<section class="creditSection" class:print={$print}>
  <h2>Project credit</h2>
  <p>
    This data tool was funded by Bloomberg Philanthropies. We are grateful to
    them and to all our funders, who make it possible for Urban to advance its
    mission. The views expressed are those of the authors and should not be
    attributed to the Urban Institute, its trustees, or its funders. Funders do
    not determine our research findings or the insights and recommendations of
    our experts. More information on our funding principles is available <a
      href="https://www.urban.org/about/our-funding"
      target="_blank">here</a
    >. Read our terms of service
    <a href="https://www.urban.org/terms-service" target="_blank">here</a>.
  </p>
  <div class="creditItem">
    <h4 class="inline">RESEARCH</h4>
    <p class="inline">
      <a href="https://www.urban.org/author/lisa-clemans-cope" target="_blank"
        >Lisa Clemans-Cope</a
      >,
    </p>
    <p class="inline">
      <a href="https://www.urban.org/author/douglas-wissoker" target="_blank"
        >Doug Wissoker</a
      >,
    </p>
    <p class="inline">
      <a href="https://www.urban.org/author/maya-payton" target="_blank"
        >Maya Payton</a
      >
    </p>
    and
    <p class="inline">
      <a href="https://www.urban.org/author/nikhil-rao" target="_blank"
        >Nikhil Rao</a
      >
    </p>
  </div>
  <div class="creditItem">
    <h4 class="inline">DESIGN</h4>
    <p class="inline">
      <a href="https://www.urban.org/author/christina-baird" target="_blank"
        >Christina Baird</a
      >
    </p>
  </div>
  <div class="creditItem">
    <h4 class="inline">DEVELOPMENT</h4>
    <p class="inline">
      <a href="https://juliahanjanicki.com/" target="_blank">Julia Janicki</a>
    </p>
  </div>
  <div class="creditItem">
    <h4 class="inline">EDITING</h4>
    <p class="inline">
      <a href="https://www.urban.org/author/lauren-lastowka" target="_blank"
        >Lauren Lastowka</a
      >
    </p>
  </div>
  <div class="creditItem">
    <h4 class="inline">WRITING</h4>
    <p class="inline">
      <a href="https://www.urban.org/author/rachel-kenney" target="_blank"
        >Rachel Kenney</a
      >
    </p>
  </div>
</section>

<style>
  /* MAIN VIZ */

  .mainSelection {
    background-color: #fff;
    margin: 0px;
    padding: 10px 40px;
  }

  .mainSelection .wrapper {
    display: grid;
    /* minmax() helps these columns stay responsive even with SVGs with hard-coded widths inside them*/
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    column-gap: 10px;
  }

  .mainSelection.print .wrapper {
    display: block;
  }

  .mapView {
    background-color: #fff;
    margin: 0px;
    padding: 10px 40px;
  }

  .mapView .wrapper {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 20px;
  }

  @media screen and (max-width: 576px) {
    .mapView .wrapper {
      grid-template-columns: 1fr;
      column-gap: 0px;
    }
  }

  h3 {
    font-size: 36px;
    font-weight: 600;
    margin: 24px 0px 48px 0px;
  }

  h4 {
    font-size: 30px;
    font-weight: 00;
  }

  #mainTitle {
    margin: 48px 0px 32px 0px;
  }

  .statsWrapper h4,
  #mapTitle {
    font-size: 24px;
    font-weight: 400;
    margin: 48px auto 24px;
  }

  #treatmentLength {
    font-weight: 300;
    margin-bottom: 0px;
  }

  p {
    font-size: 16px;
  }

  .number {
    font-weight: 700;
  }

  .none {
    display: none;
  }

  .inline {
    display: inline;
  }

  .buttonsWrapper {
    text-align: left;
    margin: 48px 0px 32px 0px;
  }

  .buttonsWrapper2 {
    text-align: left;
    margin: 48px 0px 32px 0px;
  }

  #tabWrapper {
    margin-bottom: 48px;
  }

  .textWrapper {
    border-left: 14px solid #fdbf11;
    padding-left: 20px;
  }

  .otherSection,
  .aboutSection,
  .creditSection {
    max-width: 900px;
    margin: auto;
    padding: 50px 20px;
  }

  .otherSection p,
  .aboutSection p,
  .creditSection p {
    font-size: 20px;
    line-height: 28px;
    font-weight: 400;
  }

  .aboutSection p,
  .creditSection p {
    color: #353535;
  }

  .otherSection li {
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
  }

  .otherSection h3 {
    font-size: 36px;
    font-weight: 700;
  }

  .creditSection {
    margin-bottom: 50px;
  }

  .aboutSection h2,
  .creditSection h2 {
    font-size: 28px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .creditItem {
    margin-top: 40px;
  }

  .creditItem h4 {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    #mainTitle {
      margin: 32px 0px 32px 0px;
    }
    #tabWrapper {
      margin-bottom: 32px;
      grid-template-columns: 1fr;
    }

    h3 {
      font-size: 30px;
    }
    .otherSection p,
    .aboutSection p,
    .creditSection p {
      font-size: 18px;
      line-height: 26px;
    }
  }

  @media (max-width: 576px) {
    .mainSelection .wrapper {
      grid-template-columns: 1fr;
      column-gap: 10px;
    }

    .mainSelection {
      padding: 10px 0px;
    }

    #optionsWrapper {
      max-width: 100%;
    }

    .statsWrapper h4,
    #mapTitle {
      font-size: 20px;
    }

    .otherSection,
    .aboutSection,
    .creditSection {
      padding: 10px 40px;
    }

    #mainTitle,
    #tabWrapper {
      padding-left: 30px;
    }

    .print #mainTitle,
    .print #tabWrapper {
      padding-left: 0px;
    }

    .buttonsWrapper {
      text-align: center;
      padding: 0px;
    }
  }

  .mainSelection.print {
    max-width: calc(100% - 40px);
    padding: 0px 30px;
    margin: 0px;
  }

  .print #mainTitle {
    font-weight: 300;
    text-transform: uppercase;
  }

  .print #tabWrapper {
    display: none;
  }
  .print #dropdownWrapper {
    display: none;
  }

  .print #optionsWrapper {
    display: none;
  }

  .mapView.print {
    padding: 0px 30px;
  }
  .mapView.print .wrapper {
    display: block;
  }

  .print #treatmentLength {
    font-weight: 300;
    margin-bottom: -20px;
  }

  .print .mapWrapper {
    max-width: 500px;
    margin-bottom: 50px;
  }

  .print .statsWrapper {
    padding: 0px 30px;
  }

  .print h4 {
    font-size: 20px;
  }

  .print a {
    color: #353535;
  }

  .print li {
    list-style: none;
  }

  .print .textWrapper {
    border-left: none;
    padding-left: 0px;
  }

  .otherSection.print,
  .aboutSection.print,
  .creditSection.print {
    max-width: 100%;
    padding: 0px 60px;
    margin: 50px 0px;
  }

  .creditSection.print a {
    font-weight: 300;
  }
  .creditSection.print .creditItem {
    font-weight: 300;
    margin-top: 10px;
  }
</style>
