declare module '@ioc:Adonis/Addons/Cloudinary' {
	import * as cloudinary from 'cloudinary'

	export interface CloudinaryConfig {
		cloudName: string
		apiKey: string
		apiSecret: string
		secure: boolean
		scaling: cloudinary.TransformationOptions
	}

	export function upload(
		file,
		publicId: string|null,
		uploadOptions: cloudinary.UploadApiOptions,
		callback?: cloudinary.ResponseCallback
	)

	export function unsignedUpload(
		file,
		uploadPreset: string,
		publicId: string|null,
		uploadOptions: cloudinary.UploadApiOptions,
		callback?: cloudinary.ResponseCallback
	)

	export function getResult(): cloudinary.UploadApiResponse

	export function getPublicId(): string

	export function show(
		publicId,
		options: cloudinary.TransformationOptions
	): string

	export function secureShow(
		publicId,
		options: cloudinary.TransformationOptions
	): string

	export function destroy(
		publicId,
		options
	)
}
