<template>
  <div>
    <Header />
  </div>
</template>

<script>
import Header from "../components/dashboard/Header";
export default {
  data() {
    return {
      allUsers: []
    };
  },
  created() {
  },
  methods: {
  },
  components: {
    Header,
  }
};
</script>

<style scoped>
</style>