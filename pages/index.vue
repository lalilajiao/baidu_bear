<template>
  <div class="index-wrap">
    <div class="bear-hand" :style="{backgroundImage: `url(${PngSequence})`}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startCount: 24,
      PngSequence: ''
    }
  },
  mounted() {
    this.firstTouch()
    // this.initAnimate()
    // this.openHand()
  },
  methods: {
    addZero(num) {
      return num >= 10 ? num : '0' + num
    },
    async firstTouch() {
      let i = 0
      let timer = setInterval(() => {
        i ++
        if(i == 12){
          clearInterval(timer)
          timer = null
          return 
        }
        this.PngSequence = require(`./img/firstTouch/bearPawFirstTouch_0${this.addZero(i)}.jpg`)
      }, 80)
    },
    async initAnimate() {
      let i = 0
      let timer = setInterval(() => {
        i ++
        if(i == 24){
          clearInterval(timer)
          timer = null
          return 
        }
        this.PngSequence = require(`./img/idle/bearPawIdle_0${this.addZero(i)}.jpg`)
      }, 80)
    },
    async openHand(){
      let i = 0
      let timer = setInterval(() => {
        i ++
        if(i == 12){
          clearInterval(timer)
          timer = null
          return 
        }
        this.PngSequence = require(`./img/open/bearPawOpen_0${this.addZero(i)}.jpg`)
      }, 80)
    }
  }
}
</script>

<style lang="scss" scoped>
.index-wrap{
  position: absolute;
  background: #aaa;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .bear-hand{
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
  }
}
</style>
