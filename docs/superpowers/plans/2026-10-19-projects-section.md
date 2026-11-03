# Projects Section Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make the projects section help hiring managers quickly recognize shipped client work, understand Yousef's contribution, and inspect credible evidence for his strongest projects.

**Architecture:** Keep the current static HTML, CSS, and JavaScript structure. Refine the projects section in `index.html` and its existing styles in `styles.css`; update project detail pages only where a stronger case-study story or already-available screenshots can be added without inventing facts. Keep the existing colors, theme toggle, links, and project page pattern.

**Tech Stack:** HTML, CSS, vanilla JavaScript; no new dependencies.

**Spec:** User request in this conversation: improve the portfolio's projects section. Design direction: foreground shipped HealthyNutrition client work; make project ownership and evidence easier to scan; keep the established navy/teal identity and avoid unsupported claims.

## Global Constraints

- Preserve the current HTML/CSS/vanilla JavaScript stack and existing theme behavior.
- Do not invent metrics, responsibilities, user counts, or outcomes; use only evidence already present or supplied by the owner.
- Keep the Google Play, GitHub, case-study, and contact links working.
- Preserve keyboard accessibility, visible focus, reduced-motion support, and readable dark/light themes.
- Keep the change limited to the projects section and directly related project detail pages.

## Review Focus

- Narrow mobile screens: project media, title, date, tags, and actions remain legible and do not overflow.
- Light and dark themes: card text, muted text, borders, status labels, and screenshots keep adequate contrast.
- Reduced-motion preference and touch devices: the section remains usable without hover or entrance animation.
- Sparse imagery: cards retain a deliberate layout when only a cover image is available.
- Truthful ownership: team work and client work distinguish Yousef's contribution from overall project scope.

---

## Design Direction

The current section already has a coherent navy/teal theme, project groupings, featured cards, and an archive. Retain those foundations. Spend the visual emphasis on one lead project, HealthyNutrition, because it is client work with an Android release; follow it with a compact set of technically substantial projects. Reduce repeated prose so a visitor can scan project, role, proof, and next action in that order. Use real app imagery already in the repository where available, and keep card visuals simple when only a cover exists.

## File Map

- `index.html` — project ordering, concise summaries, contribution labels, evidence, and actions.
- `styles.css` — featured project hierarchy, card density, image treatment, responsive behavior, and existing theme variants.
- `projects/healthynutrition-freelance.html` — stronger client case-study structure and use of available app screenshots.
- `projects/moi-digital-reporting-system.html` — clarify contribution and evidence for the multi-role reporting project.
- `projects/cancerscan.html` — clarify contribution and evidence; show the existing gallery assets if present.
- Other project detail pages — only touch if the implementation needs consistent ownership labels or if verified imagery is available.

## Implementation Tasks

### Task 1: Establish the featured-project hierarchy

**Files:** `index.html`, `styles.css`

- [x] Make HealthyNutrition the lead project with a distinct but restrained media-and-copy layout that identifies freelance client delivery and Google Play availability immediately.
- [x] Place the strongest remaining projects after it based on evidence and technical depth; keep older or lighter projects in the existing archive group.
- [x] Shorten each featured card to a clear problem/product sentence, a small number of evidence-backed highlights, a role/contribution cue, and its primary action.
- [x] Preserve existing project titles, destinations, dates, and factual claims unless a specific correction is supported by the portfolio content.
- [x] Check the section at desktop and narrow mobile widths in both themes; confirm headings, controls, and card layouts remain usable.

### Task 2: Improve the featured project evidence

**Files:** `index.html`, `projects/healthynutrition-freelance.html`, `projects/moi-digital-reporting-system.html`, `projects/cancerscan.html`, and only the relevant project assets already in `img/`.

- [x] Align each featured card's promised case-study link with the content on its detail page.
- [x] Give the three leading projects a consistent, easy-to-scan case-study flow: context, Yousef's contribution, implementation highlights, evidence/screenshots, and links.
- [x] Use available screenshots in project galleries where they exist; do not label a cover as a full walkthrough or claim a screenshot depicts a feature it does not show.
- [x] Distinguish individual ownership from team project scope, especially on DEPI/graduation work.
- [x] Retain current outbound links and add no unverified metrics.

### Task 3: Polish scanability and finish

**Files:** `index.html`, `styles.css`, and `script.js` only if new interaction needs behavior.

- [x] Remove repeated detail between card summary, highlights, and technology tags; keep technology tags secondary to outcomes and contribution.
- [x] Ensure action labels explain whether they open a case study, repository, or store listing.
- [x] Confirm all project images have useful alt text and reserved dimensions so loading does not shift the cards.
- [ ] Confirm keyboard focus, touch behavior, reduced-motion handling, and dark/light contrast for the finished section.
- [x] Make no unrelated edits to the rest of the portfolio.

## Acceptance Checks

- A visitor can identify the live client app and open its store listing or case study without scanning the full page.
- The first three projects explain what the product is, what Yousef did, and what evidence is available.
- No project card promises more evidence than its detail page actually contains.
- The archive remains available without competing visually with the lead projects.
- The section reads and works at desktop and mobile sizes in both themes and with reduced motion.


Implementation note: Code changes applied in the current workspace. Visual browser review completed at desktop, 890px tablet, and 390px mobile widths. Compared the user's reference portfolio and adopted its roomier two-column rhythm while keeping this portfolio's navy/teal identity, screenshots, and contribution notes; the final featured team project is centered at the same card width. The tablet header now keeps the logo on one line, and the mobile menu opens and closes correctly. Corrected an archive button label that pointed to a GitHub profile rather than a repository. Reduced-motion behavior and automated tests were not run.
