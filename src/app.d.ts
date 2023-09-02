// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { user } from "$lib/types"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: user
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
