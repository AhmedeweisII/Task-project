<template>
  <div id="app" class="app container">
    <!-- <TaskFilter @filter-tasks="applyFilter" /> -->
    <TaskForm v-if="taskToEdit" :task="taskToEdit" @task-saved="handleTaskSaved" />
    <TaskForm v-else @task-saved="handleTaskSaved" />
    <TaskList :tasks="filteredTasks" @edit-task="handleEditTask" @task-deleted="handleTaskDeleted" />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';
// import TaskFilter from './components/TaskFilter.vue';

export default {
  components: {
    TaskList,
    TaskForm,
    // TaskFilter,
  },
  data() {
    return {
      tasks: [],
      filteredTasks: [],
      taskToEdit: null,
      filterCriteria: {
        status: '',
        category: '',
      },
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.tasks = await response.json();
        this.applyFilter(this.filterCriteria);  // Apply filter after fetching tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    handleTaskSaved() {
      this.fetchTasks();  // Refetch tasks after saving to ensure the list is up to date
      this.taskToEdit = null;
    },
    handleEditTask(task) {
      this.taskToEdit = task;
    },
    handleTaskDeleted(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.applyFilter(this.filterCriteria);  // Apply the current filter to update the filtered tasks list
    },
    applyFilter(filterCriteria) {
      this.filterCriteria = filterCriteria;
      this.filteredTasks = this.tasks.filter(task => {
        return (
          (!filterCriteria.status || task.status === filterCriteria.status) &&
          (!filterCriteria.category || task.category.includes(filterCriteria.category))
        );
      });
    },
  },
};
</script>
@<style scoped>
@import url(@/assets/main-style.css);
@import url(@/assets/normalize.css);
</style>
<style scoped>
.app {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
</style>
