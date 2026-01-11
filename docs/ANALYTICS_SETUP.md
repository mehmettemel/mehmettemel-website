# Analytics & Search Console Setup Guide - Food Decoded

This guide will help you set up Google Analytics and Search Console for the Food Decoded website, with specific event tracking for content engagement.

## 🔍 Google Analytics Setup

### Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create a new account for your portfolio
4. Set up a new property:
   - Property name: `Mehmet Temel Portfolio`
   - Reporting time zone: `Turkey (UTC+3)`
   - Currency: `Turkish Lira (TRY)`

### Step 2: Get Your Measurement ID

1. In your GA4 property, go to **Admin** → **Data Streams**
2. Click on your web stream
3. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add to Environment Variables

Create a `.env.local` file in your project root:

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://mehmettemel.com
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Step 4: Test Analytics

1. Run your development server: `npm run dev`
2. Open your site and check the browser console
3. You should see Google Analytics loading without errors
4. Check your GA4 real-time reports to see if data is coming in

## 🔍 Google Search Console Setup

### Step 1: Add Your Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property"
3. Enter your domain: `https://mehmettemel.com`
4. Choose **Domain** property (recommended)

### Step 2: Verify Ownership

You have several verification options:

#### Option A: HTML Tag (Recommended)

1. In Search Console, click "HTML tag"
2. Copy the meta tag (looks like: `<meta name="google-site-verification" content="...">`)
3. Add it to your `src/app/layout.jsx`:

```javascript
verification: {
  google: 'your-verification-code-here',
},
```

#### Option B: DNS Record

1. Add a TXT record to your domain's DNS
2. Wait for verification (can take up to 24 hours)

### Step 3: Submit Your Sitemap

1. In Search Console, go to **Sitemaps**
2. Add your sitemap URL: `https://mehmettemel.com/sitemap.xml`
3. Click "Submit"

## 🔍 Other Search Engines

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site and verify ownership
3. Submit your sitemap

### Yandex Webmaster

