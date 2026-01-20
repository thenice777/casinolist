import { z } from "zod";

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .transform((val) => val.trim()),
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters")
    .transform((val) => val.toLowerCase().trim()),
  subject: z.enum(
    ["general", "listing", "partnership", "feedback", "correction", "other"],
    { message: "Invalid subject selected" }
  ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters")
    .transform((val) => val.trim()),
});

// Newsletter subscription validation
export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters")
    .transform((val) => val.toLowerCase().trim()),
  source: z.string().max(50).default("website"),
});

// Review submission validation
export const reviewSchema = z
  .object({
    casinoType: z.enum(["land_based", "online"], {
      message: "Invalid casino type",
    }),
    landBasedCasinoId: z.string().uuid().optional(),
    onlineCasinoId: z.string().uuid().optional(),
    displayName: z.string().max(50).optional().transform((val) => val?.trim()),
    isAnonymous: z.boolean().default(false),
    ratingOverall: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    ratingGames: z.number().int().min(1).max(10).optional(),
    ratingService: z.number().int().min(1).max(10).optional(),
    ratingAtmosphere: z.number().int().min(1).max(10).optional(),
    ratingValue: z.number().int().min(1).max(10).optional(),
    title: z.string().max(100).optional().transform((val) => val?.trim()),
    content: z
      .string()
      .min(50, "Review must be at least 50 characters")
      .max(5000, "Review must be less than 5000 characters")
      .transform((val) => val.trim()),
    pros: z
      .array(z.string().max(100))
      .max(5)
      .optional()
      .transform((val) => val?.map((p) => p.trim())),
    cons: z
      .array(z.string().max(100))
      .max(5)
      .optional()
      .transform((val) => val?.map((c) => c.trim())),
    visitDate: z.string().optional(),
    visitPurpose: z
      .enum(["tourism", "business", "local", "special_event"])
      .optional(),
    playerLevel: z.enum(["casual", "regular", "high_roller"]).optional(),
    gamesPlayed: z.array(z.string()).max(10).optional(),
  })
  .refine(
    (data) => {
      if (data.casinoType === "land_based" && !data.landBasedCasinoId) {
        return false;
      }
      if (data.casinoType === "online" && !data.onlineCasinoId) {
        return false;
      }
      return true;
    },
    { message: "Casino ID is required", path: ["casinoId"] }
  );

// Click tracking validation
export const clickSchema = z.object({
  casinoId: z.string().uuid("Invalid casino ID"),
  casinoType: z.enum(["online", "land_based"], {
    message: "casinoType must be 'online' or 'land_based'",
  }),
  affiliateLink: z.string().url().optional(),
  subid: z.string().max(100).optional(),
});

// Helper to format Zod errors
export function formatZodError(error: z.ZodError): string {
  return error.issues.map((e) => e.message).join(", ");
}

// Type exports
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ClickInput = z.infer<typeof clickSchema>;
