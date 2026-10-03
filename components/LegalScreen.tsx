import { Text } from 'react-native';
import { AppHeader, Body, Card, Pill, Screen, s } from './ui';

export function LegalScreen({
  title,
  sections,
}: {
  title: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <Screen>
      <AppHeader title={title} subtitle="Effective 4 October 2026" back />
      <Pill text="Student academic prototype" icon="school-outline" />
      {sections.map((section, index) => (
        <Card key={section.title}>
          <Text style={s.heading}>
            {String(index + 1).padStart(2, '0')} · {section.title}
          </Text>
          <Body muted>{section.body}</Body>
        </Card>
      ))}
    </Screen>
  );
}
