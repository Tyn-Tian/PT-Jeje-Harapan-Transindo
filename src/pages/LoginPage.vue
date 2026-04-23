<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'
import AppInput from '../components/shared/AppInput.vue'
import BaseButton from '../components/shared/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

const errors = ref({
  username: '',
  password: ''
})

const validate = () => {
  let isValid = true
  errors.value.username = ''
  errors.value.password = ''

  if (!username.value.trim()) {
    errors.value.username = 'Username wajib diisi'
    isValid = false
  }

  if (!password.value.trim()) {
    errors.value.password = 'Password wajib diisi'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validate()) return

  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/shipments')
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen bg-[#F1EFE8] flex flex-col items-center">
    <div class="max-w-sm w-full mx-auto mt-24">
      <div class="bg-white border border-black/15 rounded-xl p-8 shadow-sm">
        <div class="mb-8">
          <h1 class="text-lg font-medium text-gray-900">Shipment Tracker</h1>
          <p class="text-sm text-gray-600 mt-1">Masuk untuk melanjutkan</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username -->
          <AppInput 
            id="username"
            v-model="username"
            label="Username"
            placeholder="Masukkan username"
            :error="errors.username"
          />

          <!-- Password -->
          <div class="relative">
            <AppInput 
              id="password"
              v-model="password"
              label="Password"
              placeholder="Masukkan password"
              :type="showPassword ? 'text' : 'password'"
              :error="errors.password"
            />
            <button 
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>

          <!-- Store Error Message -->
          <div v-if="authStore.errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
            {{ authStore.errorMessage }}
          </div>

          <!-- Submit Button -->
          <BaseButton 
            variant="primary" 
            class="w-full" 
            type="submit"
            :loading="authStore.isLoading"
          >
            Masuk
          </BaseButton>
        </form>

        <!-- Development Hints -->
        <div class="mt-8 pt-6 border-t border-black/5 text-center">
          <p class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Hint Kredensial</p>
          <p class="text-[11px] text-gray-500 bg-gray-50 py-2 rounded-md">
            Admin: <span class="font-mono text-gray-700">admin / admin123</span><br/>
            Viewer: <span class="font-mono text-gray-700">viewer / viewer123</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
