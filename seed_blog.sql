-- Insert a dummy post.
-- NOTE: We need a valid author_id. 
-- You can run `select id from profiles limit 1;` to get an ID if you have users.
-- OR just run this and it will set author_id to NULL (which our UI handles 'Unknown Author').

insert into public.posts (title, slug, excerpt, content, published, author_id)
values (
  'Welcome to AI-Pitches',
  'welcome-to-ai-pitches',
  'We are launching the community for the future of AI.',
  '# The Future is Here

We are excited to announce the launch of **AI-Pitches**, the premier community for connecting AI founders with visionary funders.

## Why Now?

The pace of innovation in Artificial Intelligence is unprecedented. Traditional VC cycles are too slow. We need a new way to connect capital with code.

## Join Us

*   **Founders**: Get fast-tracked access to capital.
*   **Funders**: Get access to vetted, high-potential projects.

Stay tuned for more updates!',
  true,
  (select id from profiles limit 1) -- Attempts to pick the first user as author
);
