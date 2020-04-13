export interface IUserId {
  NameId: string;
  NameIdIssuer: string;
}

export interface IAuthor {
  Id?: number;
  IsHiddenInUI?: boolean;
  LoginName?: string;
  Title: string;
  PrincipalType?: number;
  Email: string;
  Expiration?: string;
  IsEmailAuthenticationGuestUser?: boolean;
  IsShareByEmailGuestUser?: boolean;
  IsSiteAdmin?: boolean;
  UserId?: IUserId;
  UserPrincipalName: string;
}

export interface IPageMetadata {
  Author: IAuthor;
  ModifiedBy: IAuthor;
  TimeCreated: Date;
  TimeLastModified: Date;
}

