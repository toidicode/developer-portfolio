<template>
  <div ref="containerRef" class="w-full h-full absolute inset-0">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { useMouse } from '@vueuse/core'

const canvasRef = ref(null)
const containerRef = ref(null)
const { x: mouseX, y: mouseY } = useMouse()

let scene, camera, renderer, animationId
let icosahedron, torusRing1, torusRing2, torusRing3
let innerParticles

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
  camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
  camera.position.z = 6

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)

  // Main icosahedron with wireframe
  const icoGeo = new THREE.IcosahedronGeometry(1.8, 1)
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x00f5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  })
  icosahedron = new THREE.Mesh(icoGeo, icoMat)
  scene.add(icosahedron)

  // Inner solid with low opacity for depth
  const innerGeo = new THREE.IcosahedronGeometry(1.5, 1)
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x0a0a2e,
    transparent: true,
    opacity: 0.3,
  })
  const innerMesh = new THREE.Mesh(innerGeo, innerMat)
  scene.add(innerMesh)

  // Torus rings orbiting
  const torusGeo = new THREE.TorusGeometry(2.8, 0.01, 8, 100)
  const torusMat1 = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.3 })
  const torusMat2 = new THREE.MeshBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.25 })
  const torusMat3 = new THREE.MeshBasicMaterial({ color: 0xbf00ff, transparent: true, opacity: 0.2 })

  torusRing1 = new THREE.Mesh(torusGeo, torusMat1)
  torusRing1.rotation.x = Math.PI / 3
  scene.add(torusRing1)

  torusRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.008, 8, 100), torusMat2)
  torusRing2.rotation.x = -Math.PI / 4
  torusRing2.rotation.y = Math.PI / 6
  scene.add(torusRing2)

  torusRing3 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.006, 8, 100), torusMat3)
  torusRing3.rotation.x = Math.PI / 2
  torusRing3.rotation.z = Math.PI / 5
  scene.add(torusRing3)

  // Floating particles around the icosahedron
  const particleCount = 300
  const pGeo = new THREE.BufferGeometry()
  const pPositions = new Float32Array(particleCount * 3)
  const pColors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2.5 + Math.random() * 2

    pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pPositions[i * 3 + 2] = r * Math.cos(phi)

    const isGreen = Math.random() > 0.6
    pColors[i * 3]     = isGreen ? 0.22 : 0
    pColors[i * 3 + 1] = isGreen ? 1 : 0.96
    pColors[i * 3 + 2] = isGreen ? 0.08 : 1
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
  pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

  const pMat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  innerParticles = new THREE.Points(pGeo, pMat)
  scene.add(innerParticles)
}

function animate() {
  animationId = requestAnimationFrame(animate)
  const time = performance.now() * 0.001

  if (icosahedron) {
    icosahedron.rotation.x = time * 0.15
    icosahedron.rotation.y = time * 0.2
  }

  if (torusRing1) torusRing1.rotation.z = time * 0.3
  if (torusRing2) torusRing2.rotation.z = -time * 0.2
  if (torusRing3) torusRing3.rotation.y = time * 0.15

  if (innerParticles) {
    innerParticles.rotation.y = time * 0.1
    innerParticles.rotation.x = time * 0.05
  }

  // Mouse influence
  const mx = (mouseX.value / window.innerWidth - 0.5) * 2
  const my = (mouseY.value / window.innerHeight - 0.5) * 2
  camera.position.x += (mx * 1.5 - camera.position.x) * 0.03
  camera.position.y += (-my * 1.5 - camera.position.y) * 0.03
  camera.lookAt(0, 0, 0)

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
