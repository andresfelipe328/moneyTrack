type Balance = {
   available: number,
   current: number,
   iso_currency_code: string,
   limit: number,
   unofficial_currency_code: string
 }
 
export type Account = {
  account_id: string,
  balances: Balance,
  mask: string,
  name: string,
  official_name: string,
  subtype: string,
  type: string
}
 
export type Subscription = {
  name: string,
  firstDate: string,
  amount: number,
  id: string
}

export type Transaction = {
  name: string
  amount: number,
  date: string
}

export type Bill = {
  name: string,
  chargeDate: string,
  amount: number,
  id: string,
  recurring: boolean
}

export type ChartContent = {
  label: string,
  amount: number,
  color: {
    color: string,
    isLight: boolean
  }
}