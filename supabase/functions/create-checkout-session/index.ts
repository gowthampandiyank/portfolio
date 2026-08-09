import Stripe from 'https://esm.sh/stripe@18.5.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2025-07-30.basil', httpClient: Stripe.createFetchHttpClient() });
const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  try {
    const auth = req.headers.get('Authorization');
    if (!auth) return new Response(JSON.stringify({error:'Unauthorized'}), {status:401,headers:{'content-type':'application/json'}});
    const token = auth.replace('Bearer ','');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) return new Response(JSON.stringify({error:'Unauthorized'}), {status:401,headers:{'content-type':'application/json'}});

    const { items } = await req.json();
    if (!Array.isArray(items) || !items.length) throw new Error('Cart is empty');
    const ids = items.map((x:any)=>x.variant_id);
    const { data: variants, error } = await supabase.from('product_variants').select('id,stock_quantity,product_id,products(title,base_price)').in('id',ids);
    if (error) throw error;

    const line_items = items.map((item:any) => {
      const v = variants?.find((x:any)=>x.id===item.variant_id);
      if (!v || v.stock_quantity < item.quantity) throw new Error(`Insufficient stock for ${item.variant_id}`);
      return { price_data:{currency:'inr',product_data:{name:(v as any).products?.title ?? 'InkForge item'},unit_amount:Math.round(Number((v as any).products?.base_price ?? item.unit_price)*100)},quantity:item.quantity };
    });
    const origin = req.headers.get('origin') ?? Deno.env.get('SITE_URL')!;
    const session = await stripe.checkout.sessions.create({mode:'payment',line_items,success_url:`${origin}/#/success?session_id={CHECKOUT_SESSION_ID}`,cancel_url:`${origin}/#/cart`,customer_email:user.email ?? undefined,metadata:{user_id:user.id}});
    return new Response(JSON.stringify({url:session.url}), {headers:{'content-type':'application/json'}});
  } catch (e) { return new Response(JSON.stringify({error:e instanceof Error?e.message:'Checkout failed'}), {status:400,headers:{'content-type':'application/json'}}); }
});
