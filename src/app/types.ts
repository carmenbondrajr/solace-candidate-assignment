export interface Advocate {
    firstName: string;
    lastName: string;
    city: string;
    degree: DegreeType;
    specialties: string[], // TODO enum
    yearsOfExperience: number;
    phoneNumber: number; // TODO convert to string?
}

export enum DegreeType {
    MD = "MD",
    PhD = "PhD",
    MSW = "MSW",
}