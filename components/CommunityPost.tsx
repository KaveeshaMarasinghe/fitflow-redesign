import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../constants/theme';
import type { Post } from '../types';
import { Avatar, Body, Card, Icon, Pill, s } from './ui';
import { AppPhoto } from './AppPhoto';

export function CommunityPost({
  post,
  onLike,
  onComment,
}: {
  post: Post;
  onLike: () => void;
  onComment: () => void;
}) {
  return (
    <Card>
      <View style={s.row}>
        <Avatar initials={post.initials} background={post.color} />
        <View style={s.flex}>
          <Text style={s.heading}>{post.name}</Text>
          <Text style={s.label}>{post.time}</Text>
        </View>
        <Icon name="ellipsis-horizontal" size={20} color={colors.muted} />
      </View>
      <Pill text={post.activity} icon="fitness-outline" />
      <Body>{post.caption}</Body>
      {post.photo && (
        <AppPhoto
          photo={post.photo}
          label={`Sample community photo: ${post.activity}`}
          style={styles.photo}
        />
      )}
      <View style={styles.divider} />
      <View style={s.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${post.liked ? 'Unlike' : 'Like'} ${post.name} post`}
          accessibilityState={{ selected: post.liked }}
          onPress={onLike}
          style={styles.action}
        >
          <Icon
            name={post.liked ? 'heart' : 'heart-outline'}
            color={post.liked ? colors.red : colors.muted}
            size={21}
          />
          <Text style={[styles.count, post.liked && { color: colors.red }]}>{post.likes}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Comments on ${post.name} post`}
          onPress={onComment}
          style={styles.action}
        >
          <Icon name="chatbubble-outline" color={colors.muted} size={20} />
          <Text style={styles.count}>{post.comments.length} comments</Text>
        </Pressable>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  photo: { height: 190, borderRadius: 14 },
  divider: { height: 1, backgroundColor: colors.line },
  action: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 6, paddingRight: 8 },
  count: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted },
});
