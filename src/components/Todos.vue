<template lang="pug">
  .container.todos
    .columns
        .column.is-9
          .columns
            .column.is-9.is-offset-2
              .box(v-for='todo in todos')
                article.media
                  .media-content
                    h3.title {{ todo.task }}
                    p.subtitle(v-if='todo.dueDate') Due: {{ todo.dueDate | formatDateHuman}}
                    small {{ todo.created | formatDateHuman }}
                    div.tag {{ todo.category }}
                    div.tag Priority: {{ todo.importance }}
                    div.tag Status: {{ todo.status }}
                  .media-right
                    span.icon.is-medium: a(@click='deleteTodo(todo._id)')
                       i.fa.fa-check-circle
              
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
      dueDate: '',
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
        dueDate: this.dueDate,
        status: this.status
      }
      this.$http.post(config.api_base_url + '/todo', todo)
            .then(response => {
              this.loadTodos()
              this.clearTodoForm()
            })
    },
    deleteTodo: function (id) {
      this.$http.delete(config.api_base_url + '/todo/' + id)
      .then(response => {
        this.loadTodos()
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
    this.loadTodos()
  }
}

</script>

<style>
  .container.todos {
    padding-top: 1.5rem;
  }
  
</style>

