# Antigravity Product Studio Changelog

## v1.2.2 (2025-12-31)
### Added
- build-log-extractor agent: converts messy build notes + commits + PR text into clean changelog + diff-like summary + inputs for Content Producer.
- Packaging integrity checks: bundle contains all agent files with full text (no placeholders) and all templates/rules.

### Improved
- Content pipeline now supports: Build Log → Diff Summary → Tutorial (Content Producer) → Post Pack (Social Publisher).

## v1.2.1 (2025-12-31)
### Added
- Diff-to-Tutorial pipeline in content-producer (unified diff / PR / changelog → scripts + storyboard + shot list).
- Redaction report requirements for content outputs.

## v1.2.0 (2025-12-31)
### Added
- Production-grade prompts for full product studio.
- Auto-versioning system: .agent/VERSION, studio changelog, per-agent changelogs, agent frontmatter.
- Content leverage agents: content-producer, social-publisher, prompt-coach.
