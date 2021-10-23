import {loadComponent} from '@o2oa/web-component';
import App from "@/App";

const name = '<%= componentName %>';
loadComponent(name, App).then((c)=>{
    c.render();
});
