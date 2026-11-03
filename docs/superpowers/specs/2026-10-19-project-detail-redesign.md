# Project Detail Pages Design

## Intent

Replace the current generic project-detail pages with a consistent, credible case-study layout inspired by the user's reference portfolio. The page should make the app visible first, explain the project's purpose and Yousef's own contribution, and then let a visitor inspect the implementation and screenshots.

## Audience and job

Hiring managers, engineering leads, and potential clients should be able to understand each project in a quick scan, then open the repository, store listing, or screenshots for evidence.

## Goals

- Give all seven project-detail pages one coherent, polished layout.
- Lead with real app imagery when screenshots are available; use existing covers honestly where they are not.
- Separate product context from Yousef's contribution, especially for team and graduation projects.
- Make the primary next action obvious and accurately named.
- Keep dark/light themes, keyboard access, reduced-motion support, and responsive layouts.

## Non-goals and anti-goals

- Do not copy the reference site's identity or exact visual treatment.
- Do not invent project status, metrics, ownership, screenshots, or outcomes.
- Do not add dependencies or change the site's static HTML/CSS/JavaScript stack.
- Do not use a fake app preview for projects without screenshots.

## Design direction

Retain the portfolio's own colors: deep navy `#0A192F`, slate blue `#112240`, mint `#64FFDA`, off-white `#F1F5F9`, and muted slate `#94A3B8`. Keep the existing Inter-led system font stack. The distinctive element is a wide, real screenshot stage above each case-study heading, followed by calm left-aligned editorial content and one restrained mint action.

```text
┌─────────────────────────────────────────────────────────────┐
│ Yousef Nagy                         Back to projects  Theme │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│          Wide app montage or honest project cover           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Project type / verified status                              │
│ Project title                                                │
│ One clear sentence about the product                         │
│ Repository / Google Play / contact                           │
├───────────────────────────────────┬─────────────────────────┤
│ About the project                 │ My contribution          │
├───────────────────────────────────┴─────────────────────────┤
│ Key achievements                                              │
│ Short, evidence-based points                                  │
├─────────────────────────────────────────────────────────────┤
│ Tech stack chips                                              │
├─────────────────────────────────────────────────────────────┤
│ Screenshots     [previous] [image rail with next controls]    │
└─────────────────────────────────────────────────────────────┘
```

At narrow widths, stack the two information columns and let the screenshot rail scroll with touch and keyboard controls. For projects with no screenshot sequence, omit the gallery rather than create an empty section.

## Decisions and rationale

- The reference puts a large project image before the summary; adopt that content order using the repository's actual app screens.
- The reference uses status labels; use only statuses already supported by the project (for example, HealthyNutrition is live on Google Play). Use project type/date labels elsewhere.
- The reference uses concise achievement bullets, technology chips, and a screenshot carousel; map those to existing factual content and accessible controls.
- Keep the brand's navy/mint palette and existing theme control so the project pages feel like part of the same portfolio rather than a copied site.
- Keep the three projects with genuine screenshot sequences (HealthyNutrition, MOI, CancerScan) richly illustrated. Add real Hospital and Coffee screens where available. Weather can use its current cover. Collaborative Shopping List has no supplied app screenshot, so use a deliberate typographic/icon cover and no screenshot gallery.

## Review against the brief

The chosen layout borrows the reference's content order and evidence-first approach. Its distinct identity remains the Yousef Nagy brand, navy/mint palette, existing screen assets, and clear contribution statements. The wide image stage is justified by the mobile-app subject matter; the rest of the page stays quiet and content-led.

## Constraints

- Keep all existing valid repository, Google Play, CV, contact, and back-to-project destinations.
- Preserve current theme persistence and the CancerScan lightbox behavior unless a shared accessible gallery replaces it.
- Use only assets already in `img/` and factual text already present in the project pages or portfolio.
- Project pages remain static documents using the existing `projects/project-page.css` and `projects/project-page.js`.

## Open implementation choices

- Exact hero screenshots and captions per project, selected from existing local assets.
- A horizontal scroll-snap screenshot rail with previous/next buttons and a visible image count; no 29-dot pagination for CancerScan.
- A shared compact summary layout, with About and Contribution columns only where the page has verified contribution text.
