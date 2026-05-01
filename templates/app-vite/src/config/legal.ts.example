// src/config/legal.ts

/**
 * @fileoverview Legal Information Configuration
 * @description Centralized legal information for Terms, Privacy, and Legal Notice pages
 *
 * IMPORTANT: Configure your actual legal information here.
 * This file is used by all legal pages (Terms of Service, Privacy Policy, Legal Notice).
 *
 * @version 0.0.1
 * @since 0.0.1
 */

import type { LegalConfig } from '@donotdev/core';

/**
 * Legal Configuration
 *
 * Fill in your actual company and legal information below.
 * Remove any optional fields you don't need.
 *
 * For detailed documentation on each field, see the JSDoc in @donotdev/types or
 * hover over any field in your IDE for inline documentation.
 */
export const legalConfig: LegalConfig = {
	/**
	 * Company/Publisher Information
	 */
	company: {
		name: 'Your Company Name', // Required - Full legal name
		shortName: 'YCN', // Optional - Abbreviation
		legalStatus: 'LLC', // Optional - e.g., "LLC", "SARL", "SAS", "GmbH", "Ltd"
		registrationNumber: '123456789', // Optional but recommended - e.g., SIRET (France), Company Number (UK), EIN (USA)
		vatNumber: 'XX123456789', // Optional - VAT/Tax ID, required for EU businesses
		shareCapital: '10,000 USD', // Optional - Required in some jurisdictions like France
	},

	/**
	 * Contact Information
	 */
	contact: {
		address: '123 Main Street, City, State/Province, Postal Code, Country', // Required - Registered office address
		email: 'legal@yourcompany.com', // Required - Legal contact email
		phone: '+1 (555) 123-4567', // Optional but recommended
		supportEmail: 'support@yourcompany.com', // Required - Customer support email
		privacyEmail: 'privacy@yourcompany.com', // Required - Privacy inquiries
		dpoEmail: 'dpo@yourcompany.com', // Required for GDPR compliance if processing significant personal data
	},

	/**
	 * Publication Director
	 *
	 * The person legally responsible for the website's content.
	 * Required by law in France ("Directeur de la publication").
	 */
	director: {
		name: 'John Doe', // Required - Full name of the responsible person
		role: 'CEO', // Optional - Their title/role
	},

	/**
	 * Hosting Provider
	 *
	 * Information about where your website is hosted.
	 * Required by law in many jurisdictions including France.
	 */
	hosting: {
		provider: 'Firebase Hosting by Google', // Required - Hosting service name
		address: 'Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA', // Optional - Hosting provider's address
		contact: 'https://firebase.google.com/support', // Optional - Support URL or email
	},

	/**
	 * Legal Jurisdiction
	 *
	 * Where your business operates and how disputes are resolved.
	 */
	jurisdiction: {
		country: 'United States', // Required - Operating jurisdiction
		arbitrationOrg: 'American Arbitration Association', // Optional - For dispute resolution
		arbitrationLocation: 'New York, NY', // Optional - Where arbitration would occur
	},

	/**
	 * Website Information
	 */
	website: {
		url: 'https://yourcompany.com', // Required - Your main website URL
	},

	/**
	 * Optional Sections Configuration
	 *
	 * Enable/disable specific sections in your legal pages.
	 * Set to true to include, false to exclude.
	 */
	sections: {
		// Terms of Service sections
		terms: {
			children: false, // Include children-specific provisions (COPPA)
			international: true, // Include international users provisions
			california: false, // Include California-specific provisions (CCPA)
			eu: true, // Include EU-specific provisions
		},
		// Privacy Policy sections
		privacy: {
			children: false, // Include children's privacy provisions (COPPA)
			international: true, // Include international data transfer provisions
			california: false, // Include California privacy rights (CCPA)
			eu: true, // Include EU privacy provisions (GDPR)
		},
		// Legal Notice sections
		legalNotice: {
			intellectualProperty: true, // Include IP notice
			personalData: true, // Include link to Privacy Policy
			cookies: true, // Include cookies reference
		},
	},
} as const;

/**
 * Type-safe access to legal config
 */
export type AppLegalConfig = typeof legalConfig;

/**
 * QUICK START CHECKLIST:
 *
 * 1. Company Information:
 *    - [ ] Update company.name with your legal entity name
 *    - [ ] Set company.legalStatus (SARL, LLC, GmbH, etc.)
 *    - [ ] Add company.registrationNumber (SIRET, EIN, Company Number)
 *    - [ ] Add company.vatNumber if you're in the EU or have VAT obligations
 *
 * 2. Contact Information:
 *    - [ ] Update contact.address with your registered office
 *    - [ ] Set contact.email for legal notices
 *    - [ ] Set contact.supportEmail for customer support
 *    - [ ] Set contact.privacyEmail for GDPR/privacy requests
 *    - [ ] Set contact.dpoEmail if you have a Data Protection Officer
 *
 * 3. Legal Responsibility:
 *    - [ ] Update director.name (person responsible for content)
 *    - [ ] Set director.role (CEO, Director, etc.)
 *
 * 4. Hosting:
 *    - [ ] Verify hosting.provider is correct
 *    - [ ] Update hosting.address and hosting.contact if needed
 *
 * 5. Jurisdiction:
 *    - [ ] Set jurisdiction.country where you operate
 *    - [ ] Configure arbitration details if needed
 *
 * 6. Optional Sections:
 *    - [ ] Review and enable/disable sections based on your needs
 *    - [ ] Enable sections.*.eu if you have EU users (GDPR)
 *    - [ ] Enable sections.*.california if you have California users (CCPA)
 *
 * LEGAL COMPLIANCE NOTES:
 *
 * - France: All fields with "Required" are mandatory for French websites
 * - EU/GDPR: contact.dpoEmail is required if you process significant personal data
 * - USA/California: Enable California sections if you have California users
 * - International: Enable international sections for global audience
 *
 * For more information, consult your legal advisor or refer to:
 * - https://docs.dndev.com/legal/configuration (framework docs)
 * - Your local business registration authority
 * - GDPR guidance: https://gdpr.eu
 */
