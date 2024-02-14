import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../../common';
import { CustomerModel } from 'src/app/models';
import { of } from 'rxjs';

@Component({
  selector: 'de-cablebill-preview',
  templateUrl: './cablebill-preview.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './cablebill-preview.component.scss'],
})
export class CableBillComponent extends BaseComponent implements OnInit {
  customerId = '';

  customer!: CustomerModel;

  tamilCustomer = {
    Name: '',
    Area: '',
    Jan2023: 'ஜனவரி 2023',
    Feb2023: 'பிப்ரவரி 2023',
    Mar2023: 'மார்ச் 2023',
    Apr2023: 'ஏப்ரல் 2023',
    May2023: 'மே 2023',
    Jun2023: 'ஜூன் 2023',
    Jul2023: 'ஜூலை 2023',
    Aug2023: 'ஆகஸ்ட் 2023',
    Sep2023: 'செப்டம்பர் 2023',
    Oct2023: 'அக்டோபர் 2023',
    Nov2023: 'நவம்பர் 2023',
    Dec2023: 'டிசம்பர் 2023',
    Jan2024: 'ஜனவரி 2024',
    Feb2024: 'பிப்ரவரி 2024',
    Mar2024: 'மார்ச் 2024',
    Apr2024: 'ஏப்ரல் 2024',
    May2024: 'மே 2024',
    Jun2024: 'ஜூன் 2024',
    Jul2024: 'ஜூலை 2024',
    Aug2024: 'ஆகஸ்ட் 2024',
    Sep2024: 'செப்டம்பர் 2024',
    Oct2024: 'அக்டோபர் 2024',
    Nov2024: 'நவம்பர் 2024',
    Dec2024: 'டிசம்பர் 2024',
  };

  showHistory = false;

  pendingMonths = '';

  pendingMonthsTamil = '';

  totalPendingAmount = 0;

  error = false;

  constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.settingsService.processingText = `Fetching details...`;

    try {
      this.customerId = atob(this.route.snapshot.params?.id);
      this.apiGSheetDataService.getCableCustomerDetails(this.customerId)
        .subscribe({
          next: (res) => this.initialize(res),
          error: (err) => this.setProcessingError(err),
        });
    } catch (e) {
      this.setProcessingError(`Invalid link.`);
    }
  }

  initialize(customer: CustomerModel) {
    (window as any).c = customer;
    this.customer = customer;
    this.utilService.getTranslation([this.customer.Name, this.customer.Area]).subscribe((r) => {
      this.tamilCustomer.Name = r[0];
      this.tamilCustomer.Area = r[1];
    });
    const pendingMonths = this.customer.getPendingMonths();
    this.pendingMonths = pendingMonths.join(', ');
    this.pendingMonthsTamil = pendingMonths.map(pm => (this.tamilCustomer as any)[pm] || '').join(', ');
    this.totalPendingAmount = this.customer.getTotalPendingPayment();
    this.settingsService.processingText = '';
    console.log(this);
  }

  setProcessingError(err: any) {
    this.error = err;
    this.settingsService.processingText = '';
    console.log(err);
  }
}
