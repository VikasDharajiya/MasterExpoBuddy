export interface Category {
    id: number;
    name: string;
    sequence: number;
    status: 'Active' | 'Inactive';
    description: string;
    catalogueFile?: {
        name: string;
        size: string;
        dataUrl?: string;
    };
}
