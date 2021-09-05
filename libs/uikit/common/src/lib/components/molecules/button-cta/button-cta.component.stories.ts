import { ButtonCTAComponent } from './button-cta.component';
import {
  Meta,
  Story,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { SpinnerComponent } from '../../atoms';

export default {
  title: 'Molecules/Button CTA',
  component: ButtonCTAComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonCTAComponent, SpinnerComponent],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="margin: 3em; display:flex; justify-content:center">
          <div style="min-width: 300px">${story}</div>
        </div>`,
    ),
  ],
  subcomponents: { SpinnerComponent },
  argTypes: {
    isLoading: {
      control: { type: 'boolean' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
    assertLoadingMessage: {
      control: { type: 'text' },
      defaultValue: 'Loading, please wait...',
    },
    rounded: {
      control: {
        type: 'inline-radio',
      },
      options: ['both', 'top', 'bottom'],
      defaultValue: 'both',
    },
    type: {
      control: {
        type: 'inline-radio',
      },
      options: ['button', 'submit', 'menu', 'reset'],
      defaultValue: 'button',
    },
  },
} as Meta<ButtonCTAComponent>;

const Template: Story<ButtonCTAComponent> = (args) => ({
  props: args,
  template: `
    <uikit-common-button-cta 
      [isLoading]="isLoading" 
      [isDisabled]="isDisabled"
      [assertLoadingMessage]="assertLoadingMessage"
      [rounded]="rounded"
      [type]="type"
    >
      Login
    </uikit-common-button-cta>
`,
});

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
