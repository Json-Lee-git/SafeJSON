# How to Verify Your JSON Formatter Is Safe: A 30-Second Test

You use online JSON tools every day. But how do you know they are not sending your data to a server?

Here is a 30-second test that works on any online tool:

## The Network Tab Test

1. Open your JSON formatter of choice
2. Open DevTools (F12) → Network tab
3. Paste any JSON data into the tool
4. Look for new network requests

**If you see XHR or fetch requests when you paste or format JSON, your data has left your browser and is now on someone else's server.**

This is not hypothetical. In November 2025, security researchers at watchTowr discovered that jsonformatter.org and codebeautify.org had been storing user-submitted data without authentication. Over 80,000 code snippets — including AWS keys, GitHub tokens, and database passwords — were publicly accessible. Attackers were actively scraping the data within 48 hours.

## Red Flags in Online Developer Tools

Beyond the Network Tab test, here are signs a tool is processing your data server-side:

- **"Save" or "Share" features.** If a tool offers to save your work or generate a shareable link, your data is stored on a server.
- **"Recent" or "History" pages.** jsonformatter.org's "Recent Links" page was the exact feature that caused the credential leak.
- **Loading spinners during formatting.** If formatting is not instant, the tool is likely making a round trip to a server.
- **No explicit privacy claim.** If the tool does not state "all processing is client-side" or "your data never leaves your browser," assume it is server-side.

## Client-Side Tools That Pass the Test

The safest online tools process everything in your browser. Here is how to identify them:

- Open DevTools → Network tab
- Paste data
- Zero new requests = your data stayed local

This is the design principle behind [SafeJSON](https://www.safejson.dev). All formatting, tree view rendering, JWT decoding, and JSON diff comparison happens in JavaScript running in your browser. There is no backend processing user data.

## The Bottom Line

You would not paste your AWS credentials into a random person's terminal. But every time you use a server-side online tool, that is essentially what you are doing.

The fix is simple: take 30 seconds to check. Open DevTools. Look at the Network tab. If you see requests going out, find a tool that does not.

---

*I built SafeJSON after learning about the jsonformatter.org breach. It is open source (MIT) at [github.com/s01071233604-tech/safejson](https://github.com/s01071233604-tech/safejson).*
