<template>
  <div>
    <header class="primary-header flex">
      <div>
        <img
          src="/images/shared/logo.svg"
          alt="space tourism logo"
          class="logo" />
      </div>
      <button
        class="mobile-nav-toggle"
        aria-controls="primary-navigation"
        @click="toggleNav">
        <span class="sr-only" :aria-expanded="isNavVisible">Menu</span>
        <img :src="navIcon" alt="nav icon" />
      </button>
      <nav>
        <ul
          id="primary-navigation"
          :data-visible="isNavVisible"
          class="primary-navigation underline-indicators flex">
          <li
            v-for="(item, index) in navItems"
            :key="item.path"
            :class="{ active: isActive(item.path) }">
            <NuxtLink
              class="ff-sans-cond uppercase text-white letter-spacing-2"
              :to="item.path"
              @click="toggleNav">
              <span aria-hidden="true">{{
                index.toString().padStart(2, '0')
              }}</span
              >{{ item.name }}</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script lang="ts" setup>
import hamburgerIcon from '/images/shared/icon-hamburger.svg'
import closeIcon from '/images/shared/icon-close.svg'

const route = useRoute()

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Destination', path: '/destination' },
  { name: 'Crew', path: '/crew' },
  { name: 'Technology', path: '/technology' },
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const isNavVisible = ref(false)

const toggleNav = () => {
  isNavVisible.value = !isNavVisible.value
}

const navIcon = computed(() => (isNavVisible.value ? closeIcon : hamburgerIcon))
</script>

<style scoped>
.logo {
  margin: 1.5rem clamp(1.5rem, 5vw, 3.5rem);
}

.primary-header {
  justify-content: space-between;
  align-items: center;
}

.primary-navigation {
  --gap: clamp(1.5rem, 5vw, 3.5rem);
  --underline-gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  background: hsl(var(--clr-white) / 0.05);
  backdrop-filter: blur(1.5rem);
}

.primary-navigation a {
  text-decoration: none;
}

.primary-navigation a > span {
  font-weight: 700;
  margin-right: 0.5em;
}

.mobile-nav-toggle {
  display: none;
}

@media (max-width: 35rem) {
  .primary-navigation {
    --underline-gap: 0.5rem;
    position: fixed;
    z-index: 1000;
    inset: 0 0 0 30%;
    list-style: none;
    padding: min(20rem, 15vh) 2rem;
    margin: 0;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 500ms ease-in-out;
  }

  .primary-navigation[data-visible='true'] {
    transform: translateX(0);
  }

  .primary-navigation.underline-indicators > * {
    border: 0;
    border-right: 0.2rem solid hsl(var(--clr-white) / 0);
  }

  .primary-navigation.underline-indicators > .active {
    border: 0;
    border-right: 0.2rem solid hsl(var(--clr-white) / 1);
  }

  .mobile-nav-toggle {
    display: block;
    position: absolute;
    z-index: 2000;
    right: 1rem;
    top: 2rem;
    background: transparent;
    background-repeat: no-repeat;
    background-position: center;
    border: 0;
  }

  .mobile-nav-toggle img {
    width: 100%;
    height: 100%;
  }

  .mobile-nav-toggle:focus-visible {
    outline: 5px solid white;
    outline-offset: 5px;
  }
}

@media (min-width: 35em) {
  .primary-navigation {
    padding-inline: clamp(3rem, 7vw, 7rem);
  }
}

@media (min-width: 35em) and (max-width: 49.999em) {
  .primary-navigation a > span {
    display: none;
  }
}

@media (min-width: 50em) {
  .primary-header::after {
    content: '';
    display: block;
    position: relative;
    height: 1px;
    width: 100%;
    margin-right: -2.5rem;
    background: hsl(var(--clr-white) / 0.25);
    order: 1;
    z-index: 1;
  }

  nav {
    order: 2;
  }

  .primary-navigation {
    margin-block: 2rem;
  }
}
</style>
