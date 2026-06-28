<script setup>
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Store</h1>
      <p class="hero-subtitle">Manage your products and users with ease</p>
      <div class="hero-actions">
        <router-link :to="{ name: 'products' }" class="btn btn-primary">Browse Products</router-link>
        <router-link :to="{ name: 'users' }" class="btn btn-outline">View Users</router-link>
      </div>
    </section>

    <section class="cards">
      <router-link :to="{ name: 'products' }" class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h2 class="card-title">Products</h2>
        <p class="card-desc">Create, edit, and manage your product catalog</p>
        <span class="card-link">Go to Products &rarr;</span>
      </router-link>

      <router-link :to="{ name: 'users' }" class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h2 class="card-title">Users</h2>
        <p class="card-desc">Manage user accounts and information</p>
        <span class="card-link">Go to Users &rarr;</span>
      </router-link>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 64px 0 48px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--color-text);
  opacity: 0.7;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}

.btn:active {
  transform: scale(0.97);
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

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-bottom: 64px;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}

.card:hover {
  border-color: #409eff;
  box-shadow: 0 4px 20px rgba(64, 158, 255, 0.1);
  transform: translateY(-2px);
}

.card:active {
  transform: translateY(0);
}

.card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--color-background-soft);
  margin-bottom: 16px;
  color: #409eff;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-heading);
}

.card-desc {
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.7;
  line-height: 1.5;
  margin-bottom: 16px;
  flex: 1;
}

.card-link {
  font-size: 14px;
  font-weight: 500;
  color: #409eff;
}

@media (max-width: 600px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 36px;
  }
}
</style>
