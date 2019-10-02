<template>
  <header>
    <div class="top-bar">
      <div class="container">
        <span>Welcome to Pataku Online Shopping Store !</span>
        <ul class="user-menu">
          <li>
            <a href="#"><i class="fas fa-user-lock"></i> Login</a>
            <a href="#">USD <strong>$</strong></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="logo-area">
        <div class="container">
            <div class="logo"><img src="@/assets/logo.png" /></div>
            <ul class="main-menu">
            <li>
                <a href="#">Home</a>
                <a href="#">USD <strong>$</strong></a>
            </li>
        </ul>
        </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style>
div.top-bar {
  height: 46px;
  background: #f4f4f4;
  line-height: 46px;
  border-bottom: 1px #ededed solid;
  padding: 0 10px;
}
ul.user-menu {
  float: right;
  list-style: none;
}
ul.user-menu li {
  float: left;
}
ul.user-menu li a {
  display: inline-block;
  padding: 0 10px;
  color: #727272;
  text-decoration: none;
  border-left: 1px #ededed solid;
}
ul.user-menu li a:first-child{
    border-left: none !important;
}
ul.user-menu li a:hover {
  color: #cea45f;
}
div.logo-area{
    padding:24px 0;
}
</style>