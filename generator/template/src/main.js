import {loadComponent} from '@o2oa/web-component';
import App from "@/App";

const name = '<%_ options.projectName _%>';
loadComponent(name, App).then((c)=>{
    c.render();
});
