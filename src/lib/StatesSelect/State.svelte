<script>
  import * as d3 from "d3";

  export let state;
  export let stateCode;
  export let path;
  export let imgWidth;
  export let selectedState;

  d3.selectAll("svg").attr("width", imgWidth);

  function updateState(state) {
    selectedState = state;
  }
</script>

<div class="img-wrapper">
  <svg
    class="states-wrapper__svg"
    id={state}
    x="0px"
    y="0px"
    viewBox="0 0 90 90"
    width={imgWidth}
    on:click={updateState(state)}
  >
    <path d={path} />
  </svg>
  <p id="{state}__p" class="states-wrapper__p">{stateCode}</p>
</div>

<style>
  svg {
    flex: 1;
    padding: 0px 20px;
    fill: #d2d2d2;
  }

  svg:not(#wisconsin) {
    border-right: 0.5px solid #fff;
  }
  .svg--selected {
    fill: #fdbf11;
  }

  .p--selected {
    color: #fdbf11;
  }

  .states-wrapper__p {
    text-align: center;
    color: #d9d9d9;
  }

  .img-wrapper {
    position: relative;
  }

  .img-wrapper:hover {
    cursor: pointer;
  }

  .img-wrapper:hover:after {
    content: "";
    display: block;
    border: 20px solid #d9d9d9;
    border-top-color: #353535;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    top: calc(100% + 30px);
  }
</style>
