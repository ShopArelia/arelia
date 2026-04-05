import Button from '@/components/Button'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/utils/supabase/database'

export default async function Page() {


  return (
    <div className='w-full flex flex-col'>

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

    </div>
  )
}
