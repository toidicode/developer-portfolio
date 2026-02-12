<template>
  <canvas ref="canvasRef" class="fixed inset-0 w-full h-full pointer-events-none" style="z-index: 0;"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { useMouse } from '@vueuse/core'

const canvasRef = ref(null)
const { x: mouseX, y: mouseY } = useMouse()

let scene, camera, renderer, particles, animationId

const PARTICLE_COUNT = 1500
const FIELD_SIZE = 40

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
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 30

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: false,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Create particles
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const sizes = new Float32Array(PARTICLE_COUNT)
  const speeds = new Float32Array(PARTICLE_COUNT)

  const colorPalette = [
    new THREE.Color(0x00f5ff), // cyan
    new THREE.Color(0x39ff14), // green
    new THREE.Color(0xbf00ff), // purple
    new THREE.Color(0x00f5ff),
  ]

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * FIELD_SIZE
    positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SIZE
    positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_SIZE

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    colors[i * 3]     = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    sizes[i] = Math.random() * 2 + 0.5
    speeds[i] = Math.random() * 0.5 + 0.1
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  particles = new THREE.Points(geometry, material)
  particles.userData.speeds = speeds
  scene.add(particles)

  // Add some subtle connecting lines
  const lineGeometry = new THREE.BufferGeometry()
  const linePositions = new Float32Array(200 * 6)
  for (let i = 0; i < 200; i++) {
    const idx = Math.floor(Math.random() * PARTICLE_COUNT)
    const idx2 = Math.floor(Math.random() * PARTICLE_COUNT)
    linePositions[i * 6]     = positions[idx * 3]
    linePositions[i * 6 + 1] = positions[idx * 3 + 1]
    linePositions[i * 6 + 2] = positions[idx * 3 + 2]
    linePositions[i * 6 + 3] = positions[idx2 * 3]
    linePositions[i * 6 + 4] = positions[idx2 * 3 + 1]
    linePositions[i * 6 + 5] = positions[idx2 * 3 + 2]
  }
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f5ff,
    transparent: true,
    opacity: 0.04,
    blending: THREE.AdditiveBlending,
  })
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  scene.add(lines)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  const time = performance.now() * 0.001

  if (particles) {
    const positions = particles.geometry.attributes.position.array
    const speeds = particles.userData.speeds

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 1] -= speeds[i] * 0.01
      positions[i * 3]     += Math.sin(time + i) * 0.002
      positions[i * 3 + 2] += Math.cos(time + i * 0.5) * 0.001

      // Reset particles that fall out of view
      if (positions[i * 3 + 1] < -FIELD_SIZE / 2) {
        positions[i * 3 + 1] = FIELD_SIZE / 2
      }
    }
    particles.geometry.attributes.position.needsUpdate = true
    particles.rotation.y = time * 0.02
  }

  // Mouse influence on camera
  const mx = (mouseX.value / window.innerWidth - 0.5) * 2
  const my = (mouseY.value / window.innerHeight - 0.5) * 2
  camera.position.x += (mx * 2 - camera.position.x) * 0.02
  camera.position.y += (-my * 2 - camera.position.y) * 0.02
  camera.lookAt(0, 0, 0)

  renderer.render(scene, camera)
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>
