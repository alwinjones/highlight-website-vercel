import Manager from '@/components/Manager'
export default function P() { return <Manager table="categories" title="Categories" nameKey="name" fields={[{k:"name",l:"Name"},{k:"slug",l:"Page URL ending",h:"For example anime. The page will be yoursite.com/anime"},{k:"description",l:"Short description",t:"area"},{k:"position",l:"Order on homepage",t:"num",h:"1 shows first."}]} /> }
