<section class="view-selection">
    <div class="wrapper">
      <div class="views">
        <div class="img-wrapper">
          <img class="views__img" src="state_pennsylvania.png" />
          <button id="entry-stateview" class="views__button">State view</button>
        </div>
        <div class="img-wrapper">
          <img class="views__img" src="county_pennsylvania.png" />
          <button id="entry-countyview" class="views__button">County view</button>
        </div>
      </div>
    </div>
  </section>


  <style>

.view-selection {
  background-color: #D9D9D9;
  margin: 0px;
  padding: 20px;
}

.views {
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
}

.views .img-wrapper {
  max-width: 600px;
  flex: 1;
  padding: 10px 30px;
  position: relative;
}

.views__img {
  max-width: 100%;
}

.views__button{
  max-width: 300px;
  margin: 10px auto;
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
  position: absolute;
  transform: translate(-50%, -50%);
  margin-right: -50%;
  top: 50%;
  left: 50%;
  color: #fff;
  background-color: #353535;
  border: solid 1.5px #353535;
}

.views__button:hover{
  cursor: pointer;
  color: #353535;
  background-color: transparent;
  transition: all 0.5s ease;
}

  </style>