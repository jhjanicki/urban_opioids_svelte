<script>
  import Header from "./lib/Header.svelte";
  import Intro from "./lib/Intro/Intro.svelte";
  import StatesSelect from "./lib/StatesSelect/StatesSelect.svelte";
  import Main from "./lib/Main/Main.svelte";
  import data from "./assets/data/metricData.json";
  import { clicked } from "./store/store";

  //bind:selectedState bind:stateID
  //bind:selectedState bind:stateView
</script>

<Header />
<div class="main">
  <Intro />
  <StatesSelect />
  {#if clicked}
    <div class={$clicked ? "" : "none"}>
      <Main {data} />
    </div>
  {/if}
</div>

<style>
  .none {
    display: none;
  }
</style>
