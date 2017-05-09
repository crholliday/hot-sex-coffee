<template lang="pug">
  .container.todos
    .columns
        .column.is-9
          .columns
            .column.is-9.is-offset-2
              .box.todo(v-for='todo in orderBy(todos, "[dueDate, importance]", -1)')
                todo-card(v-bind:todo='todo')             
        .column.is-3
          .box
            h3.title.h3 Add a new Todo
            label.label Task
            p.control
              textarea.textarea(type='text' placeholder='The Task' v-model='task')
            label.label Category
            p.control
              input.input(type='text' placeholder='Category' v-model='category')
            label.label Importance
            p.control
              input.input(type='number' placeholder='Importance' v-model.number='importance')
            label.label Status
            p.control
              input.input(type='text' placeholder='Status' v-model='status')
            label.label Due Date
            p.control
              input.input(type='date' placeholder='Due Date' v-model='dueDate')
            hr
            p.control
              button.button.is-primary(@click.prevent='createTodo()') Create Todo

</template>

<script>
require('moment-duration-format')
const config = require('../config')
import {mapGetters, mapActions} from 'vuex'
import TodoCard from '../components/TodoCard.vue'
import axios from 'axios'

export default {
  name: 'todos',
  components: {
    TodoCard
  },
  data () {
    return {
      task: '',
      category: '',
      importance: '',
      status: '',
      dueDate: '',
      created: ''
    }
  },
  computed: {
    ...mapGetters([
      'loggedInUser',
      'todos'
    ])
  },
  methods: {
    ...mapActions([
      'loadTodos'
    ]),
    createTodo: function () {
      let todo = {
        task: this.task,
        category: this.category,
        importance: this.importance,
        dueDate: this.dueDate,
        status: this.status,
        user: this.loggedInUser
      }
      axios.post(config.api_base_url + '/todo', todo)
            .then(response => {
              this.loadTodos()
              this.clearTodoForm()
            })
    },
    clearTodoForm: function () {
      this.task = ''
      this.category = ''
      this.importance = ''
      this.status = ''
      this.dueDate = ''
    }
  },
  created: function () {
    if (!this.todos.length) {
      this.loadTodos()
    }
  }
}

</script>

<style>
  .container.todos {
    padding-top: 1.5rem;
  }
  .box.todo {
  border-left: 2px inset red;
}
  
</style>

