<script setup lang="ts">
import getUser from "../../composables/getUser";
import useSignout from "../../composables/useSignout";

const { user } = getUser();
const { error, signout } = useSignout();

const onSignout = async () => {
  await signout();

  if (!error.value) {
    console.log("Signed out.");
  }
};
</script>

<template>
  <div class="bg-gray-700 text-white h-20">
    <div class="container h-full flex justify-between items-center">
      <div>
        <a href="/" class="text-2xl">Ask Questions</a>
        <p v-if="user" class="text-sm">Hello, {{ user.displayName }}</p>
      </div>

      <nav class="flex gap-3" v-if="user">
        <RouterLink :to="{ name: 'Questions' }">Create</RouterLink>
        <RouterLink :to="{ name: 'Questions' }">My Profile</RouterLink>
        <button @click="onSignout">Log out</button>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
