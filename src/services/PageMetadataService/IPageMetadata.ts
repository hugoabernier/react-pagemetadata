/**
 * The user id
 */
export interface IUserId {
  NameId: string;
  NameIdIssuer: string;
}

/**
 * Author or editor of a page
 */
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

/**
 * Contains metadata about a page
 * Add more metadata as desired
 */
export interface IPageMetadata {
  /**
   * Who created the page
   */
  Author: IAuthor;

  /**
   * Who modified the page
   */
  ModifiedBy: IAuthor;

  /**
   * When the page was created
   */
  TimeCreated: Date;

  /**
   * When the page was modified
   */
  TimeLastModified: Date;
}

