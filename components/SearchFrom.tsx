import React from 'react';
import Form from 'next/form';
import SearchFromReset from './SearchFromReset';
import { Search } from 'lucide-react';

const SearchFrom = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Blogs"
      />
      <div className="flex gap-2">
        {query && <SearchFromReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchFrom;
