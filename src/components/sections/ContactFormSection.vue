<script setup lang="ts">
import Container from '@/components/common/Container.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'
import ContactForm from '@/components/forms/ContactForm.vue'
</script>

<template>
  <section class="contact-form-section" id="contact-form">
    <Container>
      <RevealOnScroll direction="up" :duration="700">
        <div class="form-wrap">
          <ContactForm />
        </div>
      </RevealOnScroll>
    </Container>
  </section>
</template>

<style scoped>
.contact-form-section {
  padding-block: 56px 96px;
}

@media (min-width: 1024px) {
  .contact-form-section { padding-block: 64px 140px; }
}

.form-wrap {
  max-width: 760px;
  margin-inline: auto;
}
</style>
