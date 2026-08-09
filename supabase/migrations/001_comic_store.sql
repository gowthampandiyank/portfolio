create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'customer' check (role in ('customer','admin')),
  created_at timestamptz not null default now()
);
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  base_price numeric(10,2) not null check (base_price >= 0),
  category_id uuid references public.categories(id) on delete set null,
  theme text not null check (theme in ('anime','superhero','hybrid')),
  craft_type text not null check (craft_type in ('embroidery','print','combo')),
  embroidery_stitch_count integer,
  is_featured boolean not null default false,
  is_bestseller boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text not null check (size in ('XS','S','M','L','XL','2XL','3XL')),
  color text not null,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  sku text unique not null
);
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  is_primary boolean not null default false,
  alt_text text
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  total_amount numeric(10,2) not null check (total_amount >= 0),
  status text not null default 'pending' check (status in ('pending','stitching','quality_check','shipped','delivered','cancelled')),
  shipping_address jsonb not null default '{}'::jsonb,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now()
);
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0)
);

create index if not exists products_category_idx on public.products(category_id);
create index if not exists variants_product_idx on public.product_variants(product_id);
create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists order_items_order_idx on public.order_items(order_id);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "public read categories" on public.categories for select using (true);
create policy "public read products" on public.products for select using (true);
create policy "public read variants" on public.product_variants for select using (true);
create policy "public read images" on public.product_images for select using (true);
create policy "admin manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage variants" on public.product_variants for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage images" on public.product_images for all using (public.is_admin()) with check (public.is_admin());
create policy "users read own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "users update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "users read own orders" on public.orders for select using (user_id = auth.uid() or public.is_admin());
create policy "users create own orders" on public.orders for insert with check (user_id = auth.uid());
create policy "admins manage orders" on public.orders for update using (public.is_admin()) with check (public.is_admin());
create policy "users read own order items" on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())));
create policy "users create own order items" on public.order_items for insert with check (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "admins manage order items" on public.order_items for all using (public.is_admin()) with check (public.is_admin());

insert into public.categories(name,slug) values ('T-Shirts','t-shirts'),('Hoodies','hoodies'),('Jackets','jackets'),('Vest Innerwear','vests') on conflict (slug) do nothing;
insert into public.products(title,slug,description,base_price,category_id,theme,craft_type,embroidery_stitch_count,is_featured,is_bestseller)
select 'Cyber Ronin — Red Thread','cyber-ronin', 'Original anime-inspired cyber samurai with dense red threadwork.',1499,c.id,'anime','embroidery',18400,true,true from public.categories c where c.slug='t-shirts'
on conflict (slug) do nothing;
insert into public.products(title,slug,description,base_price,category_id,theme,craft_type,is_featured,is_bestseller)
select 'Neon Guardian','neon-guardian', 'Original superhero-inspired chest emblem with screen-print finish.',1899,c.id,'superhero','print',true,true from public.categories c where c.slug='hoodies'
on conflict (slug) do nothing;
insert into public.products(title,slug,description,base_price,category_id,theme,craft_type,embroidery_stitch_count,is_featured)
select 'Shadow Circuit','shadow-circuit', 'Hybrid streetwear panel: embroidered insignia plus halftone print.',2399,c.id,'hybrid','combo',12600,true from public.categories c where c.slug='jackets'
on conflict (slug) do nothing;
insert into public.products(title,slug,description,base_price,category_id,theme,craft_type,is_bestseller)
select 'Titan Core Vest','titan-core-vest', 'Minimal original superhero-inspired chest mark for everyday layering.',899,c.id,'superhero','print',true from public.categories c where c.slug='vests'
on conflict (slug) do nothing;

insert into public.product_variants(product_id,size,color,stock_quantity,sku)
select p.id, s.size, 'Ink Black', case when s.size='XL' then 3 else 12 end, upper(left(p.slug,4))||'-'||replace(s.size,'2XL','2X')||'-BLK'
from public.products p cross join (values ('XS'),('S'),('M'),('L'),('XL'),('2XL'),('3XL')) s(size)
on conflict (sku) do nothing;

-- Upload actual licensed/original artwork to Storage bucket `product-art` from the admin portal.
insert into storage.buckets(id,name,public) values ('product-art','product-art',true) on conflict (id) do nothing;
create policy "public product art read" on storage.objects for select using (bucket_id='product-art');
create policy "admins upload product art" on storage.objects for insert with check (bucket_id='product-art' and public.is_admin());
create policy "admins update product art" on storage.objects for update using (bucket_id='product-art' and public.is_admin());
create policy "admins delete product art" on storage.objects for delete using (bucket_id='product-art' and public.is_admin());

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles(id,email,full_name) values (new.id,new.email,coalesce(new.raw_user_meta_data->>'full_name','')); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
