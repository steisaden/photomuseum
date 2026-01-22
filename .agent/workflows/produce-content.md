---
description: Turn diffs/changes into tutorials and content assets.
---

# Content Producer Workflow

This workflow executes the Content Producer mission: turning technical changes into verifiable content assets.

## 1. Prepare Inputs
Ensure you have the following inputs ready from the user or the codebase history:
- **Diff/Changeset**: The raw code changes (from `git diff` or a specific commit).
- **Context/Summary**: A PR description, commit message, or brief explanation of the "Why".
- **Visuals**: (Optional) Screenshots or screen recordings if UI is involved.

## 2. Generate Content Pack
Use the `artifact-content-pack.md` template to structure the output.

1. **Verify Claims**: Check every claim in the content against the diff. If not supported by the diff, mark it as "Unverified" or remove it.
2. **identify Hero Change**: Pick the single most impactful change to feature.
3. **Draft Assets**: Fill in the Script, Post, and Release Notes sections.

## 3. Review and Redact
- **Hard Stop Check**: Are any secrets exposed in the inputs or outputs? Redact them immediately.
- **Tone Check**: Ensure the tone matches `.agent/memory/voice.md`.

## 4. Final Output
Present the completed Content Pack to the user.
