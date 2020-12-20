<template>
  <div class="index-wrap">
    <div class="guide"  v-show="counting != 0">
      <div class="pannel">
          <div class="counting animate__animated animate__rubberBand animate__repeat-3">{{counting}}</div>
      </div>
    </div>
    <div class="main" v-show="counting == 0">
      <div class="bear-hand" 
        @touchstart.prevent="onTouchStart" 
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
        :style="{backgroundPosition: bearHandPosition, height: bearHeight + 'px'}"
      >
        <div :class="['arrow', slideDirection]" v-show="!showGift"></div>
        <div :class="['lt-hand', slideDirection]" v-show="!showGift"></div>
      </div>
      <div class="gift-mf" />
      <div class="gift-lunz" />
      <div class="gift-paint" />
      <div class="gift-gamepad" />
      <transition>
        <div class="btns animate__animated animate__bounceInUp" v-if="showBtns">
          <div class="yzlw"></div>
          <div class="slwq"></div>
        </div>
      </transition>
      <!-- <video id="alpha-video" autoplay muted   webkit-playsinline playsinline  preload> -->
      <video id="alpha-video" style="display: none;" muted loop x5-video-player-type="h5"  webkit-playsinline playsinline  preload>
        <source src="./video/qingwa.mp4" type="video/mp4" >
      </video>
      <div id="output" style="position:relative;z-index:10000;">
        <canvas class="animate__animated animate__bounceInUp" v-show="showGift" id="show" width="375" height="375"></canvas>
        <canvas id="buffer" height="375" width="750" style="display: none;"></canvas>
      </div>
    </div>
    <div class="logo" />
  </div>
</template>

<script>
const openDistance = 216
const totalStep = 12
const pauseStep = 6

window.onerror = function (message, url, line, column, error) {
  alert('log---onerror::::',message, url, line, column, error);
}

