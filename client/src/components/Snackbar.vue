<template>
  <v-snackbar
    v-if="snackbar"
    v-model="snackbar"
    :bottom="true"
    :timeout="timeout"
    color="success"
  >
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: true,
    text: "My timeout is set to 2000.",
    timeout: 2000,
  }),
  computed: {},
};
</script>

<style></style>
