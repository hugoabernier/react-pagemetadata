import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import PageMetadata from './components/PageMetadata';
import { IPageMetadataProps } from './components/IPageMetadataProps';

export interface IPageMetadataWebPartProps {
  // no properties defined
}

export default class PageMetadataWebPart extends BaseClientSideWebPart <IPageMetadataWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPageMetadataProps> = React.createElement(
      PageMetadata,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
