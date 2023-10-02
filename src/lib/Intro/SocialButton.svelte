<script>
  export let path;
  export let link;
</script>

<li>
  <a href={link}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d={path} fill="#000000" />
    </svg>
  </a>
</li>

<style>
  svg {
    height: 24px;
  }

  svg:hover path {
    fill: #1696d2;
  }

  li {
    margin: 0px 10px;
  }

  li:last-of-type {
    margin-right: 0;
  }
</style>
