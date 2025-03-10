<script setup lang="ts">
import { ref } from 'vue';
import Button from './common/buttons/Button.vue';
import IssueCard from './common/cards/IssueCard.vue';

defineProps<{ msg: string }>();

const count = ref(0);

function handleButtonClick() {
  count.value++;
}

// 샘플 이슈 데이터
const sampleIssues = [
  {
    title: '로그인 기능 구현',
    description:
      '사용자 인증 시스템 및 로그인 페이지 구현이 필요합니다. OAuth 2.0을 지원해야 하며, 소셜 로그인도 포함되어야 합니다.',
    status: 'open' as const,
    priority: 'high' as const,
    tags: ['인증', '프론트엔드', 'API'],
    assignee: '김개발',
    assigneeAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    dueDate: new Date(2024, 5, 15),
  },
  {
    title: '대시보드 UI 개선',
    description:
      '사용자 대시보드의 UI/UX를 개선하여 더 직관적이고 사용하기 쉽게 만들어야 합니다. 모바일 대응도 필요합니다.',
    status: 'in-progress' as const,
    priority: 'medium' as const,
    tags: ['UI/UX', '디자인', '반응형'],
    assignee: '이디자인',
    assigneeAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    dueDate: new Date(2024, 4, 30),
  },
  {
    title: '성능 최적화',
    description:
      '애플리케이션 로딩 시간을 개선하고 전반적인 성능을 최적화해야 합니다. 특히 큰 데이터셋을 처리할 때 성능 이슈가 있습니다.',
    status: 'review' as const,
    priority: 'critical' as const,
    tags: ['성능', '최적화', '백엔드'],
    assignee: '박엔지니어',
    assigneeAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    dueDate: new Date(2024, 4, 10),
  },
];
</script>

<template>
  <h1 class="text-heading-1 text-primary mb-4">{{ msg }}</h1>

  <div class="card p-6 bg-white rounded-lg shadow-md">
    <div class="flex flex-col gap-4 items-center">
      <p class="text-lg">count is {{ count }}</p>

      <div class="flex gap-2">
        <Button variant="primary" size="md" @click="handleButtonClick"> Primary 버튼 </Button>

        <Button variant="secondary" size="md" @click="handleButtonClick"> Secondary 버튼 </Button>

        <Button variant="outline" size="md" @click="handleButtonClick"> Outline 버튼 </Button>

        <Button variant="text" size="md" @click="handleButtonClick"> Text 버튼 </Button>
      </div>

      <p class="mt-4">
        Edit
        <code class="bg-gray-100 px-1 py-0.5 rounded">components/HelloWorld.vue</code>
        to test HMR
      </p>
    </div>
  </div>

  <!-- 이슈 카드 섹션 -->
  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">샘플 이슈 카드</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <IssueCard
        v-for="(issue, index) in sampleIssues"
        :key="index"
        :title="issue.title"
        :description="issue.description"
        :status="issue.status"
        :priority="issue.priority"
        :tags="issue.tags"
        :assignee="issue.assignee"
        :assignee-avatar="issue.assigneeAvatar"
        :due-date="issue.dueDate"
      >
        <template #actions>
          <button class="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </button>
        </template>
      </IssueCard>
    </div>
  </div>

  <p class="mt-4">
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
      class="text-primary hover:underline"
    >
      create-vue </a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      class="text-primary hover:underline"
    >
      Vue Docs Scaling up Guide </a
    >.
  </p>
  <p class="text-gray-500 mt-4">Click on the Vite and Vue logos to learn more</p>
</template>
