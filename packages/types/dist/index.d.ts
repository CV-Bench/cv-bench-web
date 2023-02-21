import * as z from 'zod';

declare enum ModelType {
    "3D" = 0,
    "2D" = 1
}
declare const ModelBody: z.ZodObject<{
    _id: z.ZodAny;
    name: z.ZodString;
    description: z.ZodString;
    createdAt: z.ZodDate;
    userId: z.ZodAny;
    domainTags: z.ZodArray<z.ZodString, "many">;
    accessType: z.ZodNativeEnum<typeof AccessType>;
    updatedAt: z.ZodDate;
    modelType: z.ZodNativeEnum<typeof ModelType>;
}, "strip", z.ZodTypeAny, {
    _id?: any;
    userId?: any;
    name: string;
    description: string;
    createdAt: Date;
    domainTags: string[];
    accessType: AccessType;
    updatedAt: Date;
    modelType: ModelType;
}, {
    _id?: any;
    userId?: any;
    name: string;
    description: string;
    createdAt: Date;
    domainTags: string[];
    accessType: AccessType;
    updatedAt: Date;
    modelType: ModelType;
}>;
type ModelDb = z.infer<typeof ModelBody>;
declare const PostModelBody: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    accessType: z.ZodNativeEnum<typeof AccessType>;
    modelType: z.ZodNativeEnum<typeof ModelType>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    accessType: AccessType;
    modelType: ModelType;
}, {
    name: string;
    description: string;
    accessType: AccessType;
    modelType: ModelType;
}>;
type PostModel = z.infer<typeof PostModelBody>;

declare enum DatasetType {
    "BLENDER_3D" = 0
}
declare const DatasetBody: z.ZodObject<{
    _id: z.ZodAny;
    name: z.ZodString;
    description: z.ZodString;
    createdAt: z.ZodDate;
    userId: z.ZodAny;
    domainTags: z.ZodArray<z.ZodString, "many">;
    accessType: z.ZodNativeEnum<typeof AccessType>;
    updatedAt: z.ZodDate;
    models: z.ZodArray<z.ZodAny, "many">;
    datasetType: z.ZodNativeEnum<typeof DatasetType>;
    configurationId: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    _id?: any;
    userId?: any;
    configurationId?: any;
    name: string;
    description: string;
    createdAt: Date;
    domainTags: string[];
    accessType: AccessType;
    updatedAt: Date;
    models: any[];
    datasetType: DatasetType.BLENDER_3D;
}, {
    _id?: any;
    userId?: any;
    configurationId?: any;
    name: string;
    description: string;
    createdAt: Date;
    domainTags: string[];
    accessType: AccessType;
    updatedAt: Date;
    models: any[];
    datasetType: DatasetType.BLENDER_3D;
}>;
type DatasetDb = z.infer<typeof DatasetBody>;
declare const PostDatasetBody: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    accessType: z.ZodNativeEnum<typeof AccessType>;
    models: z.ZodArray<z.ZodAny, "many">;
    datasetType: z.ZodNativeEnum<typeof DatasetType>;
    configurationId: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    configurationId?: any;
    name: string;
    description: string;
    accessType: AccessType;
    models: any[];
    datasetType: DatasetType.BLENDER_3D;
}, {
    configurationId?: any;
    name: string;
    description: string;
    accessType: AccessType;
    models: any[];
    datasetType: DatasetType.BLENDER_3D;
}>;
type PostDataset = z.infer<typeof PostDatasetBody>;

