import * as React from 'react';
import styles from './PageMetadata.module.scss';
import { IPageMetadataProps } from './IPageMetadataProps';
import { IPageMetadataState } from './IPageMetadataState';
import * as strings from 'PageMetadataWebPartStrings';

// Use this to determine if we're connected or not
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

// Use this to extract metadata
import { IPageMetadataService, MockPageMetadataDataService, PageMedatadataService, IPageMetadata } from '../../../services/PageMetadataService';

// Use this for persona cards
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

// Use this for loading indicator
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

// Use this for showing labels
import { Label } from 'office-ui-fabric-react/lib/Label';

/***
 * Displays page metadata for the current page
 */
export default class PageMetadata extends React.Component<IPageMetadataProps, IPageMetadataState> {
  /**
   * Initializes an instance of the metadata display
   */
  constructor(props: IPageMetadataProps) {
    super(props);

    // Start by displaying a loading spinner
    this.state = {
      loading: true
    };
  }

  /**
   * Load metadata when the web part gets loaded
   */
  public componentDidMount(): void {
    this._loadMetadata();
  }

  /**
   * Render the spinner or the metadata, depending on whether we're done loading or not
   */
  public render(): React.ReactElement<IPageMetadataProps> {
    // If the page is still loading, show a pretty loading spinner
    if (this.state.loading) {
      return (
        <div className={styles.pageMetadata}>
          <Spinner label={strings.LoadingSpinnerLabel} />
        </div>
      );
    }

    // if the page isn't loading, get the metadata from the state
    const { pageMetadata } = this.state;
    const { Author, ModifiedBy } = pageMetadata;
    const authorTitle: string = Author && Author.Title ? Author.Title : undefined;
    const authorImage: string = Author && Author.UserPrincipalName ? `${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?size=s&accountname=${Author.UserPrincipalName}` : undefined;
    const modifierTitle: string = ModifiedBy && ModifiedBy.Title ? ModifiedBy.Title : undefined;
    const modifierImage: string = ModifiedBy && ModifiedBy.UserPrincipalName ? `${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?size=s&accountname=${ModifiedBy.UserPrincipalName}` : undefined;

    return (
      <div className={styles.pageMetadata}>
        {/* Created */}
        <div>
          <Label className={styles.label}>{strings.CreatedLabel}</Label>
          <Label>{pageMetadata.TimeCreated.toDateString()}</Label>
        </div>

        {/* Author */}
        {Author &&
          <div><Label className={styles.label}>{strings.AuthorLabel}</Label>
            <Persona
              text={authorTitle}
              size={PersonaSize.size24}
              imageUrl={authorImage}
            /></div>}

        {/* Modified */}
        <div>
          <Label className={styles.label}>{strings.ModifiedLabel}</Label>
          <Label>{pageMetadata.TimeLastModified.toDateString()}</Label>
        </div>

        {/* Modified by */}
        {ModifiedBy &&
          <div>
            <Label className={styles.label}>{strings.ModifiedByLabel}</Label>
            <Persona
              text={modifierTitle}
              size={PersonaSize.size24}
              imageUrl={modifierImage}
            /></div>}

      </div>
    );

  }

  /**
   * Loads the current page metadata
   */
  private _loadMetadata() {
    // Get an instance of metadata service
    let metadataService: IPageMetadataService;

    // Get the current page so that we don't try to read from the workbench
    const { serverRequestPath } = this.props.context.pageContext.site;

    // Are we testing locally or in a workbench page?
    if (Environment.type === EnvironmentType.Local || serverRequestPath === '/_layouts/15/workbench.aspx') {
      // Use the fake metadata service
      metadataService = new MockPageMetadataDataService(this.props.context);
    } else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
        // If we're not testing, return use the real metadata service
        metadataService = new PageMedatadataService(this.props.context);
    }

    // Retrieve the metadata
    metadataService.getPageMetadata().then((metadataResponse: IPageMetadata) => {
      // Once we get the results, save it to state so we don't always have to reload it
      this.setState({
        loading: false, // Not loading anymore
        error: undefined, // No more errors
        pageMetadata: metadataResponse
      });
    }, error => this._showError(error));
  }

  /**
   * Saves errors to state so we can display them later
   */
  private _showError(error: any) {
    this.setState({
      loading: false,
      error: error
    });
  }
}
