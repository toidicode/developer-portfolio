<template>
    <div ref="containerRef" class="w-full h-[500px] relative">
        <canvas ref="canvasRef" class="w-full h-full"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)
const containerRef = ref(null)

const props = defineProps({
    skills: {
        type: Array,
        default: () => [
            'Vue.js', 'React', 'TypeScript', 'Node.js',
            'Python', 'Three.js', 'Docker', 'PostgreSQL',
            'GraphQL', 'AWS', 'Git', 'Linux'
        ]
    }
})

let scene, camera, renderer, animationId
let centralSphere, skillSprites = [], orbitPaths = []

onMounted(() => {
    initScene()
    animate()
    window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', onResize)
    if (renderer) renderer.dispose()
})

function createTextSprite(text, color = '#00f5ff') {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 64
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, 256, 64)

    ctx.font = 'bold 28px JetBrains Mono, monospace'
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Glow effect
    ctx.shadowColor = color
    ctx.shadowBlur = 15
    ctx.fillText(text, 128, 32)
    ctx.shadowBlur = 5
    ctx.fillText(text, 128, 32)

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    })

    const sprite = new THREE.Sprite(material)
    sprite.scale.set(2, 0.5, 1)
    return sprite
}

function initScene() {
    const container = containerRef.value
    const w = container.clientWidth
    const h = container.clientHeight

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
    camera.position.z = 10

    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        alpha: true,
        antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)

    // Central wireframe sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 2)
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
    })
    centralSphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(centralSphere)

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(0.4, 16, 16)
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.15,
    })
    scene.add(new THREE.Mesh(coreGeo, coreMat))

    // Create orbit rings
    const colors = ['#00f5ff', '#39ff14', '#bf00ff', '#ff006e']
    const orbitRadii = [3.0, 4.0, 5.0, 6.0]

    props.skills.forEach((skill, i) => {
        const orbitIndex = i % orbitRadii.length
        const radius = orbitRadii[orbitIndex]
        const color = colors[orbitIndex]

        // Create orbit path (ring)
        if (i < orbitRadii.length) {
            const ringGeo = new THREE.TorusGeometry(radius, 0.005, 8, 100)
            const ringMat = new THREE.MeshBasicMaterial({
                color: new THREE.Color(color),
                transparent: true,
                opacity: 0.1,
            })
            const ring = new THREE.Mesh(ringGeo, ringMat)
            ring.rotation.x = Math.PI / 2 + (orbitIndex * 0.3 - 0.45)
            scene.add(ring)
            orbitPaths.push(ring)
        }

        // Create skill sprite
        const sprite = createTextSprite(skill, color)

        // Initial position on orbit
        const angle = (i / props.skills.length) * Math.PI * 2
        sprite.userData = {
            radius,
            angle,
            speed: 0.2 + orbitIndex * 0.08,
            orbitTilt: orbitIndex * 0.3 - 0.45,
            yOffset: (Math.random() - 0.5) * 0.5,
        }

        sprite.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.3 + sprite.userData.yOffset,
            Math.sin(angle) * radius
        )

        scene.add(sprite)
        skillSprites.push(sprite)
    })
}

function animate() {
    animationId = requestAnimationFrame(animate)
    const time = performance.now() * 0.001

    if (centralSphere) {
        centralSphere.rotation.x = time * 0.2
        centralSphere.rotation.y = time * 0.3
    }

    skillSprites.forEach((sprite) => {
        const { radius, speed, orbitTilt, yOffset } = sprite.userData
        const angle = time * speed + sprite.userData.angle

        sprite.position.x = Math.cos(angle) * radius
        sprite.position.y = Math.sin(angle) * radius * Math.sin(orbitTilt) + yOffset
        sprite.position.z = Math.sin(angle) * radius * Math.cos(orbitTilt)

        // Fade based on z position
        const normalizedZ = (sprite.position.z + radius) / (2 * radius)
        sprite.material.opacity = 0.3 + normalizedZ * 0.7
    })

    renderer.render(scene, camera)
}

function onResize() {
    if (!containerRef.value) return
    const w = containerRef.value.clientWidth
    const h = containerRef.value.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
}
</script>
