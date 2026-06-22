import PageContainer from '@/starter/components/layout/page-container';
import { buttonVariants } from '@/starter/components/ui/button';
import ProductListingPage from '@/starter/features/products/components/product-listing';
import { searchParamsCache } from '@/starter/lib/searchparams';
import { cn } from '@/starter/lib/utils';
import { Icons } from '@/starter/components/icons';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { productInfoContent } from '@/starter/config/infoconfig';

export const metadata = {
  title: 'Dashboard: Products'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer
      pageTitle='Products'
      pageDescription='Manage products (React Query + nuqs table pattern.)'
      infoContent={productInfoContent}
      pageHeaderAction={
        <Link href='/dashboard/product/new' className={cn(buttonVariants(), 'text-xs md:text-sm')}>
          <Icons.add className='mr-2 h-4 w-4' /> Add New
        </Link>
      }
    >
      <ProductListingPage />
    </PageContainer>
  );
}

