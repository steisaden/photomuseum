# Auto-Versioning & Change Logs

## Goal
Track every agent prompt change with a reversible, attributable history.

## Files
- .agent/VERSION (studio version)
- .agent/CHANGELOG.md (studio changelog)
- .agent/agents/<agent>.md (agent prompt with frontmatter)
- .agent/agents/CHANGELOG/<agent>.md (per-agent changelog)

## Process
When any agent prompt changes:
1) Increment .agent/VERSION (patch by default)
2) Add entry to .agent/CHANGELOG.md
3) Add entry to per-agent changelog
4) Update agent frontmatter:
   - version
   - updated_at
   - change_summary

## Agent Frontmatter
Every agent prompt must include:
- agent
- version
- updated_at
- change_summary
- mode

## Changelog Entry Format
- Date
- Version
- What changed
- Why changed
- Compatibility notes
