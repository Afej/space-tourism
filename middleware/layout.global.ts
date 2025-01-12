export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) return

  const route = to.name as string

  if (route === 'index') {
    document.body.className = 'home'
    return
  }

  document.body.className = route
})
