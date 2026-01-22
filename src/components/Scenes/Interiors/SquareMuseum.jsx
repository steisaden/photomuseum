import React from 'react'
import { DoubleSide } from 'three'

export default function SquareMuseum() {
    // Theme: Street (Linear/Grid)
    // Dimensions: 20x20 shell.
    // Gallery Width: 8m.

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[19, 19]} />
                <meshStandardMaterial color="#222" />
            </mesh>

            {/* Walls - Creating a "Street" like corridor */}
            {/* Left Wall */}
            <mesh position={[-9, 5, 0]}>
                <boxGeometry args={[1, 10, 19]} />
                <meshStandardMaterial color="#666" />
            </mesh>
            {/* Right Wall */}
            <mesh position={[9, 5, 0]}>
                <boxGeometry args={[1, 10, 19]} />
                <meshStandardMaterial color="#666" />
            </mesh>
            {/* Back Wall */}
            <mesh position={[0, 5, -9]}>
                <boxGeometry args={[17, 10, 1]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            {/* Urban Overhead Lighting (Streetlamps) */}
            <spotLight position={[0, 9, 5]} angle={0.5} penumbra={0.5} intensity={5} />
            <spotLight position={[0, 9, -5]} angle={0.5} penumbra={0.5} intensity={5} />
        </group>
    )
}
