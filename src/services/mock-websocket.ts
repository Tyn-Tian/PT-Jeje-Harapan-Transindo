import type { ShipmentStatus } from '../types/shipment'

export type WebSocketEventPayload = {
  shipmentId: string
  newStatus: ShipmentStatus
  assignedTransporterId: string | null
}

export class MockWebSocket {
  private intervalId: ReturnType<typeof setInterval> | null = null
  private listeners: Array<(payload: WebSocketEventPayload) => void> = []

  connect(shipmentIds: string[]): void {
    if (this.intervalId) return

    this.intervalId = setInterval(() => {
      const randomShipmentId = shipmentIds[Math.floor(Math.random() * shipmentIds.length)]
      
      // 60% chance to change status, 40% to stay the same
      const shouldChange = Math.random() < 0.6
      if (!shouldChange) return

      const statuses: ShipmentStatus[] = ['Assigned', 'Not Assigned']
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)]
      
      // Mock logic: if Not Assigned, clear transporter ID. 
      // If Assigned, we could mock a random transporter ID but keeping it simple for the simulation.
      const payload: WebSocketEventPayload = {
        shipmentId: randomShipmentId,
        newStatus: newStatus,
        assignedTransporterId: newStatus === 'Not Assigned' ? null : 'T-001' // Simplified mock transporter
      }

      this.listeners.forEach(callback => callback(payload))
    }, 5000)
  }

  disconnect(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.listeners = []
  }

  onMessage(callback: (payload: WebSocketEventPayload) => void): void {
    this.listeners.push(callback)
  }
}
