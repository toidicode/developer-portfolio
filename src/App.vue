<template>
  <div class="scanline">
    <!-- Particle Field Background -->
    <ParticleField />

    <!-- Navigation -->
    <NavBar />

    <!-- Main Content -->
    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>
</template>

<script setup>
import ParticleField from './components/three/ParticleField.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<style scoped></style>
