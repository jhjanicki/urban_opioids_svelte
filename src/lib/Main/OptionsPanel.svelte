<script>
  import Radio from "./Radio.svelte";
  import Toggle from "./Toggle.svelte";
  import {
    submitted,
    selectedTreatment,
    selectedProvider,
    selectedYear,
  } from "../../store/store";

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
      value: "curpr",
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

  let treatment;
  let provider;
  // let year;
  let isActive = false;

  const submitParameters = () => {
    if (treatment != "" && provider != "") {
      $submitted = true;
      isActive = true;
      $selectedTreatment = treatment;
      $selectedProvider = provider;
      // $selectedYear = year;
    }
  };

  const clearSelection = () => {
    isActive = false;
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
    <p>See what it would take to...</p>
    <Radio options={optionsTreatment} bind:selected={treatment} />
  </div>
  <div class="toggle-wrapper">
    <p>By...</p>
    <Radio options={optionsProvider} bind:selected={provider} />
  </div>
  <hr />
  <p>Reduce treatment length from 12 months to 6 months</p>
  <Toggle options={optionsYear} bind:selected={$selectedYear} />
  <button
    class={isActive ? "active button" : "button"}
    on:click={() => submitParameters()}>CTA LANGUAGE HERE</button
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
    margin: 40px auto;
  }

  p {
    margin: 0px 0px 1rem 0px;
  }

  label {
    font-size: 0.85rem;
    color: #353535;
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
</style>
