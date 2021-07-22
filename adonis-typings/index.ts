declare module '@ioc:Adonis/Addons/Cloudinary' {
	import * as cloudinary from 'cloudinary'

	export interface CloudinaryConfig {
		cloudName: string
		apiKey: string
		apiSecret: string
		secure: boolean
		scaling: cloudinary.TransformationOptions
	}
}
