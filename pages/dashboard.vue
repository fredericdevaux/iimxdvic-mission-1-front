<template>
  <div class="d-flex flex-row">
    <DashboardClients class="item" />
    <DashboardProjects class="item" />
  </div>
</template>

<script>
import DashboardClients from '../components/dashboard/DashboardClients'
import DashboardProjects from '../components/dashboard/DashboardProjects'
export default {
  components: { DashboardProjects, DashboardClients },
  middleware: 'authenticated'
}
</script>

<style scoped>
  .item {
    width: 50%;
    margin-right: 10px;
  }
</style>
