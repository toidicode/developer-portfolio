import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

export function useThreeScene(canvasRef, options = {}) {
  const {
    alpha = true,
    antialias = true,
    cameraFov = 75,
    cameraNear = 0.1,
    cameraFar = 1000,
    cameraZ = 5,
  } = options

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(cameraFov, 1, cameraNear, cameraFar)
  camera.position.z = cameraZ

  let renderer = null
  let animationId = null
  const callbacks = []

  const init = () => {
    if (!canvasRef.value) return

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      alpha,
      antialias,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, alpha ? 0 : 1)
    handleResize()
    window.addEventListener('resize', handleResize)
  }

  const handleResize = () => {
    if (!renderer || !canvasRef.value) return
    const parent = canvasRef.value.parentElement
    const width = parent.clientWidth
    const height = parent.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  const onAnimate = (cb) => {
    callbacks.push(cb)
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    const time = performance.now() * 0.001
    callbacks.forEach(cb => cb(time))
    if (renderer) renderer.render(scene, camera)
  }

  const start = () => {
    init()
    animate()
  }

  const dispose = () => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    if (renderer) {
      renderer.dispose()
    }
    // Dispose all scene children
    scene.traverse((child) => {
      if (child.geometry) child.geometry.dispose()
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose())
        } else {
          child.material.dispose()
        }
      }
    })
  }

  return {
    scene,
    camera,
    renderer: ref(renderer),
    start,
    dispose,
    onAnimate,
    handleResize,
  }
}
