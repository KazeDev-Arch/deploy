/**
 * Transforme un texte en slug URL (kebab-case) : accents français supprimés,
 * ligatures résolues, caractères non alphanumériques remplacés par des tirets.
 *
 * @example slugify('Écrire en Français : le guide !') // 'ecrire-en-francais-le-guide'
 * @example slugify("L'observabilité au-delà des logs") // 'l-observabilite-au-dela-des-logs'
 */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // diacritiques (é → e, à → a, …)
    .replace(/æ/gi, 'ae')
    .replace(/œ/gi, 'oe')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
