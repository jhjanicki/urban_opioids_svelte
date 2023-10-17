<script>
  export let options;
  export let selected = "";

  const id = Math.floor(Math.random() * 100);

  const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div aria-labelledby={`label-${id}`} id={`group-${id}`} class="radio">
  {#each options as { value, label }}
    <input type="radio" id={slugify(label)} bind:group={selected} {value} />
    <label for={slugify(label)}> {label} </label>
    <br />
  {/each}
</div>

<style>
  .radio {
    accent-color: black;
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
    font-size: 16px;
  }
</style>
