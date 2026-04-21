import { describe, it, expect } from 'vitest'
import * as repo from '../transporter-repository'
import { mockTransporters } from '../../data/mock-data'

describe('Transporter Repository', () => {
  it('should return all transporters', () => {
    const transporters = repo.getAllTransporters()
    expect(transporters.length).toBe(mockTransporters.length)
  })
})
