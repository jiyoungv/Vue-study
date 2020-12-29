<template>
  <div class="body">
    <!-- <button v-on:click="$emit('이름전송', name)">버튼</button> -->

    <div v-if="step === 0">
      <Post v-bind:포스팅들="포스트" v-for="(포스트,i) in 포스팅들" :key="i" :클릭한필터="클릭한필터"/>
    </div>

    <div v-if="step === 1">
      <div :class="'upload-image ' + 클릭한필터" :style="`background-image:url(${업로드파일})`"></div>
      <div class="filters">
        <FilterBox v-for="(필터,i) in 필터들" :필터="필터들[i]" :key="i" :업로드파일="업로드파일">
          <p>{{필터}}</p>
        </FilterBox>
      </div>
    </div>

    <div v-if="step === 2">
      <div :class="'upload-image ' + 클릭한필터" :style="`background-image:url(${업로드파일})`"></div>
      <div class="write">
        <textarea v-on:input="$emit('내용전송', $event.target.value)" class="write-box">write!</textarea>
      </div>
    </div>
  </div>
</template>


<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";

export default {
  name: "Body",
  data() {
    return {
        name:'John'
    }
  },
  props: {
    포스팅들: Array,
    step: Number,
    업로드파일: String,
    필터들 : Array,
    클릭한필터: String
  },
  components: {
    Post,
    FilterBox
  }
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>