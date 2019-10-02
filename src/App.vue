<template>
  <div id="app">
    <Header />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: {
    Header
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Hind+Guntur:300,400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Hind Guntur", sans-serif;
  font-size: 16px;
  color: #575757;
}
.container{
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
}
</style>
