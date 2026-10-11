<template>
  <!-- Native modal dialog: focus trap, Escape and focus return come for free -->
  <dialog
    ref="dialog"
    class="unlock-dialog"
    aria-labelledby="unlock-dialog-title"
    aria-describedby="unlock-dialog-subtitle"
    @cancel.prevent="close"
    @close="onClosed"
    @click="onBackdropClick"
  >
    <form class="unlock-form" novalidate @submit.prevent="submit">
      <div class="unlock-copy">
        <h2 id="unlock-dialog-title" class="unlock-title">Unlock all private work</h2>
        <p id="unlock-dialog-subtitle" class="unlock-subtitle">Enter the password to unlock all private projects.</p>
      </div>

      <AppInput
        ref="input"
        v-model="password"
        type="password"
        title="Password"
        placeholder="*******"
        hint="Find the password on my resume, next to the QR code."
        :error="error"
        autocomplete="current-password"
      />

      <div class="unlock-actions">
        <button type="button" class="btn secondary" @click="close">Cancel</button>
        <button type="submit" class="btn primary">Unlock</button>
      </div>
    </form>
  </dialog>
</template>

<script>
import AppInput from './Input.vue'
import { unlockPrivateWork } from '../data/privateAccess.js'

export default {
  name: 'UnlockDialog',
  components: { AppInput },
  emits: ['unlocked'],
  data() {
    return {
      password: '',
      error: '',
    }
  },
  watch: {
    password() {
      this.error = ''
    },
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    open() {
      this.password = ''
      this.error = ''
      document.body.style.overflow = 'hidden'
      this.$refs.dialog.showModal()
      this.$refs.input.focus()
    },
    close() {
      this.$refs.dialog.close()
    },
    onClosed() {
      document.body.style.overflow = ''
      this.password = ''
      this.error = ''
    },
    // The form fills the dialog, so a click landing on the dialog itself is on the backdrop
    onBackdropClick(event) {
      if (event.target === this.$refs.dialog) this.close()
    },
    submit() {
      if (unlockPrivateWork(this.password)) {
        this.close()
        this.$emit('unlocked')
        return
      }
      this.error = 'Incorrect password. Please try again.'
      this.$refs.input.focus()
    },
  },
}
</script>

<style scoped>
  .unlock-dialog {
    width: calc(100% - 32px);
    max-width: 440px;
    margin: auto;
    padding: 0;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--primary-brand-lowest);
    color: var(--primary-brand-highest);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
  }

  .unlock-dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .unlock-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }

  .unlock-copy {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .unlock-title {
    font-family: 'Eklektyk';
    font-size: 2rem;
    font-weight: 300;
    line-height: 100%;
  }

  .unlock-subtitle {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 140%;
  }

  .unlock-actions {
    display: flex;
    flex-wrap: wrap; /* safety net on very narrow phones */
    justify-content: flex-end;
    gap: 1rem;
  }

  .btn {
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
  }

  /* Same explicit colours as ProjectInfo: blend modes don't work in the top layer */
  .btn.primary,
  .btn.secondary {
    mix-blend-mode: normal;
    border: 1px solid var(--primary-brand-highest);
  }

  .btn.primary {
    background-color: var(--primary-brand-highest);
    color: var(--primary-brand-lowest);
  }

  .btn.secondary {
    background-color: #FAFAFA;
    color: var(--primary-brand-highest);
  }
</style>
