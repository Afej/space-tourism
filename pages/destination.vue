<template>
  <main class="grid-container grid-container--destination flow">
    <h1 class="numbered-title">
      <span aria-hidden="true">01</span> Pick your destination
    </h1>

    <picture
      v-for="dest in destinations"
      :key="dest.name"
      :id="`${normalizeText(dest.name)}-image`"
      :hidden="selectedDestination !== normalizeText(dest.name)">
      <source :srcset="dest.images.webp" type="image/webp" />
      <img :src="dest.images.png" :alt="dest.name" />
    </picture>

    <div
      class="tab-list underline-indicators flex"
      role="tablist"
      aria-label="destination list">
      <button
        v-for="dest in destinations"
        :key="dest.name"
        :aria-selected="selectedDestination === normalizeText(dest.name)"
        role="tab"
        :aria-controls="`${normalizeText(dest.name)}-tab`"
        class="uppercase ff-sans-cond text-accent letter-spacing-2"
        :tabindex="selectedDestination === normalizeText(dest.name) ? 0 : -1"
        :data-image="`${normalizeText(dest.name)}-image`"
        @click="selectedDestination = normalizeText(dest.name)">
        {{ dest.name }}
      </button>
    </div>

    <article
      v-for="dest in destinations"
      :key="dest.name"
      class="destination-info flow"
      :id="`${normalizeText(dest.name)}-tab`"
      tabindex="0"
      role="tabpanel"
      :hidden="selectedDestination !== normalizeText(dest.name)">
      <h2 class="fs-800 uppercase ff-serif">{{ dest.name }}</h2>
      <p>{{ dest.description }}</p>

      <div class="destination-meta flex">
        <div>
          <h3 class="text-accent fs-200 uppercase">Avg. distance</h3>
          <p class="ff-serif uppercase">{{ dest.distance }}</p>
        </div>
        <div>
          <h3 class="text-accent fs-200 uppercase">Est. travel time</h3>
          <p class="ff-serif uppercase">{{ dest.travel }}</p>
        </div>
      </div>
    </article>
  </main>
</template>

<script lang="ts" setup>
import data from '~/utils/data.json'

const destinations = data.destinations
const selectedDestination = ref(normalizeText(destinations[0].name))
const { initializeTabs } = useTabs()

initializeTabs()
</script>

<style scoped>
.grid-container--destination {
  --flow-space: 2rem;
  grid-template-areas:
    'title'
    'image'
    'tabs'
    'content';
}

.grid-container--destination > picture {
  grid-area: image;
  max-width: 60%;
  align-self: start;
}

.grid-container--destination > .tab-list {
  grid-area: tabs;
}

.grid-container--destination > .destination-info {
  grid-area: content;
}

.destination-meta {
  flex-direction: column;
  border-top: 1px solid hsl(var(--clr-white) / 0.1);
  padding-top: 2.5rem;
  margin-top: 2.5rem;
}

.destination-meta p {
  font-size: 1.75rem;
}

.numbered-title {
  grid-area: title;
}

@media (min-width: 35em) {
  .destination-meta {
    flex-direction: row;
    justify-content: space-evenly;
  }
  .numbered-title {
    justify-self: start;
    margin-top: 2rem;
  }
}

@media (min-width: 50em) {
  .grid-container--destination {
    justify-items: start;
    align-content: start;
    grid-template-areas:
      '. title title .'
      '. image tabs .'
      '. image content .';
  }

  .grid-container--destination > picture {
    max-width: 90%;
  }

  .destination-meta {
    --gap: min(6vw, 6rem);
    justify-content: start;
  }
}
</style>
