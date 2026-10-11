<template>
  <div class="field" :class="{ 'is-error': Boolean(error) }">
    <label v-if="title" class="field-title" :for="inputId">{{ title }}</label>
    <input
      :id="inputId"
      ref="input"
      class="field-input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="error ? 'true' : null"
      :aria-describedby="error || hint ? messageId : null"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <p v-if="error" :id="messageId" class="field-message is-error" role="alert">{{ error }}</p>
    <p v-else-if="hint" :id="messageId" class="field-message">{{ hint }}</p>
  </div>
</template>

<script>
let inputId = 0

export default {
  name: 'AppInput',
  props: {
    modelValue: { type: String, default: '' },
    title: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    hint: { type: String, default: '' },
    error: { type: String, default: '' },
    type: { type: String, default: 'text' },
    autocomplete: { type: String, default: 'off' },
  },
  emits: ['update:modelValue'],
  data() {
    inputId += 1
    return {
      inputId: `app-input-${inputId}`,
      messageId: `app-input-${inputId}-message`,
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.field-title {
  color: #8A8A8A;
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
}

.field-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #D1D1D1;
  border-radius: 0.5rem;
  background-color: #FAFAFA;
  color: var(--primary-brand-highest);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.field-input::placeholder {
  color: #B3B3B3;
  letter-spacing: 0.1em;
}

.field-input:hover {
  border-color: #8A8A8A;
}

.field-input:focus {
  border-color: var(--primary-brand-highest);
  box-shadow: 0 0 0 1px var(--primary-brand-highest);
}

.field.is-error .field-input,
.field.is-error .field-input:hover,
.field.is-error .field-input:focus {
  border-color: #C62828;
  box-shadow: 0 0 0 1px #C62828;
}

.field-message {
  color: #8A8A8A;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 140%;
}

.field-message.is-error {
  color: #C62828;
}
</style>
