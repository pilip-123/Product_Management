<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '@/api/users'

const router = useRouter()
const users = ref([])
const loading = ref(true)
const error = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    users.value = await userApi.getAll()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function deleteUser(id) {
  if (!confirm('Are you sure you want to delete this user?')) return
  try {
    await userApi.remove(id)
    users.value = users.value.filter((u) => u.id !== id)
  } catch (e) {
    error.value = e.message
  }
}

function editUser(id) {
  router.push({ name: 'user-edit', params: { id } })
}

onMounted(fetchUsers)
</script>

<template>
  <div class="users-page">
    <div class="page-header">
      <h1>Users</h1>
      <router-link :to="{ name: 'user-create' }" class="btn btn-primary">
        + New User
      </router-link>
    </div>

    <div v-if="loading" class="state-message">Loading...</div>
    <div v-else-if="error" class="state-message error">{{ error }}</div>
    <div v-else-if="users.length === 0" class="state-message empty">
      No users found. Create your first user!
    </div>
    <div v-else class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.email }}</td>
            <td class="actions-col">
              <button class="btn btn-sm btn-outline" @click="editUser(user.id)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.users-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
}

.state-message {
  text-align: center;
  padding: 48px 0;
  color: var(--color-text);
  font-size: 16px;
}

.state-message.error {
  color: #e74c3c;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px 16px;
  text-align: left;
}

.user-table thead {
  background: var(--color-background-soft);
}

.user-table th {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border);
}

.user-table td {
  font-size: 14px;
  border-bottom: 1px solid var(--color-border);
}

.user-table tbody tr:hover {
  background: var(--color-background-soft);
}

.actions-col {
  text-align: right;
  white-space: nowrap;
}

.actions-col .btn + .btn {
  margin-left: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, opacity 0.2s;
}

.btn:active {
  opacity: 0.8;
}

.btn-primary {
  background: #409eff;
  color: #fff;
}

.btn-primary:hover {
  background: #66b1ff;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.btn-outline:hover {
  background: var(--color-background-soft);
}

.btn-danger {
  background: transparent;
  border: 1px solid #e74c3c;
  color: #e74c3c;
}

.btn-danger:hover {
  background: #fef0ef;
}

.btn-sm {
  padding: 4px 10px;
  font-size: 13px;
}
</style>
