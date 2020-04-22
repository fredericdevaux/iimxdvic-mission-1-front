<template>
  <v-card
    class="card-projects"
    max-width="344"
  >
    <v-card-text>
      <div>Nombre de projets</div>
      <p class="text--primary">
        {{ projectsCount }}
      </p>
    </v-card-text>
    <nuxt-link
      :to="{name: 'projects'}"
      color="deep-purple accent-4"
    >
      Voir tous les projets
    </nuxt-link>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DashboardProjects',
  computed: {
    ...mapGetters({
      projectsCount: 'projects/getProjectsCount'
    })
  },
  mounted () {
    if (!this.projectsCount) { this.getProjects() }
  },
  methods: {
    ...mapActions({
      getProjects: 'projects/getProjects'
    })
  }
}
</script>

<style scoped>
  .card-projects {
    text-align: center;
  }

  .text--primary {
    font-size: 90px;
    line-height: 1;
    margin-top: 50px;
  }

  a {
    display: inline-block;
    margin-bottom: 10px;
  }
</style>
