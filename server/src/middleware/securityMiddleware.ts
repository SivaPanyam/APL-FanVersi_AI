import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import hpp from "hpp";

// General API Rate Limiter (100 requests per 15 minutes)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict Rate Limiter for sensitive endpoints like predictions/chat (20 per minute)
export const strictLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Rate limit exceeded for this endpoint",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// XSS Sanitization Middleware
export const xssSanitize = xss();

// HTTP Parameter Pollution Protection
export const hppProtect = hpp();
