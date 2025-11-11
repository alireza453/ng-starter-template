export interface BaseDataCategory {
    id: number;
    key: string;
    value: string;
}

export interface BaseDataItem {
    id: number;
    title: string;
    categoryId: number;
}
