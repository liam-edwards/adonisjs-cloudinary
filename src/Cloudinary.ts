/*
 * adonisjs-cloudinary
 *
 * (c) Liam Edwards <me@liamedwards.dev>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { CloudinaryConfig } from '@ioc:Adonis/Addons/Cloudinary'
import {
	DeliveryType,
	ResourceType,
	ResponseCallback,
	TransformationOptions,
	UploadApiOptions,
	UploadApiResponse,
} from 'cloudinary'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export default class Cloudinary {
	private readonly config: CloudinaryConfig
	private readonly cloudinary
	private uploadResponse: UploadApiResponse

	constructor(config: CloudinaryConfig, cloudinary) {
		/* eslint-disable camelcase */
		cloudinary.config({
			cloud_name: config.cloudName,
			api_key: config.apiKey,
			api_secret: config.apiSecret,
			secure: config.secure,
		})
		/* eslint-enable camelcase */
		this.config = config
		this.cloudinary = cloudinary
	}

	public getCloudinary() {
		return this.cloudinary
	}

	private static getPathFromFile(file: MultipartFileContract): string {
		const path = file.tmpPath ?? file.filePath
		if (!path) {
			throw new Error('File\'s tmpPath or filePath must exist')
		}
		return path
	}

	public async upload(
		file: string | MultipartFileContract,
		publicId: string|null = null,
		uploadOptions: UploadApiOptions = {},
		callback?: ResponseCallback
	) {
		let filePath
		if (typeof file === 'string') {
			filePath = file
		} else {
			filePath = Cloudinary.getPathFromFile(file)
		}
		return this.uploadResponse = await this.cloudinary.uploader.upload(filePath, {
			/* eslint-disable camelcase */
			public_id: publicId,
			/* eslint-enable camelcase */
			...uploadOptions,
		}, callback)
	}

	public async unsignedUpload(
		file: string | MultipartFileContract,
		uploadPreset: string,
		publicId: string|null = null,
		uploadOptions: UploadApiOptions = {},
		callback?: ResponseCallback
	) {
		let filePath
		if (typeof file === 'string') {
			filePath = file
		} else {
			filePath = Cloudinary.getPathFromFile(file)
		}
		return this.uploadResponse = await this.cloudinary.uploader.unsigned_upload(
			filePath,
			uploadPreset,
			{
				/* eslint-disable camelcase */
				public_id: publicId,
				/* eslint-enable camelcase */
				...uploadOptions,
			},
			callback
		)
	}

	public getResult() {
		return this.uploadResponse
	}

	public getPublicId() {
		return this.uploadResponse.public_id
	}

	public show(publicId, options: TransformationOptions = {}) {
		const defaults = this.config.scaling
		// @ts-ignore
		options = { ...defaults, ...options }
		return this.cloudinary.url(publicId, options)
	}

	public secureShow(publicId, options: TransformationOptions = {}) {
		// @ts-ignore
		return this.show(publicId, { ...options, secure: true })
	}

	public async destroy(publicId, options?: {
		/* eslint-disable camelcase */
		resource_type?: ResourceType,
		/* eslint-enable camelcase */
		type?: DeliveryType,
		invalidate?: boolean,
	}) {
		return await this.cloudinary.uploader.destroy(publicId, options)
	}
}