declare enum ConfigurationType {
    "BLENDER" = 0
}
declare enum RandomColor {
    NONE = "None",
    TEMPERATURE = "Temperature",
    PROJECTOR = "Projector"
}
declare enum CamLensUnit {
    FOV = "FOV",
    MILLIMETERS = "MILLIMETERS"
}
declare const BlenderConfigurationObject: z.ZodObject<{
    maxDistractorObjects: z.ZodNumber;
    numberOfObjects: z.ZodDefault<z.ZodNumber>;
    outputDepth: z.ZodDefault<z.ZodBoolean>;
    depthOutputDepth: z.ZodDefault<z.ZodNumber>;
    randomHSVValue: z.ZodDefault<z.ZodBoolean>;
    randomMetallicValue: z.ZodDefault<z.ZodBoolean>;
    randomRoughnessValue: z.ZodDefault<z.ZodBoolean>;
    random_color: z.ZodNativeEnum<typeof RandomColor>;
    modelScale: z.ZodDefault<z.ZodNumber>;
    hsv_hue: z.ZodDefault<z.ZodNumber>;
    hsv_saturation: z.ZodDefault<z.ZodNumber>;
    hsv_value: z.ZodDefault<z.ZodNumber>;
    camRMin: z.ZodDefault<z.ZodNumber>;
    camRMax: z.ZodDefault<z.ZodNumber>;
    camIncMin: z.ZodDefault<z.ZodNumber>;
    camIncMax: z.ZodDefault<z.ZodNumber>;
    camAziMin: z.ZodDefault<z.ZodNumber>;
    camAziMax: z.ZodDefault<z.ZodNumber>;
    objLocationXMin: z.ZodDefault<z.ZodNumber>;
    objLocationXMax: z.ZodDefault<z.ZodNumber>;
    objLocationYMin: z.ZodDefault<z.ZodNumber>;
    objLocationYMax: z.ZodDefault<z.ZodNumber>;
    objLocationZMin: z.ZodDefault<z.ZodNumber>;
    objLocationZMax: z.ZodDefault<z.ZodNumber>;
    camRotationMin: z.ZodDefault<z.ZodNumber>;
    camRotationMax: z.ZodDefault<z.ZodNumber>;
    maxBoundingBox: z.ZodDefault<z.ZodNumber>;
    camLensUnit: z.ZodNativeEnum<typeof CamLensUnit>;
    camLens: z.ZodDefault<z.ZodNumber>;
    camFov: z.ZodDefault<z.ZodNumber>;
    camSensorHeight: z.ZodDefault<z.ZodNumber>;
    camSensorWidth: z.ZodDefault<z.ZodNumber>;
    clipEnd: z.ZodDefault<z.ZodNumber>;
    clipStart: z.ZodDefault<z.ZodNumber>;
    useGPU: z.ZodDefault<z.ZodBoolean>;
    useCycles: z.ZodDefault<z.ZodBoolean>;
    useCyclesDenoising: z.ZodDefault<z.ZodBoolean>;
    useAdaptiveSampling: z.ZodDefault<z.ZodBoolean>;
    resolutionX: z.ZodDefault<z.ZodNumber>;
    resolutionY: z.ZodDefault<z.ZodNumber>;
    samples: z.ZodDefault<z.ZodNumber>;
    numberOfRenders: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    maxDistractorObjects: number;
    numberOfObjects: number;
    outputDepth: boolean;
    depthOutputDepth: number;
    randomHSVValue: boolean;
    randomMetallicValue: boolean;
    randomRoughnessValue: boolean;
    random_color: RandomColor;
    modelScale: number;
    hsv_hue: number;
    hsv_saturation: number;
    hsv_value: number;
    camRMin: number;
    camRMax: number;
    camIncMin: number;
    camIncMax: number;
    camAziMin: number;
    camAziMax: number;
    objLocationXMin: number;
    objLocationXMax: number;
    objLocationYMin: number;
    objLocationYMax: number;
    objLocationZMin: number;
    objLocationZMax: number;
    camRotationMin: number;
    camRotationMax: number;
    maxBoundingBox: number;
    camLensUnit: CamLensUnit;
    camLens: number;
    camFov: number;
    camSensorHeight: number;
    camSensorWidth: number;
    clipEnd: number;
    clipStart: number;
    useGPU: boolean;
    useCycles: boolean;
    useCyclesDenoising: boolean;
    useAdaptiveSampling: boolean;
    resolutionX: number;
    resolutionY: number;
    samples: number;
    numberOfRenders: number;
}, {
    numberOfObjects?: number | undefined;
    outputDepth?: boolean | undefined;
    depthOutputDepth?: number | undefined;
    randomHSVValue?: boolean | undefined;
    randomMetallicValue?: boolean | undefined;
    randomRoughnessValue?: boolean | undefined;
    modelScale?: number | undefined;
    hsv_hue?: number | undefined;
    hsv_saturation?: number | undefined;
    hsv_value?: number | undefined;
    camRMin?: number | undefined;
    camRMax?: number | undefined;
    camIncMin?: number | undefined;
    camIncMax?: number | undefined;
    camAziMin?: number | undefined;
    camAziMax?: number | undefined;
    objLocationXMin?: number | undefined;
    objLocationXMax?: number | undefined;
    objLocationYMin?: number | undefined;
    objLocationYMax?: number | undefined;
    objLocationZMin?: number | undefined;
    objLocationZMax?: number | undefined;
    camRotationMin?: number | undefined;
    camRotationMax?: number | undefined;
    maxBoundingBox?: number | undefined;
    camLens?: number | undefined;
    camFov?: number | undefined;
    camSensorHeight?: number | undefined;
    camSensorWidth?: number | undefined;
    clipEnd?: number | undefined;
    clipStart?: number | undefined;
    useGPU?: boolean | undefined;
    useCycles?: boolean | undefined;
    useCyclesDenoising?: boolean | undefined;
    useAdaptiveSampling?: boolean | undefined;
    resolutionX?: number | undefined;
    resolutionY?: number | undefined;
    samples?: number | undefined;
    numberOfRenders?: number | undefined;
    maxDistractorObjects: number;
    random_color: RandomColor;
    camLensUnit: CamLensUnit;
}>;
type BlenderConfiguration = z.infer<typeof BlenderConfigurationObject>;
type BlenderConfigurationKey = keyof BlenderConfiguration;
declare const DatasetConfigurationBody: z.ZodObject<{
    _id: z.ZodAny;
    userId: z.ZodAny;
    name: z.ZodString;
    createdAt: z.ZodString;
    configurationType: z.ZodNativeEnum<typeof ConfigurationType>;
    configuration: z.ZodObject<{
        maxDistractorObjects: z.ZodNumber;
        numberOfObjects: z.ZodDefault<z.ZodNumber>;
        outputDepth: z.ZodDefault<z.ZodBoolean>;
        depthOutputDepth: z.ZodDefault<z.ZodNumber>;
        randomHSVValue: z.ZodDefault<z.ZodBoolean>;
        randomMetallicValue: z.ZodDefault<z.ZodBoolean>;
        randomRoughnessValue: z.ZodDefault<z.ZodBoolean>;
        random_color: z.ZodNativeEnum<typeof RandomColor>;
        modelScale: z.ZodDefault<z.ZodNumber>;
        hsv_hue: z.ZodDefault<z.ZodNumber>;
        hsv_saturation: z.ZodDefault<z.ZodNumber>;
        hsv_value: z.ZodDefault<z.ZodNumber>;
        camRMin: z.ZodDefault<z.ZodNumber>;
        camRMax: z.ZodDefault<z.ZodNumber>;
        camIncMin: z.ZodDefault<z.ZodNumber>;
        camIncMax: z.ZodDefault<z.ZodNumber>;
        camAziMin: z.ZodDefault<z.ZodNumber>;
        camAziMax: z.ZodDefault<z.ZodNumber>;
        objLocationXMin: z.ZodDefault<z.ZodNumber>;
        objLocationXMax: z.ZodDefault<z.ZodNumber>;
        objLocationYMin: z.ZodDefault<z.ZodNumber>;
        objLocationYMax: z.ZodDefault<z.ZodNumber>;
        objLocationZMin: z.ZodDefault<z.ZodNumber>;
        objLocationZMax: z.ZodDefault<z.ZodNumber>;
        camRotationMin: z.ZodDefault<z.ZodNumber>;
        camRotationMax: z.ZodDefault<z.ZodNumber>;
        maxBoundingBox: z.ZodDefault<z.ZodNumber>;
        camLensUnit: z.ZodNativeEnum<typeof CamLensUnit>;
        camLens: z.ZodDefault<z.ZodNumber>;
        camFov: z.ZodDefault<z.ZodNumber>;
        camSensorHeight: z.ZodDefault<z.ZodNumber>;
        camSensorWidth: z.ZodDefault<z.ZodNumber>;
        clipEnd: z.ZodDefault<z.ZodNumber>;
        clipStart: z.ZodDefault<z.ZodNumber>;
        useGPU: z.ZodDefault<z.ZodBoolean>;
        useCycles: z.ZodDefault<z.ZodBoolean>;
        useCyclesDenoising: z.ZodDefault<z.ZodBoolean>;
        useAdaptiveSampling: z.ZodDefault<z.ZodBoolean>;
        resolutionX: z.ZodDefault<z.ZodNumber>;
        resolutionY: z.ZodDefault<z.ZodNumber>;
        samples: z.ZodDefault<z.ZodNumber>;
        numberOfRenders: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxDistractorObjects: number;
        numberOfObjects: number;
        outputDepth: boolean;
        depthOutputDepth: number;
        randomHSVValue: boolean;
        randomMetallicValue: boolean;
        randomRoughnessValue: boolean;
        random_color: RandomColor;
        modelScale: number;
        hsv_hue: number;
        hsv_saturation: number;
        hsv_value: number;
        camRMin: number;
        camRMax: number;
        camIncMin: number;
        camIncMax: number;
        camAziMin: number;
        camAziMax: number;
        objLocationXMin: number;
        objLocationXMax: number;
        objLocationYMin: number;
        objLocationYMax: number;
        objLocationZMin: number;
        objLocationZMax: number;
        camRotationMin: number;
        camRotationMax: number;
        maxBoundingBox: number;
        camLensUnit: CamLensUnit;
        camLens: number;
        camFov: number;
        camSensorHeight: number;
        camSensorWidth: number;
        clipEnd: number;
        clipStart: number;
        useGPU: boolean;
        useCycles: boolean;
        useCyclesDenoising: boolean;
        useAdaptiveSampling: boolean;
        resolutionX: number;
        resolutionY: number;
        samples: number;
        numberOfRenders: number;
    }, {
        numberOfObjects?: number | undefined;
        outputDepth?: boolean | undefined;
        depthOutputDepth?: number | undefined;
        randomHSVValue?: boolean | undefined;
        randomMetallicValue?: boolean | undefined;
        randomRoughnessValue?: boolean | undefined;
        modelScale?: number | undefined;
        hsv_hue?: number | undefined;
        hsv_saturation?: number | undefined;
        hsv_value?: number | undefined;
        camRMin?: number | undefined;
        camRMax?: number | undefined;
        camIncMin?: number | undefined;
        camIncMax?: number | undefined;
        camAziMin?: number | undefined;
        camAziMax?: number | undefined;
        objLocationXMin?: number | undefined;
        objLocationXMax?: number | undefined;
        objLocationYMin?: number | undefined;
        objLocationYMax?: number | undefined;
        objLocationZMin?: number | undefined;
        objLocationZMax?: number | undefined;
        camRotationMin?: number | undefined;
        camRotationMax?: number | undefined;
        maxBoundingBox?: number | undefined;
        camLens?: number | undefined;
        camFov?: number | undefined;
        camSensorHeight?: number | undefined;
        camSensorWidth?: number | undefined;
        clipEnd?: number | undefined;
        clipStart?: number | undefined;
        useGPU?: boolean | undefined;
        useCycles?: boolean | undefined;
        useCyclesDenoising?: boolean | undefined;
        useAdaptiveSampling?: boolean | undefined;
        resolutionX?: number | undefined;
        resolutionY?: number | undefined;
        samples?: number | undefined;
        numberOfRenders?: number | undefined;
        maxDistractorObjects: number;
        random_color: RandomColor;
        camLensUnit: CamLensUnit;
    }>;
}, "strip", z.ZodTypeAny, {
    _id?: any;
    userId?: any;
    name: string;
    createdAt: string;
    configurationType: ConfigurationType.BLENDER;
    configuration: {
        maxDistractorObjects: number;
        numberOfObjects: number;
        outputDepth: boolean;
        depthOutputDepth: number;
        randomHSVValue: boolean;
        randomMetallicValue: boolean;
        randomRoughnessValue: boolean;
        random_color: RandomColor;
        modelScale: number;
        hsv_hue: number;
        hsv_saturation: number;
        hsv_value: number;
        camRMin: number;
        camRMax: number;
        camIncMin: number;
        camIncMax: number;
        camAziMin: number;
        camAziMax: number;
        objLocationXMin: number;
        objLocationXMax: number;
        objLocationYMin: number;
        objLocationYMax: number;
        objLocationZMin: number;
        objLocationZMax: number;
        camRotationMin: number;
        camRotationMax: number;
        maxBoundingBox: number;
        camLensUnit: CamLensUnit;
        camLens: number;
        camFov: number;
        camSensorHeight: number;
        camSensorWidth: number;
        clipEnd: number;
        clipStart: number;
        useGPU: boolean;
        useCycles: boolean;
        useCyclesDenoising: boolean;
        useAdaptiveSampling: boolean;
        resolutionX: number;
        resolutionY: number;
        samples: number;
        numberOfRenders: number;
    };
}, {
    _id?: any;
    userId?: any;
    name: string;
    createdAt: string;
    configurationType: ConfigurationType.BLENDER;
    configuration: {
        numberOfObjects?: number | undefined;
        outputDepth?: boolean | undefined;
        depthOutputDepth?: number | undefined;
        randomHSVValue?: boolean | undefined;
        randomMetallicValue?: boolean | undefined;
        randomRoughnessValue?: boolean | undefined;
        modelScale?: number | undefined;
        hsv_hue?: number | undefined;
        hsv_saturation?: number | undefined;
        hsv_value?: number | undefined;
        camRMin?: number | undefined;
        camRMax?: number | undefined;
        camIncMin?: number | undefined;
        camIncMax?: number | undefined;
        camAziMin?: number | undefined;
        camAziMax?: number | undefined;
        objLocationXMin?: number | undefined;
        objLocationXMax?: number | undefined;
        objLocationYMin?: number | undefined;
        objLocationYMax?: number | undefined;
        objLocationZMin?: number | undefined;
        objLocationZMax?: number | undefined;
        camRotationMin?: number | undefined;
        camRotationMax?: number | undefined;
        maxBoundingBox?: number | undefined;
        camLens?: number | undefined;
        camFov?: number | undefined;
        camSensorHeight?: number | undefined;
        camSensorWidth?: number | undefined;
        clipEnd?: number | undefined;
        clipStart?: number | undefined;
        useGPU?: boolean | undefined;
        useCycles?: boolean | undefined;
        useCyclesDenoising?: boolean | undefined;
        useAdaptiveSampling?: boolean | undefined;
        resolutionX?: number | undefined;
        resolutionY?: number | undefined;
        samples?: number | undefined;
        numberOfRenders?: number | undefined;
        maxDistractorObjects: number;
        random_color: RandomColor;
        camLensUnit: CamLensUnit;
    };
}>;
type DatasetConfigurationDb = z.infer<typeof DatasetConfigurationBody>;
declare const PostDatasetConfigurationBody: z.ZodObject<Pick<{
    _id: z.ZodAny;
    userId: z.ZodAny;
    name: z.ZodString;
    createdAt: z.ZodString;
    configurationType: z.ZodNativeEnum<typeof ConfigurationType>;
    configuration: z.ZodObject<{
        maxDistractorObjects: z.ZodNumber;
        numberOfObjects: z.ZodDefault<z.ZodNumber>;
        outputDepth: z.ZodDefault<z.ZodBoolean>;
        depthOutputDepth: z.ZodDefault<z.ZodNumber>;
        randomHSVValue: z.ZodDefault<z.ZodBoolean>;
        randomMetallicValue: z.ZodDefault<z.ZodBoolean>;
        randomRoughnessValue: z.ZodDefault<z.ZodBoolean>;
        random_color: z.ZodNativeEnum<typeof RandomColor>;
        modelScale: z.ZodDefault<z.ZodNumber>;
        hsv_hue: z.ZodDefault<z.ZodNumber>;
        hsv_saturation: z.ZodDefault<z.ZodNumber>;
        hsv_value: z.ZodDefault<z.ZodNumber>;
        camRMin: z.ZodDefault<z.ZodNumber>;
        camRMax: z.ZodDefault<z.ZodNumber>;
        camIncMin: z.ZodDefault<z.ZodNumber>;
        camIncMax: z.ZodDefault<z.ZodNumber>;
        camAziMin: z.ZodDefault<z.ZodNumber>;
        camAziMax: z.ZodDefault<z.ZodNumber>;
        objLocationXMin: z.ZodDefault<z.ZodNumber>;
        objLocationXMax: z.ZodDefault<z.ZodNumber>;
        objLocationYMin: z.ZodDefault<z.ZodNumber>;
        objLocationYMax: z.ZodDefault<z.ZodNumber>;
        objLocationZMin: z.ZodDefault<z.ZodNumber>;
        objLocationZMax: z.ZodDefault<z.ZodNumber>;
        camRotationMin: z.ZodDefault<z.ZodNumber>;
        camRotationMax: z.ZodDefault<z.ZodNumber>;
        maxBoundingBox: z.ZodDefault<z.ZodNumber>;
        camLensUnit: z.ZodNativeEnum<typeof CamLensUnit>;
        camLens: z.ZodDefault<z.ZodNumber>;
        camFov: z.ZodDefault<z.ZodNumber>;
        camSensorHeight: z.ZodDefault<z.ZodNumber>;
        camSensorWidth: z.ZodDefault<z.ZodNumber>;
        clipEnd: z.ZodDefault<z.ZodNumber>;
        clipStart: z.ZodDefault<z.ZodNumber>;
        useGPU: z.ZodDefault<z.ZodBoolean>;
        useCycles: z.ZodDefault<z.ZodBoolean>;
        useCyclesDenoising: z.ZodDefault<z.ZodBoolean>;
        useAdaptiveSampling: z.ZodDefault<z.ZodBoolean>;
        resolutionX: z.ZodDefault<z.ZodNumber>;
        resolutionY: z.ZodDefault<z.ZodNumber>;
        samples: z.ZodDefault<z.ZodNumber>;
        numberOfRenders: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxDistractorObjects: number;
        numberOfObjects: number;
        outputDepth: boolean;
        depthOutputDepth: number;
        randomHSVValue: boolean;
        randomMetallicValue: boolean;
        randomRoughnessValue: boolean;
        random_color: RandomColor;
        modelScale: number;
        hsv_hue: number;
        hsv_saturation: number;
        hsv_value: number;
        camRMin: number;
        camRMax: number;
        camIncMin: number;
        camIncMax: number;
        camAziMin: number;
        camAziMax: number;
        objLocationXMin: number;
        objLocationXMax: number;
        objLocationYMin: number;
        objLocationYMax: number;
        objLocationZMin: number;
        objLocationZMax: number;
        camRotationMin: number;
        camRotationMax: number;
        maxBoundingBox: number;
        camLensUnit: CamLensUnit;
        camLens: number;
        camFov: number;
        camSensorHeight: number;
        camSensorWidth: number;
        clipEnd: number;
        clipStart: number;
        useGPU: boolean;
        useCycles: boolean;
        useCyclesDenoising: boolean;
        useAdaptiveSampling: boolean;
        resolutionX: number;
        resolutionY: number;
        samples: number;
        numberOfRenders: number;
    }, {
        numberOfObjects?: number | undefined;
        outputDepth?: boolean | undefined;
        depthOutputDepth?: number | undefined;
        randomHSVValue?: boolean | undefined;
        randomMetallicValue?: boolean | undefined;
        randomRoughnessValue?: boolean | undefined;
        modelScale?: number | undefined;
        hsv_hue?: number | undefined;
        hsv_saturation?: number | undefined;
        hsv_value?: number | undefined;
        camRMin?: number | undefined;
        camRMax?: number | undefined;
        camIncMin?: number | undefined;
        camIncMax?: number | undefined;
        camAziMin?: number | undefined;
        camAziMax?: number | undefined;
        objLocationXMin?: number | undefined;
        objLocationXMax?: number | undefined;
        objLocationYMin?: number | undefined;
        objLocationYMax?: number | undefined;
        objLocationZMin?: number | undefined;
        objLocationZMax?: number | undefined;
        camRotationMin?: number | undefined;
        camRotationMax?: number | undefined;
        maxBoundingBox?: number | undefined;
        camLens?: number | undefined;
        camFov?: number | undefined;
        camSensorHeight?: number | undefined;
        camSensorWidth?: number | undefined;
        clipEnd?: number | undefined;
        clipStart?: number | undefined;
        useGPU?: boolean | undefined;
        useCycles?: boolean | undefined;
        useCyclesDenoising?: boolean | undefined;
        useAdaptiveSampling?: boolean | undefined;
        resolutionX?: number | undefined;
        resolutionY?: number | undefined;
        samples?: number | undefined;
        numberOfRenders?: number | undefined;
        maxDistractorObjects: number;
        random_color: RandomColor;
        camLensUnit: CamLensUnit;
    }>;
}, "name" | "configurationType" | "configuration">, "strip", z.ZodTypeAny, {
    name: string;
    configurationType: ConfigurationType.BLENDER;
    configuration: {
        maxDistractorObjects: number;
        numberOfObjects: number;
        outputDepth: boolean;
        depthOutputDepth: number;
        randomHSVValue: boolean;
        randomMetallicValue: boolean;
        randomRoughnessValue: boolean;
        random_color: RandomColor;
        modelScale: number;
        hsv_hue: number;
        hsv_saturation: number;
        hsv_value: number;
        camRMin: number;
        camRMax: number;
        camIncMin: number;
        camIncMax: number;
        camAziMin: number;
        camAziMax: number;
        objLocationXMin: number;
        objLocationXMax: number;
        objLocationYMin: number;
        objLocationYMax: number;
        objLocationZMin: number;
        objLocationZMax: number;
        camRotationMin: number;
        camRotationMax: number;
        maxBoundingBox: number;
        camLensUnit: CamLensUnit;
        camLens: number;
        camFov: number;
        camSensorHeight: number;
        camSensorWidth: number;
        clipEnd: number;
        clipStart: number;
        useGPU: boolean;
        useCycles: boolean;
        useCyclesDenoising: boolean;
        useAdaptiveSampling: boolean;
        resolutionX: number;
        resolutionY: number;
        samples: number;
        numberOfRenders: number;
    };
}, {
    name: string;
    configurationType: ConfigurationType.BLENDER;
    configuration: {
        numberOfObjects?: number | undefined;
        outputDepth?: boolean | undefined;
        depthOutputDepth?: number | undefined;
        randomHSVValue?: boolean | undefined;
        randomMetallicValue?: boolean | undefined;
        randomRoughnessValue?: boolean | undefined;
        modelScale?: number | undefined;
        hsv_hue?: number | undefined;
        hsv_saturation?: number | undefined;
        hsv_value?: number | undefined;
        camRMin?: number | undefined;
        camRMax?: number | undefined;
        camIncMin?: number | undefined;
        camIncMax?: number | undefined;
        camAziMin?: number | undefined;
        camAziMax?: number | undefined;
        objLocationXMin?: number | undefined;
        objLocationXMax?: number | undefined;
        objLocationYMin?: number | undefined;
        objLocationYMax?: number | undefined;
        objLocationZMin?: number | undefined;
        objLocationZMax?: number | undefined;
        camRotationMin?: number | undefined;
        camRotationMax?: number | undefined;
        maxBoundingBox?: number | undefined;
        camLens?: number | undefined;
        camFov?: number | undefined;
        camSensorHeight?: number | undefined;
        camSensorWidth?: number | undefined;
        clipEnd?: number | undefined;
        clipStart?: number | undefined;
        useGPU?: boolean | undefined;
        useCycles?: boolean | undefined;
        useCyclesDenoising?: boolean | undefined;
        useAdaptiveSampling?: boolean | undefined;
        resolutionX?: number | undefined;
        resolutionY?: number | undefined;
        samples?: number | undefined;
        numberOfRenders?: number | undefined;
        maxDistractorObjects: number;
        random_color: RandomColor;
        camLensUnit: CamLensUnit;
    };
}>;
type PostDatasetConfiguration = z.infer<typeof PostDatasetConfigurationBody>;

