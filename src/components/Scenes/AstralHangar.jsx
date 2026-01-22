import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import useGalaxyStore from '../../stores/useGalaxyStore'

export default function AstralHangar() {
    const { setAvatarId } = useGalaxyStore()

    const avatars = [
        { id: 'avatar_1', color: '#ffaaaa', position: [-3, 0, 0], name: 'Visitor' },
        { id: 'avatar_2', color: '#aaffaa', position: [-1, 0, 0], name: 'Curator' },
        { id: 'avatar_3', color: '#aaaaff', position: [1, 0, 0], name: 'Architect' },
        { id: 'avatar_4', color: '#ffffff', position: [3, 0, 0], name: 'Observer' },
    ]

    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} />

            {/* Title */}
            <Html position={[0, 3, 0]} center>
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <h1>Select Your Vessel</h1>
                    <p>This choice persists.</p>
                </div>
            </Html>

            {/* Avatars */}
            {avatars.map((av) => (
                <group key={av.id} position={av.position} onClick={() => setAvatarId(av.id)}>
                    <mesh position={[0, 1, 0]}>
                        <capsuleGeometry args={[0.5, 1.7, 4, 16]} />
                        <meshStandardMaterial color={av.color} />
                    </mesh>
                    <Html position={[0, -0.5, 0]} center>
                        <div style={{ color: 'white', fontSize: '12px', cursor: 'pointer', background: '#333', padding: '4px' }}>
                            {av.name}
                        </div>
                    </Html>
                </group>
            ))}

            {/* Floor Grid */}
            <gridHelper args={[20, 20, 0x444444, 0x222222]} />
        </group>
    )
}
