import ProductCard from '@/components/ProductCard'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: products } = await supabase.from('products').select()

  return (
    <div className='flex flex-col p-10 gap-5'>
      {products?.map((product) => 
        <ProductCard key={product.id} product={product}/>
      )}
    </div>
  )
}
