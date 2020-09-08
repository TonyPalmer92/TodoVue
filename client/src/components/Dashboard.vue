<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-img
        :src="require('../assets/logo.svg')"
        class="my-3"
        contain
        height="50"
      />

      <v-col cols="12">
        <h3>Todo VueJS</h3>
        <v-form @submit.prevent="addTodo">
          <v-text-field
            v-model="input"
            background-color="blue lighten-5"
            hide-details="false"
            clearable
            placeholder="Add a todo"
          ></v-text-field>
        </v-form>
      </v-col>

      <v-col cols="12">
        <v-list dense>
          <v-list-item class="hover" v-for="todo in todos" :key="todo.id">
            <v-list-item-action>
              <transition name="fade" appear>
                <v-icon v-if="todo.isComplete" color="green accent-3">
                  mdi-checkbox-marked-circle
                </v-icon>
              </transition>
            </v-list-item-action>

            <v-list-item-content
              @click="markComplete(todo)"
              :class="{ linethrough: todo.isComplete }"
            >
              <v-list-item-title v-text="todo.body"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="deleteTodo(todo._id)">
                <v-icon color="red accent-3">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12">
        <v-footer color="blue lighten-1" dark rounded>
          <div>{{ remainingTodos }} items remaining</div>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  // LIFECYCLE HOOKS
  created() {
    this.$store.dispatch("getTodos");
  },

  data: () => ({
    input: "",
  }),

  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["remainingTodos"]),
  },

  methods: {
    ...mapActions(["deleteTodo"]),
    //
    addTodo() {
      if (this.input === "") {
        return;
      }

      const payload = {
        body: this.input,
        isComplete: false,
        edit: false,
      };

      this.$store.dispatch("addTodo", payload);
      this.resetDOM();
    },
    deleteTodo(id) {
      const payload = {
        _id: id,
      };

      this.$store.dispatch("deleteTodo", payload);
    },
    markComplete(obj) {
      const updObj = {
        _id: obj._id,
        body: obj.body,
        isComplete: !obj.isComplete,
        edit: obj.edit,
      };

      this.$store.dispatch("markComplete", updObj);
    },
    resetDOM() {
      this.input = "";
    },
  },
};
</script>

<style>
.hover:hover {
  cursor: pointer;
  background: #e3f2fd;
  transition: ease-in-out 0.3s;
}

input {
  text-indent: 5px;
}

::placeholder {
  text-indent: 5px;
}

.linethrough {
  text-decoration: line-through;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s;
  transition: transform 10s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
