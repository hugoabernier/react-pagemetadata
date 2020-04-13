declare interface IPageMetadataWebPartStrings {
  ModifiedByLabel: string;
  ModifiedLabel: string;
  AuthorLabel: string;
  CreatedLabel: string;
  LoadingSpinnerLabel: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'PageMetadataWebPartStrings' {
  const strings: IPageMetadataWebPartStrings;
  export = strings;
}
