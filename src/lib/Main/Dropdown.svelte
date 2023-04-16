<script>
  //   const optionMenu = d3.select(".select-menu").node(), // document.querySelector(".select-menu"),
  //     selectBtn = d3.select(".select-menu .select-menu__button").node(), //optionMenu.querySelector
  //     sBtn_text = d3.select(".select-menu .select-menu__text").node(); //optionMenu.querySelector

  //   // click events
  //   selectBtn.addEventListener("click", () =>
  //     optionMenu.classList.toggle("active")
  //   );
</script>

<div class="select-menu">
  <div class="select-menu-button">
    <span class="select-menu-text">Select a county</span>
  </div>
  <ul class="options" />
</div>

<style>
  .select-menu {
    max-width: 330px;
    margin: 20px 0px;
  }

  .select-menu .select-menu-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* remove default arrow */
    margin: 1rem 0px;
    border: 1px solid #d2d2d2;
    border-radius: 0;
    font-family: Lato;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    color: #696969;
    cursor: pointer;
    padding: 8px;
    background: url("./img/arrow-blue.png") 96%/15% no-repeat #ffffff;
    background-size: auto;
  }

  .select-menu .options {
    position: absolute;
    width: 328px;
    overflow-y: auto;
    max-height: 295px;
    padding: 10px;
    margin-top: -20px;
    border: 1px solid #d2d2d2;
    border-radius: 0;
    background: #fff;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
    animation-name: fadeInDown;
    -webkit-animation-name: fadeInDown;
    animation-duration: 0.35s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.35s;
    -webkit-animation-fill-mode: both;
    display: none;
  }

  .select-menu .options .option {
    display: flex;
    height: 40px;
    cursor: pointer;
    padding-left: 10px;
    /* border-radius: 8px; */
    align-items: center;
    background: #fff;
  }

  .select-menu .options .option:hover {
    background: #1696d2;
    color: #fff;
  }

  .select-menu .options .option i {
    font-size: 25px;
    margin-right: 12px;
  }

  .select-menu .options .option .option-text {
    font-size: 18px;
    color: #333;
  }

  .select-menu.active .select-menu-button i {
    transform: rotate(-180deg);
  }

  .select-menu.active .options {
    display: inherit;
    padding: 0px;
    display: block;
    opacity: 0;
    z-index: 10;
    animation-name: fadeInUp;
    -webkit-animation-name: fadeInUp;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-fill-mode: both;
  }

  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 30px, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes fadeInDown {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    to {
      transform: translate3d(0, 20px, 0);
      opacity: 0;
    }
  }
</style>
