<script>
  import * as d3 from "d3";
  import {
    selectedState,
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
    if (state === "New Jersey" || state === "Mighigan") {
      $selectedCounty === ""; //reset county selection when clicking on another state, not working though
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
      $countyList = $countiesData
        .map((county) => county.properties.name)
        .sort();

      setTimeout(scrollToElement, 10); //need to delay since the element needs to be drawn first otherwise it would throw an error
    }
  };

  const handleMouseOver = () => (stateFill = "#fdbf11");
  const handleMouseOut = () => (stateFill = "#d2d2d2");

  let innerWidth = 0;
  let innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
  class="img-wrapper column"
  on:click={updateState(state)}
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
  style="background-color: {innerWidth > 576
    ? '#000000'
    : state === $selectedState
    ? '#fdbf11'
    : stateFill}"
>
  <svg
    id={state}
    viewBox="0 0 90 90"
    width={200}
    fill={innerWidth <= 576
      ? "#000000"
      : state === $selectedState
      ? "#fdbf11"
      : stateFill}
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
  }

  .img-wrapper {
    position: relative;
  }

  .img-wrapper:hover {
    cursor: pointer;
  }

  .img-wrapper:hover:after {
    content: "";
    display: block;
    border: 20px solid #fff;
    border-top-color: #000000;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    top: 100%;
  }

  @media (max-width: 768px) {
    .stateText {
      font-size: 18px;
      margin-top: 0px;
    }
  }

  @media (max-width: 576px) {
    .states-wrapper {
      padding: 10px 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
    }

    svg {
      padding: 0px;
      height: calc(445px / 4 - 35px);
      width: 100%;
    }

    .img-wrapper {
      width: 100%;
      margin: 0px;
      padding: 0px;
      background-color: #d2d2d2;
    }

    .img-wrapper:hover:after {
      display: none;
    }

    .stateText {
      position: absolute;
      bottom: 0px;
      right: 20px;
      color: #353535;
    }
  }
</style>
