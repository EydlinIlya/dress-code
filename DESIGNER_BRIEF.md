# Dress Code — Designer Brief

## Product Overview

**Dress Code** is a lightweight web app that helps event hosts communicate their color dress code to guests — and lets guests instantly verify if their outfit matches before the event.

Primary use case: weddings. But also applies to any event with a color theme — galas, corporate events, themed parties, proms, etc.

No accounts, no logins, no downloads. It's a quick tool that solves a very specific anxiety: "Will my outfit match the dress code?"

---

## User Personas

### The Host (typically the bride, event planner, or organizer)
- **Goal:** Define the color palette for the event and share it effortlessly with all guests
- **Context:** On desktop or mobile. May be doing this weeks before the event. Wants it done in under 2 minutes
- **Tone they expect:** Elegant, tasteful, trustworthy — this is likely their wedding

### The Guest (friend, family, attendee)
- **Goal:** Quickly check if the outfit they're considering matches the host's expectations
- **Context:** Almost certainly on mobile. Likely in a store or at home holding up outfits. May be stressed or in a rush. Needs an instant, clear answer
- **Tone they expect:** Reassuring, clear, zero confusion

---

## User Flows

### Flow 1: Host Creates a Dress Code

**Screen: Home / Create Page**

1. Host lands on the page. Sees a short headline explaining what this does
2. Picks one or more colors using:
   - A visual color picker (hue/saturation wheel or square)
   - Manual hex/RGB input for precision
   - Eyedropper tool to sample from screen (e.g., from a Pinterest mood board) — available on supported browsers
3. Each added color appears as a swatch in a list. Host can:
   - Remove any color
   - See the hex code under each swatch
4. Below the selected colors, the app suggests **complementary colors** based on the last pick (grouped as: complementary, analogous, triadic, split-complementary). Guest can tap a suggestion to add it
5. Once at least one color is added, a **shareable link** appears. Host can copy it with one tap
6. The link encodes the colors directly in the URL — no account needed, no expiration

**Key design considerations:**
- The color picker should feel polished and elegant, not like a developer tool
- Selected colors should be prominent and easy to scan
- The share link + copy button should be the clear endpoint of the flow — it's the CTA
- Consider an empty state that's inviting, not barren
- Suggestion swatches should be clearly "optional add-ons", not confusing
- Max 10 colors (but most hosts will pick 1–3)

---

### Flow 2: Guest Checks Their Outfit

**Screen: Check Page (accessed via shared link)**

1. Guest opens the link. Sees the event's allowed colors displayed as swatches at the top
2. Uploads a photo of their outfit via:
   - Tap to open camera (primary on mobile)
   - Tap to browse gallery
   - Drag and drop (desktop)
3. Photo appears on screen. Guest taps/clicks a point on their outfit
4. A **crosshair/marker** appears where they tapped. The sampled color is shown
5. The app instantly displays a **verdict**:
   - **"Good choice!"** (green) — color is a close match
   - **"Better ask the host"** (amber) — color is in the ballpark but not exact
   - **"Not a match, try something else"** (red) — clearly different
6. The verdict shows the guest's sampled color alongside the closest allowed color for visual comparison
7. Guest can:
   - Tap a different spot on the photo to re-sample
   - Upload additional photos (shown as a thumbnail strip)
   - Switch between uploaded photos

**Key design considerations:**
- This page will almost always be viewed on mobile — design mobile-first
- The verdict must be unmistakable at a glance — big, bold, color-coded
- The photo canvas needs a clear "tap here" affordance
- Consider the emotional weight: a "not a match" result shouldn't feel harsh or panic-inducing. Keep it friendly and actionable ("Try something else" not "WRONG")
- The color comparison (your pick vs. closest allowed) should be side-by-side and visually clear
- Multiple photo support: thumbnails should be small and unobtrusive, the main canvas is the focus
- Empty state before upload should be warm and encouraging

---

## Screens Summary

| Screen | URL Pattern | Purpose |
|--------|------------|---------|
| Host / Create | `/` | Pick colors, see suggestions, generate share link |
| Guest / Check | `/check/FF5733-33FF57-...` | Upload photo, sample color, see match verdict |
| Invalid Link | `/check/invalid` | Friendly error when link is broken |

---

## Component Inventory

### Shared
- **Header** — logo + app name. Minimal. Present on all pages
- **Color Swatch** — circular or rounded-square color chip. Used everywhere. Sizes: small (suggestions), medium (lists), large (feature display)

