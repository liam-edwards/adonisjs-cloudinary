/*
 * adonisjs-cloudinary
 *
 * (c) Liam Edwards <me@liamedwards.dev>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@ioc:Adonis/Addons/Cloudinary' {
	import {
		ResponseCallback,
		TransformationOptions,
		UploadApiOptions,
		UploadApiResponse,
	} from 'cloudinary'
	import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

	export interface CloudinaryConfig {
		cloudName: string
		apiKey: string
		apiSecret: string
		secure: boolean
		scaling: TransformationOptions
	}

	export function upload(
		filePath: string,
		publicId: string|null,
		uploadOptions?: UploadApiOptions,
		callback?: ResponseCallback
	)

	export function upload(
		file: MultipartFileContract,
		publicId: string|null,
		uploadOptions?: UploadApiOptions,
		callback?: ResponseCallback
	)

	export function unsignedUpload(
		filePath: string,
		uploadPreset: string,
		publicId: string|null,
		uploadOptions?: UploadApiOptions,
		callback?: ResponseCallback
	)

	export function unsignedUpload(
		file: MultipartFileContract,
		uploadPreset: string,
		publicId: string|null,
		uploadOptions?: UploadApiOptions,
		callback?: ResponseCallback
	)

	export function getResult(): UploadApiResponse

	export function getPublicId(): string

	export function show(
		publicId,
		options: TransformationOptions
	): string

	export function secureShow(
		publicId,
		options: TransformationOptions
	): string

	export function destroy(
		publicId,
		options
	)
}
