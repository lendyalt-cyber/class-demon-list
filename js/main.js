import routes from './routes.js';

// Fixed subfolder paths specifically configured for GitHub Pages hosting
const listResponse = await fetch('/class-demon-list/data/_list.json');
const editorsResponse = await fetch('/class-demon-list/data/_editors.json');

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
