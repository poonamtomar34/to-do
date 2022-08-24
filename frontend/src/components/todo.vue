<template>
 <v-card>
    <div class="container" style="max-width: 600px">
    <!-- Heading -->
    <h2 class="text-center mt-5">My Vue Todo App</h2>

    <!-- Input -->
   
    <div class="mt-5">
        <div id="text-field">
        <v-text-field
        type="text"
        v-model="task"
        placeholder="Enter task"
            outlined
            clearable
          >
          </v-text-field>
        </div>
        <div id="text-field">
        <v-text-field
        type="text"
        v-model="desc"
        placeholder="Enter description"
            outlined
            clearable
          >
          </v-text-field>
        </div>
          <!-- <input id="dateSelect" type="date" class="form-control" />   -->
           <datepicker class="date-selector" placeholder="select start date" v-model="models.dateSelect" :format="DatePickerFormat" :disabledDates="disabledDates"></datepicker>
           <br>
           <datepicker class="date-selector" placeholder="select end date" v-model="models.endDateSelect" :format="DatePickerFormat" :disabledDates="disabledDates"></datepicker>
           <br>
      <v-btn
      depressed
      color="primary" class="btn btn-warning rounded-0" @click="submitTask()">
        SUBMIT
      </v-btn>
    </div>
<v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
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
          <th>
            Edit
          </th>
          <th>
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>
            <span :class="{ 'line-through': task.status === 'completed' }">
              {{ task.name}}
            </span>
          </td>
          <td>
           <span :class="{ 'line-through': task.status === 'completed' }">
              {{ task.description}}
            </span> 
          </td>
          <td>
            <span>
                {{task.date}}
            </span>
          </td>
          <td>
            <span
              class="pointer noselect"
              @click="changeStatus(index)"
              :class="{
                'text-danger': task.status === 'to-do',
                'text-success': task.status === 'completed',
                'text-warning': task.status === 'pending',       
              }"
            >
              {{ capitalizeFirstChar(task.status) }}
            </span>
          </td>
          <td>
             {{task.endDate}}
          </td>
          <td class="text-center">
            <div @click="editTask(index)">
              <v-icon>{{ icons.mdiPencil }}</v-icon>
            </div>
          </td>
          <td class="text-center">
            <div @click="deleteTask(index)">
              <v-icon>{{ icons.mdiDelete }}</v-icon>
            </div>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    <!-- Task table -->
  </div>
 </v-card>
  
</template>

<script>
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
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Datepicker
  },

  data() {
    return {
        icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete,
      },
      task: "",
      desc:"",
      editedTask: null,
      name : "",
    models: {
          dateSelect : "" ,
          endDateSelect: "",
        },
        DatePickerFormat: 'dd/MM/yyyy',
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
      statuses: ["to-do", "pending", "completed"],
      /* Status could be: 'to-do' / 'pending' / 'completed' */
      tasks: [
        {
          name: "Steal bananas from the supermarket.",
          description:"dfghjk",
          date:"8/24/2022",
          status: "to-do",
          endDate:"8/24/2022",
        },
        {
          name: "Eat 1 kg chocolate in 1 hour.",
          description:"dfghjk",
          date:"8/24/2022",
          status: "pending",
          endDate:"8/24/2022",
        },
        {
          name: "Create YouTube video.",
          description:"dfghjk",
          date:"8/24/2022",
          status: "completed",
          endDate:"8/24/2022",
        },
      ],
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
    
    changeStatus(index) {
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
          if (this.models.endDateSelect===null){
          this.tasks.push({
          endDate: this.models.endDateSelect.toLocaleString().split(",")[0],
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
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    /**
     * Edit task
     */
    editTask(index) {
      this.task = this.tasks[index].name;
      this.desc=this.tasks[index].description;
      this.status="To-do"
      this.editedTask = index;
    },
    /**
     * Add / Update task
     */
    
    submitTask() {
      if (this.task.length === 0 || this.desc.length===0 || this.models.dateSelect===null){
        console.log(this.models.dateSelect);
        this.$alert("fill all the details :(");
        return 
       }
      /* We need to update the task */
      if (this.editedTask != null) {
         //console.log(this.models.dateSelect)
        this.tasks[this.editedTask].name = this.task;
        this.tasks[this.editedTask].description = this.desc;
        this.tasks[this.editedTask].status=this.status;
        this.tasks[this.editedTask].date = this.models.dateSelect.toLocaleString().split(",")[0];
        this.tasks[this.editedTask].endDate = this.models.endDateSelect.toLocaleString().split(",")[0]
        this.editedTask = null;
      } 
      if (this.task.length !=0 && this.desc.length!=0 && this.models.dateSelect!=null && this.models.endDateSelect===null){
        console.log("hey!!  ",this.models.dateSelect)
        this.tasks.push({
          name: this.task,
          description:this.desc,
          date: this.models.dateSelect.toLocaleString().split(",")[0],
          status: "To-do",
        });
      }
      else {
        /* We need to add new task */
        console.log("hey!!  ",this.models.dateSelect)
        this.tasks.push({
          name: this.task,
          description:this.desc,
          date: this.models.dateSelect.toLocaleString().split(",")[0],
          status: "To-do",
          endDate: this.models.endDateSelect.toLocaleString().split(",")[0],
        });
      }
      this.desc="";
      this.models.dateSelect=null;
      this.models.endDateSelect=null;
      this.task = "";
    },
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
}

</style>