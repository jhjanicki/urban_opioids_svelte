<script>
  import { Router, Route, Link } from "svelte-routing";
  import Home from "./routes/home.svelte";
  import Print from "./routes/print.svelte";
  import Header from "./lib/Header.svelte";
  import Intro from "./lib/Intro/Intro.svelte";
  import StatesSelect from "./lib/StatesSelect/StatesSelect.svelte";
  import Main from "./lib/Main/Main.svelte";
  import data from "./assets/data/metricData.json";
  import { stateClicked } from "./store/store";

  export let url = "";
</script>

<Header />
<div class="main">
  <Intro />
  <StatesSelect />
  {#if $stateClicked}
    <Main {data} />
  {/if}
</div>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="print">Print</Link>
  </nav>
  <div>
    <Route path="/"><Home /></Route>
    <Route path="print" component={Print} />
  </div>
</Router>

<style>
</style>
