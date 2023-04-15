<script>
    export let id;
    export let text;
    export let active;

</script>

<button id="tab-{id}" class="tab__button {active}" value="id">{text}</button>

<style>

.tab__button {
  font-size: 100%;
  font-weight: 400;
  color: #696969;
  background-color: #fff;
  cursor: pointer;
  height: 36px;
  border: none;
  padding: 0;
  text-transform: uppercase;
}

.tab__button.active {
  border-bottom: 4px solid #fdbf11;
  color: #000;
}

.tab__button:hover {
  border-bottom: 4px solid #fdbf11;
  color: #000;
}
</style>