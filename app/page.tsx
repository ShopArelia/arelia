import ProductCard from '@/components/ProductCard'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: products } = await supabase.from('products').select()

  return (
    <div className='bg-[#FAF9F6] p-10'>
      {products?.map((product) => 
        <ProductCard key={product.id} data={product}/>
      )}
    </div>
  )
}
