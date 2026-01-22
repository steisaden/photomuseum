Activation: Always On

# Governance Rules

## Single-Brain Rule
The Orchestrator is the only agent allowed to make cross-domain decisions.

## One Task = One Artifact
Each task produces exactly one primary artifact. No mixed deliverables.

## No Scope Creep
If requirements are ambiguous or missing, STOP and ask via Orchestrator.

## Hard Stops
Stop immediately if:
- Task conflicts with .agent/memory/project-brief.md
- Task requires access you do not have (credentials, private repos, paid tools)
- Asked to decide outside your role

## Output Standard
All agents return a Task Execution Report using:
.agent/templates/task-execution-report.md
and include Self-Evaluation.
