<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productApi } from '@/api/products'

const route = useRoute()
const router = useRouter()
const isEdit = !!route.params.id

const form = ref({
  name: '',
  quality: '',
  price: '',
})
const saving = ref(false)
const error = ref(null)

onMounted(async () => {
  if (isEdit) {
    try {
      const product = await productApi.getById(route.params.id)
      form.value = { ...product }
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
      await productApi.update(route.params.id, form.value)
    } else {
      await productApi.create(form.value)
    }
    router.push({ name: 'products' })
  } catch (e) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="form-page">
    <h1>{{ isEdit ? 'Edit Product' : 'New Product' }}</h1>

    <div v-if="error" class="form-error">{{ error }}</div>

    <form @submit.prevent="handleSubmit" class="product-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Product name" />
      </div>

      <div class="form-group">
        <label for="quality">Quality</label>
        <input id="quality" v-model="form.quality" type="text" required placeholder="e.g. High, Medium, Low" />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input id="price" v-model="form.price" type="number" step="0.01" min="0" required placeholder="0.00" />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="saving">
          {{ saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product' }}
        </button>
        <router-link :to="{ name: 'products' }" class="btn btn-outline">Cancel</router-link>
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

.product-form {
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

.form-group input {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 14px;
  background: var(--color-background);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
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
