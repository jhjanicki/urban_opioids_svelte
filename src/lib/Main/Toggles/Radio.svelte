<script>
  import Icon from "../Icon.svelte";
  export let options;
  export let selected = "";

  const id = Math.floor(Math.random() * 100);

  const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div aria-labelledby={`label-${id}`} id={`group-${id}`} class="radioWrapper">
  {#each options as { value, label, tooltip }}
    <div class="radioItem">
      <input type="radio" id={slugify(label)} bind:group={selected} {value} />
      <label for={slugify(label)}> {label} </label>
      {#if tooltip != ""}
        <Icon text={tooltip}></Icon>
      {/if}
    </div>
  {/each}
</div>

<style>
  .radioWrapper {
    accent-color: black;
  }
  .radioItem {
    margin: 10px 0px;
    display: flex;
    flex-direction: row;
  }
  input[type="radio"] {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  input {
    cursor: pointer;
  }

  label {
    position: relative;
    font-size: 20px;
    margin-left: 20px;
    margin-right: 3px;
    /* so it's the same as the other info button below */
  }
</style>
