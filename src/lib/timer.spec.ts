/**
 * @jest-environment node
 */
import { secondsToHms } from './timer'

describe('[function] secondsToHms', () => {
  it('should return correct hhmmss', () => {
    const totalSeconds1 = 60 * 1 + 30
    const ret1 = secondsToHms(totalSeconds1)
    expect(ret1).toBe('00:01:30')

    const totalSeconds2 = 60 * 60 * 2 + 60 * 30 + 30
    const ret2 = secondsToHms(totalSeconds2)
    expect(ret2).toBe('02:30:30')

    const totalSeconds3 = 60 * 60 * 15 + 60 * 45 + 45
    const ret3 = secondsToHms(totalSeconds3)
    expect(ret3).toBe('15:45:45')

    const totalSeconds4 = 60 * 60 * 15 + 60 * 45 + 75
    const ret4 = secondsToHms(totalSeconds4)
    expect(ret4).toBe('15:46:15')
  })
})
