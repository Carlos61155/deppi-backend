export interface CreateCampusBody {
    name: string;
    code: string;
    address: string;
    city: string;
    state: string;
    phone: string[];
    email: string;
}

export interface UpdateCampusBody {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    phone?: string[];
    email?: string;
}