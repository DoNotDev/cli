/**
 * @fileoverview Privacy Policy Page
 * @description Privacy policy page using the reusable template
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

import { Shield } from 'lucide-react';

import { type PageMeta } from '@donotdev/core';
import { PrivacyPolicyTemplate } from '@donotdev/templates';
import { PageContainer } from '@donotdev/ui';

import { legalConfig } from '../../config/legal';

/**
 * Privacy page translation namespace
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */
export const NAMESPACE = 'privacy';

/**
 * Privacy page metadata configuration
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */
export const meta: PageMeta = {
  namespace: NAMESPACE,
  icon: <Shield />,
  hideFromMenu: true,
};

/**
 * Privacy Policy Page Component
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 *
 * Uses the reusable PrivacyPolicyTemplate with centralized legal config
 */
function PrivacyPage() {
  return (
    <PageContainer>
      <PrivacyPolicyTemplate
        companyName={legalConfig.company.name}
        websiteUrl={legalConfig.website.url}
        privacyEmail={legalConfig.contact.privacyEmail}
        companyAddress={legalConfig.contact.address}
        dpoEmail={legalConfig.contact.dpoEmail}
        sections={legalConfig.sections.privacy}
        contactInfo={{
          supportEmail: legalConfig.contact.supportEmail,
        }}
        lastUpdated={legalConfig.lastUpdated?.privacy}
      />
    </PageContainer>
  );
}

export default PrivacyPage;

