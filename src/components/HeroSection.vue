<template>
    <section id="hero" class="relative h-screen flex items-center justify-center overflow-hidden">
        <!-- Three.js Background -->
        <HeroScene />

        <!-- Content Overlay -->
        <div class="relative z-10 text-center max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-6">
            <!-- Terminal-style greeting -->
            <div class="inline-block mb-6 glass-card px-4 py-2">
                <span class="font-mono text-sm text-neon-green">
                    {{ displayedGreeting }}<span v-if="greetingTyping" class="animate-pulse">█</span>
                </span>
            </div>

            <!-- Name -->
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
                <span class="text-white">Tai </span>
                <span class="text-neon-cyan neon-text">VT</span>
            </h1>

            <!-- Title with typing effect -->
            <div class="h-8 mb-8">
                <p class="font-mono text-lg md:text-xl text-gray-300">
                    {{ displayedTitle }}<span class="text-neon-cyan animate-pulse">|</span>
                </p>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a href="#projects" @click.prevent="scrollTo('projects')" class="group relative px-8 py-3 font-mono text-sm border border-neon-cyan text-neon-cyan 
                  hover:bg-neon-cyan/10 transition-all duration-300 rounded overflow-hidden">
                    <span class="relative z-10">&gt; view_projects()</span>
                    <div
                        class="absolute inset-0 bg-neon-cyan/5 translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                    </div>
                </a>
                <a href="#contact" @click.prevent="scrollTo('contact')" class="group relative px-8 py-3 font-mono text-sm border border-neon-green/50 text-neon-green 
                  hover:bg-neon-green/10 transition-all duration-300 rounded overflow-hidden">
                    <span class="relative z-10">&gt; contact_me()</span>
                    <div
                        class="absolute inset-0 bg-neon-green/5 translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                    </div>
                </a>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
            <span class="font-mono text-xs text-gray-500">scroll</span>
            <div class="w-5 h-8 border border-gray-500/50 rounded-full flex justify-center pt-1">
                <div class="w-1 h-2 bg-neon-cyan rounded-full animate-bounce"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import HeroScene from './three/HeroScene.vue'

const greeting = '> hello_world() // Welcome to my portfolio'
const titles = [
    'Full-Stack Developer',
    'Frontend Engineer',
    'Three.js Enthusiast',
    'Open Source Contributor',
]

const displayedGreeting = ref('')
const displayedTitle = ref('')
const greetingTyping = ref(true)

let titleIndex = 0
let charIndex = 0
let isDeleting = false
let timeoutId = null

function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function typeGreeting() {
    let i = 0
    const interval = setInterval(() => {
        if (i < greeting.length) {
            displayedGreeting.value = greeting.substring(0, i + 1)
            i++
        } else {
            clearInterval(interval)
            greetingTyping.value = false
            typeTitle()
        }
    }, 40)
}

function typeTitle() {
    const currentTitle = titles[titleIndex]

    if (!isDeleting) {
        displayedTitle.value = currentTitle.substring(0, charIndex + 1)
        charIndex++

        if (charIndex === currentTitle.length) {
            isDeleting = true
            timeoutId = setTimeout(typeTitle, 2000)
            return
        }
    } else {
        displayedTitle.value = currentTitle.substring(0, charIndex - 1)
        charIndex--

        if (charIndex === 0) {
            isDeleting = false
            titleIndex = (titleIndex + 1) % titles.length
        }
    }

    const speed = isDeleting ? 30 : 80
    timeoutId = setTimeout(typeTitle, speed)
}

onMounted(() => {
    setTimeout(typeGreeting, 500)
})

onBeforeUnmount(() => {
    if (timeoutId) clearTimeout(timeoutId)
})
</script>