declare enum AuditEventType {
    LOG_IN_USER = "LOG_IN_USER",
    CREATE_USER = "CREATE_USER",
    CREATE_MODEL = "CREATE_MODEL",
    UPDATE_MODEL = "UPDATE_MODEL",
    DELETE_MODEL = "DELETE_MODEL",
    DOWNLOAD_MODEL = "DOWNLOAD_MODEL",
    REQUEST_MODEL_DOWNLOAD = "REQUEST_MODEL_DOWNLOAD",
    DATASET_CREATED = "DATASET_CREATED",
    CREATE_DATASET = "CREATE_DATASET",
    UPDATE_DATASET = "UPDATE_DATASET",
    DELETE_DATASET = "DELETE_DATASET",
    DOWNLOAD_DATASET = "DOWNLOAD_DATASET",
    REQUEST_DATASET_DOWNLOAD = "REQUEST_DATASET_DOWNLOAD",
    NETWORK_TRAINED = "NETWORK_TRAINED",
    TRAING_NETWORK = "TRAING_NETWORK",
    CREATE_NETWORK = "CREATE_NETWORK",
    UPDATE_NETWORK = "UPDATE_NETWORK",
    DELETE_NETWORK = "DELETE_NETWORK",
    DOWNLOAD_NETWORK = "DOWNLOAD_NETWORK",
    REQUEST_NETWORK_DOWNLOAD = "REQUEST_NETWORK_DOWNLOAD",
    STOP_TASK = "STOP_TASK"
}
declare const AuditEventBody: z.ZodObject<{
    _id: z.ZodAny;
    userId: z.ZodOptional<z.ZodAny>;
    type: z.ZodNativeEnum<typeof AuditEventType>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    _id?: any;
    userId?: any;
    createdAt: Date;
    type: AuditEventType;
}, {
    _id?: any;
    userId?: any;
    createdAt: Date;
    type: AuditEventType;
}>;
type AuditEventDb = z.infer<typeof AuditEventBody>;