1. Go to [Yandex Webmaster](https://webmaster.yandex.com/)
2. Add your site and verify ownership
3. Submit your sitemap

## 📊 Food Decoded Specific Tracking

### Custom Events to Track:

**1. Content Engagement:**

```javascript
// Decoded post view
gtag('event', 'decoded_post_view', {
  post_title: 'Post Title',
  category: 'gidalar|besinler|mekanizmalar',
  reading_time: 8,
})

// Decoded post scroll depth
gtag('event', 'scroll_depth', {
  post_title: 'Post Title',
  depth_percentage: 50, // 25%, 50%, 75%, 100%
})

// Sources section click
gtag('event', 'source_click', {
  post_title: 'Post Title',
  source_url: 'https://example.com',
})
```

**2. Gems Interaction:**

```javascript
// Gem click (external link)
gtag('event', 'gem_click', {
  gem_title: 'Gem Title',
  gem_type: 'tool|article|video|podcast|site|thread',
  gem_url: 'https://example.com',
})

// Category filter usage
gtag('event', 'filter_used', {
  page: 'gems',
  filter_type: 'category',
  filter_value: 'araçlar|makaleler|etc',
})

// Search usage
gtag('event', 'search', {
  search_term: 'user search query',
  page: 'gems',
})
```

**3. Signals Engagement:**

```javascript
// Signals page view
gtag('event', 'signals_view', {
  update_date: '2025-01-13',
})

// Signal item click
gtag('event', 'signal_click', {
  signal_title: 'Signal Title',
  signal_url: 'https://example.com',
})
```

**4. X (Twitter) Traffic:**

```javascript
// Track traffic from X
// Automatic with UTM parameters
// Example: ?utm_source=twitter&utm_medium=social&utm_campaign=decoded_post
```

### Google Analytics Reports to Monitor:

1. **Content Performance**

   - Decoded posts by views, average time on page
   - Most clicked Gems
   - Signals page weekly views
   - Geographic data (Turkey focus)

2. **Acquisition Reports**

   - X (Twitter) referral traffic
   - Organic search traffic growth
   - Direct traffic (returning visitors)

3. **Behavior Flow**
   - Homepage → Decoded conversion rate
   - Gems click-through rate
   - Average session duration
   - Bounce rate per content type

### Search Console Reports to Monitor:

1. **Performance Report**

   - Search queries bringing traffic
   - Click-through rates
   - Average position

2. **Coverage Report**

   - Indexed pages
   - Any indexing errors
   - Mobile usability issues

3. **Enhancements**
   - Core Web Vitals
   - Mobile usability
   - Rich results

## 🎯 Food Decoded Goals & KPIs

### Primary Goals:

**Traffic:**
- X (Twitter) referral traffic growth: +20% month-over-month
- Organic search traffic: Gradual growth starting month 3-6
- Return visitor rate: >30%

**Engagement:**
- Average time on Decoded posts: >3 minutes
- Gem click-through rate: >15%
- Signals page weekly views: Consistent growth

**Content:**
- Decoded posts published: 2 per month
- Gems added: 8-12 per month
- Signals updates: 4 per month (every Monday)

### Target Keywords to Monitor:

**Brand:**
- "Mehmet Temel"
- "Food Decoded"

**Category:**
- "Gıda mühendisi blog"
- "Beslenme bilimi Türkçe"
- "Gıda bilimi kaynakları"

**Content-Specific:**
- Monitor top performing Decoded post keywords
- Track which Gems get most clicks
- Analyze Signals referral performance

## 🔧 Troubleshooting

### Analytics Not Working?

1. Check if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. Verify the ID format (should start with `G-`)
3. Check browser console for errors
4. Ensure the site is deployed (analytics won't work on localhost)

### Search Console Issues?

1. Verify ownership is complete
2. Check if sitemap is accessible at `/sitemap.xml`
3. Ensure robots.txt allows crawling
4. Wait 24-48 hours for initial indexing

### No Search Traffic?

1. Check if site is indexed (search `site:mehmettemel.com`)
2. Verify sitemap submission
3. Check for crawl errors in Search Console
4. Ensure content is unique and valuable

## 📈 Analytics Implementation Checklist

### Phase 1: Basic Setup
- [ ] Set up Google Analytics 4
- [ ] Add tracking code to layout.jsx
- [ ] Verify Search Console ownership
- [ ] Submit sitemap.xml

### Phase 2: Custom Events
- [ ] Implement Decoded post view tracking
- [ ] Add Gem click tracking
- [ ] Add Signals engagement tracking
- [ ] Set up scroll depth tracking

### Phase 3: Advanced Tracking
- [ ] UTM parameters for X sharing
- [ ] Category filter usage tracking
- [ ] Search query tracking (Gems page)
- [ ] Source click tracking (Decoded posts)

### Phase 4: Monitoring
- [ ] Weekly Signals performance review
- [ ] Monthly content performance report
- [ ] X referral traffic analysis
- [ ] Top performing Gems report

## 📊 Custom GA4 Reports to Create

### 1. Content Performance Dashboard
**Metrics:**
- Decoded posts: Views, avg time, bounce rate
- Top 5 Decoded posts this month
- Category breakdown (Gıdalar vs Besinler vs Mekanizmalar)

### 2. Gems Performance Dashboard
**Metrics:**
- Total Gem clicks
- Click-through rate by category
- Most clicked Gems (top 10)
- Search queries used

### 3. X (Twitter) Traffic Dashboard
**Metrics:**
- Total referral traffic from X
- Conversion rate (X → Decoded post views)
- Top posts shared on X
- Weekly Signals X performance

### 4. User Behavior Dashboard
**Metrics:**
- New vs returning visitors
- Average session duration
- Pages per session
- Most common user flow

## 🎯 Weekly Analytics Review Template

**Every Monday (with Signals update):**
1. Review last week's Signals page views
2. Check X referral traffic
3. Monitor new Decoded post performance
4. Review Gem clicks

**Questions to Ask:**
- Which Decoded post got most views?
- Which Gems got most clicks?
- Did Signals drive traffic to other pages?
- Where is X traffic landing?

## 🎉 Analytics Setup Complete

Once you complete these steps, you'll have:

- ✅ Comprehensive content tracking
- ✅ X (Twitter) traffic monitoring
- ✅ User engagement metrics
- ✅ Search Console insights
- ✅ Custom event tracking
- ✅ Weekly/monthly reporting system

Your Food Decoded site will be fully instrumented for data-driven content decisions! 📊
