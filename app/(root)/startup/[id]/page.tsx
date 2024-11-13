import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from '@/sanity/lib/queries';
import { Author, Startup } from '@/sanity/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';

export const experimental_ppr = true;
export type StartupCardDetailType = Omit<Startup, 'author'> & {
  author: Author;
};

const md = markdownit();

const DetailBlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const [post, editorResponse] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' }),
  ]);

  const editorPosts = editorResponse?.select || [];

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl capitalize">{post.description}</p>
      </section>

      <section className="section_container">
        {post.image && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
            }}
          >
            <Image
              src={post.image}
              alt="thumbnail"
              className="object-cover rounded-xl"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5 flex-col sm:flex-row">
            <Link
              className="flex gap-2 items-center mb-3"
              href={`/user/${post.author?._id}`}
            >
              <Image
                src={post.author.image || ''}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-20-medium">@{post.author.username}</p>
              </div>
            </Link>

            <p className="category-tag text-white-100 capitalize">
              {post.category}
            </p>
          </div>

          <h3 className="text-30-bold text-center sm:text-left">
            Blog Details
          </h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all text-center sm:text-left"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No detail provided</p>
          )}
        </div>

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Other Blogs</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((item: StartupTypeCard) => (
                <StartupCard post={item} key={item._id} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default DetailBlogPage;
