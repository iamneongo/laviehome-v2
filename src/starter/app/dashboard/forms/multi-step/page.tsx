import PageContainer from '@/starter/components/layout/page-container';
import FormsShowcasePage from '@/starter/features/forms/components/forms-showcase-page';

export const metadata = {
  title: 'Dashboard: Multi-Step Form'
};

export default function Page() {
  return (
    <PageContainer pageTitle='Multi-Step Form' pageDescription='Multi-step wizard form pattern.'>
      <FormsShowcasePage />
    </PageContainer>
  );
}

