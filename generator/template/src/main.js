import {loadComponent} from '@o2oa/web-component';
import App from "@/App";

const name = 'name';
loadComponent(name, App).then((c)=>{
    c.render();
});
