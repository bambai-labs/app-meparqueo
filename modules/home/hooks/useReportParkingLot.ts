import { MeParqueoApi } from '@/api'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Alert } from 'react-native'

interface FormValues {
  comment: string
  reason: string
}

export const useReportParkingLot = (parkingLotId: string) => {
  const [loading, setloading] = useState(false)

  const { values, handleChange, handleSubmit, resetForm } =
    useFormik<FormValues>({
      initialValues: {
        comment: '',
        reason: '',
      },
      onSubmit: async (values) => {
        await reportParkingLot(values)
      },
    })

  const reportParkingLot = async (values: FormValues) => {
    try {
      setloading(true)
      await MeParqueoApi.post(`/api/v1/report/${parkingLotId}`, {
        ...values,
      })

      Alert.alert('Reporte enviado con éxito ✅')
    } catch (error) {
      console.log(error)
      Alert.alert('Error al enviar el reporte, intente denuevo ⚠️')
    } finally {
      setloading(false)
    }
  }

  return {
    loading,
    values,
    handleChange,
    handleSubmit,
    resetForm,
  }
}
