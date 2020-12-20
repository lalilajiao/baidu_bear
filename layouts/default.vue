<template>
  <div>
    <Nuxt />
  </div>
</template>
<script lang="js">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
  },
  methods: {

  }
})
</script>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body{
  font-size: 14px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.logo{
  position: absolute;
  left: 50%;
  bottom: .2rem;
  height: .35rem;
  width: 1.13rem;
  margin-left: -0.556rem;
  background-image: url(~assets/img/logo.png);
  background-size: 100% 100%;
}
</style>
