# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Georgia State Defense Force website - a Jekyll-based static site using the Massively theme, deployed on Cloudflare Pages.

**Stack:**
- Jekyll static site generator (Ruby)
- Cloudflare Pages for hosting
- Cloudflare Functions for serverless API endpoints (TypeScript)
- SASS for styling

## Development Commands

### Jekyll Development

```bash
# Install Ruby dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve locally with live reload
bundle exec jekyll serve

# The site will be available at http://localhost:4000
```

### Cloudflare Functions Development

```bash
# Install npm dependencies
npm install

# Run Cloudflare Pages locally (includes Jekyll and Functions)
npx wrangler pages dev

# TypeScript compilation check
npx tsc --noEmit
```

## Architecture

### Jekyll Structure

- `_posts/` - Blog posts/news articles (markdown files with YAML frontmatter)
- `_layouts/` - Page templates (post.html, page.html, blog.html, author.html)
- `_includes/` - Reusable HTML components (nav, head, foot, forms)
- `_sass/` - SASS stylesheets organized by:
  - `libs/` - Core SASS variables, functions, mixins
  - `base/` - Base HTML element styles
  - `layout/` - Layout-specific styles
  - `components/` - Component-specific styles
- `_authors/` - Author collection (Jekyll collection)
- `_data/` - Data files for site configuration
- `assets/` - Static assets
- `images/` - Image files

### Cloudflare Functions

- `functions/` - Cloudflare Pages Functions (TypeScript)
  - `_middleware.ts` - Global middleware (currently commented out MailChannels integration)
  - `api/` - API endpoints (e.g., cform.js for contact forms)

### Configuration Files

- `_config.yml` - Main Jekyll configuration (site metadata, collections, plugins)
- `Gemfile` - Ruby dependencies
- `package.json` - npm dependencies (Cloudflare workers types, TypeScript, Wrangler)
- `wrangler.toml` - Cloudflare Workers/Pages configuration
- `tsconfig.json` - TypeScript compiler configuration
- `.devcontainer/` - VS Code devcontainer configuration (Jekyll + Node + Wrangler)

## Styling

Colors and theme configuration are in `_sass/libs/_vars.scss`. The site uses:
- Primary accent color: #18bfef
- Dark wrapper background: #212931
- Fonts: Merriweather (body), Source Sans Pro (headings)

## Content Management

Posts follow Jekyll conventions:
- Filename format: `YYYY-MM-DD-title.md` in `_posts/`
- Permalink structure: `/news/:year-:month-:day-:title`
- Default layout: `post`
- Pagination: 6 posts per page at `/news/page:num/`

## Deployment

The site is deployed to Cloudflare Pages. The main branch triggers automatic deployments.

## Git Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages and pull requests.

**Format:** `<type>[optional scope]: <description>`

**Common types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring without changing functionality
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates

**Examples:**
- `feat(posts): add new recruitment article`
- `fix(nav): correct mobile menu toggle behavior`
- `style(sass): update color palette variables`
- `docs: update deployment instructions in README`

## Important Notes

- Forms use Cloudflare's static forms plugin (currently configured in package.json)
- MailChannels integration code exists but is commented out in `functions/_middleware.ts`
- Jekyll pagination is enabled with 6 posts per page
- The site uses Jekyll plugins: jekyll-mentions, jekyll-sitemap, jekyll-feed, jekyll-gist, jekyll-paginate, jekyll-redirect-from
