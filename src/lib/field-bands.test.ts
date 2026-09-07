import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  FIELD_BAND_ROWS,
  FIELD_BAND_UNITS,
  fieldBandRowInks,
} from './field-bands.ts'

test('wordmark bands are 3, 1, 3, 2, 4 units crest to dim', () => {
  assert.deepEqual(
    FIELD_BAND_UNITS.map(([ink, units]) => [ink, units]),
    [
      ['crest', 3],
      ['hover', 1],
      ['lit', 3],
      ['mid', 2],
      ['dim', 4],
    ],
  )
  assert.equal(FIELD_BAND_ROWS, 13)
  assert.deepEqual(fieldBandRowInks(), [
    'crest',
    'crest',
    'crest',
    'hover',
    'lit',
    'lit',
    'lit',
    'mid',
    'mid',
    'dim',
    'dim',
    'dim',
    'dim',
  ])
})
