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
 * Band heights: 4, 1, 4, 3, 5. That field is 17 units tall; the site
 * wordmark is 19 bitmap rows. One unit is 1/17 of the word.
 */
export const FIELD_BAND_UNITS: readonly [FieldBandInk, number][] = [
  ['crest', 4],
  ['hover', 1],
  ['lit', 4],
  ['mid', 3],
  ['dim', 5],
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

/** Ink at `t` of the way down the word (0 at the top, 1 at the bottom). */
export function fieldBandInkAtT(t: number): FieldBandInk {
  const last = FIELD_BAND_UNITS[FIELD_BAND_UNITS.length - 1]![0]
  const u = Math.min(1, Math.max(0, t)) * FIELD_BAND_ROWS
  let acc = 0
  for (const [ink, units] of FIELD_BAND_UNITS) {
    acc += units
    if (u < acc) return ink
  }
  return last
}

/** CSS linear-gradient: 4/17, 1/17, 4/17, 3/17, 5/17 of the word. */
export function fieldBandGradientCss(
  colorOf: (ink: FieldBandInk) => string = (ink) => `var(--t-field-${ink})`,
): string {
  const pct = (n: number) =>
    `${Math.round((n / FIELD_BAND_ROWS) * 100000) / 1000}%`
  const stops: string[] = []
  let acc = 0
  for (const [ink, units] of FIELD_BAND_UNITS) {
    const from = acc
    acc += units
    stops.push(`${colorOf(ink)} ${pct(from)} ${pct(acc)}`)
  }
  return `linear-gradient(to bottom, ${stops.join(', ')})`
}
