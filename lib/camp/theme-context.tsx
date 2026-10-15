'use client'
import { createContext, useContext, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CAMP_SETTINGS } from '@/lib/graphql/queries/camp'

interface CampTheme {
  maroon: string
  maroonDark: string
  gold: string
  goldLight: string
  cream: string
  creamDark: string
  dateFull: string
  startDate: string
  endDate: string
  location: string
  monthYear: string
  loading: boolean
}

// Used before the query resolves, and as a safety net if campSettings is ever null.
const defaults: CampTheme = {
  maroon:     '#7A1F3D',
  maroonDark: '#5C1730',
  gold:       '#C9962C',
  goldLight:  '#E0B45C',
  cream:      '#FDF6EE',
  creamDark:  '#F5EBDD',
  dateFull:   'August 8–15, 2026',
  startDate:  '',
  endDate:    '',
  location:   '',
  monthYear:  '',
  loading:    true,
}

const CampThemeContext = createContext<CampTheme>(defaults)

export function CampThemeProvider({ children }: { children: React.ReactNode }) {
  const { data, loading } = useQuery(GET_CAMP_SETTINGS)
  const settings = data?.campSettings

  const value = useMemo<CampTheme>(() => ({
    maroon:     settings?.maroon     ?? defaults.maroon,
    maroonDark: settings?.maroonDark ?? defaults.maroonDark,
    gold:       settings?.gold       ?? defaults.gold,
    goldLight:  settings?.goldLight  ?? defaults.goldLight,
    cream:      settings?.cream      ?? defaults.cream,
    creamDark:  settings?.creamDark  ?? defaults.creamDark,
    dateFull:   settings?.dateFull   ?? defaults.dateFull,
    startDate:  settings?.startDate  ?? '',
    endDate:    settings?.endDate    ?? '',
    location:   settings?.location   ?? '',
    monthYear:  settings?.monthYear  ?? '',
    loading,
  }), [settings, loading])

  return (
    <CampThemeContext.Provider value={value}>
      {children}
    </CampThemeContext.Provider>
  )
}

export function useCampTheme() {
  return useContext(CampThemeContext)
}