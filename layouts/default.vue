<template>
  <div class="layout">
    <AppHeader />

    <slot />
  </div>
</template>

<style>
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: min-content 1fr;
}
</style>
