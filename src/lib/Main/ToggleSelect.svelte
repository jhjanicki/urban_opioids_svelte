<script>
  import Toggle from "./Toggle.svelte";
</script>

<div class="toggle-selection">
  <div class="toggle-wrapper">
    <p>See what it would take to...</p>
    <Toggle
      id1={"double"}
      id2={"close"}
      name={"treatment"}
      text1={"Double the current treatment"}
      text2={"Close the treatment gap"}
    />
  </div>
  <div class="toggle-wrapper">
    <p>By...</p>
    <Toggle
      id1={"new"}
      id2={"increase"}
      name={"provider"}
      text1={"Adding new providers"}
      text2={"Increasing capacity of existing providers"}
    />
  </div>
  <hr />
  <button class="button">CTA LANGUAGE HERE</button>
</div>

<style>
  .toggle-selection {
    padding: 0px 30px;
  }

  hr {
    height: 0.5px;
    margin: 40px auto;
  }

  p {
    margin: 0px 0px 1rem 0px;
  }

  label {
    font-size: 0.85rem;
    color: #353535;
  }

  .button {
    max-width: 300px;
    margin: 20px 15px 20px auto;
    padding: 8px 12px;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    text-transform: uppercase;
    background-color: none;
    text-align: center;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    transition: all 500ms ease;
    color: #9d9d9d;
    background-color: #d2d2d2;
    border: solid 1.5px #d2d2d2;
  }
</style>
