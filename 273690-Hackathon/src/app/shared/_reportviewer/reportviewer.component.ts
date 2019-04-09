import {
  Component,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ssrs-reportviewer',
  templateUrl: './reportviewer.component.html',
  styleUrls: ['./reportviewer.component.css']
})
export class ReportViewerComponent implements OnChanges {
  @Input()
  reporturl: string;
  @Input()
  reportserver: string;
  @Input()
  showparameters = 'false';
  @Input()
  parameters?: any;
  @Input()
  language = 'en-us';
  @Input()
  width = 100;
  @Input()
  height = 100;
  @Input()
  toolbar = 'true';

  @Output('error') onError = new EventEmitter<any>();
  constructor(private sanitizer: DomSanitizer) {}

  source: SafeResourceUrl;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.reporturl) {
      this.onError.emit('Src cannot be null');
    }

    if ('reporturl' in changes) {
      this.source = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.buildReportUrl()
      );
    }
  }

  public buildParameterString(): string {
    let parameterString = '';

    for (const param in this.parameters) {
      if (param) {
        if (this.parameters[param] instanceof Array === true) {
          for (const arrayParam in this.parameters[param]) {
            if (arrayParam) {
              parameterString +=
                '&' + param + '=' + this.parameters[param][arrayParam];
            }
          }
        }
        if (
          this.parameters[param] != null &&
          this.parameters[param] instanceof Array === false
        ) {
          parameterString += '&' + param + '=' + this.parameters[param];
        }
        if (this.parameters[param] == null) {
          parameterString += '&' + param + ':isnull=true';
        }
      }
    }
    return parameterString;
  }

  public buildReportUrl(): string {
    if (!this.reporturl) {
      return;
    }
    const parameters = this.buildParameterString();
    return (
      this.reportserver +
      '?/' +
      this.reporturl +
      '&rs:Embed=true' +
      '&rc:Parameters=' +
      this.showparameters +
      parameters +
      '&rs:ParameterLanguage=' +
      this.language +
      '&rc:Toolbar=' +
      this.toolbar
    );
  }
}
