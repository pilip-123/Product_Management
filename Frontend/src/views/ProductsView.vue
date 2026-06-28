<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productApi } from '@/api/products'

const router = useRouter()
const products = ref([])
const loading = ref(true)
const error = ref(null)

async function fetchProducts() {
  loading.value = true
  error.value = null
  try {
    products.value = await productApi.getAll()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return
  try {
    await productApi.remove(id)
    products.value = products.value.filter((p) => p.id !== id)
  } catch (e) {
    error.value = e.message
  }
}

function editProduct(id) {
  router.push({ name: 'product-edit', params: { id } })
}

onMounted(fetchProducts)
</script>

<template>
  <div class="products-page">
    <div class="page-header">
      <h1>Products</h1>
      <router-link :to="{ name: 'product-create' }" class="btn btn-primary">
        + New Product
      </router-link>
    </div>

    <div v-if="loading" class="state-message">Loading...</div>
    <div v-else-if="error" class="state-message error">{{ error }}</div>
    <div v-else-if="products.length === 0" class="state-message empty">
      No products found. Create your first product!
    </div>
    <div v-else class="table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quality</th>
            <th>Price</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.quality }}</td>
            <td>${{ Number(product.price).toFixed(2) }}</td>
            <td class="actions-col">
              <button class="btn btn-sm btn-outline" @click="editProduct(product.id)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.products-page {
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

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  padding: 12px 16px;
  text-align: left;
}

.product-table thead {
  background: var(--color-background-soft);
}

.product-table th {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border);
}

.product-table td {
  font-size: 14px;
  border-bottom: 1px solid var(--color-border);
}

.product-table tbody tr:hover {
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
