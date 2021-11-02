<template>
  <div class="hello">

    <h3>{{lp.taskListTitle}}</h3>
    <br>
    <table align="center" class="taskListTable" border="1">
      <tr>
        <th>{{lp.taskTitle}}</th>
        <th>{{lp.taskProcess}}</th>
        <th>{{lp.taskTime}}</th>
      </tr>
      <tr v-for="task in taskList">
        <td><a href="#" @click="openTask(task.work)">{{task.title}}</a></td>
        <td>{{task.processName}}</td>
        <td>{{task.startTime}}</td>
      </tr>
    </table>
    <br>
    <button @click="openCalendar">{{lp.openCalendar}}</button>
    <button @click="openOrganization">{{lp.openOrganization}}</button>
    <button @click="startProcess">{{lp.startProcess}}</button>
    <br>
    <button @click="openInBrowser">{{lp.openInBrowser}}</button>
  </div>
</template>

<script>
import {o2, layout} from '@o2oa/web-component'
export default {
  name: 'HelloWorld',
  data(){
    const cmpt = this.$root.$options.o2component;
    return {
      taskList: [],
      lp: cmpt.lp
    }
  },
  methods: {
    openTask(id){
      o2.page.openWork(id);
      //layout.openApplication(null, "process.Work", {"workid": id});
    },
    openCalendar(){
      o2.page.openApplication("Calendar");
    },
    openOrganization(){
      o2.page.openApplication("Org");
    },
    openInBrowser() {
      const cmpt = this.$root.$options.o2component;
      cmpt.openInNewBrowser(true);
    },
    startProcess(){
      o2.page.startProcess();
      // const cmpt = this.$root.$options.o2component;
      // o2.requireApp([["process.TaskCenter", "lp."+o2.language], ["process.TaskCenter", ""]],"", ()=>{
      //   var obj = {
      //     "lp": o2.xApplication.process.TaskCenter.LP,
      //     "content": cmpt.content,
      //     "addEvent": function(type, fun){
      //       cmpt.addEvent(type, fun);
      //     },
      //     "getAction": function (callback) {
      //       if (!this.action) {
      //         this.action = o2.Actions.get("x_processplatform_assemble_surface");
      //         if (callback) callback();
      //       } else {
      //         if (callback) callback();
      //       }
      //     },
      //     "desktop": layout.desktop,
      //     "refreshAll": function(){},
      //     "notice": cmpt.notice,
      //   }
      //   o2.JSON.get("../x_component_process_TaskCenter/$Main/default/css.wcss", function(data){
      //     obj.css = data;
      //   }, false);
      //
      //   if (!cmpt.processStarter) cmpt.processStarter = new o2.xApplication.process.TaskCenter.Starter(obj);
      //   cmpt.processStarter.load();
      // }, true, true);
    }
  },
  created(){
    o2.Actions.load("x_processplatform_assemble_surface").TaskAction.V2ListPaging(1, 5, null).then((json)=>{
      this.$data.taskList = json.data;
    });
  }
}
</script>

<style scoped>
.taskListTable{
  width: 800px;
  box-sizing: border-box;
  border-collapse: collapse;
}
.taskListTable th{
  height: 30px;
  line-height: 30px;
  background-color: #d4e6fb;
}
.taskListTable td{
  height: 24px;
  line-height: 24px;
}
button {
  cursor: pointer;
  font-size: 12px;
  margin: 10px;
  padding: 5px 10px;
  color: #ffffff;
  background-color: #4a90e2;
  border: 1px solid #4a90e2;
  border-radius: 100px;
}
h3 {
  margin: 40px 0 0;
}
a {
  color: #4a90e2;
}
</style>
