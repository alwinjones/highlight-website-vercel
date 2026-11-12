-- HIGHLIGHT database. Paste all of this into Supabase > SQL Editor > Run.
create table categories(id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, description text, position int default 0, created_at timestamptz default now());
create table articles(id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, excerpt text, body text, image_url text, category_id uuid references categories(id) on delete set null, status text default 'draft', featured boolean default false, seo_title text, seo_description text, created_at timestamptz default now());
create table products(id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, description text, specs text, image_url text, price text, affiliate_url text, category_id uuid references categories(id) on delete set null, status text default 'draft', featured boolean default false, seo_title text, seo_description text, created_at timestamptz default now());
alter table categories enable row level security;
alter table articles enable row level security;
alter table products enable row level security;
-- Public can only READ published content. Only a logged-in admin can change anything.
create policy "public read" on categories for select using (true);
create policy "public read" on articles for select using (status='published');
create policy "public read" on products for select using (status='published');
create policy "admin all" on categories for all to authenticated using (true) with check (true);
create policy "admin all" on articles for all to authenticated using (true) with check (true);
create policy "admin all" on products for all to authenticated using (true) with check (true);
insert into storage.buckets(id,name,public) values('images','images',true) on conflict do nothing;
create policy "public view images" on storage.objects for select using (bucket_id='images');
create policy "admin upload images" on storage.objects for insert to authenticated with check (bucket_id='images');
create policy "admin delete images" on storage.objects for delete to authenticated using (bucket_id='images');
insert into categories(name,slug,position,description) values
('Men''s Grooming','mens-grooming',1,'Grooming essentials and routines.'),
('Skincare','skincare',2,'Skincare guides and picks.'),
('Electronics & Gadgets','electronics-gadgets',3,'Smartphones, audio, wearables, laptops, gaming and smart home.'),
('Anime','anime',4,'Recommendations, characters, movies, merchandise and beginner guides.'),
('Lifestyle','lifestyle',5,'Ideas to discover, inspire and explore.');
