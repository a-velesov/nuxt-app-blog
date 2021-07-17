import Vuex from 'vuex';
import axios from 'axios';

const store = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
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
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
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
      addPost(context, post) {
        const createdPost = {
          ...post,
          updatedData: new Date(),
        };
        return axios.post(`${ process.env.NUXT_ENV_BASE_URL }/posts.json?auth=${ context.state.token }`, createdPost)
                    .then(res => {
                      context.commit('addPost', {
                        ...createdPost,
                        id: res.data.name,
                      });
                    })
                    .catch(e => console.log(e));
      },
      editPost(context, editedPost) {
        return axios.put(`${ process.env.NUXT_ENV_BASE_URL }/posts/${ editedPost.id }.json?auth=${ context.state.token }`, {
          ...editedPost,
          updatedData: new Date(),
        })
                    .then(res => {
                      context.commit('editPost', editedPost);
                    })
                    .catch(e => console.log(e));
      },
      setPosts({ commit }, posts) {
        commit('setPosts', posts);
      },
      auth(context, data) {
        let authUrl = process.env.NUXT_ENV_SIGN_IN;
        if(!data.isLogin) {
          authUrl = process.env.NUXT_ENV_SIGN_UP;
        }
        return axios.post(authUrl, {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        })
                    .then(res => {
                      context.commit('setToken', res.data.idToken);
                      context.dispatch('logout', res.data.expiresIn * 1000);
                      localStorage.setItem('token', res.data.idToken);
                      localStorage.setItem('tokenExpiration', new Date().getTime() + res.data.expiresIn * 1000);
                    })
                    .catch(e => console.log(e));
      },
      logout({ commit }, time) {
        setTimeout(() => {
          commit('clearToken');
        }, time);
      },
      initAuth(context) {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('tokenExpiration');

        if (new Date().getTime() > +expirationDate || !token) return;
        context.dispatch('logout', +expirationDate - new Date().getTime());
        context.commit('setToken', token);
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuth(state) {
        return !!state.token;
      },
    },
  });
};

export default store;
