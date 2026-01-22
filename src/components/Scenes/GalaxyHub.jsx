import { Stars, Line, Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, Suspense, lazy } from 'react'
import manifest from '../../data/manifest.json'
import MuseumShell from './MuseumShell'
import useGalaxyStore from '../../stores/useGalaxyStore'
import AudioSystem from '../Systems/AudioSystem'
import HUD from '../UI/HUD'

// Async Interiors
const CircleMuseum = lazy(() => import('./Interiors/CircleMuseum'))
const SquareMuseum = lazy(() => import('./Interiors/SquareMuseum'))
const TriangleMuseum = lazy(() => import('./Interiors/TriangleMuseum'))
const XMuseum = lazy(() => import('./Interiors/XMuseum'))
const PersonalCollection = lazy(() => import('./PersonalCollection'))

function AsyncInterior({ id }) {
    if (id === 'museum_circle') return <CircleMuseum />
    if (id === 'museum_square') return <SquareMuseum />
    if (id === 'museum_triangle') return <TriangleMuseum />
    if (id === 'museum_x') return <XMuseum />
    if (id === 'personal_collection') return <PersonalCollection />
    return null
}

export default function GalaxyHub() {
    const { activeMuseumId, setActiveMuseumId } = useGalaxyStore()
    const { camera } = useThree()

    const points = useMemo(() => {
        // Gateway (0,0,0) -> Museums
        const p = [new THREE.Vector3(0, 0, 0)]
        manifest.museums.forEach(m => {
            p.push(new THREE.Vector3(...m.position))
        })
        // Add a final point extending out slightly for the curve to settle
        p.push(new THREE.Vector3(0, 0, -250))
        return p
    }, [])

    const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5), [points])

    // Distance Check Loop
    useFrame(() => {
        // If in personal collection, do not auto-switch based on distance
        if (activeMuseumId === 'personal_collection') return

        // Simple proximity trigger
        // If we are within 25m of a museum center, load it.
        // If not, unload (null).

        let found = null
        for (const m of manifest.museums) {
            const dist = camera.position.distanceTo(new THREE.Vector3(...m.position))
            if (dist < 25) {
                found = m.id
                break
            }
        }

        // Only update if changed to avoid re-renders
        if (found !== activeMuseumId) {
            setActiveMuseumId(found)
        }
    })

    return (
        <>
            <Html fullscreen style={{ pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto' }}>
                    <HUD />
                </div>
            </Html>
            <AudioSystem />
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.7} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* S-Path Visualization (Tube) */}
            <mesh>
                <tubeGeometry args={[curve, 64, 4, 8, false]} />
                <meshStandardMaterial color="#222" wireframe opacity={0.3} transparent />
            </mesh>

            {/* Path Line for emphasis */}
            <Line points={points} color="cyan" lineWidth={1} segments={false} />

            {/* Stephen Gateway */}
            <mesh position={[0, -2, 0]}>
                <cylinderGeometry args={[8, 8, 1, 32]} />
                <meshStandardMaterial color="#444" />
            </mesh>
            <Html position={[0, 2, 0]} center>
                <div style={{ color: 'white', fontFamily: 'Inter', pointerEvents: 'none', userSelect: 'none' }}>Stephen Gateway</div>
            </Html>

            {/* Museum Shells & Async Interiors */}
            {manifest.museums.map((m) => (
                <group key={m.id} position={m.position}>
                    {/* Always Visible Shell */}
                    <MuseumShell theme={m.theme} color={m.theme === 'Portraits' ? '#ff8888' : '#8888ff'} />

                    {/* Label */}
                    <Html position={[0, 15, 0]} center>
                        <div style={{ color: 'white', fontFamily: 'Inter', fontSize: '14px', textAlign: 'center' }}>
                            {m.name}<br />
                            <span style={{ fontSize: '10px', opacity: 0.7 }}>({m.theme})</span>
                        </div>
                    </Html>

                    {/* Conditionally Loaded Interior */}
                    {activeMuseumId === m.id && (
                        <Suspense fallback={null}>
                            <AsyncInterior id={m.id} />
                        </Suspense>
                    )}
                </group>
            ))}

            {/* Personal Collection Overlay Scene */}
            {activeMuseumId === 'personal_collection' && (
                <group position={[0, 1000, 0]}>
                    {/* Render it far away or just rely on the fact that other interiors are unmounted */}
                    {/* Wait, the AsyncInterior logic above only handles 'm.id' matching activeMuseumId. 
               The Personal Collection is NOT in the loop. I need to render it explicitly if active. 
           */}
                    <Suspense fallback={null}>
                        <PersonalCollection />
                    </Suspense>
                </group>
            )}

            {/* Debug Info */}
            <Html position={[0, 0, 0]} style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }}>
                <div>Active: {activeMuseumId || 'None'}</div>
            </Html>
        </>
    )
}
