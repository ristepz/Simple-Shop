<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Hind+Guntur:300,400,500,600,700&display=swap");
@import url("./assets/style.css");

* {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Hind Guntur", sans-serif;
  font-size: 16px;
  color: #575757;
  background: #f2f3f7;
}
.container{
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
}
</style>
