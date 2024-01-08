<!-- In composition API, 
  use script setup tag,
  everything inside script setup tag will be automatically exposed to the template, 
  so we can just create the variable inside and we can start using it in the template -->

  <!-- In composition API, order is usually: script -> template -> style -->
  <!-- In option API, order is usually: template -> script -> style -->

<script setup>
import Task from './components/Task.vue'; // straight import to be used in template
import Filter from './components/Filter.vue';
import ModalWindow from './components/modal/ModalWindow.vue';
import AddTaskModal from './components/modal/AddTaskModal.vue';
import {useTasksStore} from './stores/tasksStore.js';
const appName = "Tasks Manager";
console.log(appName.value); // to access appName variable value in the script set up, we have to use .value

const store = useTasksStore();

store.$subscribe((mutation, state) => {
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
});

</script>

<template>

  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>
          <!-- to access appName variable from script set up in the template, we can straight access using {{}}  -->
          {{appName}}
        </h1>
      </div>
      <!-- openModal btn -->
      <div class="header-side">
        <button @click="store.openModal" class="btn secondary">+ Add Task</button>
      </div>
    </div>
    
    <Filter />

    <div class="tasks">
      <!-- loop through filteredTasks array to create each Task component-->
      <!-- pass task to Task component props using :task -->
      <Task v-for="(task, index) in store.filteredTasks" :task="task" :key="index" />

    </div>

    <!-- show modal window if it is active -->
    <ModalWindow v-if="store.modalIsActive">
      <!-- AddTaskModal here is the <slot></slot> tag  to insert in the add Modal form -->
      <AddTaskModal/>
    </ModalWindow>


  </main>

</template>


<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }

}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input, textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}


</style>