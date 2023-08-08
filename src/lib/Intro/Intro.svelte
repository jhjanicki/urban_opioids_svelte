<script>
  import Social from "./Social.svelte";
</script>

<section class="intro-main">
  <div class="intro-left">
    <p>placeholder</p>
  </div>
  <div class="intro-right">
    <h1>
      What Would It Take to Get Medication for Opioid Use Disorder to More
      People in Need?
    </h1>
    <h4>
      Methadone and buprenorphine are effective medications to treat opioid use
      disorder, but not enough people can access them.
    </h4>
    <div class="date">September 21, 2023</div>
    <Social />
    <p>
      Opioid use disorder affects millions of Americans, and opioid overdose
      deaths reached a historic high in 2023. Even though medication treatments
      can reduce opioid overdose deaths, the need for these treatments often
      outpaces their availability. But it is possible to get treatment to more
      people who need it. This tool explores state- and county-level gaps in
      access to buprenorphine and methadone—two of the main medication
      treatments available for opioid use disorder—in four states, plus
      strategies for closing these gaps.
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

  .intro-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    min-height: 400px;
    margin-top: 50px;
  }

  .intro-main p {
    max-width: 760px;
    width: 100%;
    line-height: 1.6;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .intro-left {
    background-color: #fdbf11;
    margin: 10px 5px 5px 0px;
    padding: 10px;
  }

  .intro-right {
    background-color: #d2d2d2;
    margin: 10px 0px 5px 5px;
    padding: 10px;
  }

  .intro-right h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 auto;
    text-align: center;
    max-width: 960px;
  }

  .intro-main h4 {
    max-width: 500px;
    font-size: 0.8rem;
    width: 100%;
    line-height: 1.4;
    margin: 15px auto;
    text-align: center;
  }

  @media (max-width: 768px) {
    .intro-right h1 {
      font-size: 1.8rem;
      line-height: 2rem;
    }
  }

  @media (max-width: 576px) {
    .intro-main {
      grid-template-columns: 1fr;
    }
    .intro-left,
    .intro-right {
      margin-left: 0px;
      margin-right: 0px;
    }

    .intro-right {
      margin-top: 5px;
      text-align: center;
    }
  }
</style>
