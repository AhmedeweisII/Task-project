<template>
  <div class="bigg">
    <div class="filters">
      <!-- Category Filter -->
      <div class="listt listt-filt">
        <label for="category-filter" class="laba">Category:</label>
        <select v-model="selectedCategory" id="category-filter" class="pagination-dropdown">
          <option class="options" value="">All Categories</option>
          <option class="options" v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Status Filter -->
      <div class="listt listt-filt">
        <label for="status-filter" class="laba">Status:</label>
        <select v-model="selectedStatus" id="status-filter" class="pagination-dropdown">
          <option class="options" value="">All Statuses</option>
          <option class="options" value="new">New</option>
          <option class="options" value="In progress">In Progress</option>
          <option class="options" value="done">Done</option>
        </select>
      </div>
    </div>

    <div class="projects">
      <!-- Task Table -->
      <table class="data">
        <!-- Table Head -->
        <thead>
          <tr>
            <td>Title</td>
            <td>Category</td>
            <td>Status</td>
            <td>Description</td>
            <td></td>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <tr v-for="task in sortedTasks" :key="task.id" :class="getRowClass(task.status)">
            <td>
              <h3>{{ task.title }}</h3>
            </td>
            <td>{{ task.category }}</td>
            <td>{{ task.status }}</td>
            <td v-html="formatDescription(task.description)"></td>
            <td>
              <div class="monu">
                <div class="menu-contento apearclick">
                  <button @click="editTask(task)" class="newest-e-btn">Edit</button>
                  <button @click="deleteTask(task.id)" class="newest-e-btn">Delete</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tasks: Array
  },
  data() {
    return {
      selectedCategory: '',
      selectedStatus: ''
    };
  },
  computed: {
    uniqueCategories() {
      // Get unique categories from tasks
      const categories = this.tasks.map(task => task.category);
      return [...new Set(categories)];
    },
    sortedTasks() {
      return this.tasks
        .filter(task => {
          return (this.selectedCategory === '' || task.category === this.selectedCategory) &&
                 (this.selectedStatus === '' || task.status === this.selectedStatus);
        })
        .slice()
        .sort((a, b) => {
          const statusOrder = {
            'In progress': 1,
            'new': 2,
            'done': 3
          };
          return statusOrder[a.status] - statusOrder[b.status];
        });
    }
  },
  methods: {
    editTask(task) {
      this.$emit("edit-task", task);
    },
    async deleteTask(id) {
      // Ask for confirmation before deleting
      const confirmed = confirm("Are you sure you want to delete this task?");
      if (!confirmed) {
        return; // If not confirmed, do nothing
      }

      try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.$emit("task-deleted", id); // Emit an event with the deleted task's ID
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    formatDescription(description) {
      return description.replace(/(.{50})/g, '$1<br>');
    },
    getRowClass(status) {
      switch(status) {
        case 'new':
          return 'status-new';
        case 'In progress':
          return 'status-in-progress';
        case 'done':
          return 'status-done';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
@import url('@/assets/main-style.css');
@import url('@/assets/normalize.css');

.status-new {
  background-color: red;
  color: white;
}

.status-in-progress {
  background-color: yellow;
  color: black;
}

.status-done {
  background-color: green;
  color: white;
}

.filters {
  margin-bottom: 20px;
}

.filter-item {
  margin-right: 20px;
}
</style>
