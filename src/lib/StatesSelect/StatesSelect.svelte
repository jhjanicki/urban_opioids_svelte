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
    background-color: #353535;
    margin: 5px 0px 20px 0px;
    padding: 20px;
  }

  p {
    color: white;
    text-align: left;
    font-size: 1.2rem;
    padding: 20px 40px;
  }

  .states-wrapper {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
</style>
