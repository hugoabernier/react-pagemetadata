import { IPageMetadataService } from "./IPageMetadataService";
import { IPageMetadata } from "./IPageMetadata";
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class MockPageMetadataDataService implements IPageMetadataService {
  private _fakeMetadata: IPageMetadata;
  constructor(context: WebPartContext) {
    const { user } = context.pageContext;
    const displayName: string = user ? user.displayName : 'User1';
    const email: string = user.email ? user.email : user.loginName ? user.loginName : 'user1@contoso.com' ;
    //text: ,
    //email: this.props.context.pageContext.user.email ? this.props.context.pageContext.user.email : this.props.context.pageContext.user.loginName,
    this._fakeMetadata = {
      Author:
      {
        Title: displayName,
        Email: email,
        Id: 1,
        LoginName: email,
        UserPrincipalName: email
      },
      ModifiedBy: {
        Title: displayName,
        Email: email,
        Id: 1,
        LoginName: email,
        UserPrincipalName: email
      },
      TimeLastModified: new Date(),
      TimeCreated: new Date()
    };
  }
  public getPageMetadata(): Promise<IPageMetadata> {


    return new Promise<IPageMetadata>((resolve) => {
      setTimeout(() => {
        resolve(this._fakeMetadata);
      }, 2000);
    });
  }
}
