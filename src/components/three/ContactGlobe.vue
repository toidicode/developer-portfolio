<template>
    <div ref="containerRef" class="w-full h-[400px] relative">
        <canvas ref="canvasRef" class="w-full h-full"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const canvasRef = ref(null)
const containerRef = ref(null)

let scene, camera, renderer, animationId
let globe, dots, connections

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

function initScene() {
    const container = containerRef.value
    const w = container.clientWidth
    const h = container.clientHeight

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    camera.position.z = 5

    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        alpha: true,
        antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)

    // Wireframe globe
    const globeGeo = new THREE.SphereGeometry(1.8, 32, 32)
    const globeMat = new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
    })
    globe = new THREE.Mesh(globeGeo, globeMat)
    scene.add(globe)

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (90 - lat) * (Math.PI / 180)
        const radius = 1.82 * Math.sin(phi)
        const y = 1.82 * Math.cos(phi)

        const ringGeo = new THREE.TorusGeometry(radius, 0.003, 4, 64)
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00f5ff,
            transparent: true,
            opacity: 0.08,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.y = y
        ring.rotation.x = Math.PI / 2
        globe.add(ring)
    }

    // Glowing dots on surface
    const dotCount = 50
    const dotGeo = new THREE.BufferGeometry()
    const dotPositions = new Float32Array(dotCount * 3)
    const dotColors = new Float32Array(dotCount * 3)

    for (let i = 0; i < dotCount; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 1.85

        dotPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        dotPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        dotPositions[i * 3 + 2] = r * Math.cos(phi)

        const isAccent = Math.random() > 0.7
        dotColors[i * 3] = isAccent ? 0.22 : 0
        dotColors[i * 3 + 1] = isAccent ? 1 : 0.96
        dotColors[i * 3 + 2] = isAccent ? 0.08 : 1
    }

    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3))
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3))

    const dotMat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    })

    dots = new THREE.Points(dotGeo, dotMat)
    globe.add(dots)

    // Connection lines between some dots
    const lineGeo = new THREE.BufferGeometry()
    const linePositions = new Float32Array(30 * 6)
    for (let i = 0; i < 30; i++) {
        const idx1 = Math.floor(Math.random() * dotCount)
        const idx2 = Math.floor(Math.random() * dotCount)
        linePositions[i * 6] = dotPositions[idx1 * 3]
        linePositions[i * 6 + 1] = dotPositions[idx1 * 3 + 1]
        linePositions[i * 6 + 2] = dotPositions[idx1 * 3 + 2]
        linePositions[i * 6 + 3] = dotPositions[idx2 * 3]
        linePositions[i * 6 + 4] = dotPositions[idx2 * 3 + 1]
        linePositions[i * 6 + 5] = dotPositions[idx2 * 3 + 2]
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
    })
    connections = new THREE.LineSegments(lineGeo, lineMat)
    globe.add(connections)
}

function animate() {
    animationId = requestAnimationFrame(animate)
    if (globe) {
        globe.rotation.y += 0.003
    }
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
