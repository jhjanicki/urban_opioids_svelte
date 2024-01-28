<script>
  export let text;
  let tooltipActive = false;
</script>

<img
  class="inline"
  id="info"
  src="information-gray.svg"
  on:mouseover={() => (tooltipActive = true)}
  on:mouseleave={() => (tooltipActive = false)}
/>
<span class={tooltipActive ? "tooltiptext visible" : "tooltiptext hidden"}
  >{text}</span
>

<style>
  .inline {
    display: inline;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 5px;
  }

  #info:hover {
    cursor: pointer;
  }
  .tooltiptext {
    width: 230px;
    margin-top: 8px;
    margin-left: 5px;
    background-color: #d2d2d2;
    color: #353535;
    text-align: left;
    padding: 8px;
    border-radius: 6px;
    position: absolute;
    font-size: 16px;
    z-index: 100;
  }

  .tooltiptext.hidden {
    display: none;
  }

  .tooltiptext.visible {
    display: inline-block;
  }
</style>
