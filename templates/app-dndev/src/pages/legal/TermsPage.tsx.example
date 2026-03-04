/**
 * @fileoverview Terms of Service Page
 * @description Terms of service page using the reusable template
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

import { FileText } from 'lucide-react';

import { type PageMeta } from '@donotdev/core';
import { TermsOfServiceTemplate } from '@donotdev/templates';
import { PageContainer } from '@donotdev/ui';

import { legalConfig } from '../../config/legal';

/**
 * Terms page translation namespace
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */
export const NAMESPACE = 'terms';

/**
 * Terms page metadata configuration
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */
export const meta: PageMeta = {
  namespace: NAMESPACE,
  icon: <FileText />,
  hideFromMenu: true,
};

/**
 * Terms of Service Page Component
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 *
 * Uses the reusable TermsOfServiceTemplate with centralized legal config
 */
function TermsPage() {
  return (
    <PageContainer>
      <TermsOfServiceTemplate
        companyName={legalConfig.company.name}
        websiteUrl={legalConfig.website.url}
        legalEmail={legalConfig.contact.email}
        companyAddress={legalConfig.contact.address}
        jurisdiction={legalConfig.jurisdiction.country}
        arbitrationOrg={legalConfig.jurisdiction.arbitrationOrg}
        arbitrationLocation={legalConfig.jurisdiction.arbitrationLocation}
        sections={legalConfig.sections.terms}
        contactInfo={{
          supportEmail: legalConfig.contact.supportEmail,
        }}
        lastUpdated={legalConfig.lastUpdated?.terms}
      />
    </PageContainer>
  );
}

export default TermsPage;

