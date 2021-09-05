import {componentWrapperDecorator, Meta, moduleMetadata, Story,} from '@storybook/angular';

import {SpinnerComponent} from './spinner.component';

export default {
  title: 'Atoms/Spinner',
  component: SpinnerComponent,
  decorators:
      [
        moduleMetadata({
          imports: [],
        }),
        componentWrapperDecorator(
            (story) => `<div style="margin: 3em; display:flex; justify-content:center">
          <div style="width: 2.5rem; height: 2.5rem">${story}</div>
        </div>`,
            ),
      ],
} as Meta<SpinnerComponent>;

const Template: Story<SpinnerComponent> = (args) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
