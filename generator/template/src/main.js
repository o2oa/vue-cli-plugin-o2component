import {loadComponent} from '@o2oa/web-component';
import App from "@/App";

const name = '<%= rootOptions.projectName %>';
loadComponent(name, App).then((c)=>{
    c.render();
});
