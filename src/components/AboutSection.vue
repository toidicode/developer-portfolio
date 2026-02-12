<template>
    <section id="about" class="relative py-24">
        <div class="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-6">
            <!-- Section Header -->
            <div class="flex items-center gap-4 mb-12">
                <span class="font-mono text-neon-green text-sm">01.</span>
                <h2 class="font-display text-3xl md:text-4xl font-bold text-white">About Me</h2>
                <div class="flex-1 h-[1px] bg-gradient-to-r from-neon-cyan/30 to-transparent"></div>
            </div>

            <div class="grid md:grid-cols-2 gap-10 items-start">
                <!-- Terminal Window -->
                <div class="glass-card overflow-hidden" ref="terminalRef">
                    <!-- Terminal Header -->
                    <div class="flex items-center gap-2 px-4 py-3 bg-dark-700/50 border-b border-neon-cyan/10">
                        <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                        <span class="ml-3 font-mono text-xs text-gray-500">~/about/taivt</span>
                    </div>

                    <!-- Terminal Body -->
                    <div class="p-5 font-mono text-sm leading-relaxed">
                        <div v-for="(line, i) in visibleLines" :key="i" class="mb-1">
                            <span v-if="line.type === 'command'" class="text-neon-green">$ </span>
                            <span v-if="line.type === 'command'" class="text-white">{{ line.text }}</span>
                            <span v-else-if="line.type === 'output'" class="text-gray-400">{{ line.text }}</span>
                            <span v-else-if="line.type === 'accent'" class="text-neon-cyan">{{ line.text }}</span>
                            <span v-else-if="line.type === 'empty'">&nbsp;</span>
                        </div>
                        <span v-if="showCursor" class="text-neon-green">$ <span class="animate-pulse">█</span></span>
                    </div>
                </div>

                <!-- Info Cards -->
                <div class="space-y-4">
                    <div v-for="(card, i) in infoCards" :key="i"
                        class="glass-card p-5 transition-all duration-500 hover:translate-x-1"
                        :style="{ transitionDelay: `${i * 100}ms` }"
                        :class="cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
                        <div class="flex items-start gap-3">
                            <span class="text-2xl">{{ card.icon }}</span>
                            <div>
                                <h3 class="text-neon-cyan font-mono text-sm mb-1">{{ card.title }}</h3>
                                <p class="text-gray-400 text-sm leading-relaxed">{{ card.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const terminalRef = ref(null)
const showCursor = ref(false)
const cardsVisible = ref(false)
const visibleLines = ref([])

const terminalLines = [
    { type: 'command', text: 'cat about.txt' },
    { type: 'empty' },
    { type: 'accent', text: '╔══════════════════════════════════╗' },
    { type: 'accent', text: '║       DEVELOPER PROFILE          ║' },
    { type: 'accent', text: '╚══════════════════════════════════╝' },
    { type: 'empty' },
    { type: 'output', text: 'Hi there! I am a Full-Stack' },
    { type: 'output', text: 'Developer passionate about tech' },
    { type: 'output', text: 'and crafting unique web experiences.' },
    { type: 'empty' },
    { type: 'command', text: 'echo $EXPERIENCE' },
    { type: 'output', text: '3+ years in web development' },
    { type: 'empty' },
    { type: 'command', text: 'echo $PASSION' },
    { type: 'output', text: 'Building immersive 3D experiences' },
    { type: 'output', text: 'with Three.js & WebGL' },
]

const infoCards = [
    {
        icon: '🚀',
        title: 'mission.current',
        description: 'Building modern web products, optimizing performance and user experience.'
    },
    {
        icon: '💻',
        title: 'stack.primary',
        description: 'Vue.js, React, TypeScript, Node.js, Python, Three.js, Docker, PostgreSQL'
    },
    {
        icon: '🎯',
        title: 'focus.areas',
        description: 'Frontend Architecture, 3D Web Graphics, API Design, DevOps, System Design'
    },
    {
        icon: '🌏',
        title: 'location.base',
        description: 'Vietnam 🇻🇳 — Available for remote work globally'
    },
    {
        icon: '⚡',
        title: 'interests.current',
        description: 'WebGL shaders, generative art, edge computing, Rust, and open-source tooling'
    },
]

let lineTimeout = null
let observer = null

function animateTerminal() {
    let i = 0
    function showNext() {
        if (i < terminalLines.length) {
            visibleLines.value.push(terminalLines[i])
            i++
            const delay = terminalLines[i - 1].type === 'command' ? 400 : 80
            lineTimeout = setTimeout(showNext, delay)
        } else {
            showCursor.value = true
        }
    }
    showNext()
}

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTerminal()
                    cardsVisible.value = true
                    observer.disconnect()
                }
            })
        },
        { threshold: 0.3 }
    )

    if (terminalRef.value) {
        observer.observe(terminalRef.value)
    }
})

onBeforeUnmount(() => {
    if (lineTimeout) clearTimeout(lineTimeout)
    if (observer) observer.disconnect()
})
</script>
