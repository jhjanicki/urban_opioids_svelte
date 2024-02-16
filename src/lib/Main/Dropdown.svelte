<script>
  import {
    countySelected,
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
  import { logClickToGA } from "../analytics.js";

  import { moveToFront } from "../utils";

  let active = false;

  const toggleDropdown = () => {
    active = !active;
  };

  const closeDropdown = (county, e) => {
    logClickToGA(e.target, "county-dropdown-select");
    $countySelected = true;
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

    $countyMetricData = $allCountyMetricData.filter(
      (d) => d.county === $selectedCounty
    );
  };
</script>

<div class={$stateView === "stateview" ? "none" : "show"}>
  <div class={active ? "select-menu active" : "select-menu"}>
    <div class="select-menu-button" on:click={toggleDropdown}>
      <span class="select-menu-text"
        >{$selectedCounty === "" ? "Select county" : $selectedCounty}</span
      >
      <img id="carrot" class={active ? "flip" : ""} src="icon-dropdown.svg" />
    </div>
    <ul class="options">
      {#if $countyList}
        {#each $countyList as d}
          <li class="option" on:click={(e) => closeDropdown(d, e)}>
            <span class="optionText">{d}</span>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
</div>

<style>
  .select-menu {
    max-width: 328px;
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
    background-size: auto;
  }

  .options {
    position: absolute;
    width: 326px;
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

  #carrot {
    margin-top: 5px;
    float: right;
  }

  .flip {
    transform: rotate(180deg);
    transition: 0.3s transform ease;
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

  @media (max-width: 650px) {
    .options {
      width: 250px;
    }
  }

  @media (max-width: 576px) {
    .select-menu {
      max-width: none;
    }
    .select-menu-button {
      margin: 18px 30px;
    }

    .options {
      margin-left: 30px;
      width: calc(100% - 62px);
    }
  }
</style>
