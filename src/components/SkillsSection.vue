<template>
    <section id="skills" class="relative py-24">
        <div class="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-6">
            <!-- Section Header -->
            <div class="flex items-center gap-4 mb-4">
                <span class="font-mono text-neon-green text-sm">02.</span>
                <h2 class="font-display text-3xl md:text-4xl font-bold text-white">Skills & Tech</h2>
                <div class="flex-1 h-[1px] bg-gradient-to-r from-neon-cyan/30 to-transparent"></div>
            </div>
            <p class="font-mono text-sm text-gray-500 mb-12">&gt; rendering skills_orbit_3d...</p>

            <!-- Three.js Skills Orbit -->
            <div class="mb-16">
                <SkillsOrbit :skills="allSkillNames" />
            </div>

            <!-- Skill Categories Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="(category, i) in skillCategories" :key="i"
                    class="glass-card p-6 group hover:border-neon-cyan/40 transition-all duration-500"
                    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                    :style="{ transitionDelay: `${i * 100}ms` }">

                    <div class="flex items-center gap-3 mb-4">
                        <span class="text-xl">{{ category.icon }}</span>
                        <h3 class="font-mono text-neon-cyan text-sm">{{ category.title }}</h3>
                    </div>

                    <div class="space-y-3">
                        <div v-for="skill in category.skills" :key="skill.name">
                            <div class="flex justify-between mb-1">
                                <span class="font-mono text-xs text-gray-300">{{ skill.name }}</span>
                                <span class="font-mono text-xs text-neon-green/60">{{ skill.level }}%</span>
                            </div>
                            <div class="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-1000 ease-out" :style="{
                                    width: visible ? `${skill.level}%` : '0%',
                                    background: `linear-gradient(90deg, ${category.color}, ${category.colorEnd})`,
                                    boxShadow: `0 0 8px ${category.color}40`,
                                    transitionDelay: `${i * 100 + 300}ms`
                                }">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import SkillsOrbit from './three/SkillsOrbit.vue'

const visible = ref(false)
let observer = null

const skillCategories = [
    {
        icon: '⚡',
        title: 'frontend.stack',
        color: '#00f5ff',
        colorEnd: '#0088ff',
        skills: [
            { name: 'Vue.js / Nuxt', level: 92 },
            { name: 'React / Next.js', level: 85 },
            { name: 'TypeScript', level: 88 },
            { name: 'Three.js / WebGL', level: 80 },
        ]
    },
    {
        icon: '🔧',
        title: 'backend.stack',
        color: '#39ff14',
        colorEnd: '#00cc44',
        skills: [
            { name: 'Node.js / Express', level: 88 },
            { name: 'Python / FastAPI', level: 82 },
            { name: 'PostgreSQL / MongoDB', level: 85 },
            { name: 'GraphQL / REST', level: 87 },
        ]
    },
    {
        icon: '☁️',
        title: 'devops.tools',
        color: '#bf00ff',
        colorEnd: '#8800cc',
        skills: [
            { name: 'Docker / K8s', level: 78 },
            { name: 'AWS / GCP', level: 75 },
            { name: 'CI/CD Pipelines', level: 82 },
            { name: 'Linux / Shell', level: 85 },
        ]
    },
]

const allSkillNames = computed(() => {
    const names = []
    skillCategories.forEach(cat => {
        cat.skills.forEach(s => names.push(s.name.split(' / ')[0]))
    })
    return names
})

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
        { threshold: 0.15 }
    )

    const section = document.getElementById('skills')
    if (section) observer.observe(section)
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})
</script>
