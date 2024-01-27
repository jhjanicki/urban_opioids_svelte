<script>
  import Radio from "./Radio.svelte";
  import Toggle from "./Toggle.svelte";
  import Icon from "../Icon.svelte";
  import {
    submitted,
    selectedTreatment,
    selectedProvider,
    selectedYear,
  } from "../../../store/store";

  const optionsTreatment = [
    {
      value: "2xcap",
      label: "Double the number of people receiving treatment",
      tooltip: "",
    },
    {
      value: "fill_gap",
      label: "Close the treatment gap",
      tooltip: "",
    },
  ];

  const optionsProvider = [
    {
      value: "newprov",
      label: "Adding new buprenorphine prescribers",
      tooltip:
        "Because most patients receiving medication treatment for opioid use disorder receive buprenorphine and relatively few receive methadone or other medication treatments at an opioid treatment program, we only simulate adding new buprenorphine providers.",
    },
    {
      value: "curprx",
      label: "Increasing active buprenorphine prescribers’ capacity",
      tooltip: "",
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
    $selectedYear = 12; //HERE
    $submitted = false;
  };
</script>

<div class="toggle-selection">
  <div class="toggle-wrapper">
    <p id="question">See what it would take to</p>
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
    <Icon
      text="Reducing treatment length could help more people access treatment, but it
    may also mean treatment is less effective. Selecting this option affects
    several statistics below."
    ></Icon>
  </div>
  <Toggle options={optionsYear} bind:selected={year} />
  <button
    class={isActive ? "active button" : "button"}
    on:click={() => submitParameters()}>SEE RESULTS</button
  >
  <span
    class={$submitted ? "clear show" : "clear none"}
    on:click={() => clearSelection()}
  >
    clear selections
  </span>
</div>

<style>
  .toggle-selection {
    padding: 0px 0px 0px 30px;
  }

  hr {
    height: 0.5px;
    margin: 32px auto 25px auto;
    opacity: 0.5;
  }

  p {
    margin: 0px;
  }

  #question,
  #by {
    font-weight: 700;
    margin-bottom: 14px;
  }

  #by {
    margin-top: 32px;
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
    margin: 48px 15px 14px auto;
    padding: 12px 16px;
    text-decoration: none;
    font-weight: 700;
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
    font-family: "Lato";
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
    font-size: 18px;
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

  @media (max-width: 768px) {
    .toggle-selection {
      padding: 0px;
    }
  }
  @media (max-width: 576px) {
    #question {
      padding-top: 20px;
    }

    .toggle-selection {
      padding: 0px 30px;
    }
  }
</style>
