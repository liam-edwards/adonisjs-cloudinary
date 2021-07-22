import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import CloudinaryWrapper from '../src/CloudinaryWrapper'
import * as Cloudinary from 'cloudinary'

export default class CloudinaryProvider {
	public static needsApplication = true
	constructor(protected app: ApplicationContract) {}

	public register(): void {
		this.app.container.singleton('Adonis/Addons/Cloudinary', _ => {
			const config = this.app.container
				.resolveBinding('Adonis/Core/Config')
				.get('cloudinary', {})

			const cloudinary = Cloudinary.v2
			return new CloudinaryWrapper(config, cloudinary)
		})
	}
}
