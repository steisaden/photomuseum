import React, { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import manifest from '../../data/manifest.json'
import LicensingPlacard from '../UI/LicensingPlacard'
import useGalaxyStore from '../../stores/useGalaxyStore'

export default function Frame({ id, position, rotation }) {
    const [inspecting, setInspecting] = useState(false)
    const { addToCollection, inventory } = useGalaxyStore()
    const purchased = inventory.includes(id)
    const { camera } = useThree()

    const frameData = useMemo(() => {
        for (const m of manifest.museums) {
            const f = m.frames?.find(fr => fr.id === id)
            if (f) return f
        }
        return null
    }, [id])

    if (!frameData) {
        return (
            <group position={position} rotation={rotation}>
                <mesh>
                    <planeGeometry args={[2, 3]} />
                    <meshStandardMaterial color="red" />
                </mesh>
                <Html center>Missing ID: {id}</Html>
            </group>
        )
    }

    const handleInspect = (e) => {
        e.stopPropagation()
        setInspecting(true)
    }

    const handleLicense = (tier) => {
        console.log(`[License] Purchased ${frameData.title} at ${tier} tier.`)
        addToCollection(id)
        setInspecting(false)
        // In real app, show Certificate here
    }

    const handleClose = () => {
        setInspecting(false)
    }

    return (
        <group position={position} rotation={rotation} onClick={handleInspect}>
            {/* Frame Border */}
            <mesh position={[0, 0, -0.05]}>
                <boxGeometry args={[2.2, 3.2, 0.1]} />
                <meshStandardMaterial color={purchased ? "gold" : "#111"} />
            </mesh>

            {/* Artwork Canvas */}
            <mesh>
                <planeGeometry args={[2, 3]} />
                <meshStandardMaterial color={frameData.id === 'frame_c1' ? '#ffaaaa' : '#aa4444'} />
            </mesh>

            {/* Label (Hidden if Inspecting) */}
            {!inspecting && !purchased && (
                <Html position={[0, -1.8, 0]} center transform scale={0.5}>
                    <div style={{
                        background: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        padding: '10px',
                        fontFamily: 'Inter',
                        width: '200px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}>
                        <strong>{frameData.title}</strong><br />
                        <span style={{ fontSize: '0.8em', opacity: 0.8 }}>{frameData.year}</span>
                    </div>
                </Html>
            )}

            {/* Purchased Badge */}
            {purchased && (
                <Html position={[0, -1.8, 0]} center transform scale={0.5}>
                    <div style={{ color: 'gold', fontFamily: 'Inter', fontWeight: 'bold' }}>
                        ✓ IN COLLECTION
                    </div>
                </Html>
            )}

            {/* Licensing UI Overlay */}
            {inspecting && (
                <Html position={[0, 0, 1]} center zIndexRange={[100, 0]}>
                    <LicensingPlacard
                        title={frameData.title}
                        year={frameData.year}
                        onClose={handleClose}
                        onLicense={handleLicense}
                    />
                </Html>
            )}
        </group>
    )
}
