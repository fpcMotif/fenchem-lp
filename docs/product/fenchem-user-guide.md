# Fenchem Product Documentation

Last updated: 2026-06-12

This guide explains the current Fenchem web experience for regular users. It is written as a living record: when the product changes, update the relevant section, add or replace screenshots, and append a short note in the update log.

## Current Product Scope

The current public experience is the Fenchem landing page at `/`. It helps ingredient buyers understand Fenchem's ingredient categories, quality process, global support footprint, and the fastest way to request specifications or documentation.

The page is a single-page journey with anchored sections. Most actions either scroll to another section or open a prefilled email draft to Fenchem sales.

## Evidence Screenshots

- [Home hero](./screenshots/01-home-hero.png)
- [Quality section](./screenshots/02-quality-section.png)
- [Industries section](./screenshots/03-industries-section.png)
- [Global supply section](./screenshots/04-global-supply-section.png)
- [Contact section](./screenshots/05-contact-section.png)
- [Skip link result](./screenshots/06-skip-link-result.png)
- [Mobile hero](./screenshots/07-mobile-hero.png)
- [Preview-only todos route](./screenshots/08-todos-route.png)
- [Preview-only dashboard route](./screenshots/09-dashboard-route.png)
- [Enlarged mobile text check](./screenshots/10-enlarged-mobile-check.png)

## Main Page: Fenchem Landing Page

Path: `/`

Purpose: give formulation, procurement, and technical buyers a quick route from product interest to a documentation request.

### Hero

What users see:

- Fenchem brand name.
- A short statement about production-ready botanical and functional ingredients.
- Trust signals: 25+ years of expertise, 40+ countries supported, and ISO/GMP quality systems.
- Primary actions: `Explore portfolio`, `Request documentation`, and `Request specs`.

Why it is useful:

- It immediately confirms the company focus and gives buyers a low-friction path to either browse categories or ask for documents.

### Header Navigation

Buttons and links:

| Entry point     | What happens after click                                                                         | Why it is useful                                                       |
| --------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `Fenchem` brand | Moves the page back to the top hero section.                                                     | Gives users a familiar reset point.                                    |
| `Industries`    | Scrolls to the supply-ready applications section and updates the URL to `#industries`.           | Lets users jump straight to ingredient use cases.                      |
| `Quality`       | Scrolls to quality proof and updates the URL to `#quality`.                                      | Helps compliance-focused users see process and certifications quickly. |
| `Global Supply` | Scrolls to regional support and updates the URL to `#global-supply`.                             | Shows where Fenchem supports buyers globally.                          |
| `Contact`       | Scrolls to the contact footer and updates the URL to `#contact`.                                 | Takes users directly to inquiry guidance and contact actions.          |
| `Request specs` | Opens an email draft to `sales@fenchem.com` with a partnership inquiry subject and starter body. | Gives buyers a direct request path without searching for an address.   |

Mobile behavior:

- The same navigation links and `Request specs` action remain visible on a narrow viewport.
- Browser inspection confirmed no horizontal overflow at 390px wide.

### Explore Portfolio

Entry point: `Explore portfolio`

Post-click behavior:

- Scrolls to `#industries`.
- Shows ingredient application cards and buyer-oriented proof points.

Why it is useful:

- Buyers who are still browsing can review categories before contacting Fenchem.

### Request Documentation

Entry point: `Request documentation`

Post-click behavior:

- Opens an email draft to `sales@fenchem.com`.
- The subject is set to a quality documentation request.
- The body asks for specifications, lead times, and documentation.

Why it is useful:

- Quality and regulatory users can request the paperwork they need without composing a message from scratch.

## Section: Supply-Ready Applications

Anchor: `#industries`

What users see:

- A short explanation that the page is organized around direct ingredient categories and clear contact routes.
- Four proof cards:
  - Nutrition actives.
  - Food and beverage.
  - Personal care.
  - Documentation first.

Interactions:

| Element     | What happens                                         | Notes                                            |
| ----------- | ---------------------------------------------------- | ------------------------------------------------ |
| Proof cards | Cards visually lift and images subtly zoom on hover. | The cards are informational, not links.          |
| Card images | Images include descriptive alternative text.         | Supports users who rely on assistive technology. |

Why it is useful:

- Users can quickly match Fenchem's offer to their application area before asking for samples, specifications, or dossiers.

## Section: Quality Process

