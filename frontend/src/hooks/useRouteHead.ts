import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_METADATA, type RouteHeadData } from '@/data/routeMetadata';

/**
 * Hook to update document head metadata based on current route
 * Automatically runs whenever the route changes
 */
export function useRouteHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Get metadata for current route, default to home if not found
    const metadata = ROUTE_METADATA[pathname] || ROUTE_METADATA['/'];

    updateHeadData(metadata);
  }, [pathname]);
}

/**
 * Helper function to update document head elements
 */
function updateHeadData(metadata: RouteHeadData) {
  // Update title
  document.title = metadata.title;

  // Update description meta tag
  updateMetaTag('name', 'description', metadata.description);

  // Update keywords if provided
  if (metadata.keywords) {
    updateMetaTag('name', 'keywords', metadata.keywords);
  }

  // Update Open Graph tags for social sharing
  if (metadata.ogTitle) {
    updateMetaTag('property', 'og:title', metadata.ogTitle);
  }

  if (metadata.ogDescription) {
    updateMetaTag('property', 'og:description', metadata.ogDescription);
  }

  if (metadata.ogImage) {
    updateMetaTag('property', 'og:image', metadata.ogImage);
  }
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(
  type: 'name' | 'property',
  nameOrProperty: string,
  content: string
) {
  let element = document.querySelector(`meta[${type}="${nameOrProperty}"]`);

  if (!element) {
    // Create new meta tag if it doesn't exist
    element = document.createElement('meta');
    element.setAttribute(type, nameOrProperty);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}
