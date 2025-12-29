import { LandBasedCasino, OnlineCasino, Destination } from "@/types/casino";

interface OrganizationSchemaProps {
  type: "organization";
}

interface CasinoSchemaProps {
  type: "casino";
  casino: LandBasedCasino;
}

interface OnlineCasinoSchemaProps {
  type: "online-casino";
  casino: OnlineCasino;
}

interface DestinationSchemaProps {
  type: "destination";
  destination: Destination;
}

interface BreadcrumbSchemaProps {
  type: "breadcrumb";
  items: { name: string; url: string }[];
}

type StructuredDataProps =
  | OrganizationSchemaProps
  | CasinoSchemaProps
  | OnlineCasinoSchemaProps
  | DestinationSchemaProps
  | BreadcrumbSchemaProps;

export default function StructuredData(props: StructuredDataProps) {
  let schema: object;

  switch (props.type) {
    case "organization":
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "CasinoList.io",
        url: "https://casinolist.io",
        logo: "https://casinolist.io/logo.png",
        description:
          "The trusted authority for casino discovery worldwide. Expert ratings and reviews for online and land-based casinos.",
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@casinolist.io",
        },
      };
      break;

    case "casino":
      schema = {
        "@context": "https://schema.org",
        "@type": "Casino",
        name: props.casino.name,
        description: props.casino.shortDescription || props.casino.description,
        url: `https://casinolist.io/casino/${props.casino.slug}`,
        image: props.casino.heroImageUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: props.casino.address,
          addressLocality: props.casino.city,
          addressRegion: props.casino.state,
          addressCountry: props.casino.country,
          postalCode: props.casino.postalCode,
        },
        geo: props.casino.coordinates ? {
          "@type": "GeoCoordinates",
          latitude: props.casino.coordinates.latitude,
          longitude: props.casino.coordinates.longitude,
        } : undefined,
        telephone: props.casino.phone,
        aggregateRating: Number(props.casino.ratingOverall) > 0 ? {
          "@type": "AggregateRating",
          ratingValue: Number(props.casino.ratingOverall).toFixed(1),
          bestRating: "5",
          worstRating: "1",
          ratingCount: props.casino.reviewCount || 1,
        } : undefined,
        priceRange: props.casino.minTableBet
          ? `$${props.casino.minTableBet}+`
          : undefined,
        openingHours: props.casino.is24Hours ? "Mo-Su 00:00-24:00" : undefined,
        amenityFeature: props.casino.amenities?.map((amenity) => ({
          "@type": "LocationFeatureSpecification",
          name: amenity.replace(/_/g, " "),
          value: true,
        })),
      };
      break;

    case "online-casino":
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: props.casino.name,
        description: props.casino.shortDescription || props.casino.description,
        url: props.casino.website,
        aggregateRating: Number(props.casino.ratingOverall) > 0 ? {
          "@type": "AggregateRating",
          ratingValue: Number(props.casino.ratingOverall).toFixed(1),
          bestRating: "5",
          worstRating: "1",
          ratingCount: props.casino.reviewCount || 1,
        } : undefined,
        offers: props.casino.welcomeBonusDescription ? {
          "@type": "Offer",
          name: "Welcome Bonus",
          description: props.casino.welcomeBonusDescription,
        } : undefined,
      };
      break;

    case "destination":
      schema = {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        name: props.destination.name,
        description: props.destination.shortDescription || props.destination.description,
        url: `https://casinolist.io/destinations/${props.destination.slug}`,
        image: props.destination.heroImageUrl,
        geo: props.destination.coordinates ? {
          "@type": "GeoCoordinates",
          latitude: props.destination.coordinates.latitude,
          longitude: props.destination.coordinates.longitude,
        } : undefined,
        containsPlace: {
          "@type": "Casino",
          name: `Casinos in ${props.destination.name}`,
        },
        touristType: ["Gambler", "Casino Enthusiast"],
      };
      break;

    case "breadcrumb":
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
