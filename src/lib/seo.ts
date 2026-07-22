import { Metadata } from 'next';
import baseConfig from '@/configs/base';
interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Construct SEO metadata for Next.js pages
 * SEO CONFIG
 * Optimized for US market and social sharing (Facebook, Instagram)
 */
export function constructMetadata({
  title,
  description = "Kosmo DNC provides interior design, commercial fit-outs, residential renovations, project management and branding in Maryland and Northern Virginia.",
  image = "/seo.png",
  url = "",
  type = 'website',
  keywords = [],
  noIndex = false,
}: SeoProps): Metadata {
  const baseUrl = baseConfig.frontendDomain || 'https://kosmodnc.com';
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const siteName = "Kosmo DNC";

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: keywords.length > 0 ? keywords : [
      "interior design and construction Maryland",
      "commercial interior design Maryland",
      "design build contractor Rockville MD",
      "commercial fit-out Maryland",
      "residential renovation Maryland",
      "nail salon design and construction",
      "interior design Northern Virginia",
      "custom joinery Maryland",
      "building permit drawings Maryland",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    
    openGraph: {
      type: type === 'product' ? 'website' : type,
      title,
      description,
      url: fullUrl,
      siteName,
      images: [{
        url: fullImageUrl,
        width: 1200,
        height: 630,
        alt: title,
      }],
      locale: 'en_US',
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: 'Kosmo DNC',
    },
    
    alternates: {
      canonical: fullUrl,
    },
    
    metadataBase: new URL(baseUrl),
    
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    
    // Additional meta for US market
    other: {
      'facebook-domain-verification': process.env.FB_DOMAIN_VERIFICATION || '',
    },
  };
}

/**
 * Generate structured data for SEO
 */
interface StructuredDataInput {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  inStock?: boolean;
  title?: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  url?: string;
  [key: string]: unknown;
}

export function generateStructuredData(type: 'Product' | 'Article' | 'Organization', data: StructuredDataInput) {
  const baseUrl = baseConfig.frontendDomain || 'https://your-domain.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Your App Name';
  
  const schemas = {
    Product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      image: data.image?.startsWith('http') ? data.image : `${baseUrl}${data.image}`,
      brand: {
        '@type': 'Brand',
        name: siteName,
      },
      offers: {
        '@type': 'Offer',
        price: data.price,
        priceCurrency: 'USD',
        availability: data.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: siteName,
        },
      },
    },
    
    Article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      image: data.image?.startsWith('http') ? data.image : `${baseUrl}${data.image}`,
      author: {
        '@type': 'Person',
        name: data.author || siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo-no-bg.png`,
        },
      },
      datePublished: data.publishedAt,
      dateModified: data.updatedAt || data.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}${data.url}`,
      },
    },
    
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
      sameAs: [
        'https://www.facebook.com/Kosmodnc/',
        'https://www.instagram.com/kosmo.dnc/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-443-736-0577',
        contactType: 'customer service',
        availableLanguage: ['English'],
      },
    },
  };

  return schemas[type];
}

/**
 * Validate image for social sharing (Facebook/Instagram requirements)
 */
export function validateSocialImage(imageUrl: string): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  // Check if image is absolute URL
  if (!imageUrl.startsWith('http')) {
    warnings.push('Image should be an absolute URL for social sharing');
  }
  
  // Facebook/Instagram recommendations
  if (!imageUrl.includes('1200x630') && !imageUrl.includes('og-image')) {
    warnings.push('Image should be 1200x630px for optimal social sharing');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
  };
}

/**
 * Generate breadcrumb structured data
 */
// Example usage: generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Category', url: '/category' }, { name: 'Product', url: '/category/product' }])
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  const baseUrl = baseConfig.frontendDomain || 'https://your-domain.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}