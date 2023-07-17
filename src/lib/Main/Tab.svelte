<script>
  import { selectedCounty, countyList, stateView } from "../../store/store";

  export let id;
  export let text;

  const updateView = () => {
    $stateView = id;
    // the first county on the list
    if ($stateView === "countyview" && $selectedCounty === "") {
      $selectedCounty = $countyList[0];
    }

    if ($stateView === "stateview") {
      // RESET county selection on state view so no county is selected on the map
      $selectedCounty = "";
    }
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
    font-size: 24px;
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
</style>
