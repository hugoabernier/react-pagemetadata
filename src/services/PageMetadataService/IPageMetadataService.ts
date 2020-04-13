import { IPageMetadata } from ".";

export interface IPageMetadataService {
  getPageMetadata: () => Promise<IPageMetadata>;
}
