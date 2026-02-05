import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { OdmPage } from './components/odm-page/odm-page';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { TermsOfUse } from './components/terms-of-use/terms-of-use';
import { ReturnPolicy } from './components/return-policy/return-policy';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'odm', component: OdmPage },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-of-use', component: TermsOfUse },
  { path: 'return-policy', component: ReturnPolicy },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
