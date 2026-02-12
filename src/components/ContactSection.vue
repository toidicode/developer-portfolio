<template>
    <section id="contact" class="relative py-24">
        <div class="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-6">
            <!-- Section Header -->
            <div class="flex items-center gap-4 mb-4">
                <span class="font-mono text-neon-green text-sm">04.</span>
                <h2 class="font-display text-3xl md:text-4xl font-bold text-white">Contact</h2>
                <div class="flex-1 h-[1px] bg-gradient-to-r from-neon-cyan/30 to-transparent"></div>
            </div>
            <p class="font-mono text-sm text-gray-500 mb-12">&gt; ping taivt --establish-connection</p>

            <div class="grid md:grid-cols-2 gap-10 items-center">
                <!-- Three.js Globe -->
                <ContactGlobe />

                <!-- Contact Info -->
                <div class="space-y-6">
                    <div class="glass-card p-6">
                        <p class="text-gray-300 leading-relaxed mb-6">
                            I'm always open to new opportunities and exciting projects.
                            Feel free to reach out if you'd like to collaborate or just say hello!
                        </p>

                        <!-- Contact Links -->
                        <div class="space-y-4">
                            <a v-for="(link, i) in contactLinks" :key="i" :href="link.url" target="_blank"
                                rel="noopener" class="flex items-center gap-4 p-3 rounded-lg 
                        border border-transparent hover:border-neon-cyan/20 
                        hover:bg-neon-cyan/5 transition-all duration-300 group">
                                <div class="w-10 h-10 flex items-center justify-center rounded-lg 
                            border border-neon-cyan/20 text-neon-cyan
                            group-hover:border-neon-cyan/50 group-hover:shadow-lg group-hover:shadow-neon-cyan/10
                            transition-all duration-300" v-html="link.icon">
                                </div>
                                <div>
                                    <div class="font-mono text-xs text-gray-500">{{ link.label }}</div>
                                    <div class="text-sm text-gray-300 group-hover:text-neon-cyan transition-colors">
                                        {{ link.value }}
                                    </div>
                                </div>
                                <svg class="w-4 h-4 ml-auto text-gray-600 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Quick Terminal -->
                    <div class="glass-card overflow-hidden">
                        <div class="flex items-center gap-2 px-4 py-2 bg-dark-700/50 border-b border-neon-cyan/10">
                            <div class="w-2 h-2 rounded-full bg-neon-green"></div>
                            <span class="font-mono text-xs text-gray-500">terminal</span>
                        </div>
                        <div class="p-4 font-mono text-xs">
                            <p class="text-neon-green">$ echo "Let's build something amazing"</p>
                            <p class="text-gray-400 mt-1">Let's build something amazing</p>
                            <p class="text-neon-green mt-2">$ <span class="animate-pulse">█</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-24 pt-8 border-t border-dark-600 text-center">
            <p class="font-mono text-xs text-gray-600">
                <span class="text-neon-green">&lt;</span>
                Designed & Built by <span class="text-neon-cyan">taivt</span>
                <span class="text-neon-green"> /&gt;</span>
            </p>
            <p class="font-mono text-xs text-gray-700 mt-2">
                Made with Vue 3 + Three.js + TailwindCSS
            </p>
        </div>
    </section>
</template>

<script setup>
import ContactGlobe from './three/ContactGlobe.vue'

const contactLinks = [
    {
        label: 'email',
        value: 'hello@taivt.dev',
        url: 'mailto:hello@taivt.dev',
        icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    },
    {
        label: 'github',
        value: 'github.com/taivt',
        url: 'https://github.com/taivt',
        icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    },
    {
        label: 'linkedin',
        value: 'linkedin.com/in/taivt',
        url: 'https://linkedin.com/in/taivt',
        icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    },
]
</script>
