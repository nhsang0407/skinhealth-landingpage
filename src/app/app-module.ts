import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Hero } from './components/hero/hero';
import { Features } from './components/features/features';
import { Products } from './components/products/products';
import { OdmServices } from './components/odm-services/odm-services';
import { TrustIndicators } from './components/trust-indicators/trust-indicators';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { CtaSection } from './components/cta-section/cta-section';
import { Newsletter } from './components/newsletter/newsletter';
import { OdmPage } from './components/odm-page/odm-page';
import { HomePage } from './components/home-page/home-page';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { TermsOfUse } from './components/terms-of-use/terms-of-use';
import { ReturnPolicy } from './components/return-policy/return-policy';
import { Faqs } from './components/faqs/faqs';

@NgModule({
  declarations: [
    App,
    Hero,
    Features,
    Products,
    OdmServices,
    TrustIndicators,
    Footer,
    Header,
    CtaSection,
    Newsletter,
    OdmPage,
    HomePage,
    PrivacyPolicy,
    TermsOfUse,
    ReturnPolicy,
    Faqs
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
