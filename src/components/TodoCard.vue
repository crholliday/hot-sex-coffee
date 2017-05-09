<template lang='pug'>
article.media
    .media-content
        h3.title(v-if='!taskEdit'  v-on:click='taskEdit = true') {{ todo.task }}         
        input.input( type='text' v-model='todo.task' v-if='taskEdit' v-on:blur='saveTask(todo)')
        p.subtitle(v-if='todo.dueDate && !taskEdit' v-bind:class='dueClass(todo.dueDate)') Due: {{ todo.dueDate | formatDateHuman}}
        input.input(type='date' v-model='todo.dueDate' v-if='taskEdit' v-on:blur='saveTask(todo)')
        div.tag {{ todo.category }}
        div.tag(v-bind:class='tagClass(todo.importance)') Priority: {{ todo.importance }}
        div.tag Status: {{ todo.status }}
    .media-right
        span.icon.is-medium: a(@click='deleteTodo(todo)')
            i.fa.fa-check-circle
</template>

<script>
import {mapActions} from 'vuex'
const moment = require('moment')

export default {
  name: 'todo-card',
  data () {
    return {
      taskEdit: false,
      dueEdit: false
    }
  },
  props: ['todo'],
  methods: {
    ...mapActions([
      'deleteTodo'
    ]),
    tagClass: function (num) {
      if (num <= 3) {
        return 'is-success'
      } else if (num >= 7) {
        return 'is-danger'
      } else {
        return 'is-warning'
      }
    },
    dueClass: function (date) {
      // return moment().diff(moment(date), 'days')
      // less than 0 is future
      let dateDiff = moment().diff(moment(date), 'days')
      if (dateDiff < -2) {
        return 'is-green'
      } else if (dateDiff > 0) {
        return 'is-red'
      } else {
        return 'is-yellow'
      }
    },
    saveTask: function (todo) {
      this.taskEdit = !this.taskEdit
    }
  }
}
</script>

<style>
.card {
  height: 100%;
}
.subtitle.is-green {
  color: green
}
.subtitle.is-red {
  color: red
}
.subtitle.is-yellow {
  color: #ffdd57
}
</style>
