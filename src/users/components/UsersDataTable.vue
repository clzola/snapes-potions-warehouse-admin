<template>
  <div>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :hide-default-footer="true"
      :loading="loading"
      :items="users"
      loading-text="Loading users...">

      <template v-slot:item.created_at="{ item }">
        {{ item.created_at.toLocaleString() }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn text icon x-small class="mx-2" color="blue" :to="`/users/${item.id}`">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn text icon x-small class="mx-2" color="green" :to="`/users/${item.id}/edit`">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn text icon x-small class="mx-2" color="error" @click="deleteUser(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

    </v-data-table>
    <ConfirmDeleteActionDialog ref="deleteDialog"/>
  </div>
</template>

<script>
import ConfirmDeleteActionDialog from '../../shared/components/dialogs/ConfirmDeleteActionDialog'

export default {
  components: {
    ConfirmDeleteActionDialog
  },
  data() {
    return {
      headers: [
        { text: 'ID', align: 'left', sortable: true, value: 'id' },
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'E-Mail', align: 'left', sortable: true, value: 'email' },
        { text: 'Created At', align: 'left', sortable: true, value: 'created_at' },
        { text: '', align: 'right', sortable: false, value: 'actions' }
      ],
      loading: false,
      users: []
    }
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    loadUsers() {
      this.loading = true
      this.$http.get('/api/users')
        .then(response => {
          this.users = response.data.data.map((user) => {
            user.created_at = new Date(user.created_at)
            return user
          })
          console.log(this.users)
        })
        .finally(() => { this.loading = false })
    },
    deleteUser(user) {
      this.$refs.deleteDialog.title = 'Delete User?'
      this.$refs.deleteDialog.message = `Are you sure you want to delete user named <b>${user.name}</b>?`

      this.$refs.deleteDialog.onConfirmed = () => {
        return this.$http
          .post(`/api/users/${user.id}`, { _method: 'DELETE' })
          .then(() => this.onUserDeleted(user))
      }

      this.$refs.deleteDialog.show()
    },
    onUserDeleted(user) {
      this.users = this.users.filter(
        (u) => u.id !== user.id
      )
      this.$store.commit('setAlert', {
        status: 'success',
        message: `User '${user.name}' has been successfully deleted!`
      })
    }
  }
}
</script>
