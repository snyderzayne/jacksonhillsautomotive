# Jackson Hills Automotive website

Plain HTML/CSS/JS with no build step. Open `index.html` in a browser to view it, or upload the whole folder to any static host (Netlify, GitHub Pages, Cloudflare Pages).

## Files
- `index.html`, `about.html`, `gallery.html`, `for-sale.html`, `contact.html`: the pages
- `css/style.css`: all styling; colors and fonts are set at the top in `:root`
- `js/main.js`: mobile menu, gallery filter and photo viewer, contact form notice
- `images/`: placeholder images (SVG)

## Swapping in your content
- **Text in [brackets]** is placeholder copy: address, phone, email, names, tagline, story.
- **Photos:** put your JPGs in `images/` and change the `src` in the HTML, e.g. `images/gallery-01.svg` → `images/gallery-01.jpg`. Update the `alt` text to describe the photo. Gallery photos look best at 4:3, team photos square, the About photo 4:5.
- **Gallery categories:** each photo's `data-cat` (shop, builds, classics, events) controls which filter shows it.
- **Services, hours and the promise strip** on the home and contact pages are placeholders too.

## Updating cars for sale
Each car in `for-sale.html` is one `<article class="listing">` block. Copy a block to add a car, delete one to remove it. Change the photo, name, price, specs and blurb inside it. The badge class sets the label: `badge-available`, `badge-pending` or `badge-sold`. `data-cat` (classics, performance, trucks) controls the filter. The "Ask about this car" link fills in the car's name on the contact form, so keep the `?vehicle=` part matching the car's name.

## Making the contact form send email
The form currently shows a "not connected yet" note. To make it deliver messages, sign up for a form service such as Formspree, then add its URL to the form tag in `contact.html`:

```html
<form class="form" id="contact-form" action="https://formspree.io/f/XXXXXXX" method="POST">
```

Once `action` is set, the script lets the form submit normally.
