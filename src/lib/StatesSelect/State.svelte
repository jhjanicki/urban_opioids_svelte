<script>
    export let state;
    export let stateCode;
    export let path;
    export let width;
    import * as d3 from "d3";


    d3.selectAll(".states-wrapper svg").attr("width", width)

</script>

<div class="img-wrapper">
    <svg class="states-wrapper__svg" id={state} x="0px" y="0px" viewBox="0 0 90 90">
      <path d={path}/>
    </svg>
    <p id="{state}__p" class="states-wrapper__p">{stateCode}</p>
</div>


<style>


svg{
  flex: 1;
  padding: 0px 20px;
  fill: #D2D2D2;
  width:117px;
}

svg:not(#wisconsin) {
    border-right: 0.5px solid #fff;
}
.svg--selected {
  fill: #FDBF11;
}

.p--selected {
  color: #FDBF11;
}

.states-wrapper__p{
  text-align: center;
  color:#D9D9D9;
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
  border: 20px solid #D9D9D9;
  border-top-color: #353535;
  position: absolute;
  left: 50%;
  margin-left: -20px;
  top: calc(100% + 30px);
}
</style>