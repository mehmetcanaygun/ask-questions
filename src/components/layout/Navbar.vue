<script setup lang="ts">
import { useRouter } from "vue-router";
import getUser from "../../composables/getUser";
import useSignout from "../../composables/useSignout";

const router = useRouter();

const { user } = getUser();
const { error, signout } = useSignout();

const onSignout = async () => {
  await signout();

  if (!error.value) {
    console.log("Signed out.");
    router.push({ name: "Welcome" });
  }
};
</script>

<template>
  <div class="container h-20 flex justify-between items-center">
    <div>
      <a
        href="/"
        class="font-RubikGemstones text-2xl md:text-5xl text-primary hover:text-primaryDark duration-200"
        >BrainFreeze</a
      >
      <p v-if="user" class="text-sm text-light">
        Hi,
        <span class="text-secondary font-bold">{{ user.displayName }}</span>
      </p>
      <p v-else class="text-light">Ask anything</p>
    </div>

    <nav v-if="user" class="flex text-light">
      <RouterLink
        :to="{ name: 'New Question' }"
        class="pr-2 hover:text-secondary duration-200"
        >Create</RouterLink
      >
      <RouterLink
        :to="{ name: 'My Profile' }"
        class="border border-t-0 border-b-0 border-l-light border-r-light px-2 hover:text-secondary duration-200"
        >My Profile</RouterLink
      >
      <button @click="onSignout" class="pl-2 hover:text-secondary duration-200">
        Log out
      </button>
    </nav>
  </div>
</template>

<style scoped></style>
