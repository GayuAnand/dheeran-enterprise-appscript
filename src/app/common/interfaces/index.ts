export interface IUser {
  Username: string;
}

export interface ISheetsInfo {
  CUSTOMERS: {
    label: 'Customers',
    cols: {
      NAME: { label: 'Name' },
      MOBILE: { label: 'Mobile' },
      STB: { label: 'STB' },
      STB_TYPE: { label: 'STB Type', data: { GTPL: 'GTPL', TACTV: 'TACTV' } },
      AREA: { label: 'Area' },
      LATITUDE: { label: 'Latitude' },
      LONGITUDE: { label:	'Longitude' },
      NOTES: { label: 'Notes' },
      CONNECTION_ON: { label: 'Connection On' },
      STB_STATUS: {
        label: 'STB Status',
        data: {
          ACTIVE: 'Active',
          INACTIVE: 'Inactive'
        }
      },
      STATUS: {
        label: 'Status',
        data: {
          ACTIVE: 'Active',
          ADVANCE_PAYMENT: 'Advance Payment',
          NEW: 'New',
          NEW_ADVANCE_PAYMENT: 'New + Advance Payment',
          JUNE_ADDITION: 'June Addition',
          JULY_ADDITION: 'July Addition',
          NODE: 'Node',
          NODE_ADVANCE_PAYMENT: 'Node + Advance Payment',
          NODE_NEW: 'Node + New',
          NODE_UNKNOWN: 'Node + Unknown',
          INACTIVE: 'Inactive',
          OWN_USE: 'Own Use',
          CHECK_WITH_SURESH: 'Check with Suresh',
          FRAUD: 'Fraud',
          UNKNOWN: 'Unknown',
        }
      },
      REGULAR: {
        label: 'Regular',
        data: {
          REGULAR_JAN_JUN: 'Regular Jan-Jun',
          REGULAR_JAN_MAY: 'Regular Jan-May',
          REGULAR_JAN_APR: 'Regular Jan-Apr',
          REGULAR_FEB_JUN: 'Regular Feb-Jun',
          IRREGULAR: 'Irregular',
          NOPAYMENT: 'NoPayment'
        }
      },
      JAN2023: { label: 'Jan2023' },
      FEB2023: { label: 'Feb2023' },
      MAR2023: { label: 'Mar2023' },
      APR2023: { label: 'Apr2023' },
      MAY2023: { label: 'May2023' },
      JUN2023: { label: 'Jun2023' },
      JUL2023: { label: 'Jul2023' },
      AUG2023: { label: 'Aug2023' },
      SEP2023: { label: 'Sep2023' },
      OCT2023: { label: 'Oct2023' },
      NOV2023: { label: 'Nov2023' },
      DEC2023: { label: 'Dec2023' },
      JUL2023_COLLECTION_DATE: { label: 'Jul2023 Collection Date' },
      JUL2023_COLLECTION_BY: { label: 'Jul2023 Collection By' },
      JUL2023_SETTLEMENT_DATE: { label: 'Jul2023 Settlement Date' },
      JUL2023_SETTLEMENT_TO: { label: 'Jul2023 Settlement To' },
      JUL2023_MARKED_IN_NOTE: { label: 'Marked in note Jul2023' },
      AUG2023_COLLECTION_DATE: { label: 'Aug2023 Collection Date' },
      AUG2023_COLLECTION_BY: { label: 'Aug2023 Collection By' },
      AUG2023_SETTLEMENT_DATE: { label: 'Aug2023 Settlement Date' },
      AUG2023_SETTLEMENT_TO: { label: 'Aug2023 Settlement To' },
      AUG2023_MARKED_IN_NOTE: { label: 'Marked in note Aug2023' },
      SEP2023_COLLECTION_DATE: { label: 'Sep2023 Collection Date' },
      SEP2023_COLLECTION_BY: { label: 'Sep2023 Collection By' },
      SEP2023_SETTLEMENT_DATE: { label: 'Sep2023 Settlement Date' },
      SEP2023_SETTLEMENT_TO: { label: 'Sep2023 Settlement To' },
      SEP2023_MARKED_IN_NOTE: { label: 'Marked in note Sep2023' },
      OCT2023_COLLECTION_DATE: { label: 'Oct2023 Collection Date' },
      OCT2023_COLLECTION_BY: { label: 'Oct2023 Collection By' },
      OCT2023_SETTLEMENT_DATE: { label: 'Oct2023 Settlement Date' },
      OCT2023_SETTLEMENT_TO: { label: 'Oct2023 Settlement To' },
      OCT2023_MARKED_IN_NOTE: { label: 'Marked in note Oct2023' },
      NOV2023_COLLECTION_DATE: { label: 'Nov2023 Collection Date' },
      NOV2023_COLLECTION_BY: { label: 'Nov2023 Collection By' },
      NOV2023_SETTLEMENT_DATE: { label: 'Nov2023 Settlement Date' },
      NOV2023_SETTLEMENT_TO: { label: 'Nov2023 Settlement To' },
      NOV2023_MARKED_IN_NOTE: { label: 'Marked in note Nov2023' },
      DEC2023_COLLECTION_DATE: { label: 'Dec2023 Collection Date' },
      DEC2023_COLLECTION_BY: { label: 'Dec2023 Collection By' },
      DEC2023_SETTLEMENT_DATE: { label: 'Dec2023 Settlement Date' },
      DEC2023_SETTLEMENT_TO: { label: 'Dec2023 Settlement To' },
      DEC2023_MARKED_IN_NOTE: { label: 'Marked in note Dec2023' },
    }
  },
  REFERENCE_DATA: {
    label: 'Reference Data',
    cols: {
      AREA: { label: 'Area' },
      LATITUDE: { label: 'Latitude' },
      LONGITUDE: { label:	'Longitude' },
      EMAIL: { label: 'Email' },
      USERNAME: { label: 'UserName' },
      TASKPRIORITY: { label: 'TaskPriority' },
      TASKSTATUS: { label: 'TaskStatus' },
      DEPLOYID: { label: 'DeployID' },
    }
  },
  TASKS: {
    label: 'Tasks',
    cols: {
      ID: { label: 'ID' },
      TITLE: { label: 'Title' },
      DETAILS: { label: 'Details' },
      ASSIGNEDTO: { label: 'AssignedTo' },
      PRIORITY: { label: 'Priority' },
      STATUS: { label: 'Status', data: { OPEN: 'Open', DONE: 'Done', VERIFIED: 'Verified' } },
      ATTACHMENTS: { label: 'Attachments' },
      OPENDATE: { label: 'OpenDate' },
      CLOSEDATE: { label: 'CloseDate' },
    },
  },
  INTERNET_LEADS: {
    label: 'Internet Leads',
    cols: {
      CUSTOMER_NAME: { label: 'Customer' },
      OPEN_DATE: { label: 'Open Date' },
      INSTALLATION_CHARGE: { label: 'Installation Charge' },
      COLLECT_DETAILS: { label: 'Collect details' },
      KYC_UPDATE: { label: 'KYC update' },
      FIBER_INSTALLATION: { label: 'Fibre installation' },
      DROP: { label: 'Drop' },
      INSTALL_MODEM: { label: 'Install Modem' },
      CONFIGURE_MODEM: { label: 'Configure Modem' },
      COLLECT_CHARGES: { label: 'Collect charges' },
      COMPLETED_DATE: { label: 'Completed Date' },
    }
  },
  WKG_CONNECTIONS: {
    label: 'WKG Connections',
    cols: {
      PHONE_NO: { label: 'Phone No' },
      CUSTOMER_NAME: { label: 'Customer Name' },
      HOUSE_NO: { label: 'House No' },
      VILLAGE_NAME: { label: 'Village Name' },
      ADDITIONAL_DETAILS: { label: 'Additional Details' },
      CITY: { label: 'City' },
      BB_FLAG: { label: 'BB Flag' },
      BB_PLAN: { label: 'BB Plan' },
      LL_PLAN: { label: 'LL Plan' },
      OS_AMOUNT: { label: 'OS Amount' },
      OPERATING_STATUS: { label: 'Operating Status' },
      MOBILE_NO: { label: 'Mobile No' },
    },
  },
  INCOME_AND_EXPENSE: {
    label: 'Income & Expense',
    cols: {
      DATE: { label: 'Date' },
      BY: { label: 'By' },
      AMOUNT: { label: 'Amount' },
      TYPE: { label: 'Type' },
      NOTES_COMMENTS: { label: 'Notes/Comments' },
    }
  },
  GTPL_EXPORT: {
    label: 'GTPL Export',
    cols: {
      ACC_NO: { label: 'ACC_NO' },
      CAF_NO: { label: 'CAF_NO' },
      STB_SERIAL_NO: { label: 'VC_CARD' },
      VC_NO: { label: 'VC_CARD' },
      STATUS: { label: 'STATUS', data: { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', SUSPENDED: 'SUSPENDED' }},
      STB_MATCH: { label: 'STB Match', data: { MATCH: 'Match', NOMATCH: 'NoMatch' } },
    }
  },
  TACTV_EXPORT: {
    label: 'TACTV Export',
    cols: {
      CUSTOMER_NAME: { label: 'Customer Name' },
      MOBILE: { label: 'Mobile' },
      SERIAL_NO: { label: 'Serial No' },
      VC_NUMBER: { label: 'Vc Number' },
      STATUS: { label: 'Stb Status', data: { ACTIVE: 'Active', DEACTIVE: 'Deactive', BLACK_LISTED: 'Black listed' } },
      STB_MATCH: { label: 'STB Match', data: { MATCH: 'Match', NOMATCH: 'NoMatch' } },
    }
  },
  FMS_EXPORT: {
    label: 'FMS Export',
    cols: {
      VLAN: { label: 'VLAN' },
      PHONE_NO: { label: 'PHONE_NO' },
    }
  },
  ANALYSIS: {
    label: 'Analysis'
  },
  LOGINS: {
    label: 'Logins',
    cols: {
      USERNAME: { label: 'Username' },
      PASSWORD: { label: 'Password' },
      TOKEN: { label: 'Token' },
    },
  },
};

export interface IMetadata {
  area?: string[],
  deployIds?: string[],
  position?: Record<string, { Latitude: string, Longitude: string, area: string }>,
  sheetsInfo?: ISheetsInfo,
  taskPriority?: ('High' | 'Medium' | 'Low')[],
  taskStatus?: ('Done' | 'Open' | 'Closed')[],
}
