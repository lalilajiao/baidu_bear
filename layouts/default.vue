<template>
  <div>
    <Nuxt />
  </div>
</template>
<script lang="js">
import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      words: {
        1: '愿你满头秀发飞扬，实现发量自由',
        2: '愿你狂吃不胖，桃花贼旺',
        3: '愿你工作不再996，从此和熬夜886',
        4: '愿你把别人羡慕的样子，过成自己的样子 愿你人在家中坐，涨薪马上来',
        5: '送你年度锦鲤，把全世界的好运都攥在手里',
        6: '愿你百毒不侵，病毒统统走开！',
        7: '愿你可可爱爱，没有眼袋',
        8: '愿你成双成对，一夜富贵！'
      },
      videosList: [
        'duck',
        'fa',
        'fish',
        'hair',
        'lap',
        'nan',
        'paper',
        'pi',
        'qingwa',
        'xiang',
        'yezi'
      ]
    }
  }
})

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
