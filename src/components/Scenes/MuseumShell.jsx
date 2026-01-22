import React from 'react'

export default function MuseumShell({ theme, color }) {
    // Shell Dimensions: ~20m scale

    if (theme === 'Portraits') {
        // Circle Museum -> Cylinder
        return (
            <mesh>
                <cylinderGeometry args={[12, 12, 15, 64]} />
                <meshStandardMaterial color={color} wireframe />
            </mesh>
        )
    }

    if (theme === 'Street') {
        // Square Museum -> Box
        return (
            <mesh>
                <boxGeometry args={[20, 15, 20]} />
                <meshStandardMaterial color={color} wireframe />
            </mesh>
        )
    }

    if (theme === 'Flowers') {
        // Triangle Museum -> Cone (Pyramid-ish) or Cylinder with 3 segments
        return (
            <mesh rotation={[0, Math.PI / 6, 0]}>
                <cylinderGeometry args={[12, 12, 15, 3]} />
                <meshStandardMaterial color={color} wireframe />
            </mesh>
        )
    }

    if (theme === 'Sports') {
        // X Museum -> Two crossed boxes
        return (
            <group>
                <mesh rotation={[0, Math.PI / 4, 0]}>
                    <boxGeometry args={[25, 15, 8]} />
                    <meshStandardMaterial color={color} wireframe />
                </mesh>
                <mesh rotation={[0, -Math.PI / 4, 0]}>
                    <boxGeometry args={[25, 15, 8]} />
                    <meshStandardMaterial color={color} wireframe />
                </mesh>
            </group>
        )
    }

    return null
}
