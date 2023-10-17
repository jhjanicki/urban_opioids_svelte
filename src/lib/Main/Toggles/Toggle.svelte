<script>
  export let options;
  export let selected = options[0].value;

  const id = Math.floor(Math.random() * 100);

  const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div class="toggle">
  <div
    role="radiogroup"
    class="group-container"
    aria-labelledby={`label-${id}`}
    id={`group-${id}`}
  >
    {#each options as { value, label }}
      <input type="radio" id={slugify(label)} bind:group={selected} {value} />
      <label for={slugify(label)}> {""} </label>
    {/each}
  </div>
</div>

<style>
  .toggle label {
    position: relative;
    z-index: 2;
  }

  .toggle input {
    opacity: 0;
    position: absolute;
  }

  .toggle label:first-of-type {
    padding-right: 100px;
  }

  .toggle label:last-child {
    margin-left: -100px;
    padding-left: 100px;
  }

  /* making the switch UI.  */
  .toggle label:first-of-type:before,
  .toggle label:first-of-type:after {
    content: "";
    /* height: 1.25em; */
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    vertical-align: middle;
  }

  .toggle label:first-of-type:before {
    content: "YES";
    text-align: center;
    border-radius: 20px;
    z-index: 2;
    position: absolute;
    width: 32px;
    height: 20px;
    background: #000;
    top: 0.2em;
    right: 0.55em;
    /* position of yes at start */
    transition: transform 0.3s;
    color: #fff;
    font-size: 16px;
    padding: 3px 9px;
  }

  .toggle label:first-of-type:after {
    background: #d2d2d2;
    border-radius: 1em;
    margin: 0 1em;
    transition: background 0.2s ease-in-out;
    width: 4.5em;
    height: 32px;
    margin-left: 4px;
  }

  .toggle input:first-of-type:checked ~ label:first-of-type:after {
    background: #d2d2d2;
  }

  .toggle input:first-of-type:checked ~ label:first-of-type:before {
    content: "NO";
    transform: translateX(-2.1em);
  }

  .toggle input:last-of-type:checked ~ label:last-of-type {
    z-index: 1;
  }
</style>
