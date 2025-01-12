<template>
  <main class="grid-container grid-container--technology">
    <h1 class="numbered-title">
      <span aria-hidden="true">03</span> Space launch 101
    </h1>

    <div
      class="number-indicators flex"
      role="tablist"
      aria-label="technology list">
      <button
        v-for="(tech, index) in technology"
        :key="tech.name"
        :aria-selected="selectedTech === normalizeText(tech.name)"
        :aria-controls="`${normalizeText(tech.name)}-tab`"
        role="tab"
        :data-image="`${normalizeText(tech.name)}-image`"
        :tabindex="selectedTech === normalizeText(tech.name) ? 0 : -1"
        @click="selectedTech = normalizeText(tech.name)">
        {{ index + 1 }}
      </button>
    </div>

    <article
      v-for="tech in technology"
      :key="tech.name"
      class="technology-details flow"
      :id="`${normalizeText(tech.name)}-tab`"
      role="tabpanel"
      tabindex="0"
      :hidden="selectedTech !== normalizeText(tech.name)">
      <header class="flow flow--space-small">
        <h2 class="fs-600 ff-serif uppercase">The terminology...</h2>
        <p class="fs-700 uppercase ff-serif">{{ tech.name }}</p>
      </header>
      <p>{{ tech.description }}</p>
    </article>

    <picture
      v-for="tech in technology"
      :key="tech.name"
      :id="`${normalizeText(tech.name)}-image`"
      :hidden="selectedTech !== normalizeText(tech.name)">
      <img
        class="portrait"
        :src="tech.images.portrait"
        :alt="`${tech.name} portrait`" />
      <img
        class="landscape"
        :src="tech.images.landscape"
        :alt="`${tech.name} landscape`" />
    </picture>
  </main>
</template>

<script lang="ts" setup>
import data from '~/utils/data.json'
import { useTabs } from '~/composables/useTabs'

const technology = data.technology
const selectedTech = ref(normalizeText(technology[0].name))
const { initializeTabs } = useTabs()

initializeTabs()
</script>

<style scoped>
.grid-container--technology {
  --flow-space: 2rem;
  padding-inline: 0;
  grid-template-areas:
    'title'
    'image'
    'tabs'
    'content';
}

.grid-container--technology > picture {
  grid-area: image;
}

.grid-container--technology > picture .landscape {
  display: block;
}
.grid-container--technology > picture .portrait {
  display: none;
}

.grid-container--technology > .number-indicators {
  grid-area: tabs;
}

.grid-container--technology > .technology-details {
  padding-inline: 1rem;
  grid-area: content;
}

.technology-details h2 {
  color: hsl(var(--clr-white) / 0.5);
}

.numbered-title {
  grid-area: title;
}

@media (min-width: 35em) {
  .grid-container--technology {
    padding-bottom: 0;
    grid-template-areas:
      'title'
      'image'
      'tabs'
      'content';
  }

  .numbered-title {
    justify-self: start;
    margin-top: 2rem;
  }

  .grid-container--technology > .numbered-title {
    padding-inline: 2rem;
  }
}

@media (min-width: 50em) {
  .grid-container--technology {
    grid-template-columns:
      minmax(1rem, 1fr) minmax(0, 4rem) minmax(0, 37rem) minmax(0, 23rem)
      minmax(1rem, 1fr);
    justify-items: start;
    grid-template-areas:
      '. title title title .'
      '. tabs content image .';
  }

  .grid-container--technology > picture {
    grid-column: span 2;
    justify-self: end;
    max-width: 100%;
  }

  .grid-container--technology > .number-indicators {
    flex-direction: column;
  }

  .grid-container--technology > picture .landscape {
    display: none;
  }
  .grid-container--technology > picture .portrait {
    display: block;
  }
}
</style>
