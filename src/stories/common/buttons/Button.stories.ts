import { fn } from '@storybook/test';
import { within, userEvent, expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import Button from '../../../components/common/buttons/Button.vue';

// 버튼 컴포넌트에 대한 메타데이터 설정
const meta = {
  title: 'Common/Buttons/Button',
  component: Button,
  // 자동 문서화 태그 추가
  tags: ['autodocs'],
  // 컴포넌트 인자 타입 설정
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'text'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼의 비활성화 상태',
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼의 전체 너비 적용 여부',
    },
  },
  // 기본 인자 설정
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
    // fn()을 사용하여 클릭 이벤트 모니터링
    onClick: fn(),
  },
  // Figma 디자인 연동 (예시 URL, 실제 URL로 변경 필요)
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/XDJtc47gxopmg3ve3b2CxY/Button-Components-(Community)?node-id=201-4823&t=A0QBqaCqz0bx5tXA-4',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼 스토리
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary 버튼</Button>',
  }),
};

// Secondary 버튼 스토리
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary 버튼</Button>',
  }),
};

// Outline 버튼 스토리
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Outline 버튼</Button>',
  }),
};

// Text 버튼 스토리
export const Text: Story = {
  args: {
    variant: 'text',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Text 버튼</Button>',
  }),
};

// 크기 변형 스토리
export const Sizes: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Button variant="primary" size="sm">Small 버튼</Button>
        <Button variant="primary" size="md">Medium 버튼</Button>
        <Button variant="primary" size="lg">Large 버튼</Button>
      </div>
    `,
  }),
};

// 비활성화 상태 스토리
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">비활성화 버튼</Button>',
  }),
};

// 전체 너비 스토리
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">전체 너비 버튼</Button>',
  }),
};

// 클릭 이벤트 테스트 스토리
export const ClickEvent: Story = {
  args: {
    onClick: fn(),
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" @click="args.onClick">클릭 이벤트 테스트</Button>',
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    // 클릭 이벤트가 발생했는지 확인
    await expect(args.onClick).toHaveBeenCalled();
  },
};
