# We Can Build That — Project Brief

Phase 0 intake doc. This is the source of truth for design decisions. If a later choice
is disputed, resolve it against this document rather than re-litigating from taste.

## What the business is

A Northern California technology company (Sacramento / Elk Grove / Folsom area) operating
as a BlackMountain Development Company. Three services:

1. **Web development & design — the lead offer.** Custom sites and web applications.
   This is the primary revenue driver and should headline the site.
2. **3D printing & prototyping — supporting.** Rapid prototyping, CAD support, custom
   enclosures and mechanical parts.
3. **Network infrastructure — supporting.** Structured cabling (Cat6A/fiber), Wi-Fi
   design and deployment, server room and rack build-out.

The through-line worth naming: all three are *building physical and digital
infrastructure that has to actually work*. That's a more coherent story than "three
pillars of digital excellence," which says nothing.

## What the site needs to do

Sell the range while leading with web. The buyer is a local business owner or operations
lead who needs something built and wants confidence it'll be done properly. Primary
action is a consultation or estimate request — this is a services business with a
considered sale, not a self-serve product.

Arrival mood is mostly warm: referral, local search, or word of mouth. Not cold ad
traffic. That means the page can afford to be calm and substantive rather than
aggressively persuasive.

## Personality

Calm and premium. Quiet confidence — lets the work speak rather than making loud claims.
Competent, local, precise. Not corporate-enterprise, not startup-hype, not
handyman-casual.

## Anti-references

Things this site should specifically not resemble:

- **Its own current state.** See the audit below.
- Generic agency templates — the centered-eyebrow-headline-subhead-3-column-grid rhythm
  repeated down the page.
- Big-box IT/MSP marketing — stock photos of people in headsets, "solutions" language.
- Wix/Squarespace-default local business sites, which is what most NorCal competitors
  look like. Differentiating from this is a real commercial advantage.

## Current state audit (index-full.html)

The existing full build has usable content and structure, but the visual system triggers
most of the playbook's banned-pattern list. What's being fixed:

| Issue | Where |
|---|---|
| Eyebrow label above every single section | 6 of 6 sections use `.section-tag` |
| Meta-label numbering as visible copy | Process steps "01 / 02 / 03" |
| Icon-in-a-circle as the only visual variety | Service cards, process steps, testimonial avatars — same rounded accent-light square everywhere |
| Identical block rhythm section after section | Centered eyebrow + h2 + subhead + N-column grid, four times running |
| Same headline trick three times | Serif + italic-light colored span: "Digital Future." / "Real People" / "in mind?" |
| Blur-glow orbs | CTA section, `blur-3xl` accent circles — a strong AI-template tell |
| Everything centered | Almost no asymmetry or focal hierarchy anywhere |
| Stock-AI imagery | `hero_tech.png` datacenter render, `web_design.png` workspace |
| Copy describes the company, not the client outcome | "Three pillars of digital excellence — each delivered with precision, performance, and a premium finish" |

### Two credibility problems that need a decision

- **"100% Client Satisfaction"** in the stat row. Unfalsifiable claims like this reduce
  trust rather than build it, especially next to "200+ Projects Delivered." Recommend
  replacing with something specific and verifiable.
- **The three testimonials** (Marcus T., Jennifer R., David K.) and the portfolio entries
  (FinTech Client Portal, Custom Enclosure Prototyping, Corporate Campus Network) read as
  invented placeholders. If they are, they can't ship as-is — fabricated testimonials on
  a live commercial site are a real legal and reputational exposure. Either substitute
  real ones with permission, or restructure those sections to sell process and capability
  instead of borrowed proof. **Open question for the client.**

## Constraints

- Static multi-page HTML: `index.html`, `portfolio.html`, `estimator.html`,
  `contact.html`. Currently `index.html` is a coming-soon holding page; the real
  homepage is parked in `index-full.html`.
- Existing build uses Tailwind via CDN plus Material Symbols and Google Fonts. The CDN
  approach is fine for prototyping but shouldn't ship as the production path.
- There's a working cost estimator (`estimator.html`) — preserve its logic through any
  visual rewrite.
- Git repo with five commits of history. Work on the redesign without destroying the
  coming-soon page until there's an explicit swap.
- **Logo is fully open.** The current blue Baloo-style wordmark on cream is not locked;
  identity is in play as part of this project. This matters because the current mark
  reads friendly-approachable, which fights the calm-premium personality above.

## Stale assets

Leftover images from an earlier positioning as a luxury development/remodeling business:
`kitchen_luxury.png`, `villa_exterior.png`, `interior.png`, `commercial.png`,
`office_modern.png`. Not relevant to the current business. Leave in place for now, don't
reference them.

## Out of scope

4EverFit is not part of this project — no case study, no screenshots, no mention.
Portfolio section gets designed with placeholders, ready for real work to drop in.
