<template>
  <div id="app">
    <div class="header">
      <ul class="header-button-left" v-on:click="step = 0" v-if="step === 1 || step === 2">
        <li>Cancel</li>
      </ul>
      <ul class="header-button-right" v-on:click="step = 2" v-if="step === 1">
        <li>Next</li>
      </ul>
      <ul class="header-button-right" v-on:click="publish" v-if="step === 2">
        <li>Done</li>
      </ul>
      <img src="./assets/logo.png" class="logo" />
    </div>

    <!-- vuex -->
    <h3>{{ $store.state.name }}</h3>
    <!-- <h3>{{ $store.state.name = 'kim'}}</h3> -->
    <h3>{{ $store.getters.GET_NAME }}</h3>
    <h3>{{ $store.getters.GET_AGE }}</h3>
    <h4>{{ $store.commit('SET_NAME', '최') }}</h4>
    <button v-on:click="$store.commit('한살먹기')">한살먹기</button>
    <h3>{{ $store.dispatch('더보기') }}</h3>
    <!-- //vuex -->

    <Body v-on:내용전송="업로드내용 = $event" v-bind:포스팅들="포스팅들복사" :step="step" :업로드파일="업로드파일" :필터들="필터들" :클릭한필터="클릭한필터"/>

    <button v-on:click="showMore">더보기</button>
    <!-- <div class="sample-box">임시 박스</div> -->

    <div class="footer">
      <ul class="footer-button-plus">
        <input type="file" id="file" class="inputfile" v-on:change="upload" />
        <label for="file" class="input-plus">+</label>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Body from "./components/Body.vue";
import Postdata from "./assets/postdata.js";
import EventBus from "./EventBus.js";

export default {
  name: "App",
  data() {
    return {
      //변할 수 있는 데이터를 넣기
      포스팅들: Postdata,
      포스팅들복사: [...Postdata],
      step: 0,
      업로드파일 : '',
      업로드내용 : '',
      필터들 : [ "normal", "clarendon", "gingham", "moon", "lark", "reyes", "juno", "slumber", "aden", "perpetua", "mayfair", "rise", "hudson", "valencia", "xpro2", "willow", "lofi", "inkwell", "nashville"],
      클릭한필터 : '',
    }
  },
  mounted() {
    EventBus.$on('전송', (filter) => {
      // 수신시 실항할 코드
      this.클릭한필터 = filter;
    });
  },
  components: {
    Body
  },
  methods: {
    upload(e) {
      // 업로드한 이미지 파일을 긴 문자로 압축
      let 파일 = e.target.files;
      // 브라우저 API가 제공하는 파일리더를 접근할 수 있음
      let reader = new FileReader(); 
      reader.readAsDataURL(파일[0]);
      reader.onload = e => {
        //console.log(e.target.result);
        this.step = 1;
        this.업로드파일 = e.target.result;
      }
    },
    publish() {
      this.step = 0;
      let 내데이터 = { 
        name : 'Jiyoung',
        userImage: "https://placeimg.com/100/100/arch",
        postImage : this.업로드파일,
        likes: 12324534523,
        date: 'April 19',
        liked: false,
        caption : this.업로드내용,
        filter : this.클릭한필터,
      }
      this.포스팅들복사.unshift(내데이터);
    },
    showMore() {
      // 서버에 ajax 요청을 해서 데이터를 가져온 후, 포스팅들이라는 data에 추가
      axios.get('https://yogoho210.github.io/postdata2.json')
      .then((데이터) => {
        //console.log(데이터.data);
        this.포스팅들복사.push(데이터.data);
      }).catch(()=>{
        // 실패했을 때 실행할 코드
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
