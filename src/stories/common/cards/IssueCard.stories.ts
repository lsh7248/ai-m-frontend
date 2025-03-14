import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import IssueCard from '../../../components/common/cards/IssueCard.vue';

// Props 인터페이스를 스토리 파일에서 다시 정의
interface IssueCardProps {
  title: string;
  description?: string;
  status: 'open' | 'in-progress' | 'review' | 'done' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  tags?: string[];
  assignee?: string;
  assigneeAvatar?: string;
  dueDate?: Date | string;
}

const meta = {
  title: 'Common/Cards/IssueCard',
  component: IssueCard,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['open', 'in-progress', 'review', 'done', 'closed'],
    },
    priority: {
      control: 'select',
      options: ['low', 'medium', 'high', 'critical'],
    },
    tags: { control: 'object' },
    assignee: { control: 'text' },
    assigneeAvatar: { control: 'text' },
    dueDate: { control: 'date' },
  },
} as Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '로그인 페이지 UI 개선',
    description: '로그인 페이지의 레이아웃과 반응형 디자인을 개선하고 사용자 경험을 향상시킵니다.',
    status: 'open',
    priority: 'medium',
    tags: ['UI/UX', 'Frontend'],
    assignee: '홍길동',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=user1',
    dueDate: new Date('2023-12-31'),
  },
};

export const InProgress: Story = {
  args: {
    title: 'API 연동 구현',
    description: '백엔드 API와 프론트엔드를 연동하여 데이터를 주고받는 기능을 구현합니다.',
    status: 'in-progress',
    priority: 'high',
    tags: ['API', 'Integration', 'Backend'],
    assignee: '김철수',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=user2',
    dueDate: new Date('2023-12-15'),
  },
};

export const Review: Story = {
  args: {
    title: '사용자 인증 모듈 리팩토링',
    description: '기존 사용자 인증 모듈을 리팩토링하여 코드 품질을 개선하고 유지보수성을 높입니다.',
    status: 'review',
    priority: 'medium',
    tags: ['Refactoring', 'Auth', 'Security'],
    assignee: '이영희',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=user3',
    dueDate: new Date('2023-12-10'),
  },
};

export const Completed: Story = {
  args: {
    title: '성능 최적화',
    description: '애플리케이션의 로딩 시간과 렌더링 성능을 개선하기 위한 최적화 작업을 수행합니다.',
    status: 'done',
    priority: 'critical',
    tags: ['Performance', 'Optimization'],
    assignee: '박민준',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=user4',
    dueDate: new Date('2023-12-05'),
  },
};

export const Closed: Story = {
  args: {
    title: '버그 수정: 로그인 실패 시 오류 메시지 미표시',
    description: '로그인 실패 시 사용자에게 적절한 오류 메시지를 표시하지 않는 버그를 수정합니다.',
    status: 'closed',
    priority: 'low',
    tags: ['Bug', 'UI/UX'],
    assignee: '정지영',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=user5',
    dueDate: new Date('2023-11-30'),
  },
};

export const NoDescription: Story = {
  args: {
    title: '패키지 의존성 업데이트',
    status: 'open',
    priority: 'low',
    tags: ['Maintenance', 'Dependencies'],
    assignee: '홍길동',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=user1',
  },
};

export const NoAssignee: Story = {
  args: {
    title: '새로운 기능 제안: 다크 모드 지원',
    description: '사용자가 다크 모드를 선택할 수 있는 기능을 추가합니다.',
    status: 'open',
    priority: 'medium',
    tags: ['Feature', 'UI/UX', 'Frontend'],
    dueDate: new Date('2024-01-15'),
  },
};

export const LongTitle: Story = {
  args: {
    title:
      '이것은 아주 긴 제목입니다. 이렇게 긴 제목은 UI에서 어떻게 표시되는지 테스트하기 위한 것입니다. 제목이 너무 길면 어떻게 처리되는지 확인해야 합니다.',
    description: '이 이슈는 긴 제목이 UI에서 어떻게 표시되는지 테스트하기 위한 것입니다.',
    status: 'open',
    priority: 'low',
    assignee: '홍길동',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=user1',
  },
};
