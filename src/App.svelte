<script>
  import Header from "./lib/Header.svelte";
  import Intro from "./lib/Intro/Intro.svelte";
  import StatesSelect from "./lib/StatesSelect/StatesSelect.svelte";
  import Main from "./lib/Main/Main.svelte";
  import data from "./assets/data/metricData.json";
  import { stateClicked } from "./store/store";
</script>

<Header />
<div class="main">
  <Intro />
  <StatesSelect />
  {#if $stateClicked}
      <Main {data} />
  {/if}
</div>

<style>
</style>
