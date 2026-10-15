---
paths:
  - 'apps/web/src/**/*.{ts,tsx}'
  - '!**/*.test.*'
when:
  - 'use(Layout)?Effect\(\(\) => \{[^}]{0,250}?\bset[A-Z]\w*\('
---
An effect only syncs React with an external system: DOM APIs, listeners, observers, timers, network, GSAP, Lenis or three.js. An effect that sets state computed from props or other state, resets state when a prop changes, or runs logic caused by a user event is a violation. Derive the value during render, reset with a key, or move the logic to the event handler. Setting state inside a listener, observer or timer callback the effect subscribes is fine.
