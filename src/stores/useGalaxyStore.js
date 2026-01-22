import { create } from 'zustand'

const useGalaxyStore = create((set) => ({
    activeMuseumId: null, // 'museum_circle', 'museum_square', etc. or null
    setActiveMuseumId: (id) => set({ activeMuseumId: id }),

    autopilot: false,
    setAutopilot: (val) => set({ autopilot: val }),

    licenseTier: 'editorial', // 'personal', 'editorial', 'commercial'
    setLicenseTier: (tier) => set({ licenseTier: tier }),

    avatarId: null,
    setAvatarId: (id) => set({ avatarId: id }),
}))

export default useGalaxyStore
