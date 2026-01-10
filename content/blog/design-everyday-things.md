---
title: "The Design of Everyday Things - Why Doors Confuse Us"
date: "2026-01-06"
description: "Don Norman's classic book reveals why we struggle with everyday objects. The problem isn't us—it's bad design. Here's what I learned about affordances, signifiers, and human-centered design."
tags: ["Design", "UX", "Psychology"]
author: "Mehmet Temel"
type: "book"
---

# The Design of Everyday Things - Why Doors Confuse Us

Don Norman's masterpiece fundamentally changed how I think about design. It's not just about making things pretty—it's about making things that work for humans.

## The Core Problem

When you can't figure out how to use something, the natural response is to blame yourself. But Norman argues: **it's not you, it's the design**.

### Norman Doors

We've all encountered them—doors where you:
- Pull when you should push
- Push when you should pull
- Can't figure out which side opens

These aren't user errors. They're design failures.

## Key Concepts

### 1. Affordances

What actions an object suggests through its form:
- A button affords pushing
- A handle affords pulling
- A flat plate affords pushing

### 2. Signifiers

Visual clues that communicate how to use something:
- Labels, icons, and instructions
- The actual indicators of where to interact
- More important than affordances in modern design

### 3. Feedback

The system must tell you what happened:
- Did my click register?
- Is the system processing?
- What's the current state?

### 4. Mapping

The relationship between controls and their effects:
- Light switches should map to the lights they control
- Stove burners should map to their control knobs
- The more direct the mapping, the better

## Applying This to Web Development

As a frontend developer, these principles guide everything I build:

**Buttons should look clickable**
```jsx
// Good - clearly a button
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
  Click me
</button>

// Bad - looks like text
<div onClick={handleClick}>
  Click me?
</div>
```

**Provide immediate feedback**
```jsx
// Loading states matter
{isLoading ? (
  <Spinner />
) : (
  <button onClick={handleSubmit}>Submit</button>
)}
```

**Make error messages helpful**
```jsx
// Good
"Your password must be at least 8 characters and include a number"

// Bad
"Invalid input"
```

## The Gulf of Execution and Evaluation

**Gulf of Execution**: How hard is it to figure out how to use something?
**Gulf of Evaluation**: How hard is it to understand what happened?

Great design minimizes both gulfs.

## Why This Matters

Every interface we build is either helping users accomplish their goals or getting in their way. There's no neutral.

Good design:
- Is invisible when it works
- Doesn't make users feel stupid
- Anticipates mistakes and prevents them
- Provides clear paths forward

## Final Thoughts

This book should be required reading for anyone building products. It's not about graphic design or aesthetics—it's about respecting the humans who use what we make.

The next time you struggle with a door, a website, or any interface, remember: it's probably not you. It's the design.

---

**Read the book**: [The Design of Everyday Things on Amazon](https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654)
