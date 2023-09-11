import pkceChallenge from "@/utils/pkce-challenge";

export const useLoginStore = defineStore(
  "login",
  () => {
    const state = ref("");
    const codeChallenge = ref("");
    const codeVerifier = ref("");

    const generateState = () => {
      const size = 6;

      const mask =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
      let result = "";
      const randomUints = globalThis.crypto.getRandomValues(
        new Uint8Array(size)
      );
      for (let i = 0; i < size; i++) {
        // cap the value of the randomIndex to mask.length - 1
        const randomIndex = randomUints[i] % mask.length;
        result += mask[randomIndex];
      }

      state.value = result;
      return state.value;
    };

    const generatePkce = async () => {
      const pkce = await pkceChallenge();
      codeChallenge.value = pkce.code_challenge;
      codeVerifier.value = pkce.code_verifier;
      return pkce;
    };

    return {
      state,
      codeChallenge,
      codeVerifier,
      generateState,
      generatePkce,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["state"],
    },
  }
);
