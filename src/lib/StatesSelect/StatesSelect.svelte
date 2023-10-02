<script>
  import data from "../../assets/states/statesSVG.json";
  import State from "./State.svelte";

  let width;
  $: imgWidth = (width - 40) / 7 - 40;
</script>

<section class="states-selection">
  <div class="wrapper">
    <p>Select a state</p>
    <div class="states-wrapper" bind:clientWidth={width}>
      {#each data as d}
        <State
          state={d.state}
          stateCode={d.stateCode}
          svgPath={d.state !== "Michigan" ? d.path : d.paths}
          id={d.id}
          {imgWidth}
        />
      {/each}
    </div>
  </div>
</section>

<style>
  .states-selection {
    background-color: #000000;
    margin: -20px 0px 0px 0px;
    height: 280px;
    padding: 0px 20px;
  }

  p {
    color: white;
    text-align: left;
    font-size: 24px;
    padding-top: 42px;
  }

  .states-wrapper {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    .states-selection {
      height: 185px;
    }

    p {
      padding-top: 32px;
      font-size: 20px;
    }
  }
  @media (max-width: 576px) {
    .states-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      max-width: 100%;
      margin: 0px;
      padding: 0px;
    }

    .states-selection {
      height: 445px;
    }

    p {
      margin-top: 0px;
    }
  }
</style>
