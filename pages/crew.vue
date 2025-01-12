<template>
  <main class="grid-container grid-container--crew flow">
    <h1 class="numbered-title">
      <span aria-hidden="true">02</span> Meet your crew
    </h1>

    <div
      class="dot-indicators flex"
      role="tablist"
      aria-label="crew member list">
      <button
        v-for="(member, index) in crew"
        :key="member.name"
        :aria-selected="selectedCrew === normalizeText(member.role)"
        :aria-controls="`${normalizeText(member.role)}-tab`"
        role="tab"
        :data-image="`${normalizeText(member.role)}-image`"
        :tabindex="selectedCrew === normalizeText(member.role) ? 0 : -1"
        @click="selectedCrew = normalizeText(member.role)">
        <span class="sr-only">{{ member.role }}</span>
      </button>
    </div>

    <article
      v-for="member in crew"
      :key="member.name"
      class="crew-details flow"
      :id="`${normalizeText(member.role)}-tab`"
      role="tabpanel"
      tabindex="0"
      :hidden="selectedCrew !== normalizeText(member.role)">
      <header class="flow flow--space-small">
        <h2 class="fs-600 ff-serif uppercase">{{ member.role }}</h2>
        <p class="fs-700 uppercase ff-serif">{{ member.name }}</p>
      </header>
      <p>{{ member.bio }}</p>
    </article>

    <picture
      v-for="member in crew"
      :key="member.name"
      :id="`${normalizeText(member.role)}-image`"
      :hidden="selectedCrew !== normalizeText(member.role)">
      <source :srcset="member.images.webp" type="image/webp" />
      <img :src="member.images.png" :alt="member.name" />
    </picture>
  </main>
</template>

<script lang="ts" setup>
import data from '~/utils/data.json'

const crew = data.crew
const selectedCrew = ref(normalizeText(crew[0].role))
const { initializeTabs } = useTabs()

initializeTabs()
</script>

<style scoped>
.grid-container--crew {
  --flow-space: 2rem;
  grid-template-areas:
    'title'
    'image'
    'tabs'
    'content';
}

.grid-container--crew > picture {
  grid-area: image;
  max-width: 60%;
  border-bottom: 1px solid hsl(var(--clr-white) / 0.1);
}

.grid-container--crew > .dot-indicators {
  grid-area: tabs;
}

.grid-container--crew > .crew-details {
  grid-area: content;
}

.crew-details h2 {
  color: hsl(var(--clr-white) / 0.5);
}

.numbered-title {
  grid-area: title;
}

@media (min-width: 35em) {
  .grid-container--crew {
    padding-bottom: 0;
    grid-template-areas:
      'title'
      'content'
      'tabs'
      'image';
  }

  .numbered-title {
    justify-self: start;
    margin-top: 2rem;
  }
}

@media (min-width: 50em) {
  .grid-container--crew {
    grid-template-columns: minmax(1rem, 1fr) minmax(0, 37rem) minmax(0, 23rem) minmax(
        1rem,
        1fr
      );
    justify-items: start;
    grid-template-areas:
      '. title title .'
      '. content image .'
      '. tabs image .';
  }

  .grid-container--crew > picture {
    grid-column: span 2;
    align-self: end;
    max-width: 90%;
  }
}
</style>
