<template lang='pug'>
article.media
    .media-content
        h3.title {{ todo.task }}
        p.subtitle(v-if='todo.dueDate') Due: {{ todo.dueDate | formatDateHuman}}
        small {{ todo.created | formatDateHuman }}
        div.tag {{ todo.category }}
        div.tag Priority: {{ todo.importance }}
        div.tag Status: {{ todo.status }}
    .media-right
        span.icon.is-medium: a(@click='deleteTodo(todo)')
            i.fa.fa-check-circle
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'todo-card',
  props: ['todo'],
  methods: {
    ...mapActions([
      'deleteTodo'
    ])
  }
}
</script>

<style>
.card-header {
  background-color: lightgrey
}

.card {
  height: 100%;
}
</style>
