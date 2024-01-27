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
  }
  input[type="radio"] {
    -ms-transform: scale(1.3); /* IE 9 */
    -webkit-transform: scale(1.3); /* Chrome, Safari, Opera */
    transform: scale(1.3);
  }

  input {
    cursor: pointer;
  }

  label {
    font-size: 20px;
    margin-left: 6px;
  }
</style>
