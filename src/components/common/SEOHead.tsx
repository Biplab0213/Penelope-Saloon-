import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface ServiceSchemaData {
  name: string;
  description: string;
  serviceType?: string;
  url: string;
  image?: string;
  price?: string;
}

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  breadcrumbs?: BreadcrumbItem[];
  serviceSchema?: ServiceSchemaData;
  faqSchema?: FAQSchemaItem[];
  customSchema?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_ORIGIN = 'https://penelope-saloon.vercel.app';
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/unnamed-3.webp`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogImage,
  ogType = 'website',
  breadcrumbs,
  serviceSchema,
  faqSchema,
  customSchema,
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper to safely set or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);

    // 3. Canonical Link
    const fullCanonicalUrl = canonicalPath.startsWith('http')
      ? canonicalPath
      : `${SITE_ORIGIN}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. OpenGraph Tags
    const imageToUse = ogImage
      ? (ogImage.startsWith('http') ? ogImage : `${SITE_ORIGIN}${ogImage}`)
      : DEFAULT_OG_IMAGE;

    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', imageToUse);
    setMetaTag('property', 'og:site_name', 'Penelope Salon');
    setMetaTag('property', 'og:locale', 'en_US');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageToUse);

    // 6. Dynamic JSON-LD Structured Data
    const schemaEntities: Record<string, unknown>[] = [];

    // WebPage Schema
    schemaEntities.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${fullCanonicalUrl}#webpage`,
      url: fullCanonicalUrl,
      name: title,
      description: description,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: 'Penelope Salon',
        url: `${SITE_ORIGIN}/`,
      },
    });

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaEntities.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.path.startsWith('http')
            ? crumb.path
            : `${SITE_ORIGIN}${crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`}`,
        })),
      });
    }

    // Service Schema
    if (serviceSchema) {
      schemaEntities.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${fullCanonicalUrl}#service`,
        name: serviceSchema.name,
        serviceType: serviceSchema.serviceType || serviceSchema.name,
        description: serviceSchema.description,
        url: fullCanonicalUrl,
        image: serviceSchema.image
          ? (serviceSchema.image.startsWith('http') ? serviceSchema.image : `${SITE_ORIGIN}${serviceSchema.image}`)
          : DEFAULT_OG_IMAGE,
        provider: {
          '@type': ['BeautySalon', 'HairSalon'],
          '@id': `${SITE_ORIGIN}/#salon`,
          name: 'Penelope Salon',
          telephone: '+1-661-372-7001',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1031 Main St',
            addressLocality: 'Delano',
            addressRegion: 'CA',
            postalCode: '93215',
            addressCountry: 'US',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 35.770239,
            longitude: -119.246060,
          },
          priceRange: '$$',
        },
        areaServed: {
          '@type': 'City',
          name: 'Delano',
        },
      });
    }

    // FAQPage Schema
    if (faqSchema && faqSchema.length > 0) {
      schemaEntities.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqSchema.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    // Custom Schema injection if provided
    if (customSchema) {
      if (Array.isArray(customSchema)) {
        schemaEntities.push(...customSchema);
      } else {
        schemaEntities.push(customSchema);
      }
    }

    // Inject into head as a unified script tag
    const scriptId = 'page-dynamic-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaEntities);
  }, [
    title,
    description,
    canonicalPath,
    ogImage,
    ogType,
    breadcrumbs,
    serviceSchema,
    faqSchema,
    customSchema,
  ]);

  return null;
};

