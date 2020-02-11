export const LOCALSTORAGE_PREFIX = 'my-audio-admin-fe'

export const CRAWL_STATUS_CRAWLING = 'crawling'


















export const API_FAILURE = -1
export const API_SUCCESS = 0
export const API_SERVER_ERROR = 1
export const API_BAD_REQUEST = 2
export const API_NO_PERMISSION = 3
export const API_NOT_FOUND = 4
export const API_ALREADY_EXISTS = 5
export const API_VALIDATION_ERROR = 6
export const API_INVALID_ACTION = 7
export const API_ACTION_DENIED = 8
export const API_FILE_ERROR = 9
export const API_DB_ERROR = 10
export const API_EXT_API_ERROR = 11
export const API_TIMEOUT = 12

export const DEFAULT_DATE_RANGE_SEARCH_DAY = 15

export const REGISTRATION_MONTHLY_TRAFFIC = {
  LVL1: '< 1000',
  LVL2: '1000 - 10000',
  LVL3: '10001 - 50000',
  LVL4: '50001 - 100000',
  LVL5: '> 100000',
}

export const REGISTRATION_VERIFY_STATUS = {
  PNDG: 'Pending',
  CMPL: 'Completed',
}

export const REGISTRATION_MEDIUM = {
  E: 'External',
  I: 'Internal',
}
export const REGISTRATION_MEDIUM_CHOICES = Object.keys(REGISTRATION_MEDIUM).map(key => ({
  value: key,
  text: REGISTRATION_MEDIUM[key],
}))

export const REGISTRATION_SHOP_TYPE = {
  O: 'OLD',
  N: 'NEW',
}

export const REGISTRATION_SOURCE = {
  SHP: 'shopee',
  NHA: 'nhanhvn',
  SAP: 'sapo',
  HAR: 'haravan',
  BDT: 'bd',
  SRT: 'sr',
}
export const REGISTRATION_SOURCE_CHOICES = Object.keys(REGISTRATION_SOURCE).map(key => ({
  value: key,
  text: REGISTRATION_SOURCE[key],
}))

export const REGISTRATION_VERIFY_STATUS_CHOICES = Object.keys(REGISTRATION_VERIFY_STATUS).map(key => ({
  value: key,
  text: REGISTRATION_VERIFY_STATUS[key],
}))

export const ACCOUNT_TYPE = {
  PE: 'Personal',
  CP: 'Company',
}
export const ACCOUNT_TYPE_CHOICES = Object.keys(ACCOUNT_TYPE).map(key => ({
  value: key,
  text: ACCOUNT_TYPE[key],
}))

export const UPDATE_APPROVAL_STATUS_ACTION_BLOCK = 'block'
export const UPDATE_APPROVAL_STATUS_ACTION_REJECT = 'reject'
export const UPDATE_APPROVAL_STATUS_ACTION_APPROVE = 'approve'

export const APPROVAL_STATUS_APPROVED = 'APV'
export const APPROVAL_STATUS_BLOCKED = 'BLK'
export const APPROVAL_STATUS_REJECTED = 'REJ'
export const APPROVAL_STATUS_WAITING = 'WAIT'

export const REGISTRATION_APPROVAL_STATUS = {
  [APPROVAL_STATUS_BLOCKED]: 'Blocked',
  [APPROVAL_STATUS_REJECTED]: 'Rejected',
  [APPROVAL_STATUS_APPROVED]: 'Approved',
  [APPROVAL_STATUS_WAITING]: 'Waiting',
}

export const REGISTRATION_APPROVAL_STATUS_CHOICES = Object.keys(REGISTRATION_APPROVAL_STATUS).map(key => ({
  value: key,
  text: REGISTRATION_APPROVAL_STATUS[key],
}))

export const URL_TYPE = {
  FBG: 'Facebook Group',
  FBP: 'Facebook Page',
  YT: 'Youtube',
  WEB: 'Website',
  APP: 'Mobile App',
  ORS: 'Others',
}

export const VERIFY_TOKEN_TYPE = {
  URL: 'Verify URLs',
  PAY: 'Verify Payment Info',
}

export const MEDIA_CHANNELS = {
  ADS: 'No own media, run ads only',
  SCL: 'Group, Fanpage, Profile on Social media',
  OWN: 'Own Website/App',
  AFF: 'Affiliate Network/DSP...',
}

export const AFFILIATE_TYPE_CHOICES = Object.keys(MEDIA_CHANNELS).map(key => ({
  value: key,
  text: MEDIA_CHANNELS[key],
}))

export const ISO_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_FOR_EXPORT = 20000
