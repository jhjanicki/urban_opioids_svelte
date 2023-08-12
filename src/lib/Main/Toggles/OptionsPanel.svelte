<script>
  import Radio from "./Radio.svelte";
  import Toggle from "./Toggle.svelte";
  import {
    submitted,
    selectedTreatment,
    selectedProvider,
    selectedYear,
  } from "../../../store/store";

  const optionsTreatment = [
    {
      value: "2xcap",
      label: "Double the current treatment",
    },
    {
      value: "fill_gap",
      label: "Close the treatment gap",
    },
  ];

  const optionsProvider = [
    {
      value: "newprov",
      label: "Adding new providers",
    },
    {
      value: "curprx",
      label: "Increasing capacity of current providers",
    },
  ];

  const optionsYear = [
    {
      value: 12,
      label: "No",
    },
    {
      value: 6,
      label: "Yes",
    },
  ];

  let tooltipActive = false;
  $: isActive = treatment != "" && provider != "";
  let treatment;
  let provider;
  let year;

  const submitParameters = () => {
    if (treatment != "" && provider != "") {
      $submitted = true;
      $selectedTreatment = treatment;
      $selectedProvider = provider;
      $selectedYear = year;
    }
  };

  const clearSelection = () => {
    treatment = "";
    provider = "";
    $selectedTreatment = "";
    $selectedProvider = "";
    $selectedYear = 12;
    $submitted = false;
  };
</script>

<div class="toggle-selection">
  <div class="toggle-wrapper">
    <p id="question">See what it would take to...</p>
    <Radio options={optionsTreatment} bind:selected={treatment} />
  </div>
  <div class="toggle-wrapper">
    <p id="by">By...</p>
    <Radio options={optionsProvider} bind:selected={provider} />
  </div>
  <hr />
  <div id="yearToggle">
    <p id="reduce" class="inline">
      Reduce treatment length from 12 months to 6 months
    </p>
    <img
      class="inline"
      id="info"
      src="information-gray.svg"
      on:mouseover={() => (tooltipActive = true)}
      on:mouseleave={() => (tooltipActive = false)}
    />
    <span class={tooltipActive ? "tooltiptext visible" : "tooltiptext hidden"}
      >Reducing treatment length could help more people access treatment, but it
      may also mean treatment is less effective. Selecting this option affects
      several statistics below.</span
    >
  </div>
  <Toggle options={optionsYear} bind:selected={year} />
  <button
    class={isActive ? "active button" : "button"}
    on:click={() => submitParameters()}>SEE RESULTS</button
  >
  <span
    class={isActive ? "clear show" : "clear none"}
    on:click={() => clearSelection()}
  >
    clear selections
  </span>
</div>

<style>
  .toggle-selection {
    padding: 0px 30px;
  }

  hr {
    height: 0.5px;
    margin: 40px auto 25px auto;
    opacity: 0.5;
  }

  p {
    margin: 0px 0px 1rem 0px;
  }

  label {
    font-size: 0.85rem;
    color: #353535;
  }

  #question,
  #by {
    font-weight: 700;
  }

  #by {
    margin-top: 20px;
  }

  #reduce {
    font-size: 16px;
    font-weight: 700;
  }

  #yearToggle {
    margin-bottom: 20px;
  }

  .button {
    max-width: 300px;
    margin: 20px 15px 20px auto;
    padding: 8px 12px;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    text-transform: uppercase;
    background-color: none;
    text-align: center;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    transition: all 500ms ease;
    color: #9d9d9d;
    background-color: #d2d2d2;
    border: solid 1.5px #d2d2d2;
  }

  .active {
    background-color: #fdbf11;
    border: solid 1.5px #fdbf11;
    color: #000000;
  }

  .active:hover {
    cursor: pointer;
  }

  .show {
    display: inherit;
  }

  .none {
    display: none;
  }

  .clear {
    color: #000000;
    text-decoration: underline;
  }

  .clear:hover {
    cursor: pointer;
  }

  .inline {
    display: inline;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 0px;
  }

  #info:hover {
    cursor: pointer;
  }
  .tooltiptext {
    width: 230px;
    margin-top: 8px;
    margin-left: 5px;
    background-color: #d2d2d2;
    color: #353535;
    text-align: left;
    padding: 8px;
    border-radius: 6px;
    position: absolute;
    font-size: 16px;
    z-index: 100;
  }

  .tooltiptext.hidden {
    display: none;
  }

  .tooltiptext.visible {
    display: inline-block;
  }

  @media (max-width: 576px) {
    #question {
      padding-top: 20px;
    }
  }
</style>
