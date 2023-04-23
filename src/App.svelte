<script>
  import Header from "./lib/Header.svelte";
  import Intro from "./lib/Intro/Intro.svelte";
  import StatesSelect from "./lib/StatesSelect/StatesSelect.svelte";
  import Main from "./lib/Main/Main.svelte";
  import data from "./assets/data/metricData.json";

  //bind:selectedState bind:stateID
  //bind:selectedState bind:stateView
</script>

<Header />
<div class="main">
  <Intro />
  <StatesSelect />
  <Main {data} />
</div>

<style>
</style>
