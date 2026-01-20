import { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store - resets on deploy (fine for Vercel serverless)
// For production at scale, consider Redis/Upstash
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

// Default configs for different endpoint types
export const RATE_LIMITS = {
  // Strict limits for form submissions
  form: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 per minute
  // Moderate limits for reviews
  review: { windowMs: 60 * 1000, maxRequests: 3 }, // 3 per minute
  // Lenient limits for click tracking (don't block conversions)
  tracking: { windowMs: 60 * 1000, maxRequests: 30 }, // 30 per minute
  // Standard API limits
  api: { windowMs: 60 * 1000, maxRequests: 60 }, // 60 per minute
} as const;

function getClientIdentifier(request: NextRequest): string {
  // Try various headers for client identification
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  const ip = forwardedFor?.split(",")[0].trim() || realIp || cfConnectingIp || "unknown";

  // Include path to rate limit per endpoint
  const path = new URL(request.url).pathname;

  return `${ip}:${path}`;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
}

export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig = RATE_LIMITS.api
): RateLimitResult {
  const key = getClientIdentifier(request);
  const now = Date.now();

  // Clean up expired entries periodically (1% chance per request)
  if (Math.random() < 0.01) {
    cleanupExpiredEntries(now);
  }

  const entry = rateLimitStore.get(key);

  // No existing entry or window expired
  if (!entry || now >= entry.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetIn: Math.ceil(config.windowMs / 1000),
    };
  }

  // Within window
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetIn: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  // Increment count
  entry.count++;
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  };
}

function cleanupExpiredEntries(now: number): void {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now >= entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Helper to create rate limit response headers
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetIn),
  };
}
