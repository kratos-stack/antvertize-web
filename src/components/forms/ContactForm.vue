<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import GlassCard from '@/components/surfaces/GlassCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import { siteConfig } from '@/content/site.config'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const state = ref<FormState>('idle')
const errors = reactive<Record<string, string>>({})

const form = reactive({
  name: '',
  email: '',
  business: '',
  spend: '',
  message: '',
  consent: false,
  _honeypot: '',
})

const mailtoHref = computed(() => {
  const subject = `Free Audit Request — ${form.business || form.name || 'New enquiry'}`
  const lines = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.business ? `Business: ${form.business}` : '',
    form.spend ? `Monthly Ad Spend: ${form.spend}` : '',
    '',
    'Message:',
    form.message,
  ].filter(Boolean)
  const body = lines.join('\n')
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

function validate() {
  const e: Record<string, string> = {}
  if (!form.name.trim()) e.name = 'Name is required.'
  if (!form.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.'
  if (!form.business.trim()) e.business = 'Business name is required.'
  if (!form.message.trim()) e.message = 'Message is required.'
  if (!form.consent) e.consent = 'Please agree to proceed.'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

async function submit() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!validate()) return
  if (form._honeypot) return

  state.value = 'loading'
  try {
    window.location.href = mailtoHref.value
    await new Promise(r => setTimeout(r, 600))
    state.value = 'success'
  } catch {
    state.value = 'error'
  }
}

function reset() {
  form.name = ''
  form.email = ''
  form.business = ''
  form.spend = ''
  form.message = ''
  form.consent = false
  state.value = 'idle'
}
</script>

<template>
  <GlassCard class="contact-form">
    <div v-if="state === 'success'" class="form-success">
      <div class="success-icon" aria-hidden="true">✓</div>
      <h3>Your draft email is ready.</h3>
      <p>
        We have opened a pre-filled email for you in your default mail client. Send it as-is and our team will be in touch.
      </p>
      <p class="success-fallback">
        Email client did not open?
        <a :href="mailtoHref">Send it manually here</a>
        or write to <a :href="`mailto:${siteConfig.email}`">{{ siteConfig.email }}</a>.
      </p>
      <button type="button" class="reset-btn" @click="reset">Send another enquiry</button>
    </div>

    <form v-else @submit.prevent="submit" novalidate aria-label="Free audit request form">
      <input v-model="form._honeypot" type="text" name="_hp" tabindex="-1" aria-hidden="true" class="honeypot" autocomplete="off" />

      <div class="form-grid">
        <div class="field">
          <label for="name">Name <span aria-hidden="true">*</span></label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            placeholder="Jane Smith"
            :class="{ error: errors.name }"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'name-err' : undefined"
          />
          <span v-if="errors.name" id="name-err" class="field-error" role="alert">{{ errors.name }}</span>
        </div>

        <div class="field">
          <label for="email">Email <span aria-hidden="true">*</span></label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="jane@business.com"
            :class="{ error: errors.email }"
            :aria-invalid="!!errors.email"
            :aria-describedby="errors.email ? 'email-err' : undefined"
          />
          <span v-if="errors.email" id="email-err" class="field-error" role="alert">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label for="business">Business Name <span aria-hidden="true">*</span></label>
          <input
            id="business"
            v-model="form.business"
            type="text"
            autocomplete="organization"
            placeholder="Acme Inc."
            :class="{ error: errors.business }"
            :aria-invalid="!!errors.business"
            :aria-describedby="errors.business ? 'business-err' : undefined"
          />
          <span v-if="errors.business" id="business-err" class="field-error" role="alert">{{ errors.business }}</span>
        </div>

        <div class="field">
          <label for="spend">Monthly Ad Spend</label>
          <input
            id="spend"
            v-model="form.spend"
            type="text"
            autocomplete="off"
            placeholder="e.g. your current monthly budget"
          />
        </div>

        <div class="field full-width">
          <label for="message">Message <span aria-hidden="true">*</span></label>
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            placeholder="Tell us about your goals, current campaigns, and what you'd like us to look at..."
            :class="{ error: errors.message }"
            :aria-invalid="!!errors.message"
            :aria-describedby="errors.message ? 'msg-err' : undefined"
          />
          <span v-if="errors.message" id="msg-err" class="field-error" role="alert">{{ errors.message }}</span>
        </div>

        <div class="field full-width consent-field">
          <label class="consent-label">
            <input type="checkbox" v-model="form.consent" :aria-invalid="!!errors.consent" />
            <span>I agree to be contacted by Antvertize regarding my enquiry.</span>
          </label>
          <span v-if="errors.consent" class="field-error" role="alert">{{ errors.consent }}</span>
        </div>
      </div>

      <div class="form-actions">
        <AppButton
          :cta="{ label: state === 'loading' ? 'Preparing...' : 'Get My Free Audit', action: 'submit' }"
          variant="primary"
          size="lg"
          :disabled="state === 'loading'"
        />
        <p class="form-hint">
          Submitting opens a draft email to <a :href="`mailto:${siteConfig.email}`">{{ siteConfig.email }}</a> with your details prefilled.
        </p>
        <p v-if="state === 'error'" class="form-err" role="alert">Something went wrong. Please email us directly.</p>
      </div>
    </form>
  </GlassCard>
</template>

<style scoped>
.contact-form { padding: 40px 32px; }

.form-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  margin-bottom: 28px;
}

@media (min-width: 640px) {
  .form-grid { grid-template-columns: 1fr 1fr; }
}

.full-width { grid-column: 1 / -1; }

.field { display: flex; flex-direction: column; gap: 8px; }

label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-secondary);
  letter-spacing: 0.02em;
}

label span { color: #8B5CF6; }

input, select, textarea {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 13px 16px;
  font-size: 15px;
  font-family: var(--font-body);
  color: var(--color-primary);
  outline: none;
  transition: border-color var(--motion-fast) ease, box-shadow var(--motion-fast) ease;
  width: 100%;
}

input::placeholder, textarea::placeholder { color: var(--color-muted); }

input:focus, select:focus, textarea:focus {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);
}

input.error, textarea.error { border-color: rgba(239, 68, 68, 0.5); }

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
  cursor: pointer;
}

select option { background: var(--color-elevated); }

textarea { resize: vertical; min-height: 120px; }

.consent-field { gap: 10px; }

.consent-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-secondary);
  font-weight: 400;
}

.consent-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  min-width: 18px;
  margin-top: 1px;
  border-radius: 4px;
  accent-color: #8B5CF6;
  cursor: pointer;
}

.field-error {
  font-size: 12px;
  color: #f87171;
  font-weight: 500;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.form-hint {
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.6;
}

.form-hint a { color: #c4b5fd; text-decoration: underline; }

.form-err { font-size: 14px; color: #f87171; }

.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  padding-block: 40px;
}

.success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5CF6, #22D3EE);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #fff;
}

.form-success h3 {
  font-family: var(--font-heading);
  font-size: 24px;
  color: var(--color-primary);
}

.form-success p {
  font-size: 15px;
  color: var(--color-secondary);
  max-width: 420px;
  line-height: 1.65;
}

.success-fallback {
  font-size: 13px;
  color: var(--color-muted);
}

.success-fallback a { color: #c4b5fd; text-decoration: underline; }

.reset-btn {
  margin-top: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--color-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color var(--motion-fast) ease, border-color var(--motion-fast) ease;
}

.reset-btn:hover { color: var(--color-primary); border-color: rgba(139, 92, 246, 0.4); }

.honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
}
</style>
