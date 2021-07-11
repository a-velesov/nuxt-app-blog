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
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIdx = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIdx] = editedPost;
      },
    },
    actions: {
      nuxtServerInit({ commit }) {
        return axios.get(`${ process.env.NUXT_ENV_BASE_URL }/posts.json`)
                    .then(res => {
                      const posts = [];
                      for(const key in res.data) {
                        posts.push({
                          ...res.data[key],
                          id: key,
                        });
                      }
                      commit('setPosts', posts);
                    })
                    .catch();
      },
      addPost({ commit }, post) {
        const createdPost = {
          ...post,
          updatedData: new Date(),
        };
        return axios.post(`${ process.env.NUXT_ENV_BASE_URL }/posts.json`, createdPost)
                    .then(res => {
                      commit('addPost', {
                        ...createdPost,
                        id: res.data.name,
                      });
                    })
                    .catch(e => console.log(e));
      },
      editPost({ commit }, editedPost) {
        return axios.put(`${ process.env.NUXT_ENV_BASE_URL }/posts/${ editedPost.id }.json`, {
          ...editedPost,
          updatedData: new Date(),
        })
                    .then(res => {
                      commit('editPost', editedPost);
                    })
                    .catch(e => console.log(e));
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
