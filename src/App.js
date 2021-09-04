import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './App.scss';

function Box() {
  const mesh = useRef(null);

  // useFrame can't be used inside App component (or the component being displayed)
  // directly so we have move it to separate component
  useFrame(() => {mesh.current.rotation.x = mesh.current.rotation.y += 0.01});

  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" />
    </mesh>
  );
}

function App() {
  return (
    <>
      <Canvas>
        <Box />
      </Canvas>
    </>
  );
}

export default App;
