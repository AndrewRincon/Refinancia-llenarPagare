import { Annotations, CoreControls } from '@pdftron/webviewer';

export interface IDocument {
    serialDocument: string;
    signGuid: string;
    signatureField: ISignature;
    document?: Uint8Array;
    annotation: string;
    annotations: Array<IAnnotation>;
    docObject : CoreControls.Document;
    docStamp: string; 
}

export interface ISignature {
    height: number;
    width: number;
    x: number;
    y: number;
    page: number;
    signatureGuid: string;
    signatureImageEncoded: string;
    signatureType: string
    signatureBase64: string
}

export interface IAnnotation {
    annotationObject: Annotations.Annotation;
    configured: boolean;
}

export enum AnnotationType {
    DATE = 1,
    INITIALS,
    TEXT,
    SIGNATURE
}
