<template>
  <figure class="case-figure" :class="{ elevated }">
    <!-- No source yet: a grey box at the planned ratio, labelled with what goes there -->
    <div
      v-if="!figure.src"
      class="placeholder"
      :style="{ aspectRatio: `${figure.width ?? 16} / ${figure.height ?? 9}` }"
    >
      {{ figure.alt || 'Media placeholder' }}
    </div>
    <video
      v-else-if="/\.(mp4|webm)$/i.test(figure.src)"
      :src="figure.src"
      :poster="figure.poster"
      :aria-label="figure.alt"
      :width="figure.width"
      :height="figure.height"
      autoplay
      loop
      muted
      playsinline
      preload="metadata"
    />
    <img
      v-else
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

  img,
  video,
  .placeholder {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    border: 1px solid #D1D1D1;
  }

  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: #8A8A8A;
    background-color: #F2F2F2;
    border-style: dashed;
  }

  .elevated img,
  .elevated video {
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
