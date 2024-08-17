<template>
  <div>
    <h2>Filter Tasks</h2>
    <select v-model="selectedStatus">
      <option value="">All</option>
      <option value="new">New</option>
      <option value="in_progress">In Progress</option>
      <option value="done">Done</option>
    </select>
    <input v-model="category" placeholder="Filter by Category" />
    <button @click="filterTasks">Filter</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedStatus: '',
      category: '',
    };
  },
  methods: {
    filterTasks() {
      this.$emit('filter-tasks', { status: this.selectedStatus, category: this.category });
    },
  },
};
</script>