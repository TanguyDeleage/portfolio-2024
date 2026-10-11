<template>
  <figure class="case-figure" :class="{ elevated }">
    <img
      :src="figure.src"
      :alt="figure.alt"
      :width="figure.width"
      :height="figure.height"
      loading="lazy"
      decoding="async"
    >
    <figcaption v-if="figure.caption">
      <span v-if="label" class="figure-label">{{ label }}</span>
      {{ figure.caption }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'CaseFigure',
  props: {
    figure: { type: Object, required: true },
    // Optional lead-in shown before the caption (e.g. Before / After)
    label: { type: String, default: '' },
    // Shadow instead of outline, for images sitting on a tinted band
    elevated: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
  .case-figure {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    min-width: 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    border: 1px solid #D1D1D1;
  }

  .elevated img {
    border: none;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
  }

  figcaption {
    font-size: 0.8125rem;
    font-weight: 300;
    line-height: 140%;
    color: #3D3D3D;
  }

  .figure-label {
    margin-right: 0.5rem;
    font-weight: 600;
    color: var(--primary-brand-highest);
  }
</style>
