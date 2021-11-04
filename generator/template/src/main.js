import { createApp } from 'vue';
import App from "./App.vue";
import {loadComponent} from '@o2oa/component';

loadComponent('<%= rootOptions.o2componentName %>', (d)=>{
    createApp(App).mount(d);
}).then((c)=>{
    c.render();
});
