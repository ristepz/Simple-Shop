<template>
  <div>
    <Header />
    <AddUser @userAdded="getAllUsers" />
    <ListUsers :users="allUsers" />
  </div>
</template>

<script>
import { AdminApi } from "../../services/Auth";
import Header from "../../components/dashboard/Header";
import AddUser from "../../components/dashboard/AddUser";
import ListUsers from "../../components/dashboard/ListUsers";
export default {
  data() {
    return {
      allUsers: []
    };
  },
  created() {
      this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      AdminApi.get("/users")
        .then(resp => {
          this.allUsers = resp.data.data;
        })
        .catch(err => {});
    }
  },
  components: {
    Header,
    AddUser,
    ListUsers
  }
};
</script>

<style scoped>
</style>