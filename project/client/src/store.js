import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        key: {}
    },
    mutations: {
        editdata(state, obj) {
            state.key = obj.data
        }
    }
});
export default store