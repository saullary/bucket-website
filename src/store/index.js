import Vue from "vue";
import Vuex from "vuex";
import http from "../api";

Vue.use(Vuex);

const SET_DATA = "setData";

const store = new Vuex.Store({
  state: {
    nowDate: new Date(),
    pageLoaded: false,
    ...getWH(),
    isTouch: "ontouchstart" in window,
    isFocus: true,
    appInfo: {
      title: "",
    },
    token: () => {
      return localStorage.token;
    },
    loginSta: 0,
    userInfo: JSON.parse(localStorage.userInfo || "{}"),
    noticeMsg: {},
    alertInfo: {},
    s3: null,
    s3m: null,
    searchKey: "",
    usageInfo: {},
    navItems: [],
    // hosting
    connectAddr: "",
    netType: "",
    walletTip: "",
  },
  mutations: {
    [SET_DATA](state, data) {
      for (const key in data) {
        state[key] = data[key];
      }
    },
  },
  actions: {
    async getUsageInfo() {
      const { data } = await http.get("/user/resource/usage");
      const {
        arweaveUsedStorage = 0,
        arweaveSyncingStorage = 0,
        arweaveTotalStorage = 0,
      } = data;
      let arUsed = (arweaveUsedStorage * 1 + arweaveSyncingStorage * 1) / 1024;
      setState({
        usageInfo: {
          ipfsTotal: parseInt(data.totalStorage / 1024),
          ipfsUsed: (data.usedStorage / 1024).toFixed(2),
          arTotal: parseInt(arweaveTotalStorage / 1024),
          arUsed: arUsed.toFixed(2),
          arSyncing: (arweaveSyncingStorage / 1024).toFixed(2),
          arSynced: (arweaveUsedStorage / 1024).toFixed(2),
        },
      });
    },
  },
});

export const setState = (Vue.prototype.$setState = (data) => {
  store.commit(SET_DATA, data);
});
Vue.prototype.$setMsg = (noticeMsg) => {
  setState({
    noticeMsg,
  });
};

function getWH() {
  const { clientWidth, clientHeight } = document.documentElement;
  return {
    clientWidth,
    clientHeight,
  };
}
window.onresize = () => {
  setState({
    ...getWH(),
  });
};
window.onblur = () => {
  setState({
    isFocus: false,
  });
};
window.onfocus = () => {
  const isTouch = "ontouchstart" in window;
  setState({
    isFocus: true,
    isTouch,
  });
};

setInterval(() => {
  setState({
    nowDate: new Date(),
  });
}, 1e3);

window.onload = () => {
  // console.log("onload", window.jdenticon);
  setState({
    pageLoaded: true,
  });
};

export default store;
