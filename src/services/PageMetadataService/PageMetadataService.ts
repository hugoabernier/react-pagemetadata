// Import PnP js to query the page
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import { IFileInfo } from "@pnp/sp/files";
import { IPageMetadataService } from "./IPageMetadataService";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IPageMetadata } from ".";

export class PageMedatadataService implements IPageMetadataService {
  private _currentPageUrl: string;

  constructor(context: WebPartContext) {
    this._currentPageUrl = context.pageContext.site.serverRequestPath;
    // Initialize the PnPJs with the current context
    sp.setup({
      spfxContext: context
    });
  }

  public getPageMetadata(): Promise<IPageMetadata> {
    return new Promise<IPageMetadata>((resolve, reject) => {
      sp.web.getFileByServerRelativeUrl(this._currentPageUrl)
        .select('ModifiedBy', 'TimeLastModified', 'Author', 'TimeCreated')
        .expand('ModifiedBy', 'Author')
        .get()
        .then((file: IFileInfo) => {
          const metadata: IPageMetadata = {
            Author: file["Author"],
            TimeLastModified: new Date(file.TimeLastModified),
            ModifiedBy: file["ModifiedBy"],
            TimeCreated: new Date(file.TimeCreated)
          };
          resolve(metadata);
        })
        .catch(error => reject(error));
    });
  }

}
