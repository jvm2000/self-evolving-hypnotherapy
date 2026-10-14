
import { useState } from '#imports'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration: number
}

type ToastOptions = {
  title?: string
  message?: string
  duration?: number
}

export const useToast = () => {
  const toasts = useState<Toast[]>('app-toasts', () => [])

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const clear = () => {
    toasts.value = []
  }

  const show = (
    type: ToastType,
    options: ToastOptions | string,
  ) => {
    const config =
      typeof options === 'string'
        ? { message: options }
        : options

    const id = `${Date.now()}-${Math.random()}`

    const toast: Toast = {
      id,
      type,
      title:
        config.title ??
        ({
          success: 'Success',
          error: 'Error',
          warning: 'Warning',
          info: 'Information',
        } satisfies Record<ToastType, string>)[type],
      message: config.message,
      duration: config.duration ?? 4000,
    }

    toasts.value.push(toast)

    if (toast.duration > 0) {
      setTimeout(() => remove(id), toast.duration)
    }

    return id
  }

  return {
    toasts,
    show,
    remove,
    clear,
    success: (options: ToastOptions | string) =>
      show('success', options),
    error: (options: ToastOptions | string) =>
      show('error', options),
    warning: (options: ToastOptions | string) =>
      show('warning', options),
    info: (options: ToastOptions | string) =>
      show('info', options),
  }
}
