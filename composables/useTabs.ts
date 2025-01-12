export function useTabs() {
  const tabFocus = ref(0)

  const changeTabFocus = (e: KeyboardEvent, tabs: HTMLElement[]) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      tabs[tabFocus.value].setAttribute('tabindex', '-1')
    }

    if (e.key === 'ArrowRight') {
      tabFocus.value++
      if (tabFocus.value >= tabs.length) {
        tabFocus.value = 0
      }
    }

    if (e.key === 'ArrowLeft') {
      tabFocus.value--
      if (tabFocus.value < 0) {
        tabFocus.value = tabs.length - 1
      }
    }

    tabs[tabFocus.value].setAttribute('tabindex', '0')
    tabs[tabFocus.value].focus()
  }

  const changeTabPanel = (
    targetTab: HTMLElement,
    mainContainer: HTMLElement
  ) => {
    const targetPanel = targetTab.getAttribute('aria-controls')
    const targetImage = targetTab.getAttribute('data-image')
    const tabContainer = targetTab.parentNode as HTMLElement

    tabContainer
      .querySelector('[aria-selected="true"]')
      ?.setAttribute('aria-selected', 'false')

    targetTab.setAttribute('aria-selected', 'true')

    hideContent(mainContainer, '[role="tabpanel"]')
    showContent(mainContainer, `#${targetPanel}`)

    hideContent(mainContainer, 'picture')
    showContent(mainContainer, `#${targetImage}`)
  }

  const hideContent = (parent: HTMLElement, content: string) => {
    parent
      .querySelectorAll(content)
      .forEach((item) => item.setAttribute('hidden', 'true'))
  }

  const showContent = (parent: HTMLElement, content: string) => {
    parent.querySelector(content)?.removeAttribute('hidden')
  }

  const initializeTabs = () => {
    onMounted(() => {
      const tabList = document.querySelector('[role="tablist"]')
      const tabs = [
        ...document.querySelectorAll('[role="tab"]'),
      ] as HTMLElement[]

      tabList?.addEventListener('keydown', (e: Event) => {
        if (e instanceof KeyboardEvent) {
          changeTabFocus(e, tabs)
        }
      })

      tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
          const mainContainer = tabList?.parentNode as HTMLElement
          changeTabPanel(e.target as HTMLElement, mainContainer)
        })
      })
    })
  }

  return {
    changeTabFocus,
    changeTabPanel,
    initializeTabs,
  }
}
