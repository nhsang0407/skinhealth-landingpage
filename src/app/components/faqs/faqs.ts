import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  standalone: false,
  templateUrl: './faqs.html',
  styleUrl: './faqs.css',
})
export class Faqs {
  faqs = [
    {
      question: 'What is ODM (Original Design Manufacturing)?',
      answer: 'ODM is a service where we design and manufacture products that you can brand as your own. We handle everything from concept to production, allowing you to launch products without in-house manufacturing capabilities.',
      open: false
    },
    {
      question: 'What is the minimum order quantity?',
      answer: 'Our minimum order quantity varies depending on the product type and customization level. Generally, it ranges from 500 to 1000 units. Contact us for specific MOQ requirements for your project.',
      open: false
    },
    {
      question: 'How long does the production process take?',
      answer: 'The typical production timeline is 45-90 days from design approval to delivery. This includes product development, sampling, testing, and mass production. Timelines may vary based on product complexity and order size.',
      open: false
    },
    {
      question: 'Do you provide product samples?',
      answer: 'Yes, we provide samples for approval before mass production. Sample costs and shipping are typically borne by the client, but may be refunded against large orders.',
      open: false
    },
    {
      question: 'What customization options are available?',
      answer: 'We offer extensive customization including formulation, packaging design, labeling, and branding. You can customize ingredients, colors, scents, textures, and all aspects of packaging to match your brand identity.',
      open: false
    },
    {
      question: 'Do you handle regulatory compliance and certifications?',
      answer: 'Yes, we ensure all products meet relevant regulatory requirements including FDA, EU, and other international standards. We assist with documentation and certification processes as needed.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
