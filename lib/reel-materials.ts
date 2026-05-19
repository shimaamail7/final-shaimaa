import * as THREE from "three";

const meshStyled = new WeakSet<THREE.Object3D>();

const LENS_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#eff1fc"),
  metalness: 0.9,
  roughness: 0.05,
  envMapIntensity: 2.5,
  transparent: true,
  opacity: 0.25,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  side: THREE.DoubleSide,
  depthWrite: false,
});

const FRAME_MATERIAL = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x2a2a3a),
  metalness: 0.85,
  roughness: 0.2,
  envMapIntensity: 1.8,
});

/** Apply premium materials once per mesh — safe across ReelIntro remounts. */
export function applyReelGlassesMaterials(scene: THREE.Object3D): void {
  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    if (meshStyled.has(child)) return;
    meshStyled.add(child);

    const mat = child.material;
    const isLens = Array.isArray(mat)
      ? mat.some((m) => m.name === "lens")
      : mat?.name === "lens";

    if (isLens) {
      child.material = LENS_MATERIAL;
    } else {
      child.material = FRAME_MATERIAL;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}
