import { IPageMetadata } from ".";

/**
 * Returns metadata about a page
 */
export interface IPageMetadataService {
  getPageMetadata: () => Promise<IPageMetadata>;
}
