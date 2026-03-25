# Security Configuration Justification

This document explains the security configurations implemented in this project using Helmet.js and CORS. 
Each configuration is described along with its purpose and justification based on API security best practices.


## Helmet.js Configuration

### Configuration Applied

```ts
helmet({
  contentSecurityPolicy: false,
  hidePoweredBy: true,
  noSniff: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "no-referrer" },
});

### Justification

1. Content Security Policy (CSP): false
   Content Security Policy (CSP) is primarily used to prevent cross-site scripting (XSS) in web applications that serve HTML content.
   This API returns only JSON responses and does not render HTML in a browser. Therefore, CSP was disabled to avoid unnecessary overhead while still maintaining appropriate security for an API-based system.
2. Hide Powered By: true
   This option removes the X-Powered-By header, which would otherwise reveal that the application is using Express.
   Hiding this information reduces exposure of implementation details and makes it harder for attackers to target known vulnerabilities.
3. No Sniff: true
   This option sets the X-Content-Type-Options header to "nosniff", which prevents browsers from MIME-sniffing responses.
   This helps mitigate certain types of attacks where an attacker might try to trick the browser into interpreting a response as a different content type, such as executing malicious scripts.
4. HSTS (HTTP Strict Transport Security):
   - maxAge: 31536000 (1 year)
   - includeSubDomains: true
   - preload: true
   This configuration enforces secure connections by instructing browsers to only communicate with the server over HTTPS for a specified duration (1 year). 
   Including subdomains ensures that all related services are also protected, and enabling preload allows the domain to be included in browsers' preloaded HSTS lists, providing an additional layer of security against downgrade attacks.
5. Frameguard: { action: "deny" }
   This option sets the X-Frame-Options header to "DENY", which prevents the application from being embedded in iframes on other sites.
   This helps protect against clickjacking attacks, where an attacker might try to trick users into interacting with a hidden iframe that performs malicious actions.
6. Referrer Policy: { policy: "no-referrer" }
   This prevents the browser from sending referrer information with requests.
   It helps protect user privacy and prevents sensitive information from being exposed in request headers.

### Sources
- [Helmet.js Documentation]
  https://helmetjs.github.io/
- [OWASP API Security Top 10]
  https://owasp.org/www-project-api-security/
- OWASP Secure Headers Project
  https://owasp.org/www-project-secure-headers/
- OWASP HTTP Headers Cheat Sheet
  https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html

## CORS Configuration

### Configuration Applied

```ts
{
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

### Justification

1. origin (Production: restricted, Development: open)
   In development:origin: true allows requests from any origin to simplify local testing and development.
   In production: origin: process.env.ALLOWED_ORIGINS?.split(",") || [] Only trusted origins defined in environment variables are allowed.
   This prevents unauthorized websites from accessing the API and improves security.
2. credentials: true
   This allows cookies or authentication headers to be sent in cross-origin requests.
   This is necessary for APIs that support authenticated requests.
   It is safely used together with restricted origins instead of "*".
3. methods: ["GET", "POST", "PUT", "DELETE"]
   Only the required HTTP methods are explicitly allowed.
   This limits the attack surface by preventing unsupported or unnecessary request types.
4. allowedHeaders: ["Content-Type", "Authorization"]
    Only specific headers are allowed in cross-origin requests.
    This prevents attackers from sending unexpected headers that could be used for malicious purposes.

### Sources

- Express CORS Middleware Documentation
  https://expressjs.com/en/resources/middleware/cors.html
- MDN Web Docs - CORS Guide
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- MDN - Access-Control-Allow-Credentials
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials