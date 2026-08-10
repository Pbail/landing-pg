# Redirect Landing Page

Simple static page jo load hote hi 1 second (default) baad kisi doosri site par redirect kar deta hai, saath mein ek "Continue now" button hota hai jisse user turant skip kar sakta hai.

## Files
- `index.html` — landing page (design + redirect logic)
- `config.js` — yahan se redirect URL aur timing change karo

## URL ya timing change kaise karein
1. GitHub repo mein `config.js` file kholo
2. `redirectUrl` mein naya URL daalo (poora `https://...` ke saath)
3. Chaho to `delaySeconds` bhi badal do (0 = turant redirect)
4. Commit + push karo — GitHub Pages apne aap update kar dega (1-2 min lag sakte hain)

```js
const SITE_CONFIG = {
  redirectUrl: "https://example.com",
  delaySeconds: 1
};
```

## GitHub Pages par host kaise karein
1. Naya GitHub repo banao (public)
2. `index.html`, `config.js`, `README.md` upload/push karo
3. Repo ke **Settings → Pages** mein jao
4. Source mein **branch: main**, folder: **/ (root)** select karo, Save karo
5. Kuch minute mein `https://<username>.github.io/<repo-name>/` par site live ho jayegi

## Custom domain attach karna
1. Settings → Pages mein **Custom domain** field mein apna domain daalo (jaise `example.com`)
2. Apne domain registrar (GoDaddy, Namecheap etc.) mein DNS records set karo:
   - Agar root domain hai: `A` records GitHub Pages IPs ke liye
   - Agar subdomain hai (jaise `www`): `CNAME` record `<username>.github.io` ke liye
3. GitHub docs ka "Managing a custom domain" page follow karo exact steps ke liye
