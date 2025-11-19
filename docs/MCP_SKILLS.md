# LP-WebDesign-Brand - MCP/Skills Documentation

## Overview

このドキュメントは、LP-WebDesign-Brandプロジェクトを Model Context Protocol (MCP) および Claude Code Skills として整理・活用するためのガイドです。

---

## Table of Contents

1. [MCP Integration](#mcp-integration)
2. [Skills Structure](#skills-structure)
3. [Code Patterns](#code-patterns)
4. [Best Practices](#best-practices)
5. [Reusable Components](#reusable-components)

---

## MCP Integration

### What is MCP?

Model Context Protocol (MCP) は、AIアシスタントが外部ツールやデータソースと連携するための標準プロトコルです。

### Project MCP Resources

#### 1. Design System Resource

```json
{
  "name": "lp-design-system",
  "description": "CSS design system with tokens and components",
  "uri": "file:///css/design-system.css",
  "mimeType": "text/css"
}
```

**Capabilities:**

- CSS Custom Properties (Variables)
- Typography scale
- Spacing system
- Color tokens
- Responsive breakpoints

#### 2. Component Library Resource

```json
{
  "name": "lp-components",
  "description": "Reusable LP components and templates",
  "uri": "file:///js/templates.js",
  "mimeType": "application/javascript"
}
```

**Capabilities:**

- 19 LP section templates
- 14 Dashboard components
- Theme system
- Template metadata

#### 3. Generator Tools Resource

```json
{
  "name": "lp-generators",
  "description": "Page generation tools",
  "uri": "file:///js/",
  "mimeType": "application/javascript"
}
```

**Capabilities:**

- LP Generator API
- Dashboard Generator API
- Export utilities
- SEO optimization tools

---

## Skills Structure

### Skill 1: LP Component Library

**Skill ID:** `lp-component-library`

**Description:**
ランディングページのコンポーネントライブラリを作成・管理するためのスキル

**Context:**

```markdown
You are an expert in creating landing page components. You have access to:

- Design system with CSS variables
- 19 pre-built section templates
- 10 theme variations
- Best practices for responsive design
```

**Tools:**

```javascript
// Add new component template
function addComponentTemplate(config) {
  return {
    id: config.id,
    name: config.name,
    category: config.category,
    html: config.html,
    preview: config.preview,
  };
}

// Apply theme to component
function applyTheme(componentId, themeId) {
  const component = getComponent(componentId);
  const theme = getTheme(themeId);
  return applyThemeToHTML(component.html, theme);
}
```

**Usage Example:**

```markdown
User: "Create a new hero section with a video background"
```
