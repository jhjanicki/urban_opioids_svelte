<script>
  export let hoveredPointer;
  export let OUD;
  export let bup;
  export let methadone;

  let tooltipWidth;
</script>

<!-- seem to need a different adjustment number for each state, for the 80 and 60 currently below -->
<div
  class="tooltip"
  style="position: absolute; top: {hoveredPointer[1] +
    80}px; left: {hoveredPointer[0] - 60}px"
  bind:clientWidth={tooltipWidth}
>
  <h2>
    {OUD}% receiving treatment ({bup}% buprenorphine, {methadone}% methadone)
  </h2>
</div>

<style>
  .tooltip {
    width: 110px;
    min-height: 50px;
    background: white;
    color: black;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 10px 14px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 300;
    z-index: 1;
    pointer-events: none;
  }

  .tooltip:after {
    left: 50%;
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-top-color: #ffffff;
    border-width: 10px;
    margin-left: -10px;
  }

  h1,
  h2 {
    margin: 0;
    padding: 0;
    font-weight: 300;
  }

  h1 {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 6px;
    width: 100%;
  }

  h2 {
    font-size: 0.7rem;
  }
</style>
