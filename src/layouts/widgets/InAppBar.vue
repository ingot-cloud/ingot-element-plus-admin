<template>
  <div flex justify-center items-center>
    <!-- <in-menu-toggle /> -->
    <!-- <in-breadcrumb /> -->
    <in-logo />
  </div>

  <div flex justify-center items-center gap-4>
    <in-fullscreen />
    <in-global-setting />

    <span
      class="h-[var(--in-app-bar-icon-size)] w-1px bg-[hsla(0,0%,100%,.16)]"
    ></span>

    <in-user-dropdown />
  </div>
</template>
