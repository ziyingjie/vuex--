<template>
  <div id="app">
    123
    <p>state:{{ this.$store.state.num }}</p>
    <p>getter:{{ this.$store.getters.getNum }}</p>
    <button @click="add">+1</button>
    <button @click="asyncAdd">异步+2</button>
    <son></son>
  </div>
</template>

<script>
import son from './components/son.vue'
export default {
  beforeCreate() {
    console.log('父beforeCreate');
  },
  created() {
    console.log('父created');
  },
  beforeMount() {
    console.log('父beforeMount');
  },
  mounted() {
    console.log('父mounted');
  },
  components: { son },
  methods: {
    add() {
      this.$store.commit("incre", 1);
    },
    asyncAdd() {
      this.$store.dispatch("asyncIncre", 2);
    },
  },
};
</script>
