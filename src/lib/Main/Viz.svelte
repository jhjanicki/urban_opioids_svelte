<script>
  import Bar from "./Bar.svelte";
</script>

<div class="main-viz">
  <div class="viz-wrapper">
    <h3>What would it take to change the treatment gap?</h3>
    <h4>
      <span id="bar-state" /> is treating
      <span id="bar-percent">X% of residents</span> with opioid use disorder
    </h4>
    <Bar />
  </div>
</div>

<style>
  .main-viz {
    background-color: #353535;
    color: #3f2626;
    height: 450px;
  }

  h3 {
    margin: 0.9rem 0px;
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 600;
    color: white;
  }

  h4 {
    margin: 1.4rem 0px;
    font-size: 1.4rem;
    font-weight: 400;
    color: white;
  }

  .viz-wrapper {
    padding: 30px;
  }

  #bar-percent {
    color: #fdbf11;
  }
</style>
