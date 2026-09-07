import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  FIELD_BAND_ROWS,
  FIELD_BAND_UNITS,
  fieldBandGradientCss,
  fieldBandInkAtT,
  fieldBandRowInks,
} from './field-bands.ts'

test('wordmark bands are 4, 1, 4, 3, 5 units crest to dim', () => {
  assert.deepEqual(
    FIELD_BAND_UNITS.map(([ink, units]) => [ink, units]),
    [
      ['crest', 4],
      ['hover', 1],
      ['lit', 4],
      ['mid', 3],
      ['dim', 5],
    ],
  )
  assert.equal(FIELD_BAND_ROWS, 17)
  assert.deepEqual(fieldBandRowInks(), [
    'crest',
    'crest',
    'crest',
    'crest',
    'hover',
    'lit',
    'lit',
    'lit',
    'lit',
    'mid',
    'mid',
    'mid',
    'dim',
    'dim',
    'dim',
    'dim',
    'dim',
  ])
})

test('bands fill the word: 4/17 crest through 5/17 dim', () => {
  assert.equal(fieldBandInkAtT(0), 'crest')
  assert.equal(fieldBandInkAtT(4 / 17 - 1e-9), 'crest')
  assert.equal(fieldBandInkAtT(4 / 17), 'hover')
  assert.equal(fieldBandInkAtT(5 / 17), 'lit')
  assert.equal(fieldBandInkAtT(9 / 17), 'mid')
  assert.equal(fieldBandInkAtT(12 / 17), 'dim')
  assert.equal(fieldBandInkAtT(1), 'dim')
})

test('wordmark CSS bands are 4/17, 1/17, 4/17, 3/17, 5/17 of the height', () => {
  const css = fieldBandGradientCss()
  assert.match(css, /0% 23\.529%/)
  assert.match(css, /23\.529% 29\.412%/)
  assert.match(css, /29\.412% 52\.941%/)
  assert.match(css, /52\.941% 70\.588%/)
  assert.match(css, /70\.588% 100%/)
})
