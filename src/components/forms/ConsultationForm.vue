<script setup lang="ts">
import { ref, reactive } from 'vue'
import GlassCard from '@/components/surfaces/GlassCard.vue'
import AppButton from '@/components/common/AppButton.vue'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const state = ref<FormState>('idle')
const errors = reactive<Record<string, string>>({})

const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  budget: '',
  message: '',
  consent: false,
  _honeypot: '',
})

const serviceOptions = [
  'Brand Strategy & Identity',
  'Website Design & Development',
  'Digital Marketing & SEO',
  'Paid Media (PPC / Social Ads)',
  'Full-Stack Digital Package',
  'Other',
]

const budgetOptions = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
]

function validate() {
  const e: Record<string, string> = {}
  if (!form.name.trim()) e.name = 'Name is required.'
  if (!form.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.'
  if (!form.message.trim()) e.message = 'Message is required.'
  if (!form.consent) e.consent = 'Please agree to proceed.'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

async function submit() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!validate()) return
  if (form._honeypot) return // spam honeypot

  state.value = 'loading'
  try {
    await new Promise(r => setTimeout(r, 1200)) // Simulate API call
    state.value = 'success'
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <GlassCard class="consultation-form">
    <!-- Success state -->
    <div v-if="state === 'success'" class="form-success">
      <div class="success-icon" aria-hidden="true">✓</div>
      <h3>Message Sent!</h3>
      <p>Thank you for reaching out. Our team will be in touch within one business day.</p>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="submit" novalidate aria-label="Consultation request form">
      <!-- Honeypot (hidden from users) -->
      <input v-model="form._honeypot" type="text" name="_hp" tabindex="-1" aria-hidden="true" class="honeypot" autocomplete="off" />

      <div class="form-grid">
        <div class="field">
          <label for="name">Full Name <span aria-hidden="true">*</span></label>
          <input id="name" v-model="form.name" type="text" autocomplete="name" placeholder="Jane Smith" :class="{ error: errors.name }" :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'name-err' : undefined" />
          <span v-if="errors.name" id="name-err" class="field-error" role="alert">{{ errors.name }}</span>
        </div>

        <div class="field">
          <label for="email">Email Address <span aria-hidden="true">*</span></label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" placeholder="jane@company.com" :class="{ error: errors.email }" :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'email-err' : undefined" />
          <span v-if="errors.email" id="email-err" class="field-error" role="alert">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label for="company">Company</label>
          <input id="company" v-model="form.company" type="text" autocomplete="organization" placeholder="Acme Inc." />
        </div>

        <div class="field">
          <label for="phone">Phone (optional)</label>
          <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="+1 555 000 0000" />
        </div>

        <div class="field">
          <label for="service">Service Interest</label>
          <select id="service" v-model="form.service">
            <option value="">Select a service...</option>
            <option v-for="opt in serviceOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>

        <div class="field">
          <label for="budget">Budget Range (optional)</label>
          <select id="budget" v-model="form.budget">
            <option value="">Select a range...</option>
            <option v-for="opt in budgetOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>

        <div class="field full-width">
          <label for="message">Your Message <span aria-hidden="true">*</span></label>
          <textarea id="message" v-model="form.message" rows="5" placeholder="Tell us about your project, goals, and timeline..." :class="{ error: errors.message }" :aria-invalid="!!errors.message" :aria-describedby="errors.message ? 'msg-err' : undefined" />
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
          :cta="{ label: state === 'loading' ? 'Sending...' : 'Send Message', action: 'submit' }"
          variant="primary"
          size="lg"
          :disabled="state === 'loading'"
        />
        <p v-if="state === 'error'" class="form-err" role="alert">Something went wrong. Please try again.</p>
      </div>
    </form>
  </GlassCard>
</template>

<style scoped>
.consultation-form { padding: 40px 32px; }

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

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

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

input::placeholder, textarea::placeholder {
  color: var(--color-muted);
}

input:focus, select:focus, textarea:focus {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);
}

input.error, textarea.error {
  border-color: rgba(239, 68, 68, 0.5);
}

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

.form-err {
  font-size: 14px;
  color: #f87171;
}

/* Success state */
.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
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
  font-size: 24px;
  color: var(--color-primary);
}

.form-success p {
  font-size: 16px;
  color: var(--color-secondary);
  max-width: 360px;
}

.honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
}
</style>
