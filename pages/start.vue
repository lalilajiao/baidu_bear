<template>
  <div class="start-page">
    <div v-if="!loadedDone" class="percent">
        {{percent}}%
    </div>
    <div class="main" v-else>
      <div class="hi animate__animated animate__bounceInLeft animate__delay-1s"></div>
      <div class="input animate__animated animate__bounceInDown animate__delay-2s"></div>
      <div class="star animate__animated animate__zoomIn animate__delay-3s"></div>
      <div class="heart animate__animated animate__zoomIn animate__delay-3s" @animationend="onHearAnimateDone"></div>
      <div @click="goPlay" class="go animate__animated  animate__pulse animate__delay-4s animate__infinite" :style="{opacity: goOpaicty}"></div>
      <div class="bear-hand" :style="{backgroundPosition: bearHandPosition, height: bearHeight + 'px'}"></div>
    </div>
    <div class="logo" />
  </div>
</template>
<script lang="js">
import Vue from 'vue'

const imgs = [
  require('./img/arrow.png'),
  require('./img/bearPawFirstTouch.jpg'),
  require('./img/bearPawIdle.jpg'),
  require('./img/bearPawOpen.jpg'),
  require('./img/bearPawShake.jpg'),
  require('./img/bg.png'),
  require('./img/go.png'),
  require('./img/hand.png'),
  require('./img/heart.png'),
  require('./img/hi.png'),
  require('~/assets/img/logo.png'),
  require('./img/lt-hand.png'),
  require('./img/lunz.png'),
  require('./img/mf.png'),
  require('./img/slwq.png'),
  require('./img/star.png'),
  require('./img/yzlw.png'),
  require('./img/guide.png'),
  require('./img/input.png'),
  require('./img/paint.png'),
  require('./img/gamepad.png'),
]

const videos = [
  require('./video/qingwa.mp4'),
]

const totalStep = 12

export default Vue.extend({
  data() {
    return {
      loadedDone: false,
      percent: 0,
      screenWidth: 0,
      bearHeight: 0,
      bearHandPosition: '0px 0px',
      goOpaicty: 0,
    }
  },
  mounted() {
    this.preloadImages()
    // this.preloadVideos()
    this.init()
  },
  methods: {
    init(){
      this.screenWidth = window.screen.width
      this.bearHeight = this.screenWidth * ( 500 / 375 )
    },
    preloadImages(){
     let count = 0;
      for (let img of imgs) {
        let image = new Image();
        image.src = img;
        image.onload = () => {
          count++;
          this.percent = Math.round((count / imgs.length) * 100)
          if(count == imgs.length){
            this.loadedDone = true
            this.startAnimation()
          }
        };
      }
    },
    preloadVideos(){
      // var req = new XMLHttpRequest();
      // req.open('GET', require('./video/qingwa.mp4'), true);
      // req.responseType = 'blob';

      // req.onload = () => {
      //   // Onload is triggered even on 404
      //   // so we need to check the status code
      //   if (this.status === 200) {
      //       var videoBlob = this.response;
      //       var vid = URL.createObjectURL(videoBlob); // IE10+
      //       // Video is now downloaded
      //       // and we can set it as source on the video element
      //       console.log(vid)
      //       this.videoURL =vid
      //   }
      // }
      // req.onerror = function() {
      //   // Error
      // }

      // req.send();
    },
    startAnimation(){
      this.startBearShaking()
    },
    startBearShaking(){
      let i = 0
      this.timer = setInterval(() => {
        if(i == totalStep){
          clearInterval(this.timer)
          this.timer = null
          this.startBearShaking()
          return 
        }
        this.bearHandPosition = `${-i * this.screenWidth}px 0` 
        i ++
      }, 80)
    },
    onHearAnimateDone(){
      this.goOpaicty = 1
    },
    goPlay(){
      this.$router.push('/')
    }
  }
})
</script>
<style lang="scss" scoped>
@keyframes shake {
  
}

.start-page{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  background: #ec7664;
  .percent{
    color: #fff;
    font-size: .2rem;
    font-weight: bold;
  }
  .main{
    .bear-hand{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-image: url(./img/bearPawShake.jpg);
      background-size: auto 100%;
    }
    .hi{
      position: absolute;
      z-index: 2;
      left: 0;
      top: 2.2rem;
      width: 1.78rem;
      height: 1.56rem;
      background-image: url(./img/hi.png);
      background-size: 100% 100%;
    }
    .input{
      position: absolute;
      z-index: 1;
      right: 0;
      top: .22rem;
      width: 3.36rem;
      height: 3.31rem;
      background-image: url(./img/input.png);
      background-size: 100% 100%;
    }
    .star{
      position: absolute;
      z-index: 2;
      right: .25rem;
      top: 2.9rem;
      width: .69rem;
      height: .64rem;
      background-image: url(./img/star.png);
      background-size: 100% 100%;
    }
    .heart{
      position: absolute;
      z-index: 2;
      left: .29rem;
      top: 0.9rem;
      width: .55rem;
      height: .51rem;
      background-image: url(./img/heart.png);
      background-size: 100% 100%;
    }
    .go{
      position: absolute;
      z-index: 2;
      right: .38rem;
      top: 2.13rem;
      width: .93rem;
      height: .91rem;
      background-image: url(./img/go.png);
      background-size: 100% 100%;
    }
  }
}
</style>