import { auth } from '@/auth';
import SearchFrom from '@/components/SearchFrom';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import React from 'react';

async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  const session = await auth();

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Write your Blog, <br /> Connect with People
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Blogs, Share experiences and Get Noticed in global
        </p>

        <SearchFrom query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : 'All Blogs'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((item: StartupTypeCard) => (
              <StartupCard key={item._id} post={item} />
            ))
          ) : (
            <p className="no-results">No blogs</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}

export default Home;
