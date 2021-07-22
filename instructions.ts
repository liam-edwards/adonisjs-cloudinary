import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import * as sinkStatic from '@adonisjs/sink'
import { join } from 'path'

function getStub(...relativePaths: string[]) {
	return join(__dirname, 'templates', ...relativePaths)
}

export default async function instructions(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
	// Config
	const configPath = app.configPath('cloudinary.ts')
	const cloudinaryConfig = new sink.files.TemplateLiteralFile(
		projectRoot,
		configPath,
		getStub('cloudinary.txt')
	)
	cloudinaryConfig.commit()
	const configDir = app.directoriesMap.get('config') || 'config'
	sink.logger.action('create').succeeded(`${configDir}/cloudinary.ts`)

	// .env
	const env = new sink.files.EnvFile(projectRoot)
	env.set('CLOUDINARY_CLOUD_NAME', '')
	env.set('CLOUDINARY_API_KEY', '')
	env.set('CLOUDINARY_API_SECRET', '')
	env.set('CLOUDINARY_SECURE', '')
	env.commit()
	sink.logger.action('update').succeeded('.env,.env.example')
}
