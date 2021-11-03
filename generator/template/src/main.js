import { createApp } from 'vue';
import App from "@/App";
import {loadComponent} from '@o2oa/component';

const name = '<%= rootOptions.o2componentName %>';
loadComponent(name, createApp(App)).then((c)=>{
    c.render();
});
