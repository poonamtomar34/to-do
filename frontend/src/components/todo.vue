<template>
<v-app>
  <v-row>
  <div >
    <v-dialog
    v-model="editModal"
    max-width = 620px
    
    >
    <v-card >
      <form action="@submit.prevent" style="padding: 10px;">
            <div class="mt-5">
            <div id="text-field" style="width: 30%;">
            <v-text-field
            type="text"
            v-model="form.taskName"
            placeholder="Enter task"
                outlined
                clearable
              >
              </v-text-field>
            </div>
            <div id="text-field"  style="width: 30%;">
            <v-text-field
            type="text"
            v-model="form.description"
            placeholder="Enter description"
                outlined
                clearable
              >
              </v-text-field>
            </div>
              <!-- <input id="startDate" type="date" class="form-control" />   -->
              <datepicker class="date-selector" placeholder="select start date" v-model="form.models.startDate" :format="form.DatePickerFormat" :disabledDates="form.disabledDates"></datepicker>
              <br>
              <datepicker class="date-selector" placeholder="select end date" v-model="form.models.endDate" :format="form.DatePickerFormat" :disabledDates="form.disabledDates"></datepicker>
              <br>
          <v-btn
          depressed
          color="primary" class="btn btn-warning rounded-0" @click="submitTask()">
            SUBMIT
          </v-btn>
        </div>
      </form>
    </v-card>
    </v-dialog>
  </div>
  </v-row>
    <v-card>
        <div class="container" >
        <!-- Heading -->
        <h2 class="text-center mt-5">My Vue Todo App</h2>
        <!-- Input -->
      <form action="@submit.prevent">
            <div class="mt-5">
            <div id="text-field" style="width: 30%;">
            <v-text-field
            type="text"
            v-model="form.taskName"
            placeholder="Enter task"
                outlined
                clearable
              >
              </v-text-field>
            </div>
            <div id="text-field"  style="width: 30%;">
            <v-text-field
            type="text"
            v-model="form.description"
            placeholder="Enter description"
                outlined
                clearable
              >
              </v-text-field>
            </div>
              <!-- <input id="startDate" type="date" class="form-control" />   -->
              <datepicker class="date-selector" placeholder="select start date" v-model="form.models.startDate" :format="form.DatePickerFormat" :disabledDates="form.disabledDates"></datepicker>
              <br>
              <datepicker class="date-selector" placeholder="select end date" v-model="form.models.endDate" :format="form.DatePickerFormat" :disabledDates="form.disabledDates"></datepicker>
              <br>
          <v-btn
          depressed
          color="primary" class="btn btn-warning rounded-0" @click="submitTask()">
            SUBMIT
          </v-btn>
        </div>
      </form>
  <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>

              </th>
              <th class="text-left">
                Task
              </th>
              <th>
                description
              </th>
              <th>
                Start Date
              </th>
              <th class="text-left">
                Status
              </th>
              <th class="text-left">
                Due date
              </th>
              <!-- <th>
                Edit
              </th> -->
              <th>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t of todos" :key="t._id">
            <td>
                <v-checkbox
                  v-model="t.checkValue"
                  color="info"
                  hide-details
                  @click="checkTrue((t._id))"
                ></v-checkbox>
                <!-- <v-checkbox
                  v-model="t.checkValue"
                  color="info"
                  v-else
                  hide-details
                  @click="checkTrue((t._id))"
                ></v-checkbox> -->
            </td>
              <td>
                <!-- <span :class="{ 'line-through': task.status === 'completed' }"> -->
                  <span>
                  {{ t.taskName}}
                </span>
              </td>
              <td>
              <!-- <span :class="{ 'line-through': task.status === 'completed' }"> -->
                <span>
                  {{ t.description}}
                </span> 
              </td>
              <td>
                <span>
                    {{t.startDate}}
                </span>
              </td>
              <td>
                <!-- <span
                  class="pointer noselect"
                  @click="changeStatus()"
                  :class="{
                    'text-danger': t.taskStatus === 'to-do',
                    'text-success': t.taskStatus === 'completed',
                    'text-warning': t.taskStatus === 'pending',       
                  }"
                >
                  {{ capitalizeFirstChar(t.taskStatus) }}
                </span>  -->
              {{ capitalizeFirstChar(t.taskStatus) }}
              </td>
              <td>
                {{t.endDate}}
              </td>
              <!-- <td class="text-center">
                <div @click="editTask((t))">
                  <v-icon>{{ icons.mdiPencil }}</v-icon>
                </div>
              </td> -->
              <td class="text-center">
                <div @click="deleteTask((t._id))">
                  <v-icon >{{ icons.mdiDelete }}</v-icon>
                </div>
              </td> 
            </tr>
          </tbody>
        </template>
      </v-simple-table>
        <!-- Task table -->
      </div>
    </v-card>
</v-app>
</template>

<script>
import axios from "axios";
import { API_URL } from "../constants";

import Vue from "vue"
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);
import Datepicker from "vuejs-datepicker";
import {
    mdiAccount,
    mdiPencil,
    mdiShareVariant,
    mdiDelete,
  } from '@mdi/js'
