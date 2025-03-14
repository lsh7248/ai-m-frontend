<template>
  <div class="w-full rounded-lg border p-4 shadow-sm hover:shadow transition-shadow duration-200">
    <div class="flex justify-between items-start mb-2">
      <div class="flex items-center gap-2">
        <span class="text-xs px-2 py-1 rounded-full font-medium" :class="statusClass">
          {{ status }}
        </span>
        <span
          v-if="priority"
          class="text-xs px-2 py-1 rounded-full font-medium"
          :class="priorityClass"
        >
          {{ priority }}
        </span>
      </div>
      <slot name="actions">
        <!-- 기본 액션 버튼 위치 -->
      </slot>
    </div>

    <h3 class="text-lg font-semibold mb-2 line-clamp-2">{{ title }}</h3>

    <p v-if="description" class="text-sm text-gray-600 mb-3 line-clamp-3">{{ description }}</p>

    <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-1 mb-3">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
      >
        {{ tag }}
      </span>
    </div>

    <div class="flex justify-between items-center mt-2">
      <div class="flex items-center gap-2">
        <img
          v-if="assigneeAvatar"
          :src="assigneeAvatar"
          :alt="assignee || 'User avatar'"
          class="w-6 h-6 rounded-full object-cover"
        />
        <span v-if="assignee" class="text-xs text-gray-600">{{ assignee }}</span>
      </div>

      <span v-if="dueDate" class="text-xs text-gray-500">
        {{ formatDate(dueDate) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  description?: string;
  status: 'open' | 'in-progress' | 'review' | 'done' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  tags?: string[];
  assignee?: string;
  assigneeAvatar?: string;
  dueDate?: Date | string;
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  priority: undefined,
  tags: () => [],
  assignee: '',
  assigneeAvatar: '',
  dueDate: undefined,
});

const statusClass = computed(() => {
  const classes = {
    open: 'bg-blue-100 text-blue-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    review: 'bg-purple-100 text-purple-700',
    done: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
  };
  return classes[props.status] || 'bg-gray-100 text-gray-700';
});

const priorityClass = computed(() => {
  const classes = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
  };
  return classes[props.priority || 'low'] || 'bg-gray-100 text-gray-700';
});

const formatDate = (date: Date | string) => {
  if (!date) return '';
  const dateObject = date instanceof Date ? date : new Date(date);
  return dateObject.toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });
};
</script>
