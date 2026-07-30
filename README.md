# JUNIPER & PRAYZ — GitHub exchange package

Status: **staging-ready, not deployed**  
Updated: **30 July 2026**  
Intended domain after a controlled cutover: **www.juniperprayz.com**

This is a self-contained, dependency-free static website package for GitHub Pages. It deliberately does not modify or deploy the website currently connected to `juniperprayz.com`.

## What is included

- Responsive artist homepage in English with an EN/DE switch
- Four current `@juniperprayz` Instagram reels as local preview cards
- Instagram reels loaded only after a deliberate click
- Honest YouTube channel link without invented videos
- Local imagery; no remote font or image requests on initial load
- Wild Duality production identity: Juniper's organic, untamed movement collides with the dark weight and rhythmic structure of PRAYZVIBES
- Self-hosted production typography: condensed Instrument Sans for force and structure, Instrument Serif Italic for the human wild gesture
- Real photography, the user-approved sticker master and editable vector studies; no generated character scenes in the production website
- Imprint, privacy page, 404 page, robots file, sitemap and web manifest
- GitHub Actions verification workflow
- Brand, benchmark, social, domain and launch documentation
- A deliberately inactive `CNAME.next` file for the later cutover

## Important safety boundary

Do **not** upload this package to the repository currently serving Raphaelas Reittherapie. Create a separate repository for JUNIPER & PRAYZ.

GitHub ignores `CNAME.next`. The domain therefore remains untouched even if this package is pushed to a new repository. Only rename `CNAME.next` to `CNAME` during the approved cutover described in [DOMAIN-SWITCH-GUIDE.md](docs/DOMAIN-SWITCH-GUIDE.md).

## Local preview

The private preview never leaves your computer and does not require GitHub.

From the package root, with Node.js:

```powershell
node scripts/preview-site.mjs
```

Then open `http://127.0.0.1:8080/`.

The private A/B/C typography comparison is available at:

`http://127.0.0.1:8080/font-lab.html`

It preserves the original comparison of Instrument Serif/Sans, Bodoni Moda and Cormorant Garamond. The comparison remains documented, while the main homepage has moved beyond the rejected Fashion Wild draft into the stronger Wild Duality production direction.

Alternative with Python:

```powershell
python -m http.server 8080
```

Keep the terminal open while reviewing and press `Ctrl+C` to stop. Do not open `index.html` directly from the file system when testing Instagram reels; browsers apply stricter rules to `file://` pages.

## Verify the package

No installation is required:

```powershell
node scripts/verify-site.mjs
```

The same check runs automatically through `.github/workflows/verify-static-site.yml`.

## Recommended GitHub handoff

1. Create a new repository, for example `JUNIPER-PRAYZ-WEBSITE`.
2. Upload the **contents** of this folder to the repository root.
3. Keep `CNAME.next` unchanged.
4. In GitHub: **Settings → Pages → Source: GitHub Actions**.
5. Open **Actions → Publish to GitHub Pages → Run workflow** only when a public GitHub Pages preview is wanted. This workflow is manual and never runs automatically.
6. Review the temporary `github.io` address on desktop and mobile.
7. Complete the items in [PRE-LAUNCH-CHECKLIST.md](docs/PRE-LAUNCH-CHECKLIST.md).
8. Move Raphaelas Reittherapie to its correct domain first.
9. Only then rename `CNAME.next` to `CNAME` and make the DNS cutover.

## Key documents

- [Creative direction and five concepts](docs/CREATIVE-DIRECTION.md)
- [Visual system v6: Wild Duality typography, colours and photographic treatment](docs/VISUAL-SYSTEM-V2.md)
- [Brand voice: Bavarian roots, independence, nature and the good life](docs/BRAND-VOICE.md)
- [Private A/B/C typography comparison](docs/TYPOGRAPHY-LAB.md)
- [Wild Halo identity: metaphor, logo system and usage rules](docs/WILD-HALO-IDENTITY.md)
- [Affinity Designer production guide](docs/AFFINITY-PRODUCTION-GUIDE.md)
- [PRAYZVIBES support, Bandcamp and store hub](docs/PRAYZVIBES-HUB.md)
- [Deep artist-site review and scorecard](docs/DEEP-ARTIST-SITE-REVIEW-2026-07-29.md)
- [Brand audit](docs/BRAND-AUDIT.md)
- [Content and social audit](docs/CONTENT-AND-SOCIAL-AUDIT.md)
- [Domain switch guide](docs/DOMAIN-SWITCH-GUIDE.md)
- [Pre-launch checklist](docs/PRE-LAUNCH-CHECKLIST.md)
- [Asset provenance](docs/ASSET-PROVENANCE.md)
- [Research sources](docs/RESEARCH-SOURCES.md)

## Current external services

Initial page load uses no analytics, advertising pixels, external fonts or external media. Following an external link contacts the destination service. Selecting “Play reel” loads the chosen Instagram embed and is explained in the privacy page.

## Legal review

The imprint and privacy draft are based on the currently published PRAYZVIBES operator details and the technical behavior of this package. They are not a substitute for professional legal review. Confirm the operator, editorial responsibility and contact details before launch.
