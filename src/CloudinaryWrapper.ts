import { CloudinaryConfig } from '@ioc:Adonis/Addons/Cloudinary'
import {
	UploadApiOptions,
	ResponseCallback,
	UploadApiResponse,
	TransformationOptions,
} from 'cloudinary'

export default class CloudinaryWrapper {
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

	public async upload(
		file,
		publicId: string|null = null,
		uploadOptions: UploadApiOptions = {},
		callback?: ResponseCallback
	) {
		this.uploadResponse = await this.cloudinary.upload(file, { publicId, ...uploadOptions }, callback)
	}

	public async unsignedUpload(
		file,
		uploadPreset: string,
		publicId: string|null = null,
		uploadOptions: UploadApiOptions = {},
		callback?: ResponseCallback
	) {
		this.uploadResponse = await this.cloudinary.unsigned_upload(
			file,
			uploadPreset,
			{ publicId, ...uploadOptions },
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

	public async destroy(publicId, options = {}) {
		return await this.cloudinary.destroy(publicId, options)
	}
}
