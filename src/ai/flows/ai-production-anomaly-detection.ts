'use server';
/**
 * @fileOverview An AI tool for analyzing production data to detect anomalies,
 * predict bottlenecks, and identify deviations, providing insights and alerts.
 *
 * - detectProductionAnomaly - A function that handles the production anomaly detection process.
 * - ProductionAnomalyDetectionInput - The input type for the detectProductionAnomaly function.
 * - ProductionAnomalyDetectionOutput - The return type for the detectProductionAnomaly function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const ProductionAnomalyDetectionInputSchema = z.object({
  realtimeProductionData: z
    .string()
    .describe(
      'JSON string representing current real-time production data. Example: [{"timestamp": "2023-10-27T10:00:00Z", "productionRate": 100, "defectRate": 2, "robotEfficiency": 95, "energyConsumption": 500}]'
    ),
  historicalProductionData: z
    .string()
    .describe(
      'JSON string representing historical production data for comparison. Example: [{"timestamp": "2023-10-26T10:00:00Z", "productionRate": 98, "defectRate": 3, "robotEfficiency": 90, "energyConsumption": 480}]'
    ),
  expectedPerformanceMetrics: z
    .string()
    .describe(
      'JSON string representing expected performance metrics or baselines. Example: {"productionRateMin": 90, "productionRateMax": 110, "defectRateMax": 5, "robotEfficiencyMin": 85}'
    ),
});

export type ProductionAnomalyDetectionInput = z.infer<
  typeof ProductionAnomalyDetectionInputSchema
>;

// Output Schema
const ProductionAnomalyDetectionOutputSchema = z.object({
  anomaliesDetected: z
    .boolean()
    .describe('True if any significant anomalies were detected, false otherwise.'),
  anomalyDescription: z
    .string()
    .describe('A detailed description of detected anomalies, including their nature and potential impact.'),
  predictedBottlenecks: z
    .array(z.string())
    .describe('A list of potential future bottlenecks or risks identified.'),
  deviations: z
    .array(z.string())
    .describe('A list of observed deviations from expected performance metrics.'),
  insightsAndRecommendations: z
    .array(z.string())
    .describe('Actionable insights and recommendations to address identified issues and optimize production.'),
  suggestedAlerts: z
    .array(
      z.object({
        severity: z
          .enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
          .describe('The severity level of the alert.'),
        message: z
          .string()
          .describe('The message content for the alert.'),
      })
    )
    .describe('A list of suggested alerts with their severity and message.'),
});

export type ProductionAnomalyDetectionOutput = z.infer<
  typeof ProductionAnomalyDetectionOutputSchema
>;

// Wrapper function
export async function detectProductionAnomaly(
  input: ProductionAnomalyDetectionInput
): Promise<ProductionAnomalyDetectionOutput> {
  return aiProductionAnomalyDetectionFlow(input);
}

// Genkit Prompt definition
const detectAnomalyPrompt = ai.definePrompt({
  name: 'detectAnomalyPrompt',
  input: {schema: ProductionAnomalyDetectionInputSchema},
  output: {schema: ProductionAnomalyDetectionOutputSchema},
  prompt: `You are an expert AI production analyst for a manufacturing plant, specifically focused on welding operations. Your primary goal is to maintain optimal production efficiency and proactively identify potential issues.\n\nAnalyze the provided real-time and historical production data against the expected performance metrics. Your analysis should meticulously identify:\n1.  **Anomalies**: Any unusual or unexpected patterns or outliers in the real-time data compared to historical trends and expected norms.\n2.  **Predicted Bottlenecks**: Potential future choke points or limitations in the production process that could lead to delays or reduced output.\n3.  **Deviations**: Instances where current performance metrics significantly differ from the defined expected performance.\n\nFor each identified anomaly, bottleneck, or deviation, provide detailed descriptions, actionable insights, and recommendations. Also, suggest appropriate alerts based on the criticality of the detected issues.\n\nReal-time Production Data (JSON array of objects, each with metrics like productionRate, defectRate, robotEfficiency, energyConsumption, etc., and a timestamp):\n{{{realtimeProductionData}}}\n\nHistorical Production Data (JSON array of objects, similar structure to real-time data, for trend analysis):\n{{{historicalProductionData}}}\n\nExpected Performance Metrics (JSON object with target ranges or thresholds, e.g., {"productionRateMin": 90, "productionRateMax": 110, "defectRateMax": 5, "robotEfficiencyMin": 85}):\n{{{expectedPerformanceMetrics}}}\n\nYour output MUST be a JSON object conforming to the ProductionAnomalyDetectionOutputSchema. If no anomalies are detected, set 'anomaliesDetected' to false and provide an empty or positive summary in other fields.`,
});

// Genkit Flow definition
const aiProductionAnomalyDetectionFlow = ai.defineFlow(
  {
    name: 'aiProductionAnomalyDetectionFlow',
    inputSchema: ProductionAnomalyDetectionInputSchema,
    outputSchema: ProductionAnomalyDetectionOutputSchema,
  },
  async input => {
    const {output} = await detectAnomalyPrompt(input);
    if (!output) {
      throw new Error('Failed to generate anomaly detection output.');
    }
    return output;
  }
);
