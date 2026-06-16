# Reddit / HN Distribution Drafts

**Date:** 2026-06-16
**Strategy:** Education first, product second. Post about the *method*, not the tool.

---

## Distribution Principle

- Education first, product second
- Do not post as "I built a tool"
- Do not lead with SafeJSON
- Do not attack competitors
- Do not imply all online tools are unsafe
- Link can go in comments or late in the post, not the title or first paragraph
- If someone asks who built it, be transparent: "I built SafeJSON after the 80K leak"

---

## A. Reddit Discussion Post (No Direct Product Pitch)

**Target subreddits:** r/webdev, r/javascript, r/programming

### Title Options

1. How to check if an online JSON formatter uploads your data (30 seconds)
2. PSA: Open DevTools Network tab before pasting sensitive JSON into any online tool
3. I checked 5 popular JSON tools with DevTools — most upload your data. Here's how to test yours.
4. What happened when I checked whether my JSON formatter was actually client-side
5. The 80K credential leak happened because no one checked. Here's a 30-second test.

### Body

```
After the jsonformatter.org leak in late 2025 where 80K credentials were
exposed, I started checking every online dev tool I use with the DevTools
Network tab. Takes about 30 seconds.

Here's the method:

1. Open the tool
2. Open DevTools (F12) → Network tab
3. Clear existing requests
4. Paste a harmless test JSON first — never start with real data
5. Run the formatter, validator, or diff tool
6. Check whether any new POST/PUT request contains your pasted content

If share/save features exist, the tool is storing your data on a server.
If analytics requests include your pasted JSON, the tool is leaking
content through telemetry. Most developers never check either.

How do you handle JSON/JWT/log formatting for production-like data?
Do you have a go-to tool you've already verified, or do you just avoid
online tools entirely for anything sensitive?
```

**Rules:**
- No SafeJSON link in the main post body
- If someone asks "what tool do you use?", reply with the follow-up comment
- Do not post from a brand-new account
- Post once, not cross-posted to multiple subreddits

---

## B. Reddit Follow-Up Comment

Only post this when someone asks:

```
I built a small tool after the 80K leak called SafeJSON — it processes
JSON locally, no pasted-content upload. You can verify with DevTools.

I also wrote a guide that expands on the method above:
https://www.safejson.dev/security/check-json-formatter-upload
```

---

## C. Hacker News Version

### Title Options

1. How to Check If an Online JSON Formatter Uploads Your Data
2. A 30-second DevTools check to see if your JSON tool uploads pasted content
3. After the 80K credential leak: a method for verifying JSON tool privacy
4. The DevTools Network check most developers skip before pasting sensitive JSON
5. How I verify whether an online JSON tool actually processes data client-side

### Post

```
After the jsonformatter.org leak in November 2025 — 80K credentials
exposed through unprotected server-side features — I started checking
every online dev tool with DevTools before pasting anything sensitive.

The method: open DevTools → Network tab, paste test JSON, run the tool,
check whether any request contains your pasted content. Takes 30 seconds.

Share/save features are the clearest red flag — your data is stored on
a server. Analytics payloads that include pasted JSON are a subtler one.

I expanded this into a guide: https://www.safejson.dev/security/check-json-formatter-upload

Not a product launch — just the verification method I use. Curious how
others handle this for production JSON, JWTs, and logs.
```

---

## D. Anti-Spam Checklist

- Do not use a brand-new account for link posts
- Comment first in relevant threads before posting your own
- Do not cross-post the same text to multiple subreddits
- Do not post shortened links
- Do not overuse the SafeJSON name in the post
- If mentioning you built SafeJSON, say it once, late in the post or in a comment
- If the post gets removed, wait 2 weeks before trying again with different wording
- If someone accuses you of self-promotion, do not argue — reply with substance or not at all
