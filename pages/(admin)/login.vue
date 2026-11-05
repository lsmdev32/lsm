<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

import LogoSVG from "~/assets/images/logo.svg";
import { AutoForm } from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/sonner";
import { LOGIN_FORM_SCHEMA } from "~/lib/schemas/form";
import type { LoginFormPayload } from "~/lib/schemas/form";

definePageMeta({
  middleware: "auth",
  layout: "login",
});

const auth = useFirebaseAuth();
const form = useForm({ validationSchema: toTypedSchema(LOGIN_FORM_SCHEMA) });
const isSubmitting = computed(() => form.isSubmitting.value);

const indicator = useLoadingIndicator();

async function handleSubmit(_payload: LoginFormPayload) {
  if (!auth || auth?.currentUser) {
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, _payload.email, _payload.password);
  } catch {
    toast.error("Email or password invalid !", {
      dismissible: true,
      closeButton: true,
    });

    return;
  } finally {
    indicator.finish();
  }

  toast.success("Login successful!", {
    dismissible: true,
  });

  indicator.start();
  void navigateTo("/dashboard");
}
</script>

<template lang="html">
  <div>
    <Toaster position="top-right" :duration="2000" />
    <div class="flex min-h-screen w-full flex-col items-center justify-center">
      <div
        :class="[
          'flex min-h-[315px] min-w-[416px] flex-col items-center space-y-6 rounded-lg p-4 shadow-xl outline outline-1 outline-black',
          isSubmitting ? 'opacity-50' : 'opacity-100',
        ]"
      >
        <NuxtImg :src="LogoSVG" class="aspect-square size-[75px]" />
        <ClientOnly>
          <AutoForm
            :schema="LOGIN_FORM_SCHEMA"
            :form="form"
            :field-config="{
              email: {
                label: 'Email',
                inputProps: {
                  type: 'email',
                  placeholder: 'myemail@example.com',
                  disabled: isSubmitting,
                },
              },
              password: {
                label: 'Password',
                inputProps: {
                  type: 'password',
                  placeholder: '**********',
                  disabled: isSubmitting,
                },
              },
            }"
            class="w-96 space-y-4"
            @submit="handleSubmit"
          >
            <Button type="submit" class="w-full shadow-lg">
              {{ isSubmitting ? "Please Wait..." : "Login" }}
            </Button>
          </AutoForm>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