### Host Page
- **Color Picker** — visual hue/saturation control + hex input field + eyedropper button
- **Selected Colors List** — grid/row of swatches with remove buttons and hex labels
- **Color Suggestions** — grouped by harmony type (complementary, analogous, etc.) as small clickable swatches
- **Share Link Card** — read-only URL field + copy button with "Copied!" feedback

### Guest Page
- **Allowed Colors Banner** — horizontal row of the host's color swatches with labels
- **Image Upload Zone** — drag-and-drop area with icon. On mobile, triggers camera/gallery
- **Photo Canvas** — the uploaded image with a crosshair marker at the sampled point
- **Photo Thumbnails** — horizontal scrollable strip for multiple photos
- **Match Verdict Card** — the big result:
  - Icon (checkmark / warning / X)
  - Text verdict
  - Side-by-side color comparison (sampled vs. closest allowed)
  - Color-coded card background (green / amber / red tint)

---

## Design Direction & Tone

### Overall Mood
- **Elegant but approachable** — this will often be used in a wedding context, so it should feel tasteful
- **Clean and minimal** — no clutter. Every element earns its space
- **Trustworthy** — the verdict needs to feel authoritative, not gimmicky
- **Warm** — this is about helping people feel confident at an event

### Typography
- A clean sans-serif for body text (e.g., Inter, DM Sans, or similar)
- Hex codes displayed in a monospace font for clarity
- Headlines should be warm, not corporate

### Color Palette (for the app UI itself)
- Neutral base (whites, light grays) so user-selected colors pop
- The UI should never compete with the dress code colors being displayed
- Verdict colors: green, amber/yellow, red — but softened/muted to stay elegant
- Avoid heavy saturated primary colors in the chrome

### Spacing & Layout
- Generous whitespace
- Mobile-first: single column, large touch targets
- Desktop: centered narrow column (max ~560px content width), not full-bleed

### Animations (subtle)
- Verdict card fades in with a slight upward motion when result appears
- Copy button shows a brief checkmark confirmation
- Color swatches could have a gentle scale-up on add

### Iconography
- Simple line icons (Lucide style)
- Used sparingly: upload, camera, pipette/eyedropper, copy, checkmark, warning, X

---

## Responsive Behavior

| Breakpoint | Layout Notes |
|-----------|--------------|
| Mobile (<640px) | Full-width cards, stacked layout, large touch targets. This is the primary viewport for guests |
| Tablet/Desktop (640px+) | Centered column (max-width ~560px), more breathing room, hover states on swatches |

---

## Edge Cases to Design For

1. **No colors selected yet (host)** — empty state with encouraging message
2. **Single color selected** — suggestions still show, link is available
3. **Maximum colors (10)** — "Add Color" button disabled, optionally a note
4. **No photo uploaded yet (guest)** — upload zone is prominent
5. **Photo uploaded, no point tapped yet** — gentle prompt to "tap on your outfit"
6. **Very similar colors in verdict** — the "Good choice!" state where both swatches look nearly identical. The side-by-side should still be clear
7. **Clearly wrong color** — the "Not a match" state shouldn't feel like a punishment
8. **Invalid/broken link** — friendly error, not a stack trace
9. **Multiple photos** — thumbnail strip doesn't crowd the main canvas

---

## What's NOT in Scope (for now)

- User accounts or login
- Database or server-side storage (everything is in the URL)
- Dark mode (can be added later)
- Internationalization / multiple languages
- Social sharing (beyond copy-link)
- PDF or image export of the color palette
- QR code generation for the link

---

## Deliverables Expected from Designer

1. **UI mockups** for both flows (host + guest), mobile and desktop
2. **Component designs** for the items listed in Component Inventory
3. **State variations**: empty states, loading, all three verdict levels, max colors, error state
4. **Interaction notes**: what animates, what transitions, hover/active states
5. **Asset specifications**: if custom icons or illustrations are desired beyond Lucide

---

## Technical Notes (for context, not for the designer to implement)

- Built with Next.js + React + Tailwind CSS
- Components use shadcn/ui as a base (Radix primitives + Tailwind)
- Color matching uses CIE Delta E 2000 perceptual distance algorithm
- Image color sampling uses HTML Canvas pixel reading
- All colors are stored in the URL as hex codes (e.g., `/check/FF5733-33FF57`)
- No backend. Fully client-side. Hosted on Vercel
