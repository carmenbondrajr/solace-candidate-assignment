export interface Advocate {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[], // TODO enum
    yearsOfExperience: number;
    phoneNumber: number; // TODO convert to string?
}
