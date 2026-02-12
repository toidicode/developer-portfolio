<template>
    <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        :class="scrolled ? 'bg-dark-900/80 backdrop-blur-md shadow-lg shadow-neon-cyan/5' : ''">
        <div class="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
            <!-- Logo -->
            <a href="#hero" @click.prevent="scrollTo('hero')"
                class="font-mono text-neon-cyan font-bold text-lg tracking-wider hover:text-white transition-colors">
                <span class="text-neon-green">&lt;</span>taivt<span class="text-neon-green"> /&gt;</span>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-1">
                <a v-for="(item, i) in menuItems" :key="item.id" :href="'#' + item.id"
                    @click.prevent="scrollTo(item.id)"
                    class="relative px-4 py-2 font-mono text-sm transition-all duration-300 group"
                    :class="activeSection === item.id ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'">
                    <span class="text-neon-green/60 mr-1">0{{ i + 1 }}.</span>
                    {{ item.label }}
                    <span
                        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-neon-cyan transition-all duration-300"
                        :class="activeSection === item.id ? 'w-full' : 'group-hover:w-1/2'"></span>
                </a>
            </div>

            <!-- Mobile Menu Toggle -->
            <button @click="mobileOpen = !mobileOpen" class="md:hidden text-neon-cyan p-2">
                <div class="w-6 space-y-1.5 transition-all">
                    <span class="block w-full h-0.5 bg-neon-cyan transition-all"
                        :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"></span>
                    <span class="block w-full h-0.5 bg-neon-cyan transition-all"
                        :class="mobileOpen ? 'opacity-0' : ''"></span>
                    <span class="block w-full h-0.5 bg-neon-cyan transition-all"
                        :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''"></span>
                </div>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileOpen" class="md:hidden bg-dark-900/95 backdrop-blur-md border-t border-neon-cyan/10">
            <a v-for="(item, i) in menuItems" :key="item.id" :href="'#' + item.id"
                @click.prevent="scrollTo(item.id); mobileOpen = false"
                class="block px-6 py-3 font-mono text-sm transition-colors"
                :class="activeSection === item.id ? 'text-neon-cyan bg-neon-cyan/5' : 'text-gray-400 hover:text-white'">
                <span class="text-neon-green/60 mr-2">0{{ i + 1 }}.</span>{{ item.label }}
            </a>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('hero')

const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
]

function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function handleScroll() {
    scrolled.value = window.scrollY > 50

    // Determine active section
    const sections = ['hero', ...menuItems.map(i => i.id)]
    for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 200) {
            activeSection.value = sections[i]
            break
        }
    }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>
