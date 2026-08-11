import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import Divider from '@/components/Divider';

import { getProducts, getNGOs, getBlogs, getAllCounts } from '@/utils/supabase/database';
import BlogPost from '@/components/BlogPost';

const showNgoCount = 6;

export default async function Page() {
  const [products, { data: featuredNgos }, { data: blogs }, { ngoCount, productCount, causeCount }] = await Promise.all([
    getProducts({ limit: 7 }),
    getNGOs({ limit: showNgoCount }),
    getBlogs({ limit: 2 }),
    getAllCounts(),
  ]);

  return (
    <div className='w-full'>

      {/* Hero Section */}
      <div className='flex flex-col md:flex-row px-16 py-30 gap-12 items-center justify-between bg-primary-400'>
        <div className='flex flex-col gap-6 items-center md:items-start'>
          <p className='text-body-sm font-DMSans-400 text-primary-200 text-center md:text-left'>SHOP WITH PURPOSE</p>
          <p className='text-display font-DMSerif-Reg text-primary-50 leading-none text-center md:text-left'>Products that give back to <span className='font-DMSerif-Italic'>the world</span></p>
          <p className='text-body font-DMSans-400 text-primary-100 text-center md:text-left'>Every item here supports a verified nonprofit. You get something you love - they get the funding to keep going.</p>
          <div className='flex gap-3'>
            <Button text='Browse products' link='/shop' variant='danger' />
            <Button text='How it works' link='/about' variant='ghost' classN='border-primary-200! text-primary-100!' />
          </div>
        </div>

        <div className='flex gap-12 flex-col md:flex-row'>
          <div className='flex flex-col gap-3 items-center justify-center'>
            <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>{ngoCount}</p>
            <p className='text-body font-DMSans-400 text-primary-100'>Nonprofits</p>
          </div>
          <div className='hidden md:block w-px bg-primary-200' />
          <div className='flex flex-col gap-3 items-center justify-center'>
            <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>{productCount}</p>
            <p className='text-body font-DMSans-400 text-primary-100'>Products</p>
          </div>
          <div className='hidden md:block w-px bg-primary-200' />
          <div className='flex flex-col gap-3 items-center justify-center'>
            <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>{causeCount}</p>
            <p className='text-body font-DMSans-400 text-primary-100'>Causes</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className='flex flex-col px-16 py-24 gap-16 bg-primary-50'>
        <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
          <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>Featured products</h1>
          <Link className='flex gap-1 items-center justify-center' href='/shop'>
            <p className='text-meta font-DMSans-500 text-primary-300 leading-none'>See all {productCount}</p>
            <Image src='/icons/arrow-right-long.svg' alt='' width={10} height={10} unoptimized />
          </Link>
        </div>

        <div className='flex flex-col md:flex-row gap-6 items-center justify-center md:justify-between'>
          {/* No preload: this section sits well below the fold, so the hero is
              the LCP element and preloading here would compete with it. */}
          {products.map((product) => {
            const ngo = (product as typeof product & { ngo: { name: string; cause: string } | null }).ngo;
            return (
              <ProductCard
                key={product.id}
                product={product}
                ngoName={ngo?.name ?? ''}
                cause={ngo?.cause ?? ''}
              />
            );
          })}
        </div>
      </div>

      <Divider />

      {/* How it works */}
      <div className='flex flex-col px-16 py-24 gap-16 bg-white items-center md:items-start'>
          <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>How it works</h1>

          <div className='flex gap-12 flex-col md:flex-row'>
            <div className='flex flex-col gap-3 items-center md:items-start'>
              <Image src='/icons/search.svg' alt='' width={50} height={50} unoptimized />
              <h2 className='text-h2 font-DMSerif-Reg text-surface-400'>Browse by cause</h2>
              <p className='text-body font-DMSans-400 text-surface-300 text-center md:text-left'>Filter products by the causes that matter to you - environment, education, food security, and more.</p>
            </div>
            <div className='flex flex-col gap-3 items-center md:items-start'>
              <Image src='/icons/bag.svg' alt='' width={50} height={50} unoptimized />
              <h2 className='text-h2 font-DMSerif-Reg text-surface-400'>Buy from the nonprofit</h2>
              <p className='text-body font-DMSans-400 text-surface-300 text-center md:text-left'>Click any product and you’re taken directly to the nonprofit’s store. We never handle the transaction.</p>
            </div>
            <div className='flex flex-col gap-3 items-center md:items-start'>
              <Image src='/icons/heart.svg' alt='' width={50} height={50} unoptimized />
              <h2 className='text-h2 font-DMSerif-Reg text-surface-400'>Impact is automatic</h2>
              <p className='text-body font-DMSans-400 text-surface-300 text-center md:text-left'>Your purchase directly funds the nonprofit’s work. No middleman, no extra steps, no donation required.</p>
            </div>
          </div>
      </div>

      <Divider />

      {/* nonprofits we support */}
      <div className='flex flex-col px-16 py-24 gap-16 bg-primary-50'>
        <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
          <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>Nonprofits we support</h1>
          <Link className='flex gap-1 items-center justify-center' href='/nonprofits'>
            <p className='text-meta font-DMSans-500 text-primary-300 leading-none'>See all {ngoCount}</p>
            <Image src='/icons/arrow-right-long.svg' alt='' width={10} height={10} unoptimized />
          </Link>
        </div>

        <div className='flex flex-col md:flex-row items-center gap-6'>
          <div className='flex gap-4 items-center justify-center flex-wrap'>
            {featuredNgos.map((ngo) => (
              <div key={ngo.id} className='w-20 h-20 flex relative rounded-full border border-surface-200 overflow-hidden'>
              {ngo.logo_url ? (
                  <Image src={ngo.logo_url} alt={ngo.name} fill sizes="80px" style={{ objectFit: 'cover' }} />
              ) : (
                  <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-300 font-DMSans-500 text-h4">
                      {ngo.name.charAt(0).toUpperCase()}
                  </div>
              )}
              </div>
            ))}
          </div>
          <div className='flex flex-col md:flex-row items-baseline justify-center gap-2'>
            <p className='text-body font-DMSans-400 text-surface-300'>and {ngoCount ? (ngoCount - showNgoCount) : "0"} more verified organizations.</p>
            <Link className='flex h-fit gap-1 items-center justify-center' href='/nonprofits'>
              <p className='text-meta font-DMSans-500 text-primary-300 leading-none'>See all {ngoCount ? ngoCount : "nonprofits"}</p>
              <Image src='/icons/arrow-right-long.svg' alt='' width={10} height={10} unoptimized />
            </Link>
          </div>
        </div>
      </div>

      <Divider />

      {/* From the blog */}
      <div className='flex flex-col px-16 py-24 gap-16 bg-white'>
        <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
          <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>From the blog</h1>
          <Link className='flex gap-1 items-center justify-center' href='/blogs'>
            <p className='text-meta font-DMSans-500 text-primary-300 leading-none'>Read all posts</p>
            <Image src='/icons/arrow-right-long.svg' alt='' width={10} height={10} unoptimized />
          </Link>
        </div>
        
        <div className='flex flex-col gap-6'>
          {blogs.map((blog, index) => (
            <Fragment key={blog.id}>
              <BlogPost blog={blog} />
              {index < blogs.length - 1 ? <Divider /> : null}
            </Fragment>
          ))}
        </div>
      </div>

    </div>
  )
}
