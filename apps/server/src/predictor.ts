import * as tf from "@tensorflow/tfjs";

/* =======================
   Tipos públicos
======================= */

export interface SocioeconomicForm {
  householdSize: number;
  dependents: number;
  monthlyIncomeRange:
    | "<1200"
    | "1200-2500"
    | "2501-4000"
    | "4001-6000"
    | "6001-9000"
    | ">9000";
  housingType: "own" | "rent" | "ceded";
  utilitiesDifficulty: number;
  healthExpenseBurden: number;
  employmentStability: number;
  educationSupport: boolean;
}

export interface PredictionResult {
  model: {
    name: string;
    version: string;
    hash: string;
  };
  input: {
    raw: SocioeconomicForm;
    normalized: number[];
  };
  output: {
    socioeconomicIndex: number;
    level: "LOW" | "MEDIUM" | "HIGH";
  };
  metadata: {
    timestamp: number;
    deterministic: true;
  };
}

/* =======================
   Configuración del modelo
======================= */

const MODEL_INFO = {
  name: "SocioeconomicLinearSimNet",
  version: "2.0.0",
  hash: "SHA256:MODEL_HASH_PLACEHOLDER",
};

/* =======================
   Función principal
======================= */

export function predictSocioeconomicEvaluation(
  form: SocioeconomicForm
): PredictionResult {
  /* ---------- Normalización ---------- */
  const normalized: number[] = [
    clamp(form.householdSize / 8, 0, 1),
    clamp(form.dependents / 5, 0, 1),
    normalizeIncome(form.monthlyIncomeRange),
    form.housingType === "own" ? 0.2 : form.housingType === "rent" ? 0.6 : 0.8,
    clamp(form.utilitiesDifficulty / 10, 0, 1),
    form.educationSupport ? 0 : 1,
    clamp(form.employmentStability / 10, 0, 1),
    clamp(form.healthExpenseBurden / 10, 0, 1),
  ];

  /* ---------- Modelo ---------- */
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      inputShape: [8],
      units: 1,
      activation: "sigmoid",
    })
  );

  /* ---------- Pesos ---------- */
  model.layers[0].setWeights([
    tf.tensor2d(
      [
        [ 0.35],  // householdSize
        [ 0.60],  // dependents
        [-1.20],  // income (protector dominante)
        [ 0.50],  // housingType
        [ 0.80],  // utilitiesDifficulty
        [-0.40],  // educationSupport
        [-1.00],  // employmentStability (protector fuerte)
        [ 0.90],  // healthExpenseBurden
      ],
      [8, 1]
    ),
    tf.tensor1d([-0.40]), // bias calibrado
  ]);

  /* ---------- Inferencia ---------- */
  const inputTensor = tf.tensor2d([normalized], [1, 8]);
  const outputTensor = model.predict(inputTensor) as tf.Tensor;

  const score = Number(outputTensor.dataSync()[0].toFixed(4));

  tf.dispose([inputTensor, outputTensor]);

  const level =
    score < 0.33 ? "LOW" :
    score < 0.66 ? "MEDIUM" :
    "HIGH";

  /* ---------- Resultado ---------- */
  return {
    model: MODEL_INFO,
    input: {
      raw: form,
      normalized,
    },
    output: {
      socioeconomicIndex: score,
      level,
    },
    metadata: {
      timestamp: Math.floor(Date.now() / 1000),
      deterministic: true,
    },
  };
}

/* =======================
   Utilidades
======================= */

function normalizeIncome(
  range: SocioeconomicForm["monthlyIncomeRange"]
): number {
  const mapping: Record<string, number> = {
    "<1200": 1000,
    "1200-2500": 1800,
    "2501-4000": 3200,
    "4001-6000": 5000,
    "6001-9000": 7500,
    ">9000": 10000,
  };

  return clamp(mapping[range] / 12000, 0, 1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
