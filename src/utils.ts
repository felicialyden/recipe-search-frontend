export const closeDropdown = () => {
    const elem = document.activeElement as HTMLButtonElement
    if (elem) {
      elem?.blur();
    }
  }