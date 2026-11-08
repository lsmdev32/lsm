<script setup lang="ts">
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-vue-next";
import { useForm } from "vee-validate";

import LogoMark from "~/assets/images/logo.svg";
import { Button } from "~/components/ui/button";
import { validationSchemas } from "~/lib/schemas/form";
import type { LoginFormPayload } from "~/lib/schemas/form";

definePageMeta({
  middleware: "auth",
  layout: "login",
});

useHead({ title: "Sign in · Lubis Santosa & Partners" });

const GENERIC_AUTH_ERROR = "We couldn't sign you in. Please try again.";

/** Firebase reports these codes; everything else gets a neutral message. */
const AUTH_ERROR_MESSAGES = new Map([
  ["auth/invalid-credential", "Email or password is incorrect."],
  ["auth/invalid-email", "That email address doesn't look right."],
  [
    "auth/network-request-failed",
    "Can't reach the network. Check your connection and try again.",
  ],
  [
    "auth/too-many-requests",
    "Too many attempts. Wait a moment, then try again.",
  ],
  [
    "auth/user-disabled",
    "This account is disabled. Contact the firm administrator.",
  ],
  ["auth/user-not-found", "Email or password is incorrect."],
  ["auth/wrong-password", "Email or password is incorrect."],
]);

const auth = useFirebaseAuth();

const form = useForm<LoginFormPayload>({
  validationSchema: validationSchemas.loginForm,
  initialValues: { email: "", password: "" },
});

const isSubmitting = computed(() => form.isSubmitting.value);
const showPassword = ref(false);
const submitError = ref<string>();
const passwordInput = ref<{ $el?: unknown }>();

function focusPassword() {
  const element = passwordInput.value?.$el;

  if (element instanceof HTMLInputElement) {
    element.focus();
    element.select();
  }
}

async function login(payload: LoginFormPayload) {
  if (!auth) {
    return;
  }

  submitError.value = undefined;

  try {
    await signInWithEmailAndPassword(
      auth,
      payload.email.trim(),
      payload.password
    );
  } catch (error) {
    submitError.value =
      error instanceof FirebaseError
        ? (AUTH_ERROR_MESSAGES.get(error.code) ?? GENERIC_AUTH_ERROR)
        : GENERIC_AUTH_ERROR;

    // Let the user retype the password without hunting for the field.
    await nextTick();
    focusPassword();

    return;
  }

  await navigateTo("/dashboard");
}

const onSubmit = form.handleSubmit(login);
</script>

<template>
  <div
    class="flex min-h-svh w-full flex-col items-center justify-center gap-6 bg-[#F7F1E8] px-5 py-10"
  >
    <img
      :src="LogoMark"
      alt="Lubis Santosa &amp; Partners"
      width="82"
      height="44"
      class="h-11 w-auto"
    />

    <div
      class="flex w-full max-w-sm flex-col gap-5 rounded-xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8"
    >
      <h1 class="font-[Marcellus] text-2xl">Sign in</h1>

      <form class="flex flex-col gap-4" novalidate @submit="onSubmit">
        <UiFormField v-slot="{ componentField }" name="email">
          <UiFormItem>
            <UiFormLabel>Email</UiFormLabel>
            <UiFormControl>
              <UiInput
                v-bind="componentField"
                type="email"
                inputmode="email"
                autocomplete="username"
                placeholder="name@lsmlaw.co.id"
                autocapitalize="none"
                spellcheck="false"
                autofocus
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="password">
          <UiFormItem>
            <UiFormLabel>Password</UiFormLabel>
            <div class="relative">
              <UiFormControl>
                <UiInput
                  ref="passwordInput"
                  v-bind="componentField"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="Your password"
                  class="pr-10"
                />
              </UiFormControl>
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                @click="showPassword = !showPassword"
              >
                <EyeOffIcon
                  v-if="showPassword"
                  class="size-4"
                  aria-hidden="true"
                />
                <EyeIcon v-else class="size-4" aria-hidden="true" />
              </button>
            </div>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <p
          v-if="submitError"
          role="alert"
          class="rounded-md border border-destructive/50 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          {{ submitError }}
        </p>

        <Button
          type="submit"
          class="w-full bg-[#4B3D2A] text-white shadow-sm hover:bg-[#4B3D2A]/90"
          :disabled="isSubmitting"
        >
          <LoaderCircleIcon
            v-if="isSubmitting"
            class="size-4 animate-spin"
            aria-hidden="true"
          />
          {{ isSubmitting ? "Signing in…" : "Sign in" }}
        </Button>
      </form>
    </div>
  </div>
</template>
