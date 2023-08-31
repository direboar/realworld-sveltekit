// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				username: string,
				password: string,
				token: string,
				image: string,
				bio: string
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
