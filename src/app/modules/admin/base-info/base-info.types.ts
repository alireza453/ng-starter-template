/**
 *=============Base Info Category=============
 */
export interface BaseInfoCategoryDto {
    id: string;
    name: string;
    display: string;
    description: string;
    isActive: true;
}

export interface GetBaseInfoCategoriesDto {
    totalCount: number;
    items: BaseInfoCategoryDto[];
}

/**
 *=============Base Info=============
 */
export interface BaseInfoDto {
    id:string,
    categoryId: string;
    parentId: string;
    name: string;
    value: string;
    display: string;
    sortOrder: number;
    isActive: true;
    description: string;
}

export interface CreateBaseInfoDto {
    categoryId: string;
    parentId?: string;
    name: string;
    value: string;
    display: string;
}


export interface GetBaseInfoDto {
    totalCount: number;
    items: BaseInfoDto[];
}
