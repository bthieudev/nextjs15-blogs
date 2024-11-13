import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    title,
    description,
    image,
    category,
  } = post;
  return (
    <li className="relative startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-teal-500" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          {author?.image && (
            <Avatar className="size-10">
              <AvatarImage src={author?.image || ''} alt={author?.name || ''} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          )}
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <div>
          <p className="text-26-semibold line-clamp-1 capitalize">{title}</p>
          <p className="startup-card_decs capitalize">{description}</p>
        </div>

        {image && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              marginTop: '10px',
            }}
          >
            <Image
              src={image || ''}
              alt="placeholder"
              className="startup-card_img"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium category-tag capitalize !text-white-100">
            {category}
          </p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
