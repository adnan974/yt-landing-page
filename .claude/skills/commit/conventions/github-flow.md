# GitHub Flow Convention

## Format

GitHub Flow uses simple, descriptive commit messages without a strict type system.
Focus on clarity and describing what the code does, not just the change.

```
<short-description>

[optional longer description]

[optional footer(s)]
```

## Message Style

### Short Description (Required)

- Written in imperative mood: "add feature" not "added feature"
- Capitalize first letter
- No period at end
- Maximum 50 characters
- Should complete the sentence: "This commit will [your message]"

### Examples of Good Short Descriptions

✅ "Add user authentication"
✅ "Fix typo in README"
✅ "Refactor database connection pooling"
✅ "Remove deprecated API endpoint"
✅ "Update dependencies"

### Examples of Poor Short Descriptions

❌ "fixed stuff"
❌ "work in progress"
❌ "asdf"
❌ "Updated the thing"

## Long Description (Optional)

- Separate from short description by blank line
- Explain **why** this change was made
- Describe the problem being solved
- Include relevant context
- Wrap at 72 characters
- Use bullet points for multiple changes

Example:
```
Add API rate limiting

The API endpoints were receiving excessive requests from
unidentified clients, causing performance degradation.
Implementing rate limiting protects the service.

- Add rate limiter middleware
- Configure limits per endpoint type
- Log rate limit violations
```

## Footers (Optional)

- Reference related issues: `Closes #123`, `Fixes #456`
- Reference PRs: `Related to #789`
- Sign commits: `Signed-off-by: Author Name <email@example.com>`

## Related GitHub Features

When using GitHub Flow, reference issues directly in PR descriptions:

```
This PR closes #42
Fixes #51, #52
Related to #100
```

## Examples

**Simple change:**
```
Update authentication error messages
```

**Change with explanation:**
```
Add database connection retry logic

The application was experiencing transient connection failures
during database maintenance windows. Implementing exponential
backoff retry logic improves reliability without changing the API.
```

**Change with multiple items:**
```
Improve form validation and error display

- Add real-time email format validation
- Show inline error messages instead of alerts
- Highlight invalid fields with red border
- Add accessibility labels for screen readers

Closes #234
```

## Key Principles

1. **Clarity over convention** - GitHub Flow prioritizes readable messages
2. **Issue-centric** - Link commits to issues and PRs
3. **Minimal format** - No type prefixes or emoji required
4. **Narrative focus** - Explain the "why" not just the "what"
5. **Team communication** - Messages should educate reviewers

## When to Use GitHub Flow Convention

- Small to medium teams
- Project documentation is in issues/PRs
- Want flexibility in commit message style
- Prefer narrative clarity over structured types
