import Vue from 'vue';
import Vuex from 'vuex';
import ApiService from '@/common/api.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characters: [],
    nbOfSelected: 0,
    comics: [],
    loading: false,
  },
  mutations: {
    getCharacters(state) {
      if (state.characters.length || state.loading) return;
      state.loading = true;
      ApiService.getCharacters()
        .then((res) => {
          state.loading = false;
          const comicsObj = {};
          res.data.data.results.forEach((_c) => {
            const c = { ..._c };
            c.imgUrl = `${c.thumbnail.path}/standard_fantastic.${c.thumbnail.extension}`;
            c.selected = false;
            (c.comics.items || []).forEach((co) => {
              comicsObj[co.resourceURI] = co;
            });
            state.characters.push(c);
          });
          Object.keys(comicsObj).forEach((key) => {
            state.comics.push({
              key,
              value: key,
              text: comicsObj[key].name,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectCharacter(state, id) {
      state.characters = state.characters.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            selected: true,
          };
        }
        return c;
      });
      state.nbOfSelected = state.characters.filter((c) => c.selected).length;
    },
    unselectCharacter(state, id) {
      state.characters = state.characters.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            selected: false,
          };
        }
        return c;
      });
      state.nbOfSelected = state.characters.filter((c) => c.selected).length;
    },
  },
  actions: {
    getCharacters: (context) => {
      context.commit('getCharacters');
    },
    selectCharacter: (context, id) => {
      context.commit('selectCharacter', id);
    },
    unselectCharacter: (context, id) => {
      context.commit('unselectCharacter', id);
    },
    getCharacter: (context, id) => {
      context.commit('getCharacter', id);
    },
  },
  modules: {},
});
