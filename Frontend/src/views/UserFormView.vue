<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userApi } from '@/api/users'

const route = useRoute()
const router = useRouter()
const isEdit = !!route.params.id

const form = ref({
  name: '',
  age: '',
  gender: '',
  email: '',
})
const saving = ref(false)
const error = ref(null)

onMounted(async () => {
  if (isEdit) {
    try {
      const user = await userApi.getById(route.params.id)
      form.value = { ...user }
    } catch (e) {
      error.value = e.message
    }
  }
})

async function handleSubmit() {
  saving.value = true
  error.value = null
  try {
    if (isEdit) {
      await userApi.update(route.params.id, form.value)
    } else {
      await userApi.create(form.value)
    }
    router.push({ name: 'users' })
  } catch (e) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="form-page">
    <h1>{{ isEdit ? 'Edit User' : 'New User' }}</h1>

    <div v-if="error" class="form-error">{{ error }}</div>

    <form @submit.prevent="handleSubmit" class="user-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Full name" />
      </div>

      <div class="form-group">
        <label for="age">Age</label>
        <input id="age" v-model="form.age" type="number" min="1" max="150" required placeholder="Age" />
      </div>

      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="form.gender" required>
          <option value="" disabled>Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required placeholder="email@example.com" />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="saving">
          {{ saving ? 'Saving...' : isEdit ? 'Update User' : 'Create User' }}
        </button>
        <router-link :to="{ name: 'users' }" class="btn btn-outline">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-page {
  max-width: 520px;
  margin: 0 auto;
}

.form-page h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
}

.form-error {
  background: #fef0ef;
  color: #e74c3c;
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 14px;
  background: var(--color-background);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #409eff;
}

.form-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, opacity 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn:active:not(:disabled) {
  opacity: 0.8;
}

.btn-primary {
  background: #409eff;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
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
</style>
