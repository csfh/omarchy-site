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
 * Band heights in letter-cell units: 3, 1, 3, 2, 4. A unit is one square of
 * the wordmark grid (the 51-wide cell), not one 50-tall bitmap row and not
 * 1/13 of the 19-row slot. The CSS mask and the canvas both read this list.
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

/**
 * Ink at `y` pixels from the word's top, when one band unit is `unit` pixels
 * (the square column cell). Past the 13 units, the last ink continues.
 */
export function fieldBandInkAt(y: number, unit: number): FieldBandInk {
  const last = FIELD_BAND_UNITS[FIELD_BAND_UNITS.length - 1]![0]
  if (unit <= 0) return last
  const t = y / unit
  let acc = 0
  for (const [ink, units] of FIELD_BAND_UNITS) {
    acc += units
    if (t < acc) return ink
  }
  return last
}

/** CSS linear-gradient stops: n units of `--pxc`, last band to 100%. */
export function fieldBandGradientCss(
  colorOf: (ink: FieldBandInk) => string = (ink) => `var(--t-field-${ink})`,
): string {
  const stops: string[] = []
  let acc = 0
  for (const [ink, units] of FIELD_BAND_UNITS) {
    const from = acc
    acc += units
    const color = colorOf(ink)
    const start = from === 0 ? '0' : `calc(${from} * var(--pxc))`
    const end =
      acc === FIELD_BAND_ROWS ? '100%' : `calc(${acc} * var(--pxc))`
    stops.push(`${color} ${start} ${end}`)
  }
  return `linear-gradient(to bottom, ${stops.join(', ')})`
}
