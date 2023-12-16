<script>
  import { statePercent } from "../../../store/store";
  export let OUD_pct;
  export let bup_pct;
  export let meth_pct;
  export let lollipop;
  export let isBarHover;
  export let hoveredPointer;

  let tooltipWidth;
</script>

<div
  class="tooltip"
  style="position: absolute; bottom: {-hoveredPointer[1] +
    280}px; left: {hoveredPointer[0] - 20}px"
  bind:clientWidth={tooltipWidth}
>
  {#if isBarHover}
    <p>
      {OUD_pct}% receiving treatment ({bup_pct}% buprenorphine, {meth_pct}%
      methadone)
    </p>
  {:else}
    <p>
      State average: {lollipop}%
    </p>
  {/if}
</div>

<style>
  .tooltip {
    width: 110px;
    min-height: 30px;
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

  p {
    margin: 0;
    padding: 0;
    font-weight: 300;
    font-size: 14px;
  }
</style>
