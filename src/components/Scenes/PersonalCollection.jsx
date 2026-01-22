import React, { lazy, Suspense } from 'react'
import { Html } from '@react-three/drei'
import useGalaxyStore from '../../stores/useGalaxyStore'
import Frame from '../Systems/Frame'

export default function PersonalCollection() {
    const { inventory } = useGalaxyStore()

    // Simple gallery layout: Line them up

    if (inventory.length === 0) {
        return (
            <group>
                <Html center>
                    <div style={{ color: 'white', fontFamily: 'Inter', textAlign: 'center' }}>
                        <h2>Your Collection is Empty</h2>
                        <p>Explore the Galaxy to license works.</p>
                    </div>
                </Html>
            </group>
        )
    }

    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 5, 0]} intensity={2} />

            {/* Room Shell */}
            <mesh position={[0, 5, 0]} receiveShadow>
                <boxGeometry args={[20, 10, 20]} />
                <meshStandardMaterial color="#222" side={2} /> {/* DoubleSide */}
            </mesh>

            {/* Frames */}
            {inventory.map((id, index) => (
                <group key={id} position={[(index - (inventory.length - 1) / 2) * 5, 3, -9]}>
                    <Frame id={id} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                </group>
            ))}

            <Html position={[0, 8, -9]} center>
                <div style={{ color: 'white', fontFamily: 'Inter', opacity: 0.5 }}>Private Viewing Room</div>
            </Html>
        </group>
    )
}
