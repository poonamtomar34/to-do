<template>
<v-app>
    <div>
      <todo></todo>
    </div>
  </v-app>
</template>
<script>
export default{
  data(){
    return{}
  },
  components: {
    todo: ()=>import('../components/todo.vue')
}
}
</script>