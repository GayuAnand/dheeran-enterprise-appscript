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
      // of(new CustomerModel({"ID":"CDE100000001","Card":"","Name":"Test","Area":"Rasampalayam East (A5)","Mobile":"9944272375","STB":"","AllowCredit":"","Bulk Payment":"","STB Status":"","Suresh Settlement Status":"Active","Status":"Active","STB Type":"","Latitude":"","Longitude":"","Connection On":"2023-12-19T18:30:00.000Z","Own Notes":"test","Notes":"","Missing collection settlement":"","Advance":"","Bill":200,"Regular":"NoPayment","Dec2024":"","Dec2024 Collection Date":"","Dec2024 Collection By":"","Dec2024 Settlement Date":"","Dec2024 Settlement To":"","Dec2024 Notes":"","Nov2024":"","Nov2024 Collection Date":"","Nov2024 Collection By":"","Nov2024 Settlement Date":"","Nov2024 Settlement To":"","Nov2024 Notes":"","Oct2024":"","Oct2024 Collection Date":"","Oct2024 Collection By":"","Oct2024 Settlement Date":"","Oct2024 Settlement To":"","Oct2024 Notes":"","Sep2024":"","Sep2024 Collection Date":"","Sep2024 Collection By":"","Sep2024 Settlement Date":"","Sep2024 Settlement To":"","Sep2024 Notes":"","Aug2024":"","Aug2024 Collection Date":"","Aug2024 Collection By":"","Aug2024 Settlement Date":"","Aug2024 Settlement To":"","Aug2024 Notes":"","Jul2024":"","Jul2024 Collection Date":"","Jul2024 Collection By":"","Jul2024 Settlement Date":"","Jul2024 Settlement To":"","Jul2024 Notes":"","Jun2024":"","Jun2024 Collection Date":"","Jun2024 Collection By":"","Jun2024 Settlement Date":"","Jun2024 Settlement To":"","Jun2024 Notes":"","May2024":"","May2024 Collection Date":"","May2024 Collection By":"","May2024 Settlement Date":"","May2024 Settlement To":"","May2024 Notes":"","Apr2024":"","Apr2024 Collection Date":"","Apr2024 Collection By":"","Apr2024 Settlement Date":"","Apr2024 Settlement To":"","Apr2024 Notes":"","Mar2024":"","Mar2024 Collection Date":"","Mar2024 Collection By":"","Mar2024 Settlement Date":"","Mar2024 Settlement To":"","Mar2024 Notes":"","Feb2024":"","Feb2024 Collection Date":"","Feb2024 Collection By":"","Feb2024 Settlement Date":"","Feb2024 Settlement To":"","Feb2024 Notes":"","Jan2024":"","Jan2024 Collection Date":"","Jan2024 Collection By":"","Jan2024 Settlement Date":"","Jan2024 Settlement To":"","Jan2024 Notes":"","Dec2023":"","Dec2023 Collection Date":"","Dec2023 Collection By":"","Dec2023 Settlement Date":"","Dec2023 Settlement To":"","Dec2023 Notes":"","Nov2023":"","Nov2023 Collection Date":"","Nov2023 Collection By":"","Nov2023 Settlement Date":"","Nov2023 Settlement To":"","Nov2023 Notes":"","Oct2023":"","Oct2023 Collection Date":"","Oct2023 Collection By":"","Oct2023 Settlement Date":"","Oct2023 Settlement To":"","Oct2023 Notes":"","Sep2023":"","Sep2023 Collection Date":"","Sep2023 Collection By":"","Sep2023 Settlement Date":"","Sep2023 Settlement To":"","Sep2023 Notes":"","Aug2023":"","Aug2023 Collection Date":"","Aug2023 Collection By":"","Aug2023 Settlement Date":"","Aug2023 Settlement To":"","Aug2023 Notes":"","Jul2023":"","Jul2023 Collection Date":"","Jul2023 Collection By":"","Jul2023 Settlement Date":"","Jul2023 Settlement To":"","Jul2023 Notes":"","Jun2023":"","May2023":"","Apr2023":"","Mar2023":"","Feb2023":"","Jan2023":"","_monthsOrder":["Jan2023","Feb2023","Mar2023","Apr2023","May2023","Jun2023","Jul2023","Aug2023","Sep2023","Oct2023","Nov2023","Dec2023","Jan2024","Feb2024","Mar2024","Apr2024","May2024","Jun2024","Jul2024","Aug2024","Sep2024","Oct2024","Nov2024","Dec2024"]}))
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
    // this.totalPendingAmount = 0;
    this.settingsService.processingText = '';
    console.log(this);
  }

  setProcessingError(err: any) {
    this.error = err;
    this.settingsService.processingText = '';
    console.log(err);
  }
}
