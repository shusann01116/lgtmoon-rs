export type LgtMoonImage = LocalImage | R2Image

export type LocalImage = {
	storage: 'local'
	id: string
	name: string
	buffer: ArrayBuffer
	type: string
	createdAt: Date
}

export type R2Image = {
	storage: 'r2'
	id: string
	url: string
	createdAt: Date
}
