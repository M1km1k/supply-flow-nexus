
export interface DecisionNode {
  feature: string;
  threshold?: number;
  value?: any;
  left?: DecisionNode;
  right?: DecisionNode;
  isLeaf: boolean;
  prediction?: string;
  confidence?: number;
}

export interface TrainingData {
  features: Record<string, number>;
  label: string;
}

export class DecisionTreeClassifier {
  private root: DecisionNode | null = null;
  private maxDepth: number;
  private minSamplesLeaf: number;

  constructor(maxDepth: number = 5, minSamplesLeaf: number = 2) {
    this.maxDepth = maxDepth;
    this.minSamplesLeaf = minSamplesLeaf;
  }

  // Calculate entropy for classification
  private calculateEntropy(labels: string[]): number {
    const labelCounts = labels.reduce((acc, label) => {
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = labels.length;
    let entropy = 0;

    for (const count of Object.values(labelCounts)) {
      const probability = count / total;
      if (probability > 0) {
        entropy -= probability * Math.log2(probability);
      }
    }

    return entropy;
  }

  // Calculate information gain
  private calculateInformationGain(
    data: TrainingData[],
    feature: string,
    threshold: number
  ): number {
    const parentLabels = data.map(d => d.label);
    const parentEntropy = this.calculateEntropy(parentLabels);

    const leftData = data.filter(d => d.features[feature] <= threshold);
    const rightData = data.filter(d => d.features[feature] > threshold);

    if (leftData.length === 0 || rightData.length === 0) {
      return 0;
    }

    const leftLabels = leftData.map(d => d.label);
    const rightLabels = rightData.map(d => d.label);

    const leftEntropy = this.calculateEntropy(leftLabels);
    const rightEntropy = this.calculateEntropy(rightLabels);

    const weightedEntropy = 
      (leftData.length / data.length) * leftEntropy +
      (rightData.length / data.length) * rightEntropy;

    return parentEntropy - weightedEntropy;
  }

  // Find best split for a dataset
  private findBestSplit(data: TrainingData[]): { feature: string; threshold: number; gain: number } {
    let bestGain = 0;
    let bestFeature = '';
    let bestThreshold = 0;

    const features = Object.keys(data[0].features);

    for (const feature of features) {
      const values = data.map(d => d.features[feature]).sort((a, b) => a - b);
      
      for (let i = 0; i < values.length - 1; i++) {
        const threshold = (values[i] + values[i + 1]) / 2;
        const gain = this.calculateInformationGain(data, feature, threshold);

        if (gain > bestGain) {
          bestGain = gain;
          bestFeature = feature;
          bestThreshold = threshold;
        }
      }
    }

    return { feature: bestFeature, threshold: bestThreshold, gain: bestGain };
  }

  // Get majority class and confidence
  private getMajorityClass(labels: string[]): { prediction: string; confidence: number } {
    const labelCounts = labels.reduce((acc, label) => {
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedLabels = Object.entries(labelCounts).sort((a, b) => b[1] - a[1]);
    const prediction = sortedLabels[0][0];
    const confidence = sortedLabels[0][1] / labels.length;

    return { prediction, confidence };
  }

  // Build the decision tree recursively
  private buildTree(data: TrainingData[], depth: number = 0): DecisionNode {
    const labels = data.map(d => d.label);
    
    // Check stopping criteria
    if (
      depth >= this.maxDepth ||
      data.length < this.minSamplesLeaf ||
      new Set(labels).size === 1
    ) {
      const { prediction, confidence } = this.getMajorityClass(labels);
      return {
        feature: '',
        isLeaf: true,
        prediction,
        confidence
      };
    }

    const { feature, threshold, gain } = this.findBestSplit(data);

    // If no good split found, create leaf
    if (gain === 0) {
      const { prediction, confidence } = this.getMajorityClass(labels);
      return {
        feature: '',
        isLeaf: true,
        prediction,
        confidence
      };
    }

    const leftData = data.filter(d => d.features[feature] <= threshold);
    const rightData = data.filter(d => d.features[feature] > threshold);

    return {
      feature,
      threshold,
      isLeaf: false,
      left: this.buildTree(leftData, depth + 1),
      right: this.buildTree(rightData, depth + 1)
    };
  }

  // Train the decision tree
  train(data: TrainingData[]): void {
    this.root = this.buildTree(data);
  }

  // Make prediction for a single instance
  predict(features: Record<string, number>): { prediction: string; confidence: number; path: string[] } {
    if (!this.root) {
      throw new Error('Model not trained yet');
    }

    let currentNode = this.root;
    const path: string[] = [];

    while (!currentNode.isLeaf) {
      const featureValue = features[currentNode.feature!];
      path.push(`${currentNode.feature} ${featureValue <= currentNode.threshold! ? '≤' : '>'} ${currentNode.threshold}`);
      
      if (featureValue <= currentNode.threshold!) {
        currentNode = currentNode.left!;
      } else {
        currentNode = currentNode.right!;
      }
    }

    return {
      prediction: currentNode.prediction!,
      confidence: currentNode.confidence!,
      path
    };
  }

  // Get tree structure for visualization
  getTreeStructure(): DecisionNode | null {
    return this.root;
  }
}

// Inventory-specific decision tree for stock prediction
export class InventoryDecisionTree {
  private classifier: DecisionTreeClassifier;

  constructor() {
    this.classifier = new DecisionTreeClassifier(6, 3);
  }

  // Prepare training data from inventory history
  prepareTrainingData(inventory: any[]): TrainingData[] {
    return inventory.map(item => {
      // Calculate features
      const currentStock = item.quantity || 0;
      const reorderPoint = item.reorderPoint || 20;
      const avgConsumption = this.calculateAverageConsumption(item);
      const seasonality = this.calculateSeasonality(item);
      const supplierReliability = this.calculateSupplierReliability(item);
      const stockTurnover = this.calculateStockTurnover(item);

      // Determine risk level based on current conditions
      let riskLevel = 'Low';
      if (currentStock <= reorderPoint * 0.5) {
        riskLevel = 'High';
      } else if (currentStock <= reorderPoint) {
        riskLevel = 'Medium';
      }

      return {
        features: {
          currentStock,
          reorderPoint,
          avgConsumption,
          seasonality,
          supplierReliability,
          stockTurnover,
          stockRatio: currentStock / (reorderPoint || 1),
          consumptionRate: avgConsumption / (currentStock || 1)
        },
        label: riskLevel
      };
    });
  }

  private calculateAverageConsumption(item: any): number {
    // Simulate average consumption based on item category and history
    const baseConsumption = {
      'Electronics': 15,
      'Office Supplies': 25,
      'Safety Equipment': 10,
      'Raw Materials': 50
    };
    return baseConsumption[item.category as keyof typeof baseConsumption] || 20;
  }

  private calculateSeasonality(item: any): number {
    // Simulate seasonality factor (0-1, where 1 is high seasonal impact)
    const month = new Date().getMonth();
    const seasonalItems = ['Safety Equipment', 'Office Supplies'];
    
    if (seasonalItems.includes(item.category)) {
      // Higher consumption in certain months
      return month >= 8 && month <= 11 ? 0.8 : 0.3;
    }
    return 0.1;
  }

  private calculateSupplierReliability(item: any): number {
    // Simulate supplier reliability score (0-1)
    return 0.7 + Math.random() * 0.3; // 70-100% reliability
  }

  private calculateStockTurnover(item: any): number {
    // Simulate stock turnover rate
    return 2 + Math.random() * 4; // 2-6 times per year
  }

  // Train the model with current inventory data
  trainModel(inventory: any[]): void {
    const trainingData = this.prepareTrainingData(inventory);
    this.classifier.train(trainingData);
  }

  // Predict stock risk for a specific item
  predictStockRisk(item: any): {
    riskLevel: string;
    confidence: number;
    factors: string[];
    recommendation: string;
  } {
    const features = {
      currentStock: item.quantity || 0,
      reorderPoint: item.reorderPoint || 20,
      avgConsumption: this.calculateAverageConsumption(item),
      seasonality: this.calculateSeasonality(item),
      supplierReliability: this.calculateSupplierReliability(item),
      stockTurnover: this.calculateStockTurnover(item),
      stockRatio: (item.quantity || 0) / ((item.reorderPoint || 20) || 1),
      consumptionRate: this.calculateAverageConsumption(item) / ((item.quantity || 1) || 1)
    };

    const prediction = this.classifier.predict(features);
    
    const recommendations = {
      'High': 'Immediate reorder required. Consider expedited shipping.',
      'Medium': 'Schedule reorder within 1-2 weeks. Monitor consumption.',
      'Low': 'Normal monitoring. No immediate action required.'
    };

    return {
      riskLevel: prediction.prediction,
      confidence: prediction.confidence,
      factors: prediction.path,
      recommendation: recommendations[prediction.prediction as keyof typeof recommendations] || 'Monitor inventory levels.'
    };
  }

  // Generate comprehensive predictions for all inventory items
  generatePredictions(inventory: any[]): any[] {
    if (inventory.length === 0) return [];

    // Train the model with current data
    this.trainModel(inventory);

    return inventory.map(item => {
      const prediction = this.predictStockRisk(item);
      const daysUntilStockout = this.estimateDaysUntilStockout(item);

      return {
        itemName: item.name,
        currentStock: item.quantity || 0,
        predictedStockout: daysUntilStockout,
        riskLevel: prediction.riskLevel,
        confidence: Math.round(prediction.confidence * 100),
        factors: prediction.factors,
        recommendation: prediction.recommendation,
        category: item.category,
        supplier: item.supplier
      };
    });
  }

  private estimateDaysUntilStockout(item: any): string {
    const currentStock = item.quantity || 0;
    const avgConsumption = this.calculateAverageConsumption(item);
    const dailyConsumption = avgConsumption / 30; // Convert monthly to daily

    if (dailyConsumption <= 0) return 'No consumption data';
    
    const daysRemaining = Math.floor(currentStock / dailyConsumption);
    
    if (daysRemaining <= 0) return 'Already out of stock';
    if (daysRemaining <= 7) return `${daysRemaining} days`;
    if (daysRemaining <= 30) return `${Math.ceil(daysRemaining / 7)} weeks`;
    if (daysRemaining <= 365) return `${Math.ceil(daysRemaining / 30)} months`;
    
    return 'More than 1 year';
  }
}
