import { Elysia, status, t } from 'elysia';
import { predictSocioeconomicEvaluation } from './predictor';

const SocioeconomicFormSchema = t.Object({
	householdSize: t.Number(),
	dependents: t.Number(),
	monthlyIncomeRange: t.Union([
		t.Literal('<1200'),
		t.Literal('1200-2500'),
		t.Literal('2501-4000'),
		t.Literal('4001-6000'),
		t.Literal('6001-9000'),
		t.Literal('>9000')
	]),
	housingType: t.Union([
		t.Literal('own'),
		t.Literal('rent'),
		t.Literal('ceded')
	]),
	utilitiesDifficulty: t.Number(),
	healthExpenseBurden: t.Number(),
	employmentStability: t.Number(),
	educationSupport: t.Boolean()
});

const app = new Elysia()
	.get('/', 'Evaluacion Socioeconomica API')
	.post(
		'/api/predict',
		async ({ body }) => {
			const result = predictSocioeconomicEvaluation(body);
			console.log('Predicción realizada:', result);
			// Aquí se podría agregar la lógica para firmar el resultado y registrar en blockchain
			return status(200);
		},
		{
			body: SocioeconomicFormSchema
		}
	)
	.listen(8000);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
