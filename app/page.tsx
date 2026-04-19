import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import Divider from '@/components/Divider';

import { getProducts, getNGOs, getBlogs } from '@/utils/supabase/database';
import type { Tables } from '@/types/supabase';
import BlogPost from '@/components/BlogPost';
import Footer from '@/components/Footer';

export default async function Page() {
  const products: Array<Tables<'products'>> = await getProducts({ limit: 7});
  const ngos: Array<Tables<'ngos'>> = await getNGOs();
  const blogs: Array<Tables<'blogs'>> = await getBlogs({ limit: 2 });
  const ngoNameById = new Map(ngos.map((ngo) => [ngo.id, ngo.name]));
  const featuredNgos = ngos.slice(0, 6);

  return (
    <div className='w-full flex flex-col'>

      {/* Hero Section */}
      <div className='flex px-16 py-30 items-center justify-between bg-primary-400'>
        <div className='flex flex-col gap-6'>
          <p className='text-body-sm font-DMSans-400 text-primary-200'>SHOP WITH PURPOSE</p>
          <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>Products that give back to <span className='font-DMSerif-Italic'>the world</span></p>
          <p className='text-body font-DMSans-400 text-primary-100'>Every item here supports a verified nonprofit.<br />You get something you love - they get the funding to keep going.</p>
          <div className='flex gap-3'>
            <Button text='Browse products' link='/shop' variant='danger' />
            <Button text='How it works' link='/about' variant='ghost' classN='border-primary-200! text-primary-100!' />
          </div>
        </div>

        <div className='flex gap-12'>
          <div className='flex flex-col gap-3 items-center justify-center'>
            <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>48</p>
            <p className='text-body font-DMSans-400 text-primary-100'>Nonprofits</p>
          </div>
          <div className='w-px bg-primary-200' />
          <div className='flex flex-col gap-3 items-center justify-center'>
            <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>320+</p>
            <p className='text-body font-DMSans-400 text-primary-100'>Products</p>
          </div>
          <div className='w-px bg-primary-200' />
          <div className='flex flex-col gap-3 items-center justify-center'>
            <p className='text-display font-DMSerif-Reg text-primary-50 leading-none'>12</p>
            <p className='text-body font-DMSans-400 text-primary-100'>Causes</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className='flex flex-col px-16 py-24 gap-16 bg-primary-50'>
        <div className='flex items-center justify-between'>
          <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>Featured products</h1>
          <Link className='flex gap-1 items-center justify-center' href='/shop'>
            <p className='text-meta font-DMSans-500 text-primary-300 leading-none'>See all 320</p>
            <Image src='./icons/arrow-right-long.svg' alt='' width={10} height={10} unoptimized />
          </Link>
        </div>

        <div className='flex items-center justify-between'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} ngoName={ngoNameById.get(product.ngo_id) ?? ''} />
          ))}
        </div>
      </div>

      <Divider />

      {/* How it works */}
      <div className='flex flex-col px-16 py-24 gap-16 bg-white'>
          <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>How it works</h1>

          <div className='flex gap-12'>
            <div className='flex flex-col gap-3 items-start'>
              <Image src='./icons/search.svg' alt='' width={50} height={50} unoptimized />
              <h2 className='text-h2 font-DMSerif-Reg text-surface-400'>Browse by cause</h2>
              <p className='text-body font-DMSans-400 text-surface-300'>Filter products by the causes that matter to you - environment, education, food security, and more.</p>
            </div>
            <div className='flex flex-col gap-3 items-start'>
              <Image src='./icons/bag.svg' alt='' width={50} height={50} unoptimized />
              <h2 className='text-h2 font-DMSerif-Reg text-surface-400'>Buy from the nonprofit</h2>
              <p className='text-body font-DMSans-400 text-surface-300'>Click any product and you’re taken directly to the nonprofit’s store. We never handle the transaction.</p>
            </div>
            <div className='flex flex-col gap-3 items-start'>
              <Image src='./icons/heart.svg' alt='' width={50} height={50} unoptimized />
              <h2 className='text-h2 font-DMSerif-Reg text-surface-400'>Impact is automatic</h2>
              <p className='text-body font-DMSans-400 text-surface-300'>Your purchase directly funds the nonprofit’s work. No middleman, no extra steps, no donation required.</p>
            </div>
          </div>
      </div>

      <Divider />

      {/* nonprofits we support */}
      <div className='flex flex-col px-16 py-24 gap-16 bg-primary-50'>
        <div className='flex items-center justify-between'>
          <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>Nonprofits we support</h1>
          <Link className='flex gap-1 items-center justify-center' href='/shop'>
            <p className='text-meta font-DMSans-500 text-primary-300 leading-none'>See all 30</p>
            <Image src='./icons/arrow-right-long.svg' alt='' width={10} height={10} unoptimized />
          </Link>
        </div>

        <div className='flex items-center gap-6'>
          <div className='flex gap-4'>
            {featuredNgos.map((ngo) => (
              <div key={ngo.id} className='w-[60px] h-[60px] rounded-xl border border-surface-200 overflow-hidden'>
                <Image key={ngo.id} src={ngo.logo_url} alt={ngo.name} width={60} height={60} />
              </div>
            ))}
          </div>
          <div className='flex items-baseline justify-center gap-2'>
            <p className='text-body font-DMSans-400 text-surface-300'>and 24 more verified organizations.</p>
            <Link className='flex h-fit gap-1 items-center justify-center' href='/shop'>
              <p className='text-meta font-DMSans-500 text-primary-300 leading-none'>See all 30</p>
              <Image src='./icons/arrow-right-long.svg' alt='' width={10} height={10} unoptimized />
            </Link>
          </div>
        </div>
      </div>

      <Divider />

      {/* From the blog */}
      <div className='flex flex-col px-16 py-24 gap-16 bg-white'>
        <div className='flex items-center justify-between'>
          <h1 className='text-h1 font-DMSerif-Reg text-surface-400 leading-none'>From the blog</h1>
          <Link className='flex gap-1 items-center justify-center' href='/blog'>
            <p className='text-meta font-DMSans-500 text-primary-300 leading-none'>Read all posts</p>
            <Image src='./icons/arrow-right-long.svg' alt='' width={10} height={10} unoptimized />
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
