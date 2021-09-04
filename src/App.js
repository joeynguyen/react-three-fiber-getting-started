import { Canvas } from '@react-three/fiber';
import './App.scss';

function App() {
  return (
    <>
      <Canvas>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[1,1,1]} />
          <meshStandardMaterial attach="material" />
        </mesh>

      </Canvas>
    </>
  );
}

export default App;
