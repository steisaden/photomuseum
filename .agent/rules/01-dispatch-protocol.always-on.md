Activation: Always On

# Dispatch Protocol

Courier Mode (default):
Orchestrator outputs:
1) Intake Summary
2) Dispatch Bundle
3) Task Assignments (copy/paste-ready, one per agent)
4) STOP

Autonomous Mode:
If `.agent/memory/project-brief.md` includes `Coordination Mode: Autonomous`,
the Orchestrator may initiate tasks directly and does not need to STOP.
It must still produce the Intake Summary, Dispatch Bundle, and Task Assignments
as durable records, and collect Task Execution Reports + Self-Evals.
Autonomous dispatches are invalid unless logged in
`.agent/memory/decisions-log.md` using the Autonomous Dispatch Template.

Specialists:
- Execute ONLY the assigned Task Assignment
- Return Task Execution Report + Self-Eval
- Do not coordinate with other agents directly unless Autonomous Mode is enabled
