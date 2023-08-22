<script>
  import Header from "./lib/Header.svelte";
  import Intro from "./lib/Intro/Intro.svelte";
  import StatesSelect from "./lib/StatesSelect/StatesSelect.svelte";
  import Main from "./lib/Main/Main.svelte";
  import data from "./assets/data/metricData.json";
  import { stateClicked, print } from "./store/store";
</script>

{#if !$print}
  <Header />
{/if}
<div class="main" class:print={$print}>
  <Intro />
  {#if !$print}
    <StatesSelect />
  {/if}
  {#if $stateClicked}
    <Main {data} />
  {/if}
</div>

<style>
  .main.print {
    max-width: 1200px;
    margin: auto;
  }
</style>
