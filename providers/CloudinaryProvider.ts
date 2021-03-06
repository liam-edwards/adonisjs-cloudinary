/*
 * adonisjs-cloudinary
 *
 * (c) Liam Edwards <me@liamedwards.dev>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Cloudinary from '../src/Cloudinary'
import * as cloudinary from 'cloudinary'

export default class CloudinaryProvider {
	public static needsApplication = true
	constructor(protected app: ApplicationContract) {}

	public register(): void {
		this.app.container.singleton('Adonis/Addons/Cloudinary', _ => {
			const config = this.app.container
				.resolveBinding('Adonis/Core/Config')
				.get('cloudinary', {})

			return new Cloudinary(config, cloudinary.v2)
		})
	}
}
