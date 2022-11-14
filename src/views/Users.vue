<template>
  <div>
    <h1>This is the users page</h1>

    <el-table
      :data="users"
      style="width: 100%"
    >

      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>

      <el-table-column
        prop="username"
        label="Username"
        width="180">
      </el-table-column>

      <el-table-column
        prop="email"
        label="Email">
      </el-table-column>
      
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="viewDetails(scope.row)">View Details</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteUser(scope.$index)">Delete</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <el-dialog
      title="User Info"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span v-for="(d, index) in selectedUser" :key="index">
        <p>{{ d.key }}: {{ d.value }}</p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import jsonUtils from "@/utils/jsonUtils"
export default {
  name: 'Users',
  data () {
    return {
      dialogVisible: false,
      selectedUser: "",
      users: []
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers(){
      this.$http.get(`${process.env.VUE_APP_BASE_URL}${'users'}`)
      .then(response => {
        this.users = response.data
      })
      .catch(error => {
        console.log("🚀 ~ file: Users.vue ~ getUsers ~ error", error)
      })
    },

    viewDetails(row) {
      try {
        this.selectedUser = jsonUtils.getNested(row, [])
        this.dialogVisible = true
      } catch (error) {
        console.log("🚀 ~ file: Users.vue ~ viewDetails ~ error", error)
      }
    },
    
    deleteUser(userId) {
      this.$http.delete(`${process.env.VUE_APP_BASE_URL}${'users'}/${userId}`)
      .then(response => {
        this.users.splice(userId, 1)
        alert('User successfully deleted')
      })
      .catch(error => {
        alert('An error ocurred trying to delete user')
      })
    }

  }
}
</script>