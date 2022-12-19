<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useQuestion from "../../composables/useQuestion";

const router = useRouter();

const title = ref<string>("");
const content = ref<string>("");
const tagText = ref<string>("");
const tagArray = ref<string[]>([]);

const titleError = ref<string>("");
const contentError = ref<string>("");

const { error, addQuestion } = useQuestion();

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

const onCreateClick = async () => {
  titleError.value = "";
  contentError.value = "";

  if (title.value === "") {
    titleError.value = "Title is required.";
  }

  if (content.value === "") {
    contentError.value = "Explanation is required.";
  }

  if (!(title.value !== "" && content.value !== "")) {
    return;
  }

  const newQuestion = {
    title: title.value,
    content: content.value,
    tags: tagArray.value,
  };

  const questionId = await addQuestion(newQuestion);

  if (questionId) {
    router.push({ name: "Question Detail", params: { id: questionId } });
  }
};
</script>

<template>
  <div class="container py-4">
    <h1 class="text-2xl mb-4">New Question</h1>

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
        <p v-if="titleError" class="text-sm text-red-400">Title is required.</p>
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
          Explanation is required.
        </p>
      </div>

      <!-- Tags -->
      <div class="flex flex-col mb-2">
        <label for="tags" class="text-sm mb-1">Tags</label>
        <input
          type="text"
          id="tags"
          v-model="tagText"
          placeholder="Enter comma seperated tags (max 3)"
          class="border p-2 rounded"
        />
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
          @click.prevent="onCreateClick"
        >
          Create
        </button>
      </div>
    </form>

    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<style scoped></style>
