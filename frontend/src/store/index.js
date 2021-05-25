import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shortlist: [],
    latestRemovedItem: {},
    following: [],
    showSidebar: false,
  },
  mutations: {
    addToShortlist(state, item) {
      state.shortlist.push(item);
    },
    removeFromShortlist(state, item) {
      state.shortlist = state.shortlist.filter((job) => job.id !== item.id);
    },
    setLatestRemovedItem(state, item) {
      state.latestRemovedItem = item;
    },
    addToFollowing(state, company) {
      if (state.following.find((object) => object.company_id === company.company_id)) return;
      state.following.push(company);
    },
    removeFromFollowing(state, id) {
      state.following = state.following.filter((company) => company.company_id !== id);
    },
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
  },
  getters: {
    latestShortlistedItem: (state) => {
      if (state.shortlist[state.shortlist.length - 1]) {
        return state.shortlist[state.shortlist.length - 1];
      }
      return null;
    },
    shortlistLength: (state) => state.shortlist.length,
  },
  actions: {},
  modules: {},
});
