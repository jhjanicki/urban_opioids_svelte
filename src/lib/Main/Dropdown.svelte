<script>
  import {
    countyList,
    selectedYear,
    selectedCounty,
    countiesData,
    selectedCountyData,
    countyPercent,
    countyMetricData,
    allCountyMetricData,
    stateView,
  } from "../../store/store";

  import { moveToFront } from "../utils";

  let active = false;
  let countySelected = false;

  const toggleDropdown = () => {
    active = !active;
  };

  const closeDropdown = (county) => {
    countySelected = true;
    $selectedCounty = county;
    active = false;
    $selectedCountyData = $countiesData.filter(
      (d) => d.properties.name === county
    );

    $: $countyPercent =
      $selectedYear === 12
        ? $selectedCountyData[0].properties.OUD_tx_12m
        : $selectedCountyData[0].properties.OUD_tx_6m;

    if ($stateView !== "stateview") {
      let feature = $countiesData.filter((d) => {
        if ($selectedCounty) {
          return d.properties.name === $selectedCounty;
        } else {
          return "";
        }
      });
      $countiesData = moveToFront(feature[0], $countiesData);
    }

    //for now 12, but will need to update based on the toggles

    $countyMetricData = $allCountyMetricData.filter(
      (d) => d.county === $selectedCounty
    );
  };
</script>

<div class={$stateView === "stateview" ? "none" : "show"}>
  <div class={active ? "select-menu active" : "select-menu"}>
    <div class="select-menu-button" on:click={toggleDropdown}>
      <span class="select-menu-text">{$selectedCounty}</span>
    </div>
    <ul class="options">
      <!-- need this if statement otherwise page won't load -->
      {#if $countyList}
        {#each $countyList as d}
          <li class="option" on:click={closeDropdown(d)}>
            <span class="optionText">{d}</span>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</div>

<style>
  .select-menu {
    max-width: 330px;
    margin: 20px 0px;
  }

  .select-menu-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* remove default arrow */
    margin: 18px 0px;
    border: 1px solid #d2d2d2;
    border-radius: 0;
    font-family: Lato;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    color: #696969;
    cursor: pointer;
    padding: 8px;
    background: url("./img/arrow-blue.png") 96%/15% no-repeat #ffffff;
    background-size: auto;
  }

  .options {
    position: absolute;
    width: 328px;
    overflow-y: auto;
    max-height: 295px;
    padding: 10px;
    margin-top: -20px;
    border: 1px solid #d2d2d2;
    border-radius: 0;
    background: #fff;
    display: none;
  }

  .option {
    display: flex;
    height: 40px;
    cursor: pointer;
    padding-left: 10px;
    /* border-radius: 8px; */
    align-items: center;
    background: #fff;
  }

  .option:hover {
    background: #1696d2;
    color: #fff;
  }

  .select-menu.active .options {
    display: inherit;
    padding: 0px;
    display: block;
    opacity: 0;
    z-index: 10;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-fill-mode: both;
  }

  .none {
    display: none;
  }

  .show {
    display: inline-block;
  }

  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 30px, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes fadeInDown {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    to {
      transform: translate3d(0, 20px, 0);
      opacity: 0;
    }
  }

  @media (max-width: 576px) {
    .select-menu-button {
      margin: 18px 30px;
    }
  }
</style>
