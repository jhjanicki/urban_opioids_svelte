<script>
import Social from "./Social.svelte";

</script>


<section class="intro-main">
  <div class="intro-left">
  </div>
  <div class="intro-right">
    <h1 class="intro-right__h1">What Would It Take to Close the Opioid Treatment Gap</h1>
    <div class="date">July 12, 2023</div>
    <Social></Social>
      <p class="intro-main__p">Opioid use disorder affects millions of Americans, and opioid overdose deaths are at
        a historic high in 2023. Even though medications can reduce opioid overdose deaths, the need for treatments
        often
        outpaces their availability. But it is possible to get treatment to more people who need it. This tool
        explores
        state- and county-level opioid use disorder treatment gaps related to buprenorphine and methadone treatment
        in
        seven states, and strategies for closing them.
      </p>
  </div>
</section>


  <style>

.date {
    font-size: 0.7rem;
    color: #696969;
    text-align: center;
    margin: 20px 0px;
  }

.intro-left {
  background-color: #FDBF11;
  margin: 10px 5px 5px 0px;
  padding: 10px;
}

.intro-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  min-height: 400px;
  margin-top: 50px;
}

.intro-main__p {
  max-width: 760px;
  width: 100%;
  line-height: 1.6;
  margin: 0 auto;
  margin-bottom: 30px;
}

.intro-right {
  background-color: #D2D2D2;
  margin: 10px 0px 5px 5px;
  padding: 10px;
}

.intro-right__h1{
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0 auto;
  text-align: center;
  max-width: 960px;
}
  </style>