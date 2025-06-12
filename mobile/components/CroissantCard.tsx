import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getComments, getLikeCount } from '@/services/croissants';

interface Props {
  croissantId: string;
  name: string;
}

export default function CroissantCard({ croissantId, name }: Props) {
  const { t } = useTranslation();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<{ id: string; content: string }[]>([]);

  useEffect(() => {
    async function load() {
      setLikes(await getLikeCount(croissantId));
      setComments(await getComments(croissantId));
    }
    load();
  }, [croissantId]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text>{t('likes')}: {likes}</Text>
      <Text style={styles.commentTitle}>{t('comments')}</Text>
      {comments.length === 0 && <Text>{t('noComments')}</Text>}
      {comments.map((c) => (
        <Text key={c.id} style={styles.comment}>- {c.content}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentTitle: {
    marginTop: 4,
    fontWeight: '600',
  },
  comment: {
    marginLeft: 8,
  },
});
