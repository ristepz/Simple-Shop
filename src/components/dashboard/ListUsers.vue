<template>
  <div class="container">
      <h3>List All Users</h3>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Currency</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(user, index) in users" :key="`user-${index}`">
              <td>{{user.first_name}}</td>
              <td>{{user.last_name}}</td>
              <td>{{user.email}}</td>
              <td>{{user.currency}}</td>
              <td>{{user.role}}</td>

          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
table thead tr th, table tbody, tr td{
    color: #fff;
}
</style>