import { CardComponent } from './card.component';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

export default {
  title: 'CardComponent',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CardComponent>;

export const Primary: Story<CardComponent> = () => ({});
