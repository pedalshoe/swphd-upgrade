# Weebly Implementation Guide + Platform Alternatives

## Contact Form on Weebly

Weebly has a built-in Form widget that works well for basic contact needs. Here is how to set it up with spam protection:

### Option A: Weebly Native Form + hCaptcha Embed (Recommended)

1. Drag the **Form** element onto your page
2. Add fields: Name, Email, Subject (dropdown), Message
3. In Form Settings, set the notification email to Stacy.Williams@marist.edu
4. For CAPTCHA: Weebly's native form includes a basic bot filter, but for hCaptcha:
   - Use an **Embed Code** element alongside the form
   - Paste the hCaptcha script snippet (from hcaptcha.com) into the embed
   - Note: Full hCaptcha integration requires Weebly's custom HTML embed + JavaScript, which works on Business plan and above

### Option B: Formspree (Easiest - Works on All Plans)

1. Create a free account at formspree.io
2. Set up a form and get your endpoint URL
3. In Weebly, use the **Embed Code** element with this HTML:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" style="...">
  <input type="text" name="name" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email Address" required />
  <select name="subject">
    <option value="">Select a subject...</option>
    <option>Consulting Inquiry</option>
    <option>Speaking Engagement</option>
    <option>Research Collaboration</option>
    <option>General Inquiry</option>
  </select>
  <textarea name="message" placeholder="Your message..." required></textarea>
  <!-- hCaptcha widget -->
  <div class="h-captcha" data-sitekey="YOUR_HCAPTCHA_SITE_KEY"></div>
  <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
  <button type="submit">Send Message</button>
</form>
```

Formspree handles email delivery and includes spam filtering. The free tier supports 50 submissions/month.

### Option C: Netlify Forms (If migrating off Weebly)

If you move to a static site or Next.js, Netlify Forms provides built-in form handling with spam protection - no backend code required.

---

## Locale / Language Switching on Weebly

Weebly does NOT have a native language switcher. Options:

### Weglot Plugin (Recommended - Starts at $17/month)
- Adds a floating language switcher widget
- Automatically translates all text on your site
- Supports 110+ languages including EN, FR, ES, IT
- Install: Apps > App Center > search "Weglot"
- Weebly Business plan or higher required for app installs

### Manual Multi-Language Pages (Free)
- Create separate pages: /fr, /es, /it
- Add a custom HTML embed with a language dropdown that links to these pages
- Pros: Free. Cons: Manual maintenance when content changes

---

## Sticky Navigation on Weebly

Weebly's default header scrolls away. To make it sticky:

1. Go to **Design > Edit HTML/CSS**
2. Add to the custom CSS section:

```css
.wsite-header-wrapper {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Push content below fixed header */
.wsite-body {
  padding-top: 80px !important;
}
```

Note: The exact class names may vary by Weebly theme. Use browser DevTools to confirm.

---

## Platform Alternatives at the Same Price Point

Weebly's current pricing (as of 2025): Free / $10 / $12 / $26 per month

### Tier 1: Direct Alternatives (Same Price, More Power)

| Platform | Starting Price | Strengths | Best For |
|----------|---------------|-----------|----------|
| **Squarespace** | $16/mo | Beautiful templates, strong i18n via Weglot, sticky nav built-in | Professional portfolio sites |
| **Wix** | $17/mo | Drag-and-drop, multilingual built-in (Wix Multilingual), no code needed | Easy self-management |
| **Webflow** | $14/mo (CMS $23) | Full design control, clean code export, native sticky nav | Design-forward sites |
| **Framer** | $15/mo | Modern design tools, Next.js under the hood, fast | Modern professional sites |

### Tier 2: More Technical (Lower Cost, More Control)

| Platform | Starting Price | Strengths | Consideration |
|----------|---------------|-----------|---------------|
| **Ghost** | $9/mo | Clean writing/blogging focus, fast | Less drag-and-drop |
| **WordPress.com** | $9/mo | Massive plugin ecosystem, Polylang for i18n | More setup required |
| **Vercel + Next.js** | Free tier | This demo! Full control, excellent performance | Requires developer help |

### Recommendation for Dr. Williams

**Best match: Squarespace or Wix**
- Both offer sticky navigation out of the box
- Squarespace: More polished academic/portfolio aesthetic, better typography
- Wix: Built-in Wix Multilingual tool (no extra cost) for EN/FR/ES/IT

---

## Migration Strategy (Weebly to Any Platform)

### Phase 1: Preparation (Week 1)
- [ ] Export all content from Weebly: Pages > Export (downloads HTML)
- [ ] Download all images from Weebly's media manager
- [ ] Document all Google Drive poem links
- [ ] Note your domain registrar (may be Weebly or separate)

### Phase 2: Build New Site (Weeks 2-3)
- [ ] Set up account on chosen platform
- [ ] Import or recreate each page using this design as reference
- [ ] Upload all images
- [ ] Recreate contact form with hCaptcha
- [ ] Set up multilingual content

### Phase 3: Domain Transfer (Week 4)
- [ ] Point domain DNS to new host (TTL: 24-48 hours)
- [ ] Keep Weebly account active during transition
- [ ] Set up 301 redirects for any changed URLs

### Phase 4: Launch (Week 4-5)
- [ ] Test all forms, links, and pages
- [ ] Verify Google Analytics or tracking
- [ ] Cancel Weebly subscription after DNS propagation confirmed

### Domain Note
If your domain is registered through Weebly (Square), you can transfer it to Namecheap, Google Domains (Squarespace Domains), or Cloudflare for more control - typically $10-15/year.

---

## The Next.js/Vercel Demo (This Project)

The demo site demonstrates what the Weebly site COULD look like if migrated to a modern platform.

**To deploy to Vercel:**
1. Push this repo to GitHub
2. Import the repo at vercel.com/new
3. Add environment variables in Vercel dashboard:
   - RESEND_API_KEY (from resend.com)
   - NEXT_PUBLIC_HCAPTCHA_SITE_KEY (from hcaptcha.com)
   - HCAPTCHA_SECRET_KEY (from hcaptcha.com)
4. Deploy - live in under 2 minutes

**Contact Form flow:**
User fills form -> hCaptcha verified client-side -> POST /api/contact ->
Server verifies hCaptcha with hcaptcha.com API -> Resend sends email to
Stacy.Williams@marist.edu with reply-to set to the sender.

**Cost to run on Vercel:** Free tier is sufficient for this site's traffic.
Resend free tier: 100 emails/day, 3,000/month.
hCaptcha: Free for standard use.