export default {
  data() {
    return {
      screenWidth: 0,
      bearHeight: 0,
      moveDistance: 0,
      moveStartY: 0,
      bearHandPosition: '0px 0px',
      currentStep: 0,
      timer: null,
      showBtns: false,
      showGift: false,
      counting: 3, // 倒计时秒数
      openStep: 0, // 成功操作三次即打开
      slideDirection: '',
      canvas: {
        showCanvas: null,
        showCtx: null,
        bufferCanvas: null,
        bufferCtx: null,
        video: null,
        width: 0,
        height: 0,
      }
    }
  },
  watch: {
    moveDistance(val) {
      let currentStep = Math.floor(val / totalStep)
      if(currentStep > 0 && currentStep < pauseStep){
        this.currentStep =  currentStep
        this.bearHandPosition = `${-this.currentStep * this.screenWidth}px 0` 
      }
    }
  },
  mounted() {
    this.screenWidth = window.screen.width
    this.bearHeight = this.screenWidth * ( 500 / 375 )
    this.slideDirection =  Math.random() > 0.5 ? 'up' : 'down'
    this.initCanvas()
    this.startCount()
  },
  methods: {
    initCanvas(){
      this.canvas.showCanvas = document.getElementById("show");
      this.canvas.showCtx = this.canvas.showCanvas.getContext("2d");
      this.canvas.bufferCanvas = document.getElementById("buffer");
      this.canvas.bufferCtx = this.canvas.bufferCanvas.getContext("2d");
      this.canvas.video = document.getElementById('alpha-video');
      this.canvas.width = this.canvas.showCanvas.width;
      this.canvas.height = this.canvas.showCanvas.height;
    },
    startCount(){
      this.counter = setInterval(() => {
        if(this.counting == 0){
          clearInterval(this.counter)
          this.counter = null
          return;
        }
        this.counting --
      }, 1000)
    },
    onTouchStart(e){
      this.moveStartY = e.touches[0].clientY
    },
    onTouchMove(e){
      const endY = e.changedTouches[0].clientY
      this.moveDistance = Math.abs(endY - this.moveStartY)
    },
    onTouchEnd(e){
      const endY = e.changedTouches[0].clientY
      this.moveDistance = Math.abs(endY - this.moveStartY)
      if(this.moveDistance >= openDistance){
        if(this.openStep == 2){
          this.showBtns = true
          this.showGift = true
          this.continueFinish()
          this.playGift()
        }else{
          this.openStep ++
          this.backToStart()
          console.log(Math.random() > 0.5 ? 'up' : 'down')
          this.slideDirection = Math.random() > 0.5 ? 'up' : 'down'
          alert(`恭喜完成第${this.openStep}次`)
        }
      }else{
        if(this.moveDistance > 0 && this.currentStep > 1){
          this.backToStart()
        }
      }
    },
    addZero(num) {
      return num >= 10 ? num : '0' + num
    },
    reset(){
      clearInterval(this.timer)
      this.timer = null
      this.moveStartY = 0
      this.currentStep = 0
    },
    // 继续之前未完成的动画
    continueFinish(){
      let i = this.currentStep
      if(this.timer != null){
        this.reset()
      }else{
        this.timer = setInterval(() => {
          i ++
          if(i == totalStep){
            this.reset()
            return 
          }
          this.bearHandPosition = `${-i * this.screenWidth}px 0` 
        }, 80)
      }
    },
    //用力不够恢复之前的动画
    backToStart() {
      let i = this.currentStep
      if(this.timer != null){
        this.reset()
      }else{
        this.timer = setInterval(() => {
          i --
          if(i == 0){
            this.reset()
            return 
          }
          this.bearHandPosition = `${-i * this.screenWidth}px 0` 
        }, 80)
      }
    },
    playGift(){
      const {
        showCanvas,
        showCtx,
        bufferCanvas,
        bufferCtx,
        video,
        width,
        height,
       } = this.canvas
      
      video.play();

      function processFrame () {
        bufferCtx.drawImage(video, 0, 0, width * 2, height)
        const image = bufferCtx.getImageData(width, 0, width, height)
        const alphaData = bufferCtx.getImageData(0, 0, width, height).data

        for (var i = 3, len = image.data.length; i < len; i = i + 4) {
          image.data[i] = alphaData[i - 1]; 
        }
        showCtx.putImageData(image, 0, 0, 0, 0, width, height);
        window.requestAnimationFrame(processFrame)
      }

      video.addEventListener('play', function() {
        alert('play')
        processFrame();
      }, false);
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes gift-move {
  from {
    -webkit-transform: translateY(0);
  }
  to {
    -webkit-transform: translateY(-.3rem);
  }
}

@keyframes hand-move-up {
  from {
    -webkit-transform: translateY(1rem);
  }
  to {
    -webkit-transform: translateY(-1rem);
  }
}

@keyframes hand-move-down {
  from {
    -webkit-transform: translateY(-1rem);
  }
  to {
    -webkit-transform: translateY(1rem);
  }
}

.index-wrap{
  position: absolute;
  // background-image: url(./img/bg.png);
  background: #ec7664;
  background-size: cover;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .guide{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    flex-direction: column;
    .pannel{
      width: 100%;
      height: 2.73rem;
      background-image: url(./img/guide.png);
      background-repeat: no-repeat;
      background-size: 80% auto;
      background-position: center;
      position: relative;
      .counting{
        position: absolute;
        bottom: -.3rem;
        font-size: .5rem;
        color: #fff;
        width: 100%;
        text-align: center;
      }
    }
  }
  .bear-hand{
    position: absolute;
    top: 0;
    width: 100%;
    // background-image: url(./img/hand.png);
    background-image: url(./img/bearPawOpen.jpg);
    background-size: auto 100%;
    .arrow{
      width: .84rem;
      height: 1.81rem;
      background-image: url(./img/arrow.png);
      background-size: 100% 100%;
      position: absolute;
      top: .6rem;
      left: 50%;
      margin-left: -.52rem;
      &.up{
        -webkit-transform: rotate(180deg);
      }
      &.down{
        -webkit-transform: rotate(0deg);
      }
    }
    .lt-hand{
      position: absolute;
      top: 1.23rem;
      right: 0.15rem;
      width: 1.47rem;
      height: 1.07rem;
      background-size: 100% 100%;
      background-image: url(./img/lt-hand.png);
      &.up{
        -webkit-animation: hand-move-up 3s infinite;
      }
      &.down{
        -webkit-animation: hand-move-down 3s infinite;
      }
    }
  }
  // 悬浮礼物
  .gift-mf{
    width: 1.15rem;
    height: 1.33rem;
    position: absolute;
    top: 0.62rem;
    right: 0;
    background-image: url(./img/mf.png);
    background-size: 100% 100%;
    -webkit-animation: gift-move 4s infinite alternate;
    z-index: 1;
  }
  .gift-lunz{
    width: 0.94rem;
    height: 1.59rem;
    position: absolute;
    top: 0.75rem;
    left: 0;
    background-image: url(./img/lunz.png);
    background-size: 100% 100%;
    -webkit-animation: gift-move 3s infinite 1s alternate;
    z-index: 1;
  }
  .gift-paint{
    width: 0.93rem;
    height: 3.1rem;
    position: absolute;
    bottom: 0.1rem;
    left: 0;
    background-image: url(./img/paint.png);
    background-size: 100% 100%;
    -webkit-animation: gift-move 5s infinite 0.5s alternate;
    z-index: 1;
  }
  .gift-gamepad{
    width: 0.93rem;
    height: 0.94rem;
    position: absolute;
    bottom: 0.1rem;
    right: 0;
    background-image: url(./img/gamepad.png);
    background-size: 100% 100%;
    -webkit-animation: gift-move 2s infinite 0.5s alternate;
    z-index: 1;
  }
  // 底部按钮
  .btns{
    position: absolute;
    padding: 0 0.16rem;
    bottom: .54rem;
    width: 100%;
    height: 1rem;
    z-index: 2;
    >div{
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: bottom;
      width: 50%;
      height: 100%;
      position: absolute;
    }
    .slwq{
      left: 0;
      background-image: url(./img/slwq.png);
    }
    .yzlw{
      right: 0;
      background-image: url(./img/yzlw.png);
    }
  }
}
</style>
