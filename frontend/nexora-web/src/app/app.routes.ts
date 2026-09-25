import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Accounts } from './pages/accounts/accounts';
import { AccountDetail } from './pages/account-detail/account-detail';
import { Transfers } from './pages/transfers/transfers';
import { authGuard } from './services/auth-guard';
import { Bills } from './pages/bills/bills';
import { Loans } from './pages/loans/loans';

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
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'accounts',
    component: Accounts,
    canActivate: [authGuard]
  },
  {
    path: 'accounts/:id',
    component: AccountDetail,
    canActivate: [authGuard]
  },
  {
    path: 'transfers',
    component: Transfers,
    canActivate: [authGuard]
  },
  {
  path: 'bills',
  component: Bills,
  canActivate: [authGuard]
},
{
  path: 'loans',
  component: Loans,
  canActivate: [authGuard]
}
];