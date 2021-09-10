export class ProductModel {
    public constructor(
        public id?: number,
        public productName?: string,
        public amount?: number,
        public image?: string,
        public price?: number,
        public categoryName?: string,
        public categoryId?: number,
        public totalPrice?: number
    ) { }
}
