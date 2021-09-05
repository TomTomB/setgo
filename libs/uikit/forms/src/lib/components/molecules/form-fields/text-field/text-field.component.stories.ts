import {componentWrapperDecorator, Meta, moduleMetadata, Story,} from '@storybook/angular';

import {TextFieldComponent} from './text-field.component';

export default {
  title: 'Molecules/Form Fields/Text',
  component: TextFieldComponent,
  decorators:
      [
        moduleMetadata({
          imports: [],
        }),
        componentWrapperDecorator(
            (story) => `<div style="margin: 3em; display:flex; justify-content:center">
          ${story}
        </div>`,
            ),
      ],
} as Meta<TextFieldComponent>;

const Template: Story<TextFieldComponent> = (args) => ({
  props: args,
  template: `
    <uikit-common-card> 
      <ng-container card-header> 
        <h1>Some Card Header</h1>
        <p>Some Card lorem content</p>
      </ng-container>
      <ng-container card-body> 
        <p style="padding: 2rem 0">Here comes the body</p>
      </ng-container> 
    </uikit-common-card>
  `,
});

export const Default = Template.bind({});
Default.args = {};
