<template>
    <section id="projects" class="relative py-24">
        <div class="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-6">
            <!-- Section Header -->
            <div class="flex items-center gap-4 mb-4">
                <span class="font-mono text-neon-green text-sm">03.</span>
                <h2 class="font-display text-3xl md:text-4xl font-bold text-white">Projects</h2>
                <div class="flex-1 h-[1px] bg-gradient-to-r from-neon-cyan/30 to-transparent"></div>
            </div>
            <p class="font-mono text-sm text-gray-500 mb-12">&gt; ls -la ~/projects/featured</p>

            <!-- Projects Grid -->
            <div class="grid md:grid-cols-2 gap-8">
                <div v-for="(project, i) in projects" :key="i" class="group relative perspective-1000"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
                    :style="{ transitionDelay: `${i * 150}ms`, transition: 'all 0.6s ease' }">

                    <div class="glass-card overflow-hidden transition-all duration-500 
                      group-hover:border-neon-cyan/50 group-hover:shadow-lg group-hover:shadow-neon-cyan/10
                      group-hover:-translate-y-2"
                        :style="{ transform: `rotateY(${getRotation(i).y}deg) rotateX(${getRotation(i).x}deg)` }">

                        <!-- Project Image / Gradient Placeholder -->
                        <div class="relative h-48 overflow-hidden" :style="{ background: project.gradient }">
                            <!-- Wireframe overlay -->
                            <div class="absolute inset-0 opacity-20" style="background-image: 
                     linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px);
                     background-size: 30px 30px;">
                            </div>

                            <!-- Tech badges floating -->
                            <div class="absolute bottom-3 left-3 flex flex-wrap gap-2">
                                <span v-for="tech in project.tech" :key="tech" class="px-2 py-1 text-xs font-mono bg-dark-900/80 backdrop-blur text-neon-cyan 
                             border border-neon-cyan/20 rounded">
                                    {{ tech }}
                                </span>
                            </div>

                            <!-- Status indicator -->
                            <div class="absolute top-3 right-3 flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full animate-pulse"
                                    :class="project.status === 'live' ? 'bg-neon-green' : 'bg-yellow-500'"></span>
                                <span class="font-mono text-xs text-white/80">{{ project.status }}</span>
                            </div>
                        </div>

                        <!-- Project Info -->
                        <div class="p-6">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="font-mono text-neon-green text-xs">~/</span>
                                <h3
                                    class="text-white font-semibold text-lg group-hover:text-neon-cyan transition-colors">
                                    {{ project.name }}
                                </h3>
                            </div>

                            <p class="text-gray-400 text-sm leading-relaxed mb-4">
                                {{ project.description }}
                            </p>

                            <!-- Links -->
                            <div class="flex items-center gap-4">
                                <a v-if="project.github" :href="project.github" target="_blank"
                                    class="font-mono text-xs text-gray-400 hover:text-neon-cyan transition-colors flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    source
                                </a>
                                <a v-if="project.live" :href="project.live" target="_blank"
                                    class="font-mono text-xs text-gray-400 hover:text-neon-green transition-colors flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    demo
                                </a>
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
import { useMouse } from '@vueuse/core'

const { x: mouseX, y: mouseY } = useMouse()
const visible = ref(false)
let observer = null

const projects = [
    {
        name: 'Interactive 3D Portfolio',
        description: 'Personal portfolio with Three.js, particle systems and wireframe geometries for an immersive experience.',
        tech: ['Vue 3', 'Three.js', 'GSAP'],
        gradient: 'linear-gradient(135deg, #0a0a2e 0%, #001a33 50%, #003355 100%)',
        status: 'live',
        github: '#',
        live: '#',
    },
    {
        name: 'Real-time Dashboard',
        description: 'Real-time metrics monitoring dashboard with WebSocket, dynamic charts and dark theme UI.',
        tech: ['React', 'Node.js', 'WebSocket', 'D3.js'],
        gradient: 'linear-gradient(135deg, #0a1a0a 0%, #002200 50%, #003300 100%)',
        status: 'live',
        github: '#',
        live: '#',
    },
    {
        name: 'AI Chat Application',
        description: 'Chat application with AI integration, streaming responses and context-aware conversations.',
        tech: ['Next.js', 'Python', 'OpenAI', 'PostgreSQL'],
        gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2a0044 50%, #440066 100%)',
        status: 'dev',
        github: '#',
    },
    {
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce platform with payment integration, CMS and analytics.',
        tech: ['Nuxt', 'Stripe', 'MongoDB', 'Docker'],
        gradient: 'linear-gradient(135deg, #2e0a0a 0%, #330011 50%, #550022 100%)',
        status: 'live',
        github: '#',
        live: '#',
    },
]

function getRotation(index) {
    // Subtle 3D tilt based on mouse position
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    return {
        y: ((mouseX.value - centerX) / centerX) * 3,
        x: ((mouseY.value - centerY) / centerY) * -2,
    }
}

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visible.value = true
                    observer.disconnect()
                }
            })
        },
        { threshold: 0.1 }
    )

    const section = document.getElementById('projects')
    if (section) observer.observe(section)
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})
</script>
