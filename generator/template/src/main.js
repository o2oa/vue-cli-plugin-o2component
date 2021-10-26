import {loadComponent} from '@o2oa/web-component';
import App from "@/App";

const name = '<%= rootOptions.o2componentName %>';
loadComponent(name, App).then((c)=>{
    c.render();
});
