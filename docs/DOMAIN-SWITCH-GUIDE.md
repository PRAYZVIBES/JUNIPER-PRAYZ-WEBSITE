# Domain switch guide

## Current state — do not change yet

Observed on 29 July 2026:

- `juniperprayz.com` currently serves Raphaelas Reittherapie through GitHub Pages.
- The current repository is `PRAYZVIBES/RAPHAELAS-REITTHERAPIE`.
- Apex DNS points to GitHub Pages (`185.199.108.153` was observed).
- `www.juniperprayz.com` points to `prayzvibes.github.io`.
- `raphaelas-reittherapie.de` still points to the previous One.com hosting environment (`46.30.213.28` was observed).
- Existing mail records for the Raphaela domain must be preserved.

This package makes no DNS, repository or hosting change.

## Safe sequence

### Phase 1 — prepare J&P separately

1. Create a new GitHub repository for JUNIPER & PRAYZ.
2. Upload this package with `CNAME.next` unchanged.
3. Enable GitHub Pages on the new repository.
4. Review the temporary GitHub Pages URL.
5. Confirm content, legal details, responsive behavior and reel playback.

### Phase 2 — protect and move Raphaelas Reittherapie

1. Record the complete current DNS zone for `raphaelas-reittherapie.de`, especially MX, SPF, DKIM and DMARC records.
2. Configure the Raphaela GitHub Pages project to accept the correct domain.
3. Add the GitHub verification TXT record if GitHub requests one.
4. Change only the web records required for the website.
5. Confirm that:
   - the Raphaela website loads on its correct domain
   - HTTPS is active
   - email still sends and receives
6. Keep the previous hosting available until all checks pass.

### Phase 3 — move juniperprayz.com

1. In the new J&P repository, rename `CNAME.next` to `CNAME`.
2. Set the custom domain in GitHub Pages to `www.juniperprayz.com`.
3. Confirm that GitHub recognises the domain before deleting or changing any old custom-domain setting.
4. Point the apex and `www` records to the new J&P GitHub Pages project as instructed by GitHub.
5. Enable “Enforce HTTPS” after the certificate is issued.
6. Test:
   - `https://juniperprayz.com`
   - `https://www.juniperprayz.com`
   - canonical redirect behavior
   - Instagram reel playback
   - imprint and privacy links

## Rollback

Before cutover, export or screenshot:

- both GitHub Pages settings
- the DNS zone
- the current `CNAME` file
- the last working repository commits

If the cutover fails, restore the previous DNS records and custom-domain setting, then allow DNS caches time to update.

## Why `CNAME.next` exists

`CNAME.next` contains the intended domain but is ignored by GitHub Pages. It prevents a normal staging push from claiming or redirecting the live domain. Rename it only during the approved cutover.
