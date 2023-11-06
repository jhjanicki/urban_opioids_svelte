<script>
  import data from "../../assets/states/statesSVG.json";
  import State from "./State.svelte";

  let width;
</script>

<section class="states-selection">
  <p id="selectInstructionTop">Select a State</p>
  <div class="states-wrapper" bind:clientWidth={width}>
    <p class="column" id="selectInstruction">Select a state</p>

    {#each data as d}
      <State
        state={d.state}
        stateCode={d.stateCode}
        svgPath={d.state !== "Michigan" ? d.path : d.paths}
        id={d.id}
      />
    {/each}
  </div>
</section>

<style>
  .states-selection {
    background-color: #000000;
    height: 176px;
    margin-top: 5px;
  }

  .column {
    flex: 1; /* Make each column have equal width */
  }

  p {
    color: white;
    text-align: center;
    font-size: 24px;
    padding-right: 10px;
  }

  .states-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #selectInstructionTop {
    display: none;
  }

  @media (max-width: 768px) {
    #selectInstruction {
      display: none;
    }
    p {
      padding-top: 32px;
      font-size: 20px;
    }
  }
  @media (max-width: 576px) {
    p {
      margin-top: 0px;
      padding-top: 10px;
    }
    .states-selection {
      background: none;
    }
    #selectInstructionTop {
      display: block;
      color: #000000;
      text-transform: uppercase;
      font-weight: 300;
    }
  }
</style>
