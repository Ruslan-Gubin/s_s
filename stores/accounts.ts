import { defineStore } from 'pinia'
import type { AccountModel } from './types';

type State = {
  accounts: AccountModel[]
}

export const useAccountsStore = defineStore('accounts', {
  state: (): State => ({
    accounts: [],
  }),

  actions: {
    addNewAccount() {
      this.accounts.push({
        id: Date.now(),
        tags: [],
        recordType: 'local',
        login: "",
        password: null,
        errorFields: [],
      })
    },

    removeAccount(id: number) {
      this.accounts = this.accounts.filter((el: AccountModel) => el.id !== id);
    },

    resetPassword(id: number) {
      this.accounts = this.accounts.map((el: AccountModel) => el.id === id ? ({ ...el, password: null }) : el);
    },

    saveAccountField(id: number, field: string, value: string | string[]) {
      this.accounts = this.accounts.map((el: AccountModel) => el.id === id ? ({ ...el, [field]: value, errorFields: el.errorFields.filter((error: string) => error !== field) }) : el);
    },

    activeError(id: number, field: string) {
      this.accounts = this.accounts.map((el: AccountModel) => el.id === id ? ({ ...el, errorFields: [...el.errorFields, field] }) : el);
    },
  },
})
