import { ApiModule } from '../api';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatSortModule } from '@angular/material/sort';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

import { AutocompleteComponent, CopyableTextComponent, DialogComponent, EmptyLayoutComponent, ConfirmationDialogComponent,
         IframeComponent, MobileNumberComponent, PageLayoutComponent, SpinnerComponent, RefreshDataComponent, MapComponent } from './components';
import { AuthService, EventService, GeoLocationService, SettingsService, UiBundleUpdaterService, UtilService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    ReactiveFormsModule,

    CanvasJSAngularChartsModule,
    LeafletModule,
    LeafletMarkerClusterModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatMenuModule,
    MatRippleModule,
    MatSnackBarModule,
    MatSortModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,

    ApiModule.forChild(),
    RouterModule.forChild([]),
  ],
  exports: [
    AutocompleteComponent,
    ConfirmationDialogComponent,
    CopyableTextComponent,
    DialogComponent,
    EmptyLayoutComponent,
    IframeComponent,
    MapComponent,
    MobileNumberComponent,
    PageLayoutComponent,
    RefreshDataComponent,
    SpinnerComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    CanvasJSAngularChartsModule,
    LeafletModule,
    LeafletMarkerClusterModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSnackBarModule,
    MatSortModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
  ],
  declarations: [
    AutocompleteComponent,
    ConfirmationDialogComponent,
    CopyableTextComponent,
    DialogComponent,
    EmptyLayoutComponent,
    IframeComponent,
    MapComponent,
    MobileNumberComponent,
    PageLayoutComponent,
    RefreshDataComponent,
    SpinnerComponent,
  ],
})
export class AppCommonModule {
  static forRoot(): ModuleWithProviders<AppCommonModule> {
    return {
      ngModule: AppCommonModule,
      providers: [
        AuthService,
        EventService,
        GeoLocationService,
        SettingsService,
        UiBundleUpdaterService,
        UtilService,
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: { appearance: 'outline' },
        },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
      ],
    };
  }

  static forChild(): ModuleWithProviders<AppCommonModule> {
    return {
      ngModule: AppCommonModule,
      providers: []
    };
  }
}
