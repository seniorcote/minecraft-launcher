import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import router from './modules/router';
import App from './components/App';
import store from './store';
import en from '../../resources/locales/en';
import ru from '../../resources/locales/ru';
import './styles/style.less';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { loadConfig } from './commands/config';
import { loadLocales } from './commands/locale';
import './listeners';

Vue.use(VueRouter);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ru,
    },
});

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
});

loadConfig();
loadLocales();

