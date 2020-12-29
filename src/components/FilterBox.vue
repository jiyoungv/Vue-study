<template>
    <div v-on:click="filterClick" :class="'filter-item ' + 필터"  :style="`background-image:url(${업로드파일})`">
        <slot></slot>
    </div>
</template>

<script>
import EventBus from "./../EventBus.js";

export default {
    name: "FilterBox",
    data() {
        return {

        }
    },
    props: {
        업로드파일: String,
        필터 : String,
    },
    methods: {
        filterClick(){
            EventBus.$emit('전송', this.필터);
        }
    },
}
</script>

<style>
.filter-item {
width: 100px;
height: 100px;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : #ccc;
background-size: cover;
background-position : center;
}
</style>