declare const NetworkBody: z.ZodObject<{
    _id: z.ZodAny;
    name: z.ZodString;
    description: z.ZodString;
    createdAt: z.ZodDate;
    userId: z.ZodAny;
    domainTags: z.ZodArray<z.ZodString, "many">;
    accessType: z.ZodNativeEnum<typeof AccessType>;
    updatedAt: z.ZodDate;
    datasetId: z.ZodAny;
    networkArchitectureId: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    _id?: any;
    userId?: any;
    datasetId?: any;
    networkArchitectureId?: any;
    name: string;
    description: string;
    createdAt: Date;
    domainTags: string[];
    accessType: AccessType;
    updatedAt: Date;
}, {
    _id?: any;
    userId?: any;
    datasetId?: any;
    networkArchitectureId?: any;
    name: string;
    description: string;
    createdAt: Date;
    domainTags: string[];
    accessType: AccessType;
    updatedAt: Date;
}>;
type NetworkDb = z.infer<typeof NetworkBody>;
declare const PostNetworkBody: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    accessType: z.ZodNativeEnum<typeof AccessType>;
    datasetId: z.ZodAny;
    networkArchitectureId: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    datasetId?: any;
    networkArchitectureId?: any;
    name: string;
    description: string;
    accessType: AccessType;
}, {
    datasetId?: any;
    networkArchitectureId?: any;
    name: string;
    description: string;
    accessType: AccessType;
}>;
type PostNetwork = z.infer<typeof PostNetworkBody>;

