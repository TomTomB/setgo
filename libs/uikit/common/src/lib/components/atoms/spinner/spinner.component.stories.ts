import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { SpinnerComponent } from './spinner.component';

export default {
  title: 'SpinnerComponent',
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<SpinnerComponent>;

export const Primary: Story<SpinnerComponent> = () => ({});
