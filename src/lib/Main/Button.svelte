<script>
  export let id;
  export let text;
</script>

<button id="buttons-{id}" class="button">{text}</button>

<style>
  .button {
    max-width: 300px;
    margin: 20px 15px 20px auto;
    padding: 8px 12px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5;
    text-transform: uppercase;
    background-color: none;
    text-align: center;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    transition: all 500ms ease;
    color: #353535;
    background-color: #fff;
    border: solid 1.5px #353535;
  }

  .button:hover {
    cursor: pointer;
    color: #fff;
    background-color: #353535;
    transition: all 0.5s ease;
  }
</style>
