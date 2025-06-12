'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getComments, getLikeCount } from '../services/croissants';

interface CroissantCardProps {
  croissantId: string;
  name: string;
}

interface Comment {
  id: string;
  content: string;
}

export default function CroissantCard({ croissantId, name }: CroissantCardProps) {
  const { t } = useTranslation();
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function load() {
      setLikeCount(await getLikeCount(croissantId));
      setComments(await getComments(croissantId));
    }
    load();
  }, [croissantId]);

  return (
    <div className="flex flex-col gap-2 p-2 border rounded">
      <strong>{name}</strong>
      <span>{t('likes')}: {likeCount}</span>
      <div>
        <h4 className="font-semibold">{t('comments')}</h4>
        {comments.length === 0 && <p>{t('noComments')}</p>}
        <ul className="list-disc ml-4">
          {comments.map((c) => (
            <li key={c.id}>{c.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
