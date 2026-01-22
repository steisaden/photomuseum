import React, { useState } from 'react'

export default function LicensingPlacard({ title, year, onClose, onLicense }) {
    // 3 Tiers as per strict mandate
    const tiers = [
        { id: 'personal', label: 'Personal Display', price: '$50', desc: 'Home usage only.' },
        { id: 'editorial', label: 'Editorial', price: '$250', desc: 'News & Article usage.' },
        { id: 'commercial', label: 'Commercial', price: '$1,500', desc: 'Marketing & Brand usage.' }
    ]

    const [selected, setSelected] = useState('editorial') // Default middle tier

    return (
        <div style={{
            background: 'rgba(10, 10, 10, 0.95)',
            color: '#eee',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #333',
            fontFamily: 'Inter, sans-serif',
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            cursor: 'default'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                    <h2 style={{ margin: 0, fontWeight: 300, fontSize: '1.5rem' }}>{title}</h2>
                    <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>{year}</span>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
            </div>

            <hr style={{ border: 'none', borderBottom: '1px solid #333', width: '100%' }} />

            {/* Tiers - Horizontal Layout */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                {tiers.map(t => (
                    <div
                        key={t.id}
                        onClick={() => setSelected(t.id)}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            border: selected === t.id ? '1px solid #fff' : '1px solid #333',
                            background: selected === t.id ? '#222' : 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t.label}</div>
                        <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t.price}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.5, lineHeight: 1.4 }}>{t.desc}</div>
                    </div>
                ))}
            </div>

            {/* Action */}
            <button
                onClick={() => onLicense(selected)}
                style={{
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                }}
            >
                LICENSE THIS WORK
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.7rem', opacity: 0.4 }}>
                Secure Transaction • Instant Certificate Delivery
            </div>
        </div>
    )
}
