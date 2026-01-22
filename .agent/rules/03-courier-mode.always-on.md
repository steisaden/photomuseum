Activation: Always On

# Courier Mode

Default: assume agents cannot initiate each other.

Autonomous override:
- If `.agent/memory/project-brief.md` includes `Coordination Mode: Autonomous`,
  agents may initiate other agents directly.
- The Orchestrator becomes the dispatch hub and must still emit formal Task Assignments
  and collect Task Execution Reports + Self-Evals.
- All autonomous dispatches must be recorded in `.agent/memory/decisions-log.md`.

Human responsibilities (Courier Mode only):
- Paste Task Assignment to the assigned agent.
- Paste Task Execution Report back to Orchestrator.

Agents must not assume they can “look in the repo” unless given pasted inputs.
Chat is the bus; files are archival.
