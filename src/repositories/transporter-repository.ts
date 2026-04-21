import type { Transporter } from '../types/shipment'
import { mockTransporters } from '../data/mock-data'

export const getAllTransporters = (): Transporter[] => {
  return [...mockTransporters]
}
