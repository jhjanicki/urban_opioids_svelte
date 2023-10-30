<script>
  import {
    selectedCounty,
    countySelected,
    countyList,
    stateView,
    countiesData,
  } from "../../store/store";
  import { moveToFront } from "../utils";

  export let id;
  export let text;

  const updateView = () => {
    $stateView = id;

    // before was the first county on the list...
    // if ($stateView === "countyview" && $selectedCounty === "") {
    //   $selectedCounty = $countyList[0];

    //   //to move the county to front on the map when switching tabs
    //   let feature = $countiesData.filter((d) => {
    //     if ($selectedCounty) {
    //       return d.properties.name === $selectedCounty;
    //     } else {
    //       return "";
    //     }
    //   });
    //   $countiesData = moveToFront(feature[0], $countiesData);
    // }

    if ($stateView === "stateview") {
      // RESET county selection on state view so no county is selected on the map
      $selectedCounty = "";
    }

    $countySelected = false;
    console.log($countySelected);
  };
</script>

<button
  id="tab-{id}"
  class="button {$stateView === id ? 'active' : ''}"
  value="id"
  on:click={() => updateView()}>{text}</button
>

<style>
  .button {
    font-family: "Lato";
    font-size: 30px;
    font-weight: 300;
    color: #696969;
    background-color: #fff;
    cursor: pointer;
    height: 36px;
    border: none;
    padding: 0;
    text-transform: uppercase;
  }

  .button.active {
    border-bottom: 4px solid #fdbf11;
    color: #000;
  }

  .button:hover {
    border-bottom: 4px solid #fdbf11;
    color: #000;
  }

  #tab-countyview {
    margin-left: 30px;
  }

  @media (max-width: 768px) {
    .button {
      font-size: 24px;
    }
    #tab-countyview {
      margin-left: 5px;
    }
  }
</style>
