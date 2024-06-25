// app/components/AppCard.tsx
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

interface AppCardProps {
  title: string;
  description: string;
  image: string;
}

const AppCard = ({ title, description, image }: AppCardProps) => (
  <Card>
    <Card.Cover source={{ uri: image }} />
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </Card.Content>
  </Card>
);

export default AppCard;