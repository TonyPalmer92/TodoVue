<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <div class="d-flex align-center">
        <h2>Built with</h2>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="30"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="90"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/palmer-1992/TodoVue" text>
        <span class="mr-2">Github Repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="container">
      <Dashboard />
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from "./components/Dashboard";

export default {
  name: "App",

  components: {
    Dashboard,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Karla&display=swap");

* {
  font-family: "Karla", sans-serif;
}

#app {
  max-width: 510px;
  margin: auto;
}
</style>
