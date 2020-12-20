<template>
  <div class="make-wrap">
    <div class="tip">
      <img src="./img/tip.png">
    </div>
    <div class="main">
      <div class="arrow up" @click="pre"></div>
      <div :class="['texts', 'animate__tada', textAnimate]" @animationend="textAnimationEnd">
        {{currentText}}
      </div>
      <div class="arrow down" @click="next"></div>
    </div>
    <div class="gift-box">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(value, key) in videosList" :key="key">
            {{value}}
          </div>
        </div>
      </div>
    </div>
    <div class="btn"></div>
  </div>
</template>
<script lang="js">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      words: {},
      textIndex: 0,
      textTransform: 'tranlateY(0)',
      currentText: '',
      textAnimate: 'animate__animated'
    }
  },
  watch: {
    textIndex(val){
      this.currentText = this.words[val]
      this.textAnimate = 'animate__animated'
    }
  },
  mounted(){
    this.currentText = this.words[1]
    this.$nextTick(() => {
      var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        autoplay: 5000,//可选选项，自动滑动
      })
    })
  },
  methods: {
    pre(){
      if(this.textIndex <= 0) return
      this.textIndex -- 
    },
    next(){
      if(this.textIndex >= Object.keys(this.words).length) return
      this.textIndex ++
    },
    textAnimationEnd(){
      this.textAnimate = ''
    }
  }
})
</script>
<style lang="scss" scoped>
.make-wrap{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(./img/make-bg.png);
  background-size: 100% 100%;
  .tip{
    padding: 0.666rem 0.21rem 0;
    img {
      width: 100%;
    }
  }
  .main{
    position: absolute;
    background: #f1958a;
    border-radius: 0.2rem;
    left: 0.21rem;
    right: 0.21rem;
    top: 1.7rem;
    bottom: 2rem;
    border-bottom: solid .04rem #dd877d;
    .texts{
      overflow: hidden;
      position: absolute;
      bottom: 0.36rem;
      left: 0.3rem;
      right: 0.3rem;
      height: 0.35rem;
      line-height: .35rem;
      background: #e5efe4;
      border-radius: 0.5rem;
      color: #53514f;
      font-size: .16rem;
      padding-left: .14rem;
      border-bottom: 2px solid #bfcbbe;
    }
    .arrow{
      background-image: url(./img/tri.png);
      background-size: 100% 100%;
      width: .245rem;
      height: .145rem;
      position: absolute;
      left: 50%;
      margin-left: -.127rem;
      bottom: 0;
      &.up{
        bottom: 0.78rem;
      }
      &.down{
        bottom: 0.15rem;
        -webkit-transform: rotate(180deg);
      }
    }
  }
  .gift-box{
    position: absolute;
    bottom: 0.8rem;
    left: 0;
    padding: 0 0.21rem 0;
    right: 0;
    background-image: url(./img/gift-box.png);
    background-size: 90% auto;
    background-repeat: no-repeat;
    background-position: center bottom;
    height: 1.5rem;
    .swiper-container{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
  .btn{
    width: 1.59rem;
    height: .5rem;
    background-image: url(./img/make.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: 0.22rem;
    left: 50%;
    margin-left: -0.8rem;
  }
}
</style>