import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls, softShadows } from '@react-three/drei';
import './App.scss';

softShadows();

function SpinningMesh({ position, color, args, speed }) {
  const mesh = useRef(null);

  // useFrame can't be used inside App component (or the component being displayed)
  // directly so we have move it to separate component
  useFrame(() => { mesh.current.rotation.x = mesh.current.rotation.y += 0.01 });

  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={speed}
        factor={0.6}
      />
    </mesh>
  );
}

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          position: [-5, 2, 10],
          fov: 60,
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* point light from left */}
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        {/* point light from bottom */}
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpinningMesh speed={2} position={[0, 1, 0]} color="lightblue" args={[3, 2, 1]} />
          <SpinningMesh speed={6} position={[-2, 1, -5]} color="pink" />
          <SpinningMesh speed={6} position={[5, 1, -2]} color="pink" />
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
