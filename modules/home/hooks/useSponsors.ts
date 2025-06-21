import { MeParqueoApi } from '@/api/MeParqueoApi'
import { Sponsors, SponsorsResponse } from '@/api/responses/SponsosrsResponse'
import { useEffect, useState } from 'react'

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsors[]>([])

  const fetchSponsors = async () => {
    try {
      const { data } =
        await MeParqueoApi.get<SponsorsResponse>('/api/v1/sponsors')
      setSponsors(data.data.sponsors)
    } catch (error) {
      console.error('Error fetching sponsors:', error)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  return {
    sponsors,
  }
}
