import { useEffect, useState } from "react";
import JuicerCard from "./FeedCard";

interface JuicerViewProps {
  filter: string;
}

interface JuicerPost {
  id: string;
  full_url: string;
  image: string;
  message: string;
  created_at: string;
}

const JuicerView = ({ filter }: JuicerViewProps) => {
  const [posts, setPosts] = useState<{ items: JuicerPost[] }>({ items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://www.juicer.io/api/feeds/norstec?filter=${filter}&per=12`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  if (loading) {
    return <div className="text-center py-20">Loading…</div>;
  }

  return (
    <div className="w-full px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.items.map((post) => (
          <JuicerCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default JuicerView;
