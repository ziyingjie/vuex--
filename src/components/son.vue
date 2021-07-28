<template>
  <div>
    son    
    <p>getter:{{ this.$store.getters.getNum }}</p>

  </div>
</template>

<script>
export default {
  beforeCreate() {
    console.log('%c 子beforeCreate', 'color:red;');
  },
  created() {
    console.log('%c 子created', 'color:red;');
  },
  beforeMount() {
    console.log('%c 子beforeMount', 'color:red;');
  },
  mounted() {
    console.log('%c 子mounted', 'color:red;');
  },
}
</script>

<style>
</style>