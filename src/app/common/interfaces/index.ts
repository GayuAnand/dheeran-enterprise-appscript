export enum IRoleValue {
  ADMIN = 'admin',
  STAFF = 'staff',
  AGENT = 'agent',
}

export enum IApps {
  ADMIN = 'admin',
  BSNL = 'bsnl',
  CABLE = 'cable',
  NKLCABLE = 'nklcable',
  UG = 'ug',
  TASKS = 'tasks',
}

export interface IRole {
  [IApps.ADMIN]: IRoleValue,
  [IApps.BSNL]: IRoleValue,
  [IApps.CABLE]: IRoleValue,
  [IApps.NKLCABLE]: IRoleValue,
  [IApps.UG]: IRoleValue,
  [IApps.TASKS]: IRoleValue,
}

export interface IUser {
  Username: string;
  Role: IRole;
}

export interface ICustomersSheet {
  label: 'Customers',
  cols: {
    ID: { label: 'ID' },
    NAME: { label: 'Name' },
    MOBILE: { label: 'Mobile' },
    ALLOW_CREDIT: { label: 'AllowCredit' },
    BULK_PAYMENT: { label: 'Bulk Payment' },
    STB: { label: 'STB' },
    STB_TYPE: { label: 'STB Type', data: { GTPL: 'GTPL', TACTV: 'TACTV' } },
    AREA: { label: 'Area' },
    LATITUDE: { label: 'Latitude' },
    LONGITUDE: { label:	'Longitude' },
    NOTES: { label: 'Notes' },
    OWN_NOTES: { label: 'Own Notes' },
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
}

export interface ISheetsInfo {
  CUSTOMERS: ICustomersSheet,
  NKLCUSTOMERS: ICustomersSheet,
  UG_PATROL: {
    label: 'UG Patrol',
    cols: {
      ID: { label: 'ID' },
      BY: { label: 'By' },
      DATE: { label: 'Date' },
      LOCATION: { label: 'Location' },
      ROUTE: { label: 'Route' },
      WORK_TYPE: { label: 'WorkType' },
      PATROL_COUNT: { label: 'PatrolCount' },
      REMARKS: { label: 'Remarks' },
    }
  },
  UG_WORK: {
    label: 'UG Work',
    cols: {
      'ID': { label: 'ID' },
      'BY': { label: 'By' },
      'TYPE': {
        label: 'Type',
        data: {
          PERMANENT: 'Permanent',
          TEMPORARY: 'Temporary',
        }
      },
      'BREAK_TIME': { label: 'BreakTime' },
      'RESTORE_TIME': { label: 'RestoreTime' },
      'EXCHANGE': { label: 'Exchange' },
      'DISTANCE_FROM_EXCHANGE_KM': { label: 'DistanceFromExchange_km' },
      'ROUTE_NAME': { label: 'RouteName' },
      'WORK_LOCATION': { label: 'WorkLocation' },
      'TRENCHING_M': { label: 'Trenching_m' },
      'TEST_PIT': { label: 'TestPit' },
      'PLB_m': { label: 'PLB_m' },
      'CABLE_PULLING_m': { label: 'CablePulling_m' },
      'USED_CABLE_CAPACITY': {
        label: 'UsedCableCapacity',
        data: {
          '4F': '4F',
          '6F': '6F',
          '12F': '12F',
          '24F': '24F',
          '48F': '48F',
          '96F': '96F',
          '144F': '144F',
          '288F': '288F',
        }
      },
      'SPLICING_4F6F': { label: 'Splicing_4F6F' },
      'SPLICING_12F24F': { label: 'Splicing_12F24F' },
      'SPLICING_48F96F': { label: 'Splicing_48F96F' },
      'SPLICING_144F': { label: 'Splicing_144F' },
      'SPLICING_288F': { label: 'Splicing_288F' },
      'CHAMBER_INSTALLED': { label: 'ChamberInstalled' },
      'OPENING_OF_MAN_HOLE_COVERS': { label: 'OpeningOfManHoleCovers' },
      'DEWATERING_OF_CHAMBERS': { label: 'DewateringOfChambers' },
      'OPENING_AND_CLOSING_OF_RING_MANHOLES': { label: 'OpeningAndClosingOfRingManHoles' },
      'NO._OF_POLES_INSTALLED': { label: 'NoOfPolesInstalled' },
      'OVERHEAD_CABLE_USED': { label: 'OverheadCableUsed_m' },
      'OVERHEAD_CABLE_CAPACITY': {
        label: 'OverheadCableCapacity',
        data: {
          '4F': '4F',
          '6F': '6F',
          '12F': '12F',
          '24F': '24F',
          '48F': '48F',
          '96F': '96F',
          '144F': '144F',
          '288F': '288F',
        }
      },
      'OVERHEAD_CABLE_SPLICING_4F6F': { label: 'OverheadCableSplicing_4F6F' },
      'OVERHEAD_CABLE_SPLICING_12F24F': { label: 'OverheadCableSplicing_12F24F' },
      'OVERHEAD_CABLE_SPLICING_48F96F': { label: 'OverheadCableSplicing_48F96F' },
      'OVERHEAD_CABLE_SPLICING_144F': { label: 'OverheadCableSplicing_144F' },
      'OVERHEAD_CABLE_SPLICING_288F': { label: 'OverheadCableSplicing_288F' },
      'REMARKS': { label: 'Remarks' },
    }
  },
  REFERENCE_DATA: {
    label: 'Reference Data',
    cols: {
      AREA: { label: 'Area' },
      LATITUDE: { label: 'Latitude' },
      LONGITUDE: { label:	'Longitude' },
      OLTNAME: { label: 'OLTName' },
      INTERNALOLT: { label: 'InternalOLT' },
      EXTERNALOLT: { label: 'ExternalOLT' },
      EMAIL: { label: 'Email' },
      USERNAME: { label: 'UserName' },
      TASKTYPE: { label: 'TaskType' },
      TASKPRIORITY: { label: 'TaskPriority' },
      TASKSTATUS: { label: 'TaskStatus' },
      DEPLOYID: { label: 'DeployID' },
      GTPLWAGROUPID: { label: 'GTPLNamakkalWAGroupID' },
      UGWorkType: { label: 'UGWorkType' },
    }
  },
  TASKS: {
    label: 'Tasks',
    cols: {
      ID: { label: 'ID' },
      BY: { label: 'By' },
      PRIORITY: { label: 'Priority' },
      TYPE: { label: 'Type' },
      TITLE: { label: 'Title' },
      DETAILS: { label: 'Details' },
      ASSIGNEDTO: { label: 'AssignedTo' },
      STATUS: { label: 'Status' },
      NOTES: { label: 'Notes' },
      OPENDATE: { label: 'OpenDate' },
      DONEDATE: { label: 'DoneDate' },
    },
  },
  OLD_TASKS: {
    label: 'Old_Tasks',
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
      PHONE_NO: { label: 'PHONE_NO' },
      OLT_IP: { label: 'OLT_IP' },
      MTCE_FRANCHISE_CODE: { label: 'MTCE_FRANCHISE_CODE' },
      CATEGORY: { label: 'CATEGORY' },
      CUSTOMER_NAME: { label: 'CUSTOMER_NAME' },
      MOBILE_NO: { label: 'MOBILE_NO' },
      EMAIL_ID: { label: 'EMAIL_ID' },
      BB_USER_ID: { label: 'BB_USER_ID' },
      FTTH_EXCHANGE: { label: 'FTTH_EXCHANGE' },
      PLAN_ID: { label: 'PLAN_ID' },
      BB_PLAN: { label: 'BB_PLAN' },
      LL_INSTALL_DATE: { label: 'LL_INSTALL_DATE' },
      WKG_STATUS: { label: 'WKG_STATUS' },
      ASSIGNED_TO: { label: 'ASSIGNED_TO' },
      RURAL_URBAN: { label: 'RURAL_URBAN' },
      ACQUISITION_TYPE: { label: 'ACQUISITION_TYPE' },
      MISSING_SINCE: { label: 'MISSING_SINCE' },
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

export interface IOltInfo {
  name: string,
  internalAddr: string,
  externalAddr: string,
}

export interface IMetadata {
  area?: string[],
  deployIds?: string[],
  gtplWAGroupID?: string,
  position?: Record<string, { Latitude: string, Longitude: string, area: string }>,
  sheetsInfo?: ISheetsInfo,
  taskPriority?: ('High' | 'Medium' | 'Low' | string)[],
  taskStatus?: ('Done' | 'Open' | 'Closed' | string)[],
  taskType?: ('Internet Lead' | 'Internet Fault' | 'Cable Lead' | 'Cable Fault' | 'Maintenance' | string)[],
  loginUsers?: { name: string, mobile: string | number }[],
  ugWorkType?: string[],
  oltInfo?: IOltInfo[],
}
