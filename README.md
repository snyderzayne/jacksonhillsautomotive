# Jackson Hills Automotive website

Plain HTML/CSS/JS with no build step. Open `index.html` in a browser to view it, or upload the whole folder to any static host (Netlify, GitHub Pages, Cloudflare Pages).

## Files
- `index.html`, `about.html`, `gallery.html`, `contact.html`: the four pages
- `css/style.css`: all styling; colors and fonts are set at the top in `:root`
- `js/main.js`: mobile menu, gallery filter and photo viewer, contact form notice
- `images/`: placeholder images (SVG)

## Swapping in your content
- **Text in [brackets]** is placeholder copy: address, phone, email, names, tagline, story.
- **Photos:** put your JPGs in `images/` and change the `src` in the HTML, e.g. `images/gallery-01.svg` → `images/gallery-01.jpg`. Update the `alt` text to describe the photo. Gallery photos look best at 4:3, team photos square, the About photo 4:5.
- **Gallery categories:** each photo's `data-cat` (shop, builds, classics, events) controls which filter shows it.
- **Services, hours and the promise strip** on the home and contact pages are placeholders too.

## Making the contact form send email
The form currently shows a "not connected yet" note. To make it deliver messages, sign up for a form service such as Formspree, then add its URL to the form tag in `contact.html`:

```html
<form class="form" id="contact-form" action="https://formspree.io/f/XXXXXXX" method="POST">
```

Once `action` is set, the script lets the form submit normally.
