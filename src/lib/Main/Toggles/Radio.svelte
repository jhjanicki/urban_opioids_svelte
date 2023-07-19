<script>
  export let options;
  export let selected = "";

  const id = Math.floor(Math.random() * 100);

  const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div aria-labelledby={`label-${id}`} id={`group-${id}`}>
  {#each options as { value, label }}
    <input type="radio" id={slugify(label)} bind:group={selected} {value} />
    <label for={slugify(label)}> {label} </label>
  {/each}
</div>
