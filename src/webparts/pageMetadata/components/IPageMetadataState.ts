import { IPageMetadata } from "../../../services/PageMetadataService";

export interface IPageMetadataState {
  loading: boolean;
  pageMetadata?: IPageMetadata;
  error?: string;
}
