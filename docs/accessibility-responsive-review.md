# Accessibility and Responsive Review

Date: 2026-06-12

## Scope

- Public landing page at `/`
- Shared app shell fallback behavior for auth loading
- Sign-in and sign-up form semantics
- Existing landing e2e coverage across desktop, tablet, mobile, reduced motion, keyboard, and enlarged text

## Issues Found and Fixed

| Area               | Issue                                                                                                                      | Fix                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Mobile navigation  | Primary landing navigation was hidden below `md`, so mobile users had weaker access to core sections.                      | Made primary navigation visible on mobile with wrapping layout and stable tap targets.                                     |
| Keyboard focus     | Landing links relied on limited custom focus styling, and several interactive anchors had no explicit visible focus state. | Added focus-visible outlines to landing links and global fallback focus styles for native interactive elements.            |
| Touch targets      | Header links and text links could render below a 40px target height.                                                       | Added minimum heights to landing navigation and CTA links; added e2e coverage for visible links/buttons.                   |
| Font scaling       | Large fixed mobile headings and tracked uppercase labels increased overflow risk after text enlargement.                   | Reduced mobile heading pressure, removed custom letter spacing in landing microcopy, and added enlarged-text e2e coverage. |
| Contrast           | Footer legal text and several muted content blocks used low-opacity foregrounds.                                           | Raised muted text opacity on light and dark surfaces; footer legal copy now clears small-text contrast more comfortably.   |
| Motion preferences | Hover/image transitions could still animate for users who request reduced motion.                                          | Added a reduced-motion media query that effectively disables animations and transitions.                                   |
| Image separation   | Proof-card images had no non-layout-affecting edge treatment.                                                              | Added inset image outlines for clearer edges on light surfaces.                                                            |
| Status semantics   | Auth loading state was plain text.                                                                                         | Marked auth loading as `role="status"` with polite live announcement.                                                      |
| Form semantics     | Validation errors were visible but not programmatically associated with fields.                                            | Added `required`, `autocomplete`, `aria-invalid`, `aria-describedby`, and `role="alert"` to sign-in/sign-up fields.        |

## Coverage Added

- Mobile primary navigation visibility
- Header keyboard focus visibility
- Enlarged text at a 320px viewport without horizontal clipping
- Minimum 40px visible target size across tiny mobile, mobile, tablet, desktop, and wide desktop viewports

## Remaining Risks

- Authenticated dashboard and todo routes still depend on Convex runtime data, so full interactive screen-reader and async error-state validation should be repeated once real backend URLs are configured.
- The user menu relies on Base UI dropdown behavior for Esc handling and roving focus; it should be manually checked when authenticated test fixtures exist.
- This pass used lightweight contrast calculation and targeted browser assertions, not a full axe-core audit because the project does not currently include an accessibility audit dependency.
