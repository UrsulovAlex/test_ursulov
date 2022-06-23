export interface IJwtToken {
    exp: number;
    name: string;
    permissions?: string[];
}