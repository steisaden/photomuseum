import React from 'react'
import useGalaxyStore from '../../stores/useGalaxyStore'

export default function HUD() {
    const { activeMuseumId, setActiveMuseumId } = useGalaxyStore()

    const toggleCollection = () => {
        if (activeMuseumId === 'personal_collection') {
            setActiveMuseumId(null) // Return to Galaxy (Auto-proximity will pick up real location)
        } else {
            setActiveMuseumId('personal_collection')
        }
    }

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            userSelect: 'none'
        }}>
            <button
                onClick={toggleCollection}
                style={{
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: '1px solid #555',
                    padding: '10px 20px',
                    fontFamily: 'Inter',
                    cursor: 'pointer',
                    borderRadius: '20px'
                }}
            >
                {activeMuseumId === 'personal_collection' ? 'EXIT COLLECTION' : 'MY COLLECTION'}
            </button>
        </div>
    )
}
