import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  FIELD_BAND_ROWS,
  FIELD_BAND_UNITS,
  fieldBandGradientCss,
  fieldBandInkAtT,
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

test('bands fill the word: 3/13 crest through 4/13 dim', () => {
  assert.equal(fieldBandInkAtT(0), 'crest')
  assert.equal(fieldBandInkAtT(3 / 13 - 1e-9), 'crest')
  assert.equal(fieldBandInkAtT(3 / 13), 'hover')
  assert.equal(fieldBandInkAtT(4 / 13), 'lit')
  assert.equal(fieldBandInkAtT(7 / 13), 'mid')
  assert.equal(fieldBandInkAtT(9 / 13), 'dim')
  assert.equal(fieldBandInkAtT(1), 'dim')
})

test('wordmark CSS bands are 3/13, 1/13, 3/13, 2/13, 4/13 of the height', () => {
  const css = fieldBandGradientCss()
  assert.match(css, /0% 23\.077%/)
  assert.match(css, /23\.077% 30\.769%/)
  assert.match(css, /30\.769% 53\.846%/)
  assert.match(css, /53\.846% 69\.231%/)
  assert.match(css, /69\.231% 100%/)
})
