const isProduction = process.env.NODE_ENV === "production";

// Cross-site (Vercel <-> Render) cookies need SameSite=None + Secure in
// production; localhost dev over http can't set Secure cookies, so we
// fall back to Lax there.
const authCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 60 * 60 * 1000, // 1h, matches the JWT's expiresIn
};

module.exports = { authCookieOptions };
