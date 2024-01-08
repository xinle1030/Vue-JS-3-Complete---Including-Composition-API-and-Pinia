import { defineStore } from "pinia";

// import ref to make a component reactive to allow two way data binding; ref is only used for primitive data type
// import reactive to make an object like an array reactive to allow two way data binding
import { reactive, ref, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  let tasks = reactive(JSON.parse(localStorage.getItem("tasks")) || []); // declare reactive array in this way

  let filterBy = ref(""); // declare ref in this way

  let modalIsActive = ref(false); //declare ref for whether modal is opened

  // set filterBy value using .value
  function setFilter(value) {
    filterBy.value = value;
  }

  // calculate value based on value of reactive variables, then use computed property
  // whenever filterBy.value changes, filteredTasks will be recomputed
  const filteredTasks = computed(() => {
    // get filterBy value
    switch (filterBy.value) {
      case "todo":
        return tasks.filter((task) => !task.completed);
      case "done":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });

  function addTask(newTask) {
    if (newTask.name && newTask.description) {
      newTask.id = tasks.length
        ? Math.max(...tasks.map((task) => task.id)) + 1
        : 1; // add 1 to previous id
      tasks.push(newTask);
      closeModal();
    } else {
      alert("Please enter the title and description for the task.");
    }
  }

  function toggleCompleted(id) {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
  }

  function openModal() {
    modalIsActive.value = true;
  }

  function closeModal() {
    modalIsActive.value = false;
  }

  return {
    tasks,
    filterBy,
    setFilter,
    filteredTasks,
    addTask,
    toggleCompleted,
    openModal,
    closeModal,
    modalIsActive,
  };
});
