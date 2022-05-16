<div
  class="border-l-8 border-primary px-8 py-2 flex flex-col gap-y-8 backdrop-blur-md"
>
  <h2 class="font-bold text-3xl">
    Step <slot name="number" />
    <span>
      <slot name="title" />
    </span>
  </h2>

  <p>
    <slot name="body" />
  </p>

  <div>
    <slot name="actions" />
  </div>

  <div class="error">
    <slot name="error" />
  </div>
</div>

<style lang="postcss">
  span:global() {
    @apply text-secondary/50 text-2xl font-normal ml-4;
  }

  p:global() {
    @apply text-lg;
  }

  div div:global() {
    @apply flex justify-end items-center gap-x-4;
  }

  .error {
    @apply font-bold text-red;
  }
</style>
