<script setup lang="ts">
import Button from '../../components/audience/Button.vue';
</script>

<template>
  <div class="container-footer background-footer">
    <div>
      <img
        src="../../assets/images/LSM_Logo-White.svg"
        alt="lsm-white"
        class="logo-white"
      />

      <div class="left-section">
        Equity Tower, 12th Floor <br />
        Sudirman Central Business District (SCBD) <br />
		Jl. Jend. Sudirman Kav. 52-53, Jakarta 12190 <br />
		Indonesia<br /><br />
		
        E-mail: lsmlawfirm@lsmlaw.co.id <br />Telephone: (62-21)2903-5900
        <br />Fax: (62-21)2903-5909 <br /><br /><br />
        <a href="WWW.LSMLAW.CO.ID" class="bottom-text-style">
          WWW.LSMLAW.CO.ID
        </a>
        <br /><br /><br />
        <div class="bottom-text-style">© 2025 All Rights Reserved.</div>
      </div>
    </div>
    <div>
      <div
        class="font-marcellus"
        style="font-size: 32px; color: black; margin-bottom: 40px"
      >
        Subscribe to our newsletter
      </div>
      <input
        class=""
        type="text"
        placeholder="Name*"
      />
      <br />
      <input
        class=""
        type="email"
        placeholder="Email*"
        
      />

      <div class="button-wrapper" >
        <Button class="" textButton="Subscribe" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-footer {
  padding: 70px 10%;
  display: flex;
  background-color: #dab38d;
  color: white;
  justify-content: space-between;
  align-items: center;
}

.font-philosopher {
  font-size: 20px;
}

.left-section {
  color: #4b3d2a;
  font-size: 16px;
  margin-top: 40px;
  line-height: 140%;
}

input {
  height: 3rem !important;
  width: 20rem;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 5px;
  overflow: visible;
  margin-bottom: 30px;
  padding: 5px 10px;
}

input:focus {
  outline: none;
}

.background-footer {
  background-image: url("../../assets/images/footer-bg.svg");
  background-position: right center;
  background-repeat: no-repeat;
  background-size: contain;
}

.font-philosopher {
  font-size: 25px;
}

.bottom-text-style {
  letter-spacing: 1.5px;
  color: #4b3d2a;
  font-size: 10px;
}

@media (max-width: 768px) {
  .background-footer {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .left-section {
    font-size: 15px;
  }
  .font-philosopher {
    font-size: 20px;
  }
  .container-footer {
    flex-direction: column-reverse;
    padding: 40px 5%;
  }

  .font-marcellus {
    text-align: center;
  }

  input {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
  }
}
</style>
