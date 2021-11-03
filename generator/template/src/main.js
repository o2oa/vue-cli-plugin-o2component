import { createApp } from 'vue';
import App from "./App.vue";
import {loadComponent} from '@o2oa/component';

loadComponent('<%= rootOptions.o2componentName %>', ()=>createApp(App)).then((c)=>{
    c.render();
});
