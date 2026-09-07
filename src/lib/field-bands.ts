/** Horizontal field inks on the wordmark, in crest→dim order. */
export const FIELD_BAND_INKS = [
  'crest',
  'hover',
  'lit',
  'mid',
  'dim',
] as const

export type FieldBandInk = (typeof FIELD_BAND_INKS)[number]

/**
 * Band heights in grid units: 3, 1, 3, 2, 4. The CSS mask gradient and the
 * canvas wordmark both read this list so they cannot drift.
 */
export const FIELD_BAND_UNITS: readonly [FieldBandInk, number][] = [
  ['crest', 3],
  ['hover', 1],
  ['lit', 3],
  ['mid', 2],
  ['dim', 4],
]

export const FIELD_BAND_ROWS = FIELD_BAND_UNITS.reduce(
  (sum, [, units]) => sum + units,
  0,
)

/** One ink per unit, for a lattice whose height is FIELD_BAND_ROWS. */
export function fieldBandRowInks(): FieldBandInk[] {
  const rows: FieldBandInk[] = []
  for (const [ink, units] of FIELD_BAND_UNITS) {
    for (let i = 0; i < units; i++) rows.push(ink)
  }
  return rows
}
