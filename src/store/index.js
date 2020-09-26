import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


import * as Members from './member/actions';

/* 公共state, mutations, actions */
const storage = window.sessionStorage;
const state = {
    appId: "10010",
    city: [],  // 省市区
    nickname: storage.getItem('nickname') || '',
    idNo: storage.getItem('idNo') || '',
    /* nickname: storage.getItem('nickname') || '',
    nickname: storage.getItem('nickname') || '', */
}
const mutations = {
    setOpenid(state, str) { //设置openid
        state.openid = str;
    },
    setNickname(state, name) {
        state.nickname = name;
        storage.setItem('nickname', name);
    },
    setIdNo(state, idNo) {
        state.idNo = idNo;
        storage.setItem('idNo', idNo);
    },
    setIdPNo(state, idPNo) {
        state.idPNo = idPNo;
        storage.setItem('idPNo', idPNo);
    },
    setIdTacNo(state, tacNo) {
        state.tacNo = tacNo;
        storage.setItem('tacNo', tacNo);
    },
}
const actions = {
    ...Members,
}

export default new Vuex.Store({
    state, mutations, actions,
    modules: {//引入模块

    }
})