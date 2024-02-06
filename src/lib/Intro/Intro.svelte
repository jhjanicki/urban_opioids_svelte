<script>
  import Social from "./Social.svelte";
  import { print } from "../../store/store";
</script>

<section class="intro-main" class:print={$print}>
  <div class="intro-left">
    <img src="./bar.gif" />
  </div>
  <div class="intro-right">
    <h1>
      What Would It Take to Get Medication for Opioid Use Disorder to More
      People in Need?
    </h1>
    <h4>
      Explore how to get buprenorphine and methadone to more Michigan and New
      Jersey residents with opioid use disorder.
    </h4>
    <div class="date">February 22, 2024</div>
    <div class="socialWrapper">
      <Social />
    </div>
    <p>
      <a
        href="https://www.cdc.gov/opioids/healthcare-professionals/prescribing/opioid-use-disorder.html"
        target="_blank">Opioid use disorder</a
      >
      affects millions of Americans, and
      <a
        href="https://www.cdc.gov/nchs/nvss/vsrr/drug-overdose-data.htm"
        target="_blank">opioid overdose deaths reached a historic high</a
      >
      in 2023. Although medication treatment for opioid use disorder
      <a
        href="https://nida.nih.gov/publications/research-reports/medications-to-treat-opioid-addiction/efficacy-medications-opioid-use-disorder"
        target="_blank">can reduce opioid overdose deaths</a
      >, the need for these treatments often outpaces their availability. But it
      is possible to get treatment to more people who need it. This tool
      explores state- and county-level gaps in access to buprenorphine and
      methadone—two of the main medication treatments available for opioid use
      disorder—in Michigan and New Jersey. It also provides information about
      factors that shape access to treatment and strategies for closing
      treatment gaps.
    </p>
  </div>
</section>

<style>
  .intro-main {
    color: #000000;
    display: flex;
    min-height: 400px;
    margin-top: 50px;
  }

  .intro-main p {
    font-size: 20px;
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
    align-items: center;
    display: flex;
    flex: 1;
  }

  .intro-left img {
    margin-left: auto;
    margin-right: auto;
  }

  .intro-right {
    background-color: #d2d2d2;
    margin: 10px 0px 5px 5px;
    padding: 10px;
    flex: 2;
  }

  .intro-right h1 {
    padding-top: 96px;
    font-size: 48px;
    font-weight: 700;
    margin: 0 auto;
    text-align: center;
    max-width: 960px;
  }

  .intro-main h4 {
    max-width: 500px;
    font-size: 20px;
    font-family: "Lato", sans-serif;
    font-style: italic;
    width: 100%;
    line-height: 24px;
    margin: 15px auto;
    text-align: center;
  }

  .date {
    font-size: 14px;
    text-align: center;
    margin: 32px auto;
  }

  @media (max-width: 768px) {
    .intro-right h1 {
      padding-top: 80px;
      font-size: 36px;
      line-height: 40px;
    }

    .intro-main h4 {
      font-size: 18px;
    }

    .date {
      margin: 24px auto;
    }
  }

  @media (max-width: 768px) {
    .intro-main {
      display: grid;
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

    .intro-right h1 {
      padding-top: 64px;
      font-size: 36px;
    }
    .intro-main h4 {
      font-size: 18px;
    }
  }

  .print .intro-left,
  .print .socialWrapper {
    display: none;
  }
  .print .intro-right {
    background-color: #fff;
    margin: 0px auto;
    max-width: 1200px;
  }

  .print .intro-right h1,
  .print .intro-right h4,
  .print .intro-right p,
  .print .date {
    text-align: left;
    margin: 32px 0px;
    max-width: calc(100% - 40px);
    font-weight: 400;
  }

  .print .intro-right h1 {
    font-size: 36px;
    padding-top: 50px;
    padding-bottom: 20px;
    font-weight: 600;
  }
  .print .intro-right h4 {
    font-size: 24px;
  }
  .print .intro-right p {
    font-size: 18px;
  }

  .intro-main.print {
    display: block;
    min-height: none;
  }
</style>
