import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { OdmPage } from './components/odm-page/odm-page';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { TermsOfUse } from './components/terms-of-use/terms-of-use';
import { ReturnPolicy } from './components/return-policy/return-policy';
import { Faqs } from './components/faqs/faqs';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'odm', component: OdmPage },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-of-use', component: TermsOfUse },
  { path: 'return-policy', component: ReturnPolicy },
  { path: 'faq', component: Faqs },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
