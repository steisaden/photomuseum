import React from 'react'

export default function XMuseum() {
    // Theme: Sports (Dynamic/Action) + Hall of Greatness
    // Shape: Crossed boxes

    return (
        <group>
            {/* Floor X */}
            <group rotation={[0, Math.PI / 4, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                    <planeGeometry args={[24, 7]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
            </group>
            <group rotation={[0, -Math.PI / 4, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                    <planeGeometry args={[24, 7]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
            </group>

            {/* Hall of Greatness (The 3-Wall Main End) */}
            {/* Assuming one arm of the X leads to this */}
            <group position={[0, 0, -10]} rotation={[0, 0, 0]}>
                {/* Back Wall */}
                <mesh position={[0, 5, 0]}>
                    <boxGeometry args={[10, 10, 1]} />
                    <meshStandardMaterial color="gold" />
                </mesh>
                {/* Side Walls */}
                <mesh position={[-5, 5, 2]}>
                    <boxGeometry args={[1, 10, 5]} />
                    <meshStandardMaterial color="gold" />
                </mesh>
                <mesh position={[5, 5, 2]}>
                    <boxGeometry args={[1, 10, 5]} />
                    <meshStandardMaterial color="gold" />
                </mesh>

                {/* Hero Light */}
                <spotLight position={[0, 15, 10]} target-position={[0, 5, 0]} intensity={10} color="#ffddaa" />
            </group>

            {/* Action Lights */}
            <pointLight position={[5, 5, 5]} color="blue" intensity={5} />
            <pointLight position={[-5, 5, -5]} color="red" intensity={5} />
        </group>
    )
}
