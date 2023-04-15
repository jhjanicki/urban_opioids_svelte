<script>
  import Button from "./Button.svelte";
  import Tab from "./Tab.svelte";
  import Dropdown from "./Dropdown.svelte";
  import Viz from "./Viz.svelte";
  import ToggleSelect from "./ToggleSelect.svelte";
  import Map from "./Map.svelte";

  export let selectedState = "New Jersey";
  export let countiesData;
  export let stateData;
</script>

<section class="main-selection">
  <div class="wrapper">
    <h3 id="main-selection-title">{selectedState}</h3>
    <div class="buttons-wrapper">
      <Button id={"download"} text={"Download data"} />
      <Button id={"print"} text={"Print page"} />
    </div>
    <div class="tab-wrapper">
      <Tab id="stateview" text="State view" active="active" />
      <Tab id="countyview" text="County view" active="" />
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
    <div>
      <h4 class="map-view__h4">
        Where people with opioid use disorder are receiving treatment
      </h4>
      <Map {countiesData} {stateData} />
    </div>
    <div>
      <h4 class="map-view__h4">Access to treatment</h4>
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

  .buttons-wrapper {
    text-align: left;
    padding: 0px 30px;
  }

  .tab-wrapper {
    display: flex;
    gap: 32px;
  }
</style>
