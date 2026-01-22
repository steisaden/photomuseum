import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import GalaxyHub from './components/Scenes/GalaxyHub'
import AstralHangar from './components/Scenes/AstralHangar'
import useGalaxyStore from './stores/useGalaxyStore'

function App() {
    const { avatarId } = useGalaxyStore()

    return (
        <Canvas
            camera={{ position: [0, 1.65, 5], fov: 75 }}
            style={{ background: '#000000' }}
            gl={{ antialias: true }}
        >
            <Suspense fallback={null}>
                {!avatarId ? <AstralHangar /> : <GalaxyHub />}
            </Suspense>
        </Canvas>
    )
}

export default App
