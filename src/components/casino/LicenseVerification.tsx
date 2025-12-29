"use client";

import { Shield, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { getLicenseAuthority, getTrustLevelColor, getTrustLevelBgColor } from "@/lib/licenses";

interface LicenseVerificationProps {
  licenses: string[];
}

export default function LicenseVerification({ licenses }: LicenseVerificationProps) {
  if (!licenses || licenses.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">Licenses & Verification</h3>
      </div>

      <div className="space-y-3">
        {licenses.map((license) => {
          const authority = getLicenseAuthority(license);

          if (authority) {
            return (
              <div
                key={license}
                className="p-4 bg-slate-700/30 rounded-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className={`w-4 h-4 ${getTrustLevelColor(authority.trustLevel)}`} />
                      <span className="text-white font-medium">{authority.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${getTrustLevelBgColor(authority.trustLevel)} ${getTrustLevelColor(authority.trustLevel)}`}>
                        {authority.trustLevel === "high" ? "Tier 1" : authority.trustLevel === "medium" ? "Tier 2" : "Tier 3"}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">
                      {authority.description}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {authority.country}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {authority.verifyUrl && (
                      <a
                        href={authority.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded transition-colors"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Verify
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={authority.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs bg-slate-600 hover:bg-slate-500 text-white px-3 py-1.5 rounded transition-colors"
                    >
                      Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          }

          // Unknown license - display without verification
          return (
            <div
              key={license}
              className="flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg text-slate-300"
            >
              <AlertCircle className="w-4 h-4 text-slate-500" />
              <span className="text-sm">{license}</span>
              <span className="text-xs text-slate-500">(Unverified)</span>
            </div>
          );
        })}
      </div>

      <p className="text-slate-500 text-xs mt-4">
        Always verify licenses directly with the regulatory authority before playing.
      </p>
    </div>
  );
}
