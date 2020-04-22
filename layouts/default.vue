<template>
  <v-app dark>
    <v-content>
      <v-navigation-drawer
        v-model="drawer"
        :clipped="clipped"
        enable-resize-watcher
        app
        dark
      >
        <v-list-item v-if="userInfo" class="px-4">
          <v-list-item-icon>
            <v-icon>face</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ userInfo.firstName }} {{ userInfo.lastName }}</v-list-item-title>
        </v-list-item>

        <v-divider />

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item v-if="userInfo" class="px-4" @click="logout">
            <v-list-item-icon>
              <v-icon>power_settings_new</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Se déconnecter</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar fixed app dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>DVIC Monitoring</v-toolbar-title>
        <v-spacer />
      </v-app-bar>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    drawer: false,
    clipped: false,
    items_list: {
      disconnected: [
        {
          action: 'input',
          title: 'Se connecter',
          path: '/login'
        },
        {
          action: 'system_update_alt',
          title: 'S\'inscrire',
          path: '/register'
        }
      ],
      connected: [
        {
          action: 'dashboard',
          title: 'Tableau de bord',
          path: '/dashboard'
        },
        {
          action: 'work',
          title: 'Mes projets',
          path: '/projects'
        },
        {
          action: 'people',
          title: 'Mes clients',
          path: '/clients'
        },
        {
          action: 'account_box',
          title: 'Mon compte',
          path: '/account'
        }
      ]
    }
  }),
  computed: {
    ...mapGetters({
      userInfo: 'user/getUserInfo'
    }),
    items () {
      return this.userInfo ? this.items_list.connected : this.items_list.disconnected
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions({
      getUserInfo: 'user/getUserInfo',
      logout: 'user/logout'
    })
  }
}
</script>
