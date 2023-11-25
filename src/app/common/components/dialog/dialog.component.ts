import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BaseComponent } from '../base.component';

@Component({
  selector: 'de-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent extends BaseComponent implements AfterViewInit {
  @Input() closeOnBackdropClick = false;

  @ViewChild(CdkPortal) public readonly portal: CdkPortal | undefined;

  // the parent is in charge of destroying this component (usually through ngIf or route change)
  @Output() public readonly closeDialog = new EventEmitter<void>();

  private readonly overlayConfig = new OverlayConfig({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
  });
  private overlayRef = this.overlay.create(this.overlayConfig);

  constructor(private readonly overlay: Overlay) {
    super();
  }

  public ngAfterViewInit(): void {
    this.overlayRef?.attach(this.portal);
    if (this.closeOnBackdropClick) {
      this.overlayRef.backdropClick().subscribe(() => {
        this.closeDialog.emit();
      });
    }
  }

  public ngOnDestroy(): void {
    // parent destroys this component, this component destroys the overlayRef
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }
}