Anchor: `#quality`

What users see:

- The message: "Every lot has a paper trail before it has a sales story."
- Certification badges: ISO 9001, FSSC 22000, GMP, HACCP, Kosher, and Halal.
- Four quality steps:
  - Source by origin.
  - Validate identity.
  - Match the format.
  - Release with proof.

Interactions:

| Element                | What happens  | Notes                                              |
| ---------------------- | ------------- | -------------------------------------------------- |
| Certification badges   | Display only. | They summarize quality systems at a glance.        |
| Numbered process steps | Display only. | They explain the journey from sourcing to release. |

Why it is useful:

- It reassures technical and compliance buyers that Fenchem can support traceability, identity validation, format matching, and release documents.

## Section: Ingredient Portfolio

What users see:

- Three grouped ingredient lists:
  - Nutrition.
  - Food & Beverage.
  - Personal Care.
- Examples include Ashwagandha KSM-66, Lutein, Astaxanthin, Coenzyme Q10, Curcumin, Phytosterols, Hyaluronic Acid, and Beta-Carotene.
- Each ingredient includes a short specification or format note.

Main action:

| Entry point            | What happens after click                                                                  | Why it is useful                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `Ask for a spec sheet` | Opens an email draft to `sales@fenchem.com` with an ingredient portfolio inquiry subject. | Helps users request detailed product sheets from the portfolio area. |

Why it is useful:

- Buyers can scan representative products and formats before starting an inquiry.

## Section: Global Supply

Anchor: `#global-supply`

What users see:

- Fenchem's global support message.
- Regional support tiles:
  - Nanjing: Headquarters and R&D.
  - Hackensack: Americas support.
  - Frankfurt: European compliance.
  - Johannesburg: Africa gateway.
  - Sao Paulo: LATAM supply.
  - Kuala Lumpur: Southeast Asia logistics.

Interactions:

| Element      | What happens                 | Notes                                   |
| ------------ | ---------------------------- | --------------------------------------- |
| Region tiles | Tiles change color on hover. | The tiles are informational, not links. |

Why it is useful:

- Users can understand where Fenchem has commercial, compliance, and logistics support before making contact.

## Section: Contact Footer

Anchor: `#contact`

What users see:

- A prompt to tell Fenchem what they are formulating.
- Guidance on what to include:
  - Target ingredient or blend.
  - Delivery format and annual volume.
  - Destination market and compliance needs.

Buttons:

| Entry point               | What happens after click                                                        | Why it is useful                                          |
| ------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `Contact technical sales` | Opens an email draft to `sales@fenchem.com` with a partnership inquiry subject. | Helps users start a complete inquiry quickly.             |
| `Review portfolio`        | Scrolls back to `#industries`.                                                  | Lets users revisit ingredient categories before emailing. |

## Keyboard Accessibility

Entry point: `Skip to ingredients`

Post-click behavior:

- The skip link appears when keyboard users tab into the page.
- Pressing Enter jumps to `#industries`.

Why it is useful:

- Keyboard and screen-reader users can bypass the hero and reach the ingredient content faster.

## Current Preview Boundaries

The public landing page is the current documented product experience.

The app also has starter routes that are not ready as regular user features in the current preview runtime:

| Path         | Current behavior in browser inspection                | User-facing status                    |
| ------------ | ----------------------------------------------------- | ------------------------------------- |
| `/todos`     | Shows an error screen instead of a working task list. | Do not present as a user feature yet. |
| `/dashboard` | Shows the starter shell and loading state only.       | Do not present as a user feature yet. |

## Update Checklist

Use this checklist whenever the product changes:

1. Start the local runtime and open the app in a real browser.
2. Capture fresh screenshots for every changed page or interaction.
3. Click each navigation link, call to action, form control, and state-changing element.
4. Record the post-click result in user language.
5. Update the relevant page or section above.
6. Add new screenshots to `docs/product/screenshots/`.
7. Keep preview-only or unfinished routes in `Current Preview Boundaries` until they are ready for regular users.
8. Append a dated note to the update log.

## Update Log

### 2026-06-12

- Created the first user-facing documentation set from the live local app at `http://localhost:3001`.
- Captured desktop, mobile, anchor-navigation, contact, and preview-route screenshots.
- Confirmed the current public product scope is the Fenchem landing page.
- Recorded `/todos` and `/dashboard` as preview-only routes in the current runtime.
