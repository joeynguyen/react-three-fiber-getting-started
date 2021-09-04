import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './App.scss';

function SpinningMesh({ position, color, args }) {
  const mesh = useRef(null);

  // useFrame can't be used inside App component (or the component being displayed)
  // directly so we have move it to separate component
  useFrame(() => {mesh.current.rotation.x = mesh.current.rotation.y += 0.01});

  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
}

function App() {
  return (
    <>
      <Canvas camera={{ position: [-5, 2, 10], fov: 60}}>
        <ambientLight intensity={0.3} />
        <SpinningMesh position={[0, 1, 0]} color="lightblue" args={[3, 2, 1]} />
        <SpinningMesh position={[-2, 1, -5]} color="pink" />
        <SpinningMesh position={[5, 1, -2]} color="pink" />
      </Canvas>
    </>
  );
}

export default App;
