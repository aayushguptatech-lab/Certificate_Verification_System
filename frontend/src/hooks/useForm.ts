import { useState, useCallback } from 'react'

export interface FormErrors {
  [key: string]: string
}

/**
 * Custom hook for handling form state and validation
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => Promise<void> | void,
  validate?: (values: T) => FormErrors
) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target
      const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      setValues(prev => ({ ...prev, [name]: val }))
    },
    []
  )

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      
      if (validate) {
        const newErrors = validate(values)
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return
      }

      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate, onSubmit]
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  }
}
