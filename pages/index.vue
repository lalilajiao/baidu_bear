<template>
  <div class="index-wrap">
    <div class="gift-mf" />
    <div class="gift-lunz" />
    <div class="bear-hand" 
      @touchstart.prevent="onTouchStart" 
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onTouchEnd"
      :style="{backgroundPosition: bearHandPosition}"
    >
      <div class="arrow"></div>
      <div class="lt-hand"></div>
    </div>
    <!-- <div class="bear-hand" :style="{backgroundImage: `url(${PngSequence})`}"></div> -->
    <div class="btns">
      <div class="yzlw"></div>
      <div class="slwq"></div>
    </div>
    <div class="logo" />
  </div>
</template>

<script>
const openDistance = 216
const totalStep = 12

export default {
  data() {
    return {
      startCount: 24,
      PngSequence: '',
      moveDistance: 0,
      moveStartY: 0,
      bearHandPosition: '0px 0px',
      currentStep: 0,
      timer: null
    }
  },
  watch: {
    moveDistance(val) {
      /// 216 可以整除 12帧
      this.currentStep = Math.floor(val / totalStep)
      if(this.currentStep > 0 && this.currentStep < totalStep){
        this.bearHandPosition = `${-this.currentStep * 281}px 0` 
      }
    }
  },
  mounted() {
    // this.initAnimate()
    // this.openHand()
  },
  methods: {
    onTouchStart(e){
      this.moveStartY = e.touches[0].clientY
    },
    onTouchMove(e){
      const endY = e.changedTouches[0].clientY
      this.moveDistance = endY - this.moveStartY
    },
    onTouchEnd(e){
      const endY = e.changedTouches[0].clientY
      this.moveDistance = endY - this.moveStartY
      if(this.moveDistance >= openDistance){
        alert('恭喜你成功啦')
      }else{
        console.log('失败了')
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
          this.bearHandPosition = `${-i * 281}px 0` 
        }, 80)
      }
    },
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

@keyframes hand-move {
  from {
    -webkit-transform: translateY(-1rem);
  }
  to {
    -webkit-transform: translateY(1rem);
  }
}

.index-wrap{
  position: absolute;
  background-image: url(./img/bg.png);
  background-size: cover;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .bear-hand{
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -1.47rem;
    height: 500px;
    width: 281px;
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
    }
    .lt-hand{
      position: absolute;
      top: 1.23rem;
      right: 0.15rem;
      width: 1.47rem;
      height: 1.07rem;
      background-size: 100% 100%;
      background-image: url(./img/lt-hand.png);
      -webkit-animation: hand-move 3s infinite;
    }
  }
  // 悬浮礼物
  .gift-mf{
    width: 1.26rem;
    height: 1.47rem;
    position: absolute;
    top: 0.62rem;
    right: 0;
    background-image: url(./img/mf.png);
    background-size: 100% 100%;
    -webkit-animation: gift-move 3s infinite alternate;
  }
  .gift-lunz{
    width: 1.04rem;
    height: 1.75rem;
    position: absolute;
    top: 0.75rem;
    left: 0;
    background-image: url(./img/lunz.png);
    background-size: 100% 100%;
    -webkit-animation: gift-move 3s infinite 1s alternate;
  }
  // 底部按钮
  .btns{
    position: absolute;
    padding: 0 0.16rem;
    bottom: .54rem;
    width: 100%;
    height: 1rem;
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
  // logo
  .logo{
    position: absolute;
    left: 50%;
    bottom: .2rem;
    height: .39rem;
    width: 1.25rem;
    margin-left: -0.625rem;
    background-image: url(./img/logo.png);
    background-size: 100% 100%;
  }
}
</style>
