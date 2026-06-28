<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="nav-inner">
        <router-link :to="{ name: 'home' }" class="nav-brand">Store</router-link>
        <div class="nav-links">
          <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
          <router-link :to="{ name: 'products' }" class="nav-link">Products</router-link>
          <router-link :to="{ name: 'users' }" class="nav-link">Users</router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background);
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
}

.nav-brand {
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  color: var(--color-heading);
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.nav-link:hover {
  background: var(--color-background-soft);
}

.nav-link.router-link-exact-active {
  background: var(--color-background-soft);
  color: var(--color-heading);
}

.main-content {
  flex: 1;
  padding: 32px 24px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}
</style>