export default {
  name: "todo",
  props: {
    msg: String,
  },
  components: {
    Datepicker
  },
   ex4: [ 'info'],
  data() {
    return {
        icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete,
      },
      checkboxtrue:true,
      checkboxfalse:false,
      todos: [],
      form :{
              t:"",
              checkValue:'false',
              taskName: "",
              description:"",
              taskStatus:"",
              editedTask: null,
              name : "",
              models: {
                  startDate : null ,
                  endDate: null,
              },
                DatePickerFormat: 'dd/MM/yyyy',
                disabledDates: {
                  to: new Date(Date.now() - 8640000)
                },
      },
      editModal:false,
      /* Status could be: 'to-do' / 'pending' / 'completed' */
    };
  },
  methods: {
    /**
     * Capitalize first character
     */
    
    capitalizeFirstChar(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    /**
     * Change status of task by index
     */
    
    async getTodos() {
      console.log("API_URL ", API_URL);
      const { data: todos } = await axios.get(`http://localhost:5000/api/v1`);
      this.todos = todos;
      this.todos.forEach((ele)=>{
        console.log("ele",ele)
        if(ele.taskStatus == "Completed"){
          ele.checkValue = true
        }
        else{
          ele.checkValue = false
        }
      })
          console.log("todo", this.todos)
    },
    async checkTrue(index){
      this.todos.forEach((item, idx)=>{
        let {taskStatus,_id } = item;
        if (index===_id){
          if (this.todos[idx].taskStatus==='Completed'){
            this.todos[idx].taskStatus="To-do"
          }
          else{
            this.todos[idx].taskStatus="Completed"
          }
          axios.put(`http://localhost:5000/api/v1/${index}`, { taskStatus:this.todos[idx].taskStatus})
          return 
        }
        else{
          console.log(false);
        }
        console.log(taskStatus);
      }
      )
    },
    changeStatus(index) {
      const statuses= ["to-do", "pending", "completed"]
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      let newIndex = this.statuses.indexOf(this.tasks[index].status);
      if (this.statuses[newIndex]==='completed')
      return
      if (++newIndex > 2) newIndex = 2;
      this.tasks[index].status = this.statuses[newIndex];
      if (this.statuses[newIndex]==='completed'){
       function greeting(name) {
        console.log("Inside greeting")
          if (this.models.endDate===null){
          this.tasks.push({
          endDate: this.models.endDate.toLocaleString().split(",")[0],
        });
        }
          }
          function processUserInput(callback) {
                  var name = prompt('Please enter your name.');
            callback(name);
          }
          processUserInput(greeting);
        
      }
    },
    /**
     * Deletes task by index
     */
    async deleteTask(id) {
      await axios.delete(`http://localhost:5000/api/v1/${id}`);
      this.getTodos();
    },
    /**
     * Edit task
     */
    async editTask(id) {
      this.editModal = true
      console.log("editTask  ",id);
      this.editedTask = id
      this.submitTask()
    },
    /**
     * Add / Update task
     */
    
    async submitTask() {try {
      let { taskName, description,taskStatus } = this.form;
      taskName=taskName.replace(/^\s+|\s+$/gm,'')
      description=description.replace(/^\s+|\s+$/gm,'');
       let {startDate,endDate}=this.form.models
      // if (this.editedTask != null) {
      //    //console.log(this.models.startDate)
      //    console.log("sdfghjikoijuhygtrewsdfghjklkjhgfrdesdfg");
      //    this.todos.map((ele, idx)=>{
      //   const {_id}=ele;
      //   if (this.editedTask._id===_id){
      //     console.log("this.editedTask._id  ",this.editedTask._id, idx);
          
      //     return this.todos[idx].taskName="poonaertyhjkm"
      //   }
      // })
      // console.log(this.editedTask._id); 
      //   taskName=this.editedTask.taskName
      //   description=this.editedTask.description
      //   startDate=this.editedTask.startDate
      //   endDate=this.editedTask.endDate
      //   taskStatus="To-do"    
      //   // await axios.post(`http://localhost:5000/api/v1`, { taskName, description,taskStatus,startDate});
      //   this.editedTask = null;
      // } 
      if (taskName.length === 0 || description.length===0 || startDate===null){
        console.log(this.editedTask,                "sdfghjikoijuhygtrewsdfghjklkjhgfrdesdfg");
        console.log(this.form.models.startDate);
        this.$alert("fill all the details :(");
        return 
       }
      /* We need to update the task */
      
      if (this.form.taskName.length !=0 && this.form.description.length!=0 && this.form.models.startDate!=null && this.form.models.endDate===null){
        startDate=startDate.toLocaleString().split(",")[0]
        taskStatus="To-do"    
        await axios.post(`http://localhost:5000/api/v1`, { taskName, description,taskStatus,startDate});
      }
      else {
        /* We need to add new task */        
        console.log("tasknam",taskName.length );
        startDate=startDate.toLocaleString().split(",")[0]
        endDate=endDate.toLocaleString().split(",")[0]
        taskStatus="To-do"
        console.log(taskName, description,taskStatus,startDate,endDate );
        console.log("just submit me!!!!!!!!");
        await axios.post(`http://localhost:5000/api/v1`, { taskName, description,taskStatus,startDate,endDate });
      }
      this.getTodos();
      // this.$router.push("/about");
      this.form.taskName="";
      this.form.description="";
      this.form.models.startDate=null;
      this.form.models.endDate=null;
      this.task = "";
    }
    
    catch(err){
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
        if (err.response.status===409){
           this.$alert("Please enter new task :(");
        };
        console.log(err.response.headers);
    }
    }
    },
  },
  mounted() {
    this.getTodos();
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.vdp-datepicker .date-selector{
  border: 1px solid red;
  height: 1.8rem;
}
#text-field{
    display: block;
}
.line-through {
  text-decoration: line-through;
}
.text-success{
    color: green;
    cursor: not-allowed!important;
}
.v-application .d-flex .mt-5{
    display: block;
}
.v-icon.v-icon {
  cursor: pointer;
    margin-left: -8rem;

}

</style>