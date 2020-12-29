import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export let store = new Vuex.Store({
  state: {
    name : '박지영',
    age : '5'
  },
  getters : {
    // 데이터 꺼내는 법
    GET_NAME(state) {
        return state.name + '님';
    },
    GET_AGE(state) {
        return state.age;
    },
  },
  mutations: {
    // 데이터 수정하는 법 
    // 여기서 수정하면 여기에서만 보면 된다. 
    // 다른 컴포넌트에서 수정하면 다 뒤져봐야 한다.
    SET_NAME(state, 자료){
        state.name = 자료;
    },
    한살먹기(state){
        state.age++;
    },
    더보기수정(state, 자료){
        state.포스팅들.unshift(자료);
    },
  },
  actions : {
    // ajax 요청하는 곳(거의대부분)
    더보기(context){
        Axios.get('url').then((결과) => {
            context.commit('더보기수정',결과.data);
        }) 
        
    }
  }  
})