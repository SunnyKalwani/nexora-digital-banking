import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Accounts} from './pages/accounts/accounts';
import { AccountDetail } from './pages/account-detail/account-detail';
import { Transfers } from './pages/transfers/transfers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'accounts',
    component: Accounts
  },
  {
    path: 'accounts/:id',
    component: AccountDetail
  },
  {
    path: 'transfers',
    component: Transfers
  }
];