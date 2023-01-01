import { Canvas, useFrame } from '@react-three/fiber/native'
import React, { useRef, useState, Suspense } from 'react'
import { HStack, Center, NativeBaseProvider } from 'native-base'
import { useGLTF, Environment } from '@react-three/drei/native'
import { Text, StyleSheet } from 'react-native'
import parrotModel from './assets/Parrot.glb'
import iphoneModelPath from './assets/iphone.glb'
import storkeModelPath from './assets/Stork.glb'
function Model({ url, ...rest }) {
  const { scene } = useGLTF(url)
  useFrame(() => (scene.rotation.y += 0.01))
  return <primitive {...rest} object={scene} />
}

function MBox(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
function ModelScene({url}) {
  return (
    <Canvas
      gl={{ physicallyCorrectLights: true }}
      camera={{ position: [-6, 0, 16], fov: 36 }}
    >
      <color attach="background" args={[0xe2f4df]} />
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Suspense>
        <Environment preset="park" />
        <Model url={url} />
      </Suspense>
    </Canvas>
  )
}
export default function App() {
  return (
    <NativeBaseProvider>
      <HStack space={3} justifyContent="center">
        <Canvas style={styles.squere}>
          <color attach="background" args={[0xfafe77]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <MBox position={[0, 0, 1]} />
        </Canvas>
        <ModelScene url={parrotModel} />
        <ModelScene url={iphoneModelPath} />
        <ModelScene url={storkeModelPath} />
        <Center
          style={styles.rect}
          h="40"
          w="20"
          bg="primary.500"
          rounded="md"
          shadow={3}
        >
          <Text>Native Base</Text>
        </Center>
      </HStack>
      <Text style={styles.text}>React Native 3D Experiment</Text>
    </NativeBaseProvider>
  )
}
const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
    color: 'green',
  },
  squere: {
    marginLeft: 5,
  },
  rect: {
    marginRight: 7,
  },
})
