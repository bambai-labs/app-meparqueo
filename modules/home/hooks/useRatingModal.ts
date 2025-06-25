import { MeParqueoApi } from '@/api'
import { useAppDispatch } from '@/modules/common'
import { cancelRateNotificationReminder, closeReviewModal } from '@/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Alert } from 'react-native'
import * as Yup from 'yup'

interface FormValues {
  rate: number
  comment: string
}

export const useRatingModal = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const validationSchema = Yup.object().shape({
    rate: Yup.number()
      .required('Tiene que especificar un número de estrellas')
      .min(1, 'Debes colocar al menos 1 estrella')
      .max(5, 'Maximo 5 estrellas!!'),
    comment: Yup.string().required('Tu opinión es importante!!'),
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true)
      await MeParqueoApi.post('api/v1/feedback', values)
      await AsyncStorage.setItem('reviewModalSubmitted', 'true')
      dispatch(cancelRateNotificationReminder())
      dispatch(closeReviewModal())
      Alert.alert('Gracias por tus comentarios!')
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const { values, errors, touched, handleChange, handleSubmit } =
    useFormik<FormValues>({
      initialValues: {
        rate: 0,
        comment: '',
      },
      validationSchema,
      onSubmit,
    })

  return {
    values,
    errors,
    touched,
    loading,
    handleChange,
    handleSubmit,
  }
}
