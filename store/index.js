import Vuex from 'vuex';
import axios from 'axios';

const store = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
    },
    actions: {
      nuxtServerInit({ commit }) {
        return axios.get(`${ process.env.NUXT_ENV_BASE_URL }/posts.json`)
             .then(res => {
               const posts = [];
               for(const key in res.data) {
                 posts.push({...res.data[key], id: key})
               }
               commit('setPosts', posts);
             })
             .catch();
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts);
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
    },
  });
};

export default store;
