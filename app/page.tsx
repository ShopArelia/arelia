import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/utils/supabase/database'

export default async function Page() {

  const products = await getProducts();

  return (
    <div className='flex flex-col p-10 gap-5'>
      {products?.map((product) => 
        <ProductCard key={product.id} product={product}/>
      )}
    </div>
  )
}
