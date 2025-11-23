export interface BaseDataCategory {
    id: string;
    key: string;
    value: string;
}

export interface BaseDataItem {
    id: string;
    title: string;
    categoryId: string;
}

export interface CreateBaseDataDto {
    item: string;
    categoryId: string;
}
