# Project Brief

## Product
Antigravity Museum Galaxy portfolio experience: four museum-style buildings connected by an
S-shaped galaxy path (the "S" for Stephen) inside Google Antigravity.

## Users
- Visitors exploring a calm, premium, museum-grade environment.
- Potential licensees reviewing works for personal, editorial, or commercial use.

## Problem
Deliver a real, architectural, collectible-feeling portfolio world where art comes first and
commerce is secondary and non-intrusive.

## Platforms
- Google Antigravity

## Stack
- Unspecified in build spec (to be defined).

## Constraints
- Unit scale: 1 unit = 1 meter; camera height 1.65m.
- Walk speed 4.5 m/s; run speed 7 m/s; galaxy autopilot 18-25 m/s with easing.
- Four museums on a three-arc S-curve spline path; Stephen Gateway is the spawn hub.
- Gallery widths: primary 8m, secondary 6m; ceiling height 10m.
- Art is the brightest object in view; lighting and sound guide movement.
- 3D scene is immutable; content injected via manifest and frame IDs.

## Coordination Mode
Autonomous

## Coordination Mode Notes
- Set to `Autonomous` to allow the Orchestrator to dispatch specialists directly.
- Set to `Courier` to require human relay and enforce STOP after Task Assignments.

## Non-goals
- Gamified experiences or intrusive commerce.
- Redesigning the environment if the build spec is followed.

## Success Metrics
- Unspecified in build spec (to be defined).

## Notes
- Systems are modular, tokenized, and non-destructive.
