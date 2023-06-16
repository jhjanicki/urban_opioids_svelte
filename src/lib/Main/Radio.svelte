<script>
  export let options;
  export let selected = options[0].value;

  const uniqueID = Math.floor(Math.random() * 100);

  const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div
  role="radiogroup"
  class="group-container"
  aria-labelledby={`label-${uniqueID}`}
  id={`group-${uniqueID}`}
>
  {#each options as { value, label }}
    <input
      class="sr-only"
      type="radio"
      id={slugify(label)}
      bind:group={selected}
      {value}
    />
    <label for={slugify(label)}> {label} </label>
  {/each}
</div>
