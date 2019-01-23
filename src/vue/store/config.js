import { updateConfig } from '../commands/config';

function initialState() {
    return {
        locale: 'en',
        theme: 'classic',
        sidebarPosition: 'right',
    };
}

export default {
    namespaced: true,
    state: initialState,
    getters: {
        config: state => state,
        locale: state => state.locale,
    },
    actions: {
        init({ commit }, payload) {
            commit('init', payload);
        },
        updateConfig({ commit }, payload) {
            updateConfig(payload.key, payload.value);

            commit('updateConfig', payload);
        },
    },
    mutations: {
        init(state, payload) {
            Object.assign(state, payload);
        },
        updateConfig(state, payload) {
            Object.assign(state, { [payload.key]: payload.value });
        },
        reset(state) {
            const s = initialState();

            Object.keys(s).forEach(key => state[key] = s[key]);
        },
    },
}