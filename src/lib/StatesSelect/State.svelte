<script>
  import * as d3 from "d3";
  import {
    selectedState,
    countySelected,
    stateID,
    allCountiesData,
    allStatesData,
    countiesData,
    stateData,
    allMetricData,
    stateMetricData,
    path,
    projection,
    stateClicked,
    selectedYear,
    statePercent,
    countyList,
    selectedCounty,
    mapWidth,
    mapHeight,
    legendDomain,
  } from "../../store/store";

  export let state;
  export let stateCode;
  export let svgPath;
  export let id;

  let filteredCountyData;
  let filteredStateData;
  let stateFill = "#d2d2d2";

  const getMean = (arr) => {
    let mean =
      arr.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / arr.length;
    return mean;
  };

  const getStandardDeviation = (arr) => {
    let mean = getMean(arr); // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k) => {
      return (k - mean) ** 2;
    });
    // Calculating the sum of updated array
    let sum = arr.reduce((acc, curr) => acc + curr, 0);
    // Returning the Standered deviation
    return Math.sqrt(sum / arr.length);
  };

  const scrollToElement = () => {
    const targetElement = document.getElementById("mainTitle");
    targetElement.scrollIntoView({ behavior: "smooth" });
  };

  const updateState = (state) => {
    $countySelected = false;
    $selectedCounty = ""; //reset county selection when clicking on another state, not working though
    $stateClicked = true; //once selected the main part of the viz will display
    $selectedState = state;
    $stateID = id; // this shouldn't be ID here

    filteredCountyData = $allCountiesData;
    filteredStateData = $allStatesData.features.filter(
      (d) => d.properties.name === $selectedState
    );

    $stateData = filteredStateData; // in order to zoom to bounding box
    $countiesData = filteredCountyData.filter((d) => d.stateID === $stateID);

    const OTPcounts = $countiesData.map((d) => d.properties.OTPcount);
    const mean = getMean(OTPcounts);
    const sd = getStandardDeviation(OTPcounts);

    $legendDomain = [
      d3.max([mean - 2 * sd, 0]),
      Math.ceil(mean - sd),
      Math.ceil(mean),
      Math.ceil(mean + sd),
      Math.ceil(mean + 2 * sd),
    ];

    $projection = d3
      .geoIdentity()
      .fitSize([$mapWidth, $mapHeight], $stateData[0]);

    $path = d3.geoPath().projection($projection);

    let filteredStateMetricData = $allMetricData.filter(
      (d) => d.state === $selectedState
    )[0];

    $stateMetricData = filteredStateMetricData;
    // ADD IN OTHER TOGGLE OPTIONS
    $statePercent =
      $selectedYear === "year"
        ? filteredStateMetricData.OUD_tx_12m
        : filteredStateMetricData.OUD_tx_6m;

    //so the dropdown list is alphabetical
    $countyList = $countiesData.map((county) => county.properties.name).sort();

    setTimeout(scrollToElement, 10); //need to delay since the element needs to be drawn first otherwise it would throw an error
  };

  const handleMouseOver = () => (stateFill = "#fdbf11");
  const handleMouseOut = () => (stateFill = "#d2d2d2");

  let innerWidth = 0;
  let innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
  class="img-wrapper column"
  id={state.replaceAll(" ", "") + "Wrapper"}
  on:click={updateState(state)}
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
>
  <svg
    id={state.replaceAll(" ", "")}
    viewBox="0 0 90 90"
    width={240}
    fill={state === $selectedState ? "#fdbf11" : stateFill}
    on:mouseover={handleMouseOver}
    on:mouseout={handleMouseOut}
  >
    <g transform="translate(-15,0)">
      {#if state !== "Michigan"}
        <path d={svgPath} />
      {:else}
        {#each svgPath as path}
          <path d={path} />
        {/each}
      {/if}
    </g>
    <text x="60px" y="77px" font-size="16px" font-weight="300">{stateCode}</text
    >
  </svg>
  <!-- <span class="stateText">{stateCode}</span> -->
</div>

<p id="selectInstructionBottom">Select a State</p>

<style>
  /* to center the svg */
  .column {
    flex: 1; /* Make each column have equal width */
    border-left: 1px solid white;
  }

  .column svg {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 176px;
    background-color: #000000;
  }

  .img-wrapper:hover {
    cursor: pointer;
  }

  #selectInstructionBottom {
    display: none;
  }

  @media (max-width: 768px) {
    #selectInstructionBottom {
      display: block;
      position: absolute;
      top: 0;
      left: 42%;
      color: white;
    }

    .column {
      border: none;
    }

    #NewJerseyWrapper {
      position: relative;
    }

    #NewJerseyWrapper::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(50%); /* Adjust the position to center the border */
      height: 60%;
      width: 1px; /* Adjust the width of the border as needed */
      background-color: white; /* Adjust the color of the border as needed */
    }
  }

  @media (max-width: 576px) {
    #selectInstructionBottom {
      display: none;
    }

    .img-wrapper:hover:after {
      display: none;
    }

    #NewJerseyWrapper::before {
      content: none;
      width: 0px;
      background: none;
    }
    .column svg {
      height: 110px;
      width: calc(100% - 10px);
    }
  }
</style>
