# Project Detail Pages Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all seven static project detail pages read as cohesive, image-led case studies that help visitors understand the work and Yousef's role.

**Architecture:** Keep the existing shared static HTML, CSS, and JavaScript setup. Standardize the page structure across all detail pages, style it in `project-page.css`, and use `project-page.js` for shared theme, screenshot navigation, and the existing CancerScan lightbox behavior.

**Tech Stack:** HTML, CSS, vanilla JavaScript; no new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-19-project-detail-redesign.md`

## Global Constraints

- Use only verified text and image assets already in the portfolio.
- Preserve existing working project and navigation destinations.
- Keep dark/light theme behavior and keyboard focus visible.
- Use actual screenshots when available; do not fabricate screens for projects without them.
- Keep the existing static stack and avoid adding dependencies.

## Review Focus

- Very narrow screens: headings, actions, chips, and screenshot controls must wrap without horizontal page overflow.
- Screenshot-rich projects: the hero collage and gallery must use the correct local assets and descriptive alt text.
- CancerScan's 29 images: navigation must remain usable without dozens of pagination dots.
- Sparse-image projects: retain a deliberate hero and omit empty galleries.
- Theme and motion settings: maintain contrast, visible focus, and reduced-motion behavior.

---

### Task 1: Establish the shared project detail shell

**Files:** `projects/project-page.css`, `projects/project-page.js`

- [ ] Replace the sparse generic hero treatment with a full-width media stage, project identity block, action row, overview/contribution layout, achievements, stack, and screenshot rail styles.
- [ ] Keep the existing navy/mint design tokens, theme persistence, visible focus, and reduced-motion rules; add responsive breakpoints for the media stage and content columns.
- [ ] Add accessible previous/next screenshot controls and a live image count for galleries; preserve the CancerScan lightbox keyboard close and focus behavior.

### Task 2: Rebuild the four main case studies

**Files:** `projects/healthynutrition-freelance.html`, `projects/moi-digital-reporting-system.html`, `projects/cancerscan.html`, `projects/depi-hospital-complaint-system.html`

- [ ] Use real existing app screenshots in the hero stage and gallery for each page; keep project status limited to verified status.
- [ ] Standardize page order: back navigation, media stage, title/summary/actions, About and personal contribution, achievements, tech stack, screenshots where available.
- [ ] Keep client, graduation, and DEPI team ownership distinctions accurate; retain valid outbound links.

### Task 3: Rebuild the three archive project details

**Files:** `projects/collaborative-shopping-list.html`, `projects/weather-app.html`, `projects/coffee-app.html`

- [ ] Apply the same page shell and content order using only the available project descriptions, highlights, stack, and imagery.
- [ ] Use the existing icon/cover for Collaborative Shopping List and the available cover for Weather; do not add a screenshot gallery where no screenshot sequence exists.
- [ ] Use existing Coffee App screen assets for the hero and gallery; make its GitHub destination label accurate.

### Task 4: Review the rendered pages

**Files:** all seven project-detail pages and the shared project-page assets.

- [ ] Open HealthyNutrition, MOI, CancerScan, DEPI, and one archive detail page through the local server; inspect desktop and narrow mobile layouts in both themes.
- [ ] Verify screenshot navigation and CancerScan's image preview with keyboard input; check all referenced local images exist.
- [ ] Fix any visual or navigation issues found. No automated tests are required for this static visual update.

