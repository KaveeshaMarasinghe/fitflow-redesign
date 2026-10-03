import { useState } from 'react';
import { Text, View } from 'react-native';
import { AppHeader, Body, Button, Card, Icon, Pill, Screen, s } from '../../components/ui';
import { CommunityPost } from '../../components/CommunityPost';
import { Field, Sheet } from '../../components/Sheet';
import { colors } from '../../constants/theme';
import { useApp } from '../../data/AppProvider';

export default function Community() {
  const app = useApp();
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [comment, setComment] = useState('');
  const post = app.posts.find((item) => item.id === selected);
  return (
    <Screen>
      <AppHeader title="Better, together" subtitle="Your people. Your pace. Your progress." />
      <Card style={{ backgroundColor: colors.primarySoft, borderColor: colors.primarySoft }}>
        <View style={s.row}>
          <Icon name="people" color={colors.primary} size={30} />
          <View style={s.flex}>
            <Text style={s.heading}>A little encouragement goes far.</Text>
            <Body muted>Celebrate the everyday wins.</Body>
          </View>
        </View>
        <Button
          title="Create Post"
          icon="add"
          onPress={() => {
            setDraft('');
            setCreating(true);
          }}
        />
      </Card>
      <View style={s.between}>
        <Text style={s.heading}>Community feed</Text>
        <Pill text="Sample community" icon="leaf-outline" />
      </View>
      {app.posts.map((item) => (
        <CommunityPost
          key={item.id}
          post={item}
          onLike={() => app.toggleLike(item.id)}
          onComment={() => {
            setSelected(item.id);
            setComment('');
          }}
        />
      ))}
      <Sheet visible={creating} title="Share a little win" onClose={() => setCreating(false)}>
        <Body muted>Your post stays in this sample session. It won’t be published.</Body>
        <Field
          label="What moved you today?"
          value={draft}
          onChangeText={setDraft}
          placeholder="A good workout, a small milestone…"
          multiline
          maxLength={500}
        />
        <Text style={s.label}>{draft.length}/500</Text>
        <Button
          title="Add to feed"
          disabled={!draft.trim()}
          onPress={() => {
            app.addPost(draft);
            setCreating(false);
          }}
        />
      </Sheet>
      <Sheet visible={!!post} title="A little encouragement" onClose={() => setSelected(null)}>
        {post && (
          <>
            <Body>{post.caption}</Body>
            {post.comments.length ? (
              post.comments.map((text, index) => (
                <Card key={index}>
                  <Body>{text}</Body>
                </Card>
              ))
            ) : (
              <Body muted>Be the first to cheer them on.</Body>
            )}
            <Field
              label="Your comment"
              value={comment}
              onChangeText={setComment}
              placeholder="You’ve got this!"
              multiline
              maxLength={300}
            />
            <Button
              title="Add comment"
              disabled={!comment.trim()}
              onPress={() => {
                app.addComment(post.id, comment);
                setComment('');
              }}
            />
            <Text style={s.label}>Comments are kept in this session only.</Text>
          </>
        )}
      </Sheet>
    </Screen>
  );
}
