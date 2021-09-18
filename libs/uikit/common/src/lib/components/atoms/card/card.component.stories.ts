import { CardComponent } from './card.component';
import {
  Meta,
  Story,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';

export default {
  title: 'Atoms/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="margin: 3em; display:flex; justify-content:center">
          ${story}
        </div>`,
    ),
  ],
} as Meta<CardComponent>;

const Template: Story<CardComponent> = (args) => ({
  props: args,
  template: `
    <uikit-common-card> 
      <ng-container cardHeader> 
        <h1>Some Card Header</h1>
        <p>Some Card lorem content</p>
      </ng-container>
      <ng-container cardBody> 
        <p style="padding: 2rem 0">Here comes the body</p>
      </ng-container> 
    </uikit-common-card>
  `,
});

export const Default = Template.bind({});
Default.args = {};
