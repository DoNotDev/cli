/**
 * @fileoverview Legal Notice Page
 * @description Legal notice page using the reusable template
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */

import { Building } from 'lucide-react';

import { type PageMeta } from '@donotdev/core';
import { LegalNoticeTemplate } from '@donotdev/templates';
import { PageContainer } from '@donotdev/ui';

import { legalConfig } from '../../config/legal';

/**
 * Legal Notice page translation namespace
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */
export const NAMESPACE = 'legalNotice';

/**
 * Legal Notice page metadata configuration
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 */
export const meta: PageMeta = {
  namespace: NAMESPACE,
  icon: <Building />,
  hideFromMenu: true,
};

/**
 * Legal Notice Page Component
 *
 * @version 0.0.1
 * @since 0.0.1
 * @author AMBROISE PARK Consulting
 *
 * Uses the reusable LegalNoticeTemplate with centralized legal config
 */
function LegalNoticePage() {
  return (
    <PageContainer>
      <LegalNoticeTemplate
        publisherName={legalConfig.company.name}
        publisherType="company"
        legalStatus={legalConfig.company.legalStatus}
        registrationNumber={legalConfig.company.registrationNumber}
        vatNumber={legalConfig.company.vatNumber}
        shareCapital={legalConfig.company.shareCapital}
        registeredOffice={legalConfig.contact.address}
        email={legalConfig.contact.email}
        phone={legalConfig.contact.phone}
        directorName={legalConfig.director.name}
        directorRole={legalConfig.director.role}
        hostingProvider={legalConfig.hosting.provider}
        hostingAddress={legalConfig.hosting.address}
        hostingContact={legalConfig.hosting.contact}
        sections={legalConfig.sections.legalNotice}
        lastUpdated={legalConfig.lastUpdated?.legalNotice}
      />
    </PageContainer>
  );
}

export default LegalNoticePage;

