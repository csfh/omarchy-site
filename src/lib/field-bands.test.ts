import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  FIELD_BAND_ROWS,
  FIELD_BAND_UNITS,
  fieldBandGradientCss,
  fieldBandInkAt,
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

test('one band unit is one square cell, not one 19-row slice', () => {
  const unit = 51
  assert.equal(fieldBandInkAt(0, unit), 'crest')
  assert.equal(fieldBandInkAt(3 * unit - 0.01, unit), 'crest')
  assert.equal(fieldBandInkAt(3 * unit, unit), 'hover')
  assert.equal(fieldBandInkAt(4 * unit, unit), 'lit')
  assert.equal(fieldBandInkAt(7 * unit, unit), 'mid')
  assert.equal(fieldBandInkAt(9 * unit, unit), 'dim')
  assert.equal(fieldBandInkAt(13 * unit, unit), 'dim')
})

test('wordmark CSS bands are n times --pxc', () => {
  const css = fieldBandGradientCss()
  assert.match(css, /calc\(3 \* var\(--pxc\)\)/)
  assert.match(css, /calc\(4 \* var\(--pxc\)\)/)
  assert.match(css, /calc\(7 \* var\(--pxc\)\)/)
  assert.match(css, /calc\(9 \* var\(--pxc\)\)/)
  assert.match(css, /100%/)
})
