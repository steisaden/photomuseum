import React from 'react'
import { DoubleSide } from 'three'
import Frame from '../../Systems/Frame'

export default function CircleMuseum() {
    // Theme: Portraits (Curved Walls)
    // Dimensions: Must fit inside 12m radius shell.
    // Gallery Width: 6-8m.

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <circleGeometry args={[11, 64]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Curved Wall (Outer) */}
            <mesh position={[0, 5, 0]} receiveShadow>
                <cylinderGeometry args={[11, 11, 10, 64, 1, true]} />
                <meshStandardMaterial color="#888" side={DoubleSide} />
            </mesh>

            {/* Inner Rotunda (Central Pillar or Void) */}
            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[3, 3, 10, 32, 1, true]} />
                <meshStandardMaterial color="#555" side={DoubleSide} />
            </mesh>

            {/* Lighting for Portraits (Soft, Face-focused) */}
            <pointLight position={[0, 8, 0]} intensity={2} distance={20} decay={2} />

            {/* Manifest-driven Frames */}
            <Frame id="frame_c1" position={[0, 3, -8]} rotation={[0, 0, 0]} />
            <Frame id="frame_c2" position={[5, 3, -6]} rotation={[0, -0.7, 0]} />
        </group>
    )
}
