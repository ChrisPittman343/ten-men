<div class="flex max-w-sm flex-col gap-y-4 py-2 backdrop-blur-md">
  <h2 class="text-xl font-medium">
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
    @apply text-secondary/50 ml-4 text-xl font-normal;
  }

  div div:global() {
    @apply flex items-center justify-end gap-x-4;
  }

  .error {
    @apply text-red font-bold;
  }
</style>
