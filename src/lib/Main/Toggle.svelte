<script>
  export let id1;
  export let id2;
  export let name;
  export let text1;
  export let text2;
</script>

<div>
  <input type="radio" id={id1} {name} value={id1} checked />
  <label for={id1}>{text1}</label>
</div>
<div>
  <input type="radio" id={id2} {name} value={id2} />
  <label for={id2}>{text2}</label>
</div>
