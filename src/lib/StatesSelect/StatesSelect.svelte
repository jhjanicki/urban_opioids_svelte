<script>
    import data from "../../assets/data/statesSVG.json";
    import State from "./State.svelte";
    import { onMount } from 'svelte'


    let width;

    onMount(async () => {
        const imgWidth = (width - 40) / 7 - 40;
        //need to pass this to State and set the svg width
  })

</script>


<section class="states-selection">
    <div class="wrapper">
        <p class="states-selection__p">Select a state</p>
        <div class="states-wrapper" bind:clientWidth={width}>
            {#each data as d}
                <State state={d.state} stateCode = {d.stateCode} path={d.path}></State>
            {/each}
        </div>
    </div>
</section>


<style>
.states-selection {
  background-color: #353535;
  margin: 5px 0px 0px 0px;
  padding: 20px;
}

.states-selection__p {
  color: white;
  text-align: left;
  font-size: 1.2rem;
  padding: 20px 40px;
}

.states-wrapper {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  width:100%;
  height:100%;
}
</style>