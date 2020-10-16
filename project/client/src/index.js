import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import f from '@/components/Flink.vue'
import createLink from './views/createLink.vue';
import editLink from './views/editLink.vue';
 const router = new VueRouter({
    mode: 'history',
    routes: [
        {path:'/flink',component:f},
        { path: '/', redirect:"/flink" },
        { path: '/create-Link', component: createLink },
        { path: '/edit-Link', component: editLink }
    ]
});
export default router