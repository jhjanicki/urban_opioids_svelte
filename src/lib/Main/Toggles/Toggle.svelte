<script>
  export let options;
  export let selected = options[0].value;

  const id = Math.floor(Math.random() * 100);

  const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<div class="s s--multi">
  <div
    role="radiogroup"
    class="group-container"
    aria-labelledby={`label-${id}`}
    id={`group-${id}`}
  >
    {#each options as { value, label }}
      <input type="radio" id={slugify(label)} bind:group={selected} {value} />
      <label for={slugify(label)}> {label} </label>
    {/each}
  </div>
</div>

<style>
  .s--multi label {
    display: inline-block;
    /* line-height: 1.6; */
    position: relative;
    z-index: 2;
  }

  .s--multi input {
    opacity: 0;
    position: absolute;
  }

  .s--multi label:first-of-type {
    padding-right: 5em;
  }

  .s--multi label:last-child {
    margin-left: -5em;
    padding-left: 5em;
  }

  /* making the switch UI.  */
  .s--multi label:first-of-type:before,
  .s--multi label:first-of-type:after {
    content: "";
    height: 1.25em;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    vertical-align: middle;
  }

  .s--multi label:first-of-type:before {
    content: "Yes";
    text-align: center;
    border-radius: 20px;
    z-index: 2;
    position: absolute;
    width: 2em;
    height: 1.2em;
    background: #000;
    top: 0.2em;
    right: 0.5em;
    /* position of yes at start */
    transition: transform 0.3s;
    color: #fff;
  }

  .s--multi label:first-of-type:after {
    background: #d2d2d2;
    border-radius: 1em;
    margin: 0 1em;
    transition: background 0.2s ease-in-out;
    width: 4.5em;
    height: 1.6em;
    margin-left: 4px;
  }

  .s--multi input:first-of-type:checked ~ label:first-of-type:after {
    background: #d2d2d2;
  }

  .s--multi input:first-of-type:checked ~ label:first-of-type:before {
    content: "No";
    transform: translateX(-2.1em);
  }

  .s--multi input:last-of-type:checked ~ label:last-of-type {
    z-index: 1;
  }
</style>
