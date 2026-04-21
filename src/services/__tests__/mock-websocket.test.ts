import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MockWebSocket } from '../mock-websocket'

describe('MockWebSocket', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should send messages to listeners after interval', () => {
    const ws = new MockWebSocket()
    const callback = vi.fn()
    ws.onMessage(callback)
    
    ws.connect(['S-1', 'S-2'])
    
    // Fast-forward 5 seconds
    vi.advanceTimersByTime(5000)
    
    // Since there's a 60% chance of update, we might need multiple attempts or a high probability
    // For testing, let's wrap it in a way that we check if it was called at least once after enough time
    // Or we could mock Math.random() to ensure it's always called
    vi.spyOn(Math, 'random').mockReturnValue(0.1) // Force changeStatus to happen
    
    vi.advanceTimersByTime(5000)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({
      shipmentId: expect.any(String),
      newStatus: expect.any(String)
    }))
    
    ws.disconnect()
  })

  it('should stop sending messages after disconnect', () => {
    const ws = new MockWebSocket()
    const callback = vi.fn()
    ws.onMessage(callback)
    
    ws.connect(['S-1'])
    vi.spyOn(Math, 'random').mockReturnValue(0.1)
    
    vi.advanceTimersByTime(5000)
    expect(callback).toHaveBeenCalledTimes(1)
    
    ws.disconnect()
    vi.advanceTimersByTime(5000)
    expect(callback).toHaveBeenCalledTimes(1) // No new calls
  })
})
