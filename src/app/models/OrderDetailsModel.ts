export class OrderDetailsModel {
    public constructor(
        public finalPrice?: number,
        public shippingCity?: string,
        public shippingStreet?: string,
        public shippingDate?: Date,
        public orderDate?: Date,
        public creditCard?: number,
    ) { }
}