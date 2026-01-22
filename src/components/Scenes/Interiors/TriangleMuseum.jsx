import React from 'react'
import { DoubleSide } from 'three'

export default function TriangleMuseum() {
    // Theme: Flowers (Organic/Sharp)
    // Shape: Triangular Prism

    return (
        <group rotation={[0, Math.PI / 6, 0]}>
            {/* Floor (Triangle) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <circleGeometry args={[11, 3]} />
                <meshStandardMaterial color="#1a331a" />
            </mesh>

            {/* Walls (3 Sides) using Cylinder with 3 segments */}
            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[11, 11, 10, 3, 1, true]} />
                <meshStandardMaterial color="#4d664d" side={DoubleSide} />
            </mesh>

            {/* Central "Flower" Pedestal */}
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[2, 1, 2, 6]} />
                <meshStandardMaterial color="#88aa88" />
            </mesh>

            {/* Organic Light */}
            <pointLight position={[0, 4, 0]} color="#aaffaa" intensity={2} distance={15} />
        </group>
    )
}
