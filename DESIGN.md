# We Can Build That — Design System

**Direction: House Blue.** Locked. The logo's own azure-on-cream palette, with softened
geometry to match the wordmark's rounded character. See `PRODUCT.md` for the brief and
`directions-v2.html` for the alternatives that were considered and set aside.

Any color, size, or radius not in this document is not in the system. If a new screen
seems to need one, amend this file rather than inventing a value inline.

## Color

Every ratio below was computed against the actual hex pairs, not estimated.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--cream` | `#F4F1E9` | Page ground | — |
| `--white` | `#FFFFFF` | Raised cards, panels | — |
| `--ink` | `#1B1A17` | Headings, primary text | 15.42:1 on cream · 17.4:1 on white |
| `--body` | `#4F4B42` | Body copy | 7.7:1 on cream · 8.69:1 on white |
| `--muted` | `#6B6558` | Labels, meta, captions | 5.13:1 on cream · 5.79:1 on white |
| `--azure` | `#227ADF` | **Logo only**, plus non-text fills ≥24px (rules, bars) | 3.78:1 on cream — large-scale only |
| `--blue` | `#1560B8` | All accent *text* and interactive fills | 5.48:1 on cream · 6.18:1 on white |
| `--blue-deep` | `#0F4A91` | Full-bleed contrast band ground | white on it: 8.72:1 |
| `--blue-pale` | `#8FC2FF` | Accent text *on* `--blue-deep` only | 4.7:1 on blue-deep |
| `--line` | `#E0DACB` | Hairline rules, card borders | — |
| `--line-soft` | `#EFEADC` | Interior dividers inside cards | — |

### The azure/blue split — the one rule that matters most

The brand azure `#227ADF` fails AA for body-sized text on cream at 3.78:1. It is correct
for the logo artwork and for chunky non-text elements, and wrong for anything a person
has to read or click. `#1560B8` is the working accent — visibly the same brand blue,
legible at text size.

Never put `--azure` on a link, a button, a label, or body copy. Never put `--blue-pale`
on anything except the `--blue-deep` band.

## Typography

- **Display:** `Bricolage Grotesque` — 800 for headlines, 600 for section and card
  headings. Variable optical sizing; characterful without being novelty. Chosen because
  it echoes the logo's geometric warmth without imitating Baloo.
- **Body:** `Inter Tight` — 400/500/600. Tighter than stock Inter, which keeps long
  paragraphs compact next to the large display sizes.
- **Mono:** `JetBrains Mono` — 400/500. Small labels and numeric metadata only, never
  body copy.

| Level | Size | Weight | Tracking | Height |
|---|---|---|---|---|
| Display / h1 | `clamp(40px, 6vw, 64px)` | 800 | -0.045em | 0.96 |
| Section / h2 | `clamp(28px, 3.4vw, 40px)` | 800 | -0.035em | 1.03 |
| Card / h3 | 17–19px | 600 | -0.02em | 1.25 |
| Body | 16px (15px dense) | 400 | 0 | 1.62 |
| Small / meta | 12.5–13.5px | 400–500 | 0 | 1.56 |
| Mono label | 10–11px | 500 | 0.08em | 1.4 |

Headlines use one lighter-weight colored phrase for emphasis (`--blue`, weight 400
against the 800 ground). Use this **at most twice on the page** — the previous build ran
the same trick in every headline, which is what made it read as templated.

## Geometry and depth

Softer than a typical technical system, deliberately: the wordmark is rounded, and hard
0px corners next to it read as a mismatch.

- Radii: `4px` small (tags, bars) · `7px` buttons and inputs · `14px` cards and panels
- Borders: 1px `--line`. **Rules over shadows** — a hairline is the default separator.
- Shadow: exactly one, `0 1px 2px rgba(27,26,23,.05)`, on raised white cards only. No
  large ambient shadows, no glow, no blur effects anywhere.
- Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 104
- Container: `max-width 1180px`, side padding `clamp(20px, 5vw, 48px)`

## Motion

Low-to-mid budget. The brand is calm; motion should confirm interaction, not perform.

- Transitions: 180ms for hover/focus, 420ms for scroll reveals. Easing
  `cubic-bezier(.16,1,.3,1)`.
- Scroll reveal: 12px rise plus fade, once, staggered no more than 3 items deep.
- Hover: buttons darken and lift 1px. Links shift their underline. No scale transforms
  above 1.02, no rotation, no parallax.
- All of it wrapped in `prefers-reduced-motion: reduce`.

## Imagery

The previous build used AI-render stock (a glowing datacenter, a generic workspace).
Replace with real photography as it becomes available. Until then, prefer typographic and
structural treatments over placeholder imagery — an honest empty state reads better than
a fake one.

When real photos arrive: tight macro detail over wide establishing shots — a print bed's
layer lines, a terminated keystone jack, a rack's cable comb. Treatment is
`saturate(.92)`, no duotone, no heavy overlay.

## Section rhythm

The single biggest fix from the old build, which ran centered-eyebrow → h2 → subhead →
N-column-grid four times consecutively. Each section here has a distinct shape:

1. **Hero** — asymmetric split, text left, stat card right
2. **Services** — three columns divided by vertical rules, no cards, no icons
3. **Process** — two columns: heading parked left, steps stacked right against rules
4. **Work** — asymmetric grid, one large tile plus two small
5. **Proof** — full-bleed `--blue-deep` band, one large quote, not a row of cards
6. **Estimate** — split panel, form-adjacent
7. **Footer** — dense, multi-column, mono labels

Eyebrow labels appear **twice on the page maximum**. Icon-in-a-circle is banned outright;
it was the only visual variety in the old build and it flattened everything.

## Standing prohibitions

Carried from the audit, plus general anti-slop:

- No eyebrow above every section · no `SECTION 01` meta-labels as visible copy
- No icon-in-circle repetition · no blur/glow orbs · no gradient text
- No centered-everything — hero and most sections are asymmetric
- No unfalsifiable stats (`100% Client Satisfaction`)
- No fabricated testimonials or case studies presented as real
