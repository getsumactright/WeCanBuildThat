# Product images on the shop page

Two states: **local images today**, **Creators API later**. `shop.html` already
supports both — switching over is a config flip plus one serverless function.

## Today — local images

Put a file in `images/products/` and reference it by name:

```js
img: "wifi-router.jpg"     // → images/products/wifi-router.jpg
img: ""                    // → "image coming soon" placeholder
```

A full `https://` URL also works and is used verbatim. See
`images/products/README.txt` for format guidance.

**Use your own photographs.** The page's premise is gear you actually use — real
photos support that in a way catalog renders don't, and no competing affiliate
page has them. Manufacturer press images are fine if you have permission.

**You may not save or hot-link images from Amazon product pages.** That's true
regardless of how you obtain them, and it's the rule that makes the rest of this
document necessary.

## Why you can't just pull from Amazon

Every previously-easy route is closed:

| Route | Status |
|---|---|
| SiteStripe image links | Discontinued 31 Dec 2023 — text links still work |
| Scraping product pages | Never permitted; also blocked by CORS and hotlink protection |
| Product Advertising API v5 | Retired 15 May 2026 |
| **Creators API** | **Current sanctioned route** — see below |

## Later — the Creators API

### Gate 1: eligibility

- Enrolled in Amazon Associates for the marketplace you're targeting
- **10 qualifying sales in the trailing 30 days**
- Registered for API access through Associates Central

Access is revoked automatically after a 30-day stretch with no referred sales,
and restored within about two days once referred sales ship again. Plan for the
page degrading gracefully — which is why the resolver falls back to the
placeholder rather than assuming the API is up.

There's a chicken-and-egg problem worth naming: you need sales to get the API,
and the API makes the page better at producing sales. Local photos are how you
get through that gap.

### Gate 2: the secret can't live in the page

The Creators API uses OAuth 2.0. `shop.html` is a static file — anything in it is
readable via view-source, so putting a client secret there would publish it.

This is the part that needs new infrastructure: a small server-side function that
holds the credentials, calls Amazon, and returns just the image URL. Netlify,
Vercel, and Cloudflare Workers all do this on their free tiers.

Amazon also requires API images be **served through the API** — you can't pull
them once and self-host the result.

### The proxy

Endpoint shape the page already expects: `GET /api/amazon-image?asin=B0XXXXXXXX`
returning `{ "image": "https://m.media-amazon.com/images/..." }`.

Sketch (Netlify/Vercel style — check current Creators API docs for exact request
and response shapes, which may have moved since this was written):

```js
// netlify/functions/amazon-image.js
let cachedToken = null;      // { value, expiresAt }

async function getToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }
  const res = await fetch('https://api.amazon.com/auth/o2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMAZON_CLIENT_ID,
      client_secret: process.env.AMAZON_CLIENT_SECRET,
      scope: 'creators::product_data'
    })
  });
  const json = await res.json();
  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000
  };
  return cachedToken.value;
}

export default async (req) => {
  const asin = new URL(req.url).searchParams.get('asin');
  if (!/^[A-Z0-9]{10}$/.test(asin || '')) {
    return new Response('Bad ASIN', { status: 400 });
  }

  const token = await getToken();
  const r = await fetch(
    `https://api.amazon.com/creators/v1/items/${asin}?resources=Images.Primary.Large`,
    { headers: { Authorization: `Bearer ${token}`,
                 'x-amz-associate-tag': process.env.AMAZON_ASSOCIATE_TAG } }
  );
  if (!r.ok) return new Response('Upstream error', { status: 502 });

  const data = await r.json();
  const image = data?.Images?.Primary?.Large?.URL || null;

  // Cache hard at the edge — Amazon rate-limits, and these URLs rarely change.
  return new Response(JSON.stringify({ image }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800'
    }
  });
};
```

Credentials go in your host's environment variables — `AMAZON_CLIENT_ID`,
`AMAZON_CLIENT_SECRET`, `AMAZON_ASSOCIATE_TAG`. Never in the repo.

### Switching it on

1. Fill in the `asin` field for each product in `shop.html` — it's the
   10-character code from the `/dp/XXXXXXXXXX` part of the Amazon URL.
2. Deploy the function.
3. In `shop.html`, find `IMAGE_SOURCE` and set:

```js
USE_API:   true,
API_PROXY: '/api/amazon-image'
```

Resolution order is `img` → API → placeholder, so any product with an explicit
`img` keeps using your photo. That's deliberate: your own photography of gear you
actually own is the better asset where you have it, and the API is the fallback
for everything else.

### Rate limits

Creators API throttles by request volume tied to sales. The `s-maxage` above
means repeat visitors hit your CDN, not Amazon. If you grow past a few dozen
products, cache resolved URLs in a small KV store keyed by ASIN with a ~7-day TTL
rather than calling per page load.
