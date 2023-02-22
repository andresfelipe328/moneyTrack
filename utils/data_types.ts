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
  amount: number,
  id: string
}

export type Transaction = {
  name: string
  amount: number,
  date: string
}