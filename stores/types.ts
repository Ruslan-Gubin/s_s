
export interface AccountModel {
  id: number;
  tags: string[];
  recordType: 'local' | 'ldap',
  login: string;
  password: string | null,
  errorFields: string[];
};


