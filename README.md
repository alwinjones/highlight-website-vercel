# HIGHLIGHT website + admin dashboard

Built with Next.js (website), Supabase (database, login, image storage) and Vercel (hosting). All have free plans.

## 1. Set up the database (about 5 minutes)
1. Create a free account at supabase.com, then click **New project**. Save the database password somewhere safe.
2. Open **SQL Editor**, click **New query**, paste everything from `supabase/schema.sql`, click **Run**. This creates your tables, the image storage, the security rules and your 5 categories.
3. Open **Authentication > Sign In / Providers** and switch **OFF** "Allow new users to sign up". This stops strangers from creating accounts.
4. Open **Authentication > Users > Add user > Create new user**. Enter your email and a strong password and tick **Auto Confirm User**. This is your admin login.
5. Open **Project Settings > API**. Copy the **Project URL** and the **anon public** key.

## 2. Try it on your computer
1. Install Node.js (the LTS version) from nodejs.org.
2. Copy `.env.example` to a new file named `.env.local` and paste the two values after the `=` signs.
3. In this folder run: `npm install` then `npm run dev`.
4. Open http://localhost:3000 (website) and http://localhost:3000/admin (dashboard).

## 3. Put it online
1. Create free accounts at github.com and vercel.com.
2. On GitHub create a new repository and upload this folder. Do NOT upload `.env.local` (it is already ignored).
3. In Vercel click **Add New > Project**, pick the repository, and under **Environment Variables** add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with the same two values. Click **Deploy**.
4. Your site is live. Sign in at `yourdomain/admin`.

## Security: what protects you
- `/admin` pages redirect to the login page unless you are signed in (`middleware.js`).
- Even if someone guessed the database address, the database rules (Row Level Security) let the public only READ published content. Only a signed-in admin can create, change or delete.
- Your password is never in the code. It is kept by Supabase. The only two values in the project are the Project URL and the anon key, which are meant to be public. Never paste the `service_role` key anywhere. This project does not need it.
- Use a long unique password and keep sign-ups switched off.

## 4. How to manage the website (no coding)
- **Sign in** at `/admin`. The Dashboard shows your totals and latest articles.
- **Write an article:** Articles > Add new. Fill in title, category, summary and text, upload an image, then choose **Draft** (hidden) or **Published** (live). Tick **Show on homepage** to feature it. Click **Save changes**.
- **Add a product:** Products > Add new. Type the real name, description, specs and the price you verified, and paste your genuine affiliate link. If the price is empty, visitors see "Check current price". If there is no link, no buy button appears.
- **Categories:** Categories > Add new, Edit or Delete. A category's page is at `/its-url-ending` and appears on the homepage in the order you set.
- **SEO:** Each article and product has SEO title, SEO description and URL ending.
- **Affiliate disclosure:** Shown automatically above any products and in every footer, with a full page at `/disclosure`.
- Every change appears on the website straight away.
- Only upload images you own or have a licence for. Do not upload copyrighted anime art.
