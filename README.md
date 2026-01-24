# 🚀 Hemant Solanki - Premium Portfolio

A modern, feature-rich portfolio website for a Senior Data Analyst & AI Developer, designed to be featured on "wall of portfolios".

## ✨ Features

- **Interactive Hero Section** with Three.js particle animation
- **Custom Cursor** effects for desktop users
- **Smooth Scroll** animations and transitions
- **Responsive Design** - works perfectly on all devices
- **Animated Background** with grid and glowing orbs
- **Terminal Code** typing effect
- **Skills Radar Chart** using Chart.js
- **Project Showcase** with live demos
- **Professional Timeline** for experience
- **Contact Section** with copy-to-clipboard functionality
- **SEO Optimized** with meta tags

## 📁 File Structure

```
portfolio/
├── index.html      # Main HTML file
├── style.css       # Complete stylesheet (combine both CSS parts)
├── main.js         # JavaScript functionality
└── README.md       # This file
```

## 🛠️ Setup Instructions

### Method 1: Simple Local Setup (Recommended)

1. **Create a new folder** for your portfolio:
   ```bash
   mkdir my-portfolio
   cd my-portfolio
   ```

2. **Create the files**:
   - Create `index.html` and paste the HTML code
   - Create `style.css` and paste BOTH CSS parts (combine them into one file)
   - Create `main.js` and paste the JavaScript code

3. **Open in browser**:
   - Simply double-click `index.html`
   - Or use Live Server in VS Code for hot reload

### Method 2: Using a Local Server

If you have Python installed:

```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

Or using Node.js:

```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Open: http://localhost:8080
```

### Method 3: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📝 Important Notes

### CSS Files
You received the CSS in two parts:
- **style.css** (Part 1) - Global styles, navigation, hero, utilities
- **style.css - Part 2** - About, expertise, projects, contact, footer

**COMBINE BOTH PARTS INTO ONE `style.css` FILE**

Just copy the content from Part 2 and append it to Part 1 in your `style.css` file.

### External Dependencies (CDN)

The portfolio uses these CDN libraries (already included in HTML):

- **Three.js** - 3D particle animations
- **Chart.js** - Skills radar chart
- **Google Fonts** - Inter & JetBrains Mono fonts

No installation needed - they load from CDN automatically!

## 🎨 Customization

### Update Your Information

1. **Personal Details** (in `index.html`):
   - Name, email, location
   - Social media links
   - Resume link

2. **Projects**:
   - Update project descriptions
   - Add your GitHub repositories
   - Update live demo links

3. **Experience**:
   - Modify timeline events
   - Update job descriptions
   - Change dates and achievements

4. **Colors** (in `style.css`):
   ```css
   :root {
     --primary: #00ffd5;        /* Cyan accent */
     --secondary: #00c2ff;      /* Blue accent */
     --accent: #ff6b6b;         /* Red accent */
     /* Customize as needed */
   }
   ```

### Add Your Images

Replace placeholder icons with real project screenshots:

```html
<!-- Instead of placeholder SVG -->
<div class="project-placeholder">...</div>

<!-- Use actual image -->
<img src="path/to/your/image.jpg" alt="Project name">
```

## 🚀 Deployment

### Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```
3. Go to Settings → Pages
4. Select branch: `main`, folder: `/ (root)`
5. Save and wait for deployment

Your site will be live at: `https://yourusername.github.io/repository-name`

### Deploy to Netlify

1. Drag and drop your folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository
3. Deploy with one click

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🎯 Performance Tips

1. **Optimize Images**: Compress project screenshots using TinyPNG
2. **Lazy Loading**: Add `loading="lazy"` to images
3. **Minify CSS/JS**: Use online tools before production
4. **Enable Caching**: Configure headers on your hosting

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🐛 Troubleshooting

### Three.js particles not showing
- Check browser console for errors
- Ensure CDN link is loading
- Try refreshing the page

### Charts not rendering
- Verify Chart.js CDN is loaded
- Check canvas element exists
- Ensure Chart constructor is called after DOM loads

### Mobile menu not working
- Verify JavaScript is loading correctly
- Check for console errors
- Test on different mobile browsers

## 📧 Support

For questions or issues:
- Email: hemantsolanki333@gmail.com
- GitHub: [@earlywinter96](https://github.com/earlywinter96)
- LinkedIn: [Hemant Solanki](https://www.linkedin.com/in/hemant-solanki-366462199/)

## 📄 License

This portfolio template is free to use and customize for your own portfolio.

---

**Built with ❤️ by Hemant Solanki**

*Transforming data into intelligent decisions*