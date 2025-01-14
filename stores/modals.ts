export const useModalsStore = defineStore('modalStore', {
    state: () => ({
        'create': false,
    }),
    actions: {
        toggleCreate() {
            this.create = !this.create
        }
    }
})