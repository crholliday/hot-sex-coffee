<template lang="pug">
  .container.todos
    .columns
        .column.is-9
          h3.title.h3 List of Todos
          table.table.is-striped.is-narrow
            thead
              tr
                th Task
                th Category
                th Importance
                th Status
                th Created
                th Edit
            tbody
              tr(v-for='todo in todos')
                td {{ todo.task }}
                td {{ todo.category }}
                td {{ todo.importance }}
                td {{ todo.status }}
                td {{ todo.created }}
                td: a(@click='deleteTodo(todo._id)') remove
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
              input.input(type='number' placeholder='Importance' v-model='importance')
            label.label Status
            p.control
              input.input(type='text' placeholder='Status' v-model='status')
            hr
            p.control
              button.button.is-primary(@click.prevent='createTodo()') Create Todo

</template>

<script>
require('moment-duration-format')
const config = require('../config')

export default {
  name: 'todos',
  components: {

  },
  data () {
    return {
      todos: [],
      task: '',
      category: '',
      importance: '',
      status: '',
      created: ''
    }
  },
  methods: {
    loadTodos: function () {
      this.$http.get(config.api_base_url + '/todos')
            .then(response => {
              this.todos = response.data
            })
    },
    createTodo: function () {
      let todo = {
        task: this.task,
        category: this.category,
        importance: this.importance,
        status: this.status
      }
      this.$http.post(config.api_base_url + '/todo', todo)
            .then(response => {
              this.loadTodos()
            })
    },
    deleteTodo: function (id) {
      this.$http.delete(config.api_base_url + '/todo/' + id)
      .then(response => {
        this.loadTodos()
      })
    }
  },
  created: function () {
    this.loadTodos()
  }
}

</script>

<style>
  .container.todos {
    padding-top: 1.5rem;
  }
</style>

