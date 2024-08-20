export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    profileImage?: String; // Use File type for images
}