declare enum NotificationType {
}
declare const NotificationBody: z.ZodObject<{
    _id: z.ZodAny;
    userId: z.ZodAny;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    isRead: z.ZodBoolean;
    description: z.ZodString;
    title: z.ZodString;
    type: z.ZodNativeEnum<typeof NotificationType>;
}, "strip", z.ZodTypeAny, {
    _id?: any;
    userId?: any;
    description: string;
    createdAt: Date;
    type: string;
    updatedAt: Date;
    isRead: boolean;
    title: string;
}, {
    _id?: any;
    userId?: any;
    description: string;
    createdAt: Date;
    type: string;
    updatedAt: Date;
    isRead: boolean;
    title: string;
}>;
type NotificationDb = z.infer<typeof NotificationBody>;

declare enum TaskStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    ABORTED = "ABORTED",
    FINISHED = "FINISHED"
}
declare enum TaskType {
    CREATE_NETWORK = "CREATE_NETWORK",
    CREATE_DATASET = "CREATE_DATASET"
}
declare const TaskBody: z.ZodObject<{
    _id: z.ZodAny;
    userId: z.ZodAny;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    status: z.ZodNativeEnum<typeof TaskStatus>;
    type: z.ZodNativeEnum<typeof TaskType>;
    info: z.ZodObject<{
        modelId: z.ZodOptional<z.ZodAny>;
        datasetId: z.ZodOptional<z.ZodAny>;
        networkArchitectureId: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        datasetId?: any;
        networkArchitectureId?: any;
        modelId?: any;
    }, {
        datasetId?: any;
        networkArchitectureId?: any;
        modelId?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    _id?: any;
    userId?: any;
    createdAt: Date;
    status: TaskStatus;
    type: TaskType;
    updatedAt: Date;
    info: {
        datasetId?: any;
        networkArchitectureId?: any;
        modelId?: any;
    };
}, {
    _id?: any;
    userId?: any;
    createdAt: Date;
    status: TaskStatus;
    type: TaskType;
    updatedAt: Date;
    info: {
        datasetId?: any;
        networkArchitectureId?: any;
        modelId?: any;
    };
}>;
type TaskDb = z.infer<typeof TaskBody>;
declare const PostTaskBody: z.ZodObject<Pick<{
    _id: z.ZodAny;
    userId: z.ZodAny;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    status: z.ZodNativeEnum<typeof TaskStatus>;
    type: z.ZodNativeEnum<typeof TaskType>;
    info: z.ZodObject<{
        modelId: z.ZodOptional<z.ZodAny>;
        datasetId: z.ZodOptional<z.ZodAny>;
        networkArchitectureId: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        datasetId?: any;
        networkArchitectureId?: any;
        modelId?: any;
    }, {
        datasetId?: any;
        networkArchitectureId?: any;
        modelId?: any;
    }>;
}, "type" | "info">, "strip", z.ZodTypeAny, {
    type: TaskType;
    info: {
        datasetId?: any;
        networkArchitectureId?: any;
        modelId?: any;
    };
}, {
    type: TaskType;
    info: {
        datasetId?: any;
        networkArchitectureId?: any;
        modelId?: any;
    };
}>;
type PostTask = z.infer<typeof PostTaskBody>;

declare enum AccessType {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}
declare enum DataType {
    MODEL = "MODEL",
    DATASET = "DATASET",
    NETWORK = "NETWORK"
}
declare enum DatasetFormat {
    COCO = "COCO"
}
declare const NetworkArchitectureBody: z.ZodObject<{
    _id: z.ZodAny;
    name: z.ZodString;
    identifier: z.ZodString;
    description: z.ZodString;
    createdAt: z.ZodDate;
    requiredDatasetFormat: z.ZodNativeEnum<typeof DatasetFormat>;
}, "strip", z.ZodTypeAny, {
    _id?: any;
    name: string;
    identifier: string;
    description: string;
    createdAt: Date;
    requiredDatasetFormat: DatasetFormat.COCO;
}, {
    _id?: any;
    name: string;
    identifier: string;
    description: string;
    createdAt: Date;
    requiredDatasetFormat: DatasetFormat.COCO;
}>;
type NetworkArchitecture = z.infer<typeof NetworkArchitectureBody>;

export { AccessType, AuditEventBody, AuditEventDb, AuditEventType, BlenderConfiguration, BlenderConfigurationKey, BlenderConfigurationObject, CamLensUnit, ConfigurationType, DataType, DatasetBody, DatasetConfigurationBody, DatasetConfigurationDb, DatasetDb, DatasetFormat, DatasetType, ModelBody, ModelDb, ModelType, NetworkArchitecture, NetworkArchitectureBody, NetworkBody, NetworkDb, NotificationBody, NotificationDb, NotificationType, PostDataset, PostDatasetBody, PostDatasetConfiguration, PostDatasetConfigurationBody, PostModel, PostModelBody, PostNetwork, PostNetworkBody, PostTask, PostTaskBody, RandomColor, TaskBody, TaskDb, TaskStatus, TaskType };
