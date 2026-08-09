import routes from './routes.js';

// Self-resolving relative paths to keep GitHub Pages happy
const listResponse = await fetch('./data/_list.json');
const editorsResponse = await fetch('./data/_editors.json');

export const config = await listResponse.json();
export const editors = await editorsResponse.json();

export const store = Vue.reactive({
    dark: JSON.parse(localStorage.getItem('dark')) || false,
    toggleDark() {
        this.dark = !this.dark;
        localStorage.setItem('dark', JSON.stringify(this.dark));
    },
});

const app = Vue.createApp({
    data: () => ({ store }),
});

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

app.use(router);
app.mount('#app');
