<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import getUser from "../../composables/getUser";
import { QuestionFormData } from "../../types";

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  handleSaveQuestion: {
    type: Function,
    required: true,
  },
  formData: {
    type: Object as PropType<QuestionFormData>,
    required: false,
  },
});

const title = ref<string>(props.formData?.title || "");
const content = ref<string>(props.formData?.content || "");
const tagText = ref<string>("");
const tagArray = ref<string[]>(props.formData?.tags || []);

const titleError = ref<string>("");
const contentError = ref<string>("");
const tagError = ref<string>("");

watch(tagText, (ref, prevRef) => {
  if (tagArray.value.length === 3) {
    tagText.value = "";
    return;
  }

  if (ref.at(-1) === ",") {
    const tag = ref.slice(0, -1);

    if (tagArray.value.length < 3 && !tagArray.value.includes(tag)) {
      tagArray.value.push(tag);
      tagText.value = "";
    }
  }
});

const onTagClick = (e: MouseEvent) => {
  const tagSpan = e.target as HTMLSpanElement;
  const tagText = tagSpan.innerText;

  const updatedTags = tagArray.value.filter((item) => item !== tagText);
  tagArray.value = updatedTags;
};

const onClearClick = () => {
  titleError.value = "";
  contentError.value = "";

  title.value = "";
  content.value = "";
  tagText.value = "";
  tagArray.value = [];
};

const onSaveClick = () => {
  titleError.value = "";
  contentError.value = "";
  tagError.value = "";

  if (title.value === "") {
    titleError.value = "Title is required.";
  }

  if (content.value === "") {
    contentError.value = "Explanation is required.";
  }

  if (tagArray.value.length === 0) {
    tagError.value = "At least one tag is required.";
  }

  if (
    !(title.value !== "" && content.value !== "" && tagArray.value.length !== 0)
  ) {
    return;
  }

  const questionParams: QuestionFormData = {
    title: title.value,
    content: content.value,
    tags: tagArray.value,
  };

  props.handleSaveQuestion && props.handleSaveQuestion(questionParams);
};
</script>

<template>
  <form class="bg-gray-100 p-3 rounded">
    <!-- Title -->
    <div class="flex flex-col mb-2">
      <label for="title" class="text-sm mb-1">Title *</label>
      <input
        type="text"
        id="title"
        v-model="title"
        placeholder="Enter a descriptive title"
        class="border p-2 rounded"
      />
      <p v-if="titleError" class="text-sm text-red-400">
        {{ titleError }}
      </p>
    </div>

    <!-- Content -->
    <div class="flex flex-col mb-2">
      <label for="content" class="text-sm mb-1">Explanation *</label>
      <textarea
        id="content"
        placeholder="Explain what you need"
        v-model="content"
        class="border p-2 rounded"
      ></textarea>
      <p v-if="contentError" class="text-sm text-red-400">
        {{ contentError }}
      </p>
    </div>

    <!-- Tags -->
    <div class="flex flex-col mb-2">
      <label for="tags" class="text-sm mb-1">Tags *</label>
      <input
        type="text"
        id="tags"
        v-model="tagText"
        placeholder="Enter comma seperated tags (max 3)"
        class="border p-2 rounded"
      />
      <p v-if="tagError" class="text-sm text-red-400">
        {{ tagError }}
      </p>
      <div class="my-2">
        <span
          v-for="tag in tagArray"
          @click="(e) => onTagClick(e)"
          class="text-sm bg-green-200 rounded px-2 py-1 mr-2 cursor-pointer hover:bg-green-300"
          >{{ tag }}</span
        >
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded"
        @click.prevent="onClearClick"
      >
        Clear
      </button>
      <button
        class="px-4 py-1 bg-blue-200 hover:bg-blue-300 rounded"
        @click.prevent="onSaveClick"
      >
        Save
      </button>
    </div>
  </form>
</template>

<style scoped></style>
