import { Vector3 } from '../types';

/**
 * Calculates the dot product of two 3D vectors.
 */
export const dotProduct = (vecA: Vector3, vecB: Vector3): number => {
  return (vecA.x * vecB.x) + (vecA.y * vecB.y) + (vecA.z * vecB.z);
};

/**
 * Calculates the magnitude (Euclidean norm) of a vector.
 */
export const magnitude = (vec: Vector3): number => {
  return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y) + (vec.z * vec.z));
};

/**
 * Calculates Cosine Similarity between two vectors.
 * Formula: (A . B) / (||A|| * ||B||)
 * Returns a value between -1 and 1.
 */
export const cosineSimilarity = (vecA: Vector3, vecB: Vector3): number => {
  const dot = dotProduct(vecA, vecB);
  const magA = magnitude(vecA);
  const magB = magnitude(vecB);

  if (magA === 0 || magB === 0) return 0; // Prevent division by zero
  
  return dot / (magA * magB);
};

/**
 * Normalizes a value from 1-10 scale to 0-1 scale for calculation consistency if needed,
 * though Cosine Similarity is scale-invariant regarding magnitude, 
 * treating the inputs as coordinates in 3D space is clearer.
 */
export const normalizeInput = (val: number): number => {
  return val; 
};
