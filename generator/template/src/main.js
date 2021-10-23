import {loadComponent} from '@o2oa/web-component';
import App from "@/App";

const name = '<%_ rootOptions.projectName _%>';
loadComponent(name, App).then((c)=>{
    c.render();
